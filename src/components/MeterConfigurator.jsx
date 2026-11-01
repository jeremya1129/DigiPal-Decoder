import React, { useState, useMemo } from 'react';
import { METER_FAMILIES } from '../data/meterData';
import { 
  Gauge, 
  Copy, 
  Check, 
  Plus, 
  ExternalLink, 
  Layers, 
  Info, 
  PackagePlus, 
  Sparkles,
  Tag
} from 'lucide-react';

export function MeterConfigurator({ onAddToBOM }) {
  const [selectedFamilyId, setSelectedFamilyId] = useState('ion9000');
  const selectedFamily = useMemo(
    () => METER_FAMILIES.find((f) => f.id === selectedFamilyId) || METER_FAMILIES[0],
    [selectedFamilyId]
  );

  // Initial option selections
  const [options, setOptions] = useState(() => {
    const initial = {};
    selectedFamily.options.forEach((opt) => {
      initial[opt.key] = opt.choices[0]?.code ?? '';
    });
    return initial;
  });

  // When family changes, reset options
  const handleFamilyChange = (famId) => {
    setSelectedFamilyId(famId);
    const fam = METER_FAMILIES.find((f) => f.id === famId);
    const newOpts = {};
    fam?.options.forEach((opt) => {
      newOpts[opt.key] = opt.choices[0]?.code ?? '';
    });
    setOptions(newOpts);
    setUserTag('');
    setQuantity(1);
  };

  const handleOptionChange = (key, val) => {
    setOptions((prev) => ({ ...prev, [key]: val }));
  };

  // Additional form fields
  const [userTag, setUserTag] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Map choices for description
  const choicesMap = useMemo(() => {
    const map = {};
    selectedFamily.options.forEach((opt) => {
      map[opt.key] = opt.choices.find((c) => String(c.code) === String(options[opt.key])) || {};
    });
    return map;
  }, [selectedFamily, options]);

  // Real-time Part Number & Description
  const partNumber = useMemo(() => {
    try {
      return selectedFamily.generatePartNumber(options);
    } catch {
      return 'N/A';
    }
  }, [selectedFamily, options]);

  const description = useMemo(() => {
    try {
      return selectedFamily.generateDescription(options, choicesMap);
    } catch {
      return '';
    }
  }, [selectedFamily, options, choicesMap]);

  const handleCopyPartNumber = () => {
    navigator.clipboard.writeText(partNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    onAddToBOM({
      product: partNumber,
      designation: userTag ? `${userTag} - ${description}` : description,
      quantity: Math.max(1, parseInt(quantity, 10) || 1),
      family: selectedFamily.name
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleAddAccessory = (acc) => {
    onAddToBOM({
      product: acc.Accsy_PN,
      designation: acc.Accsy_Desc,
      quantity: 1,
      family: `${selectedFamily.series} Accessory`
    });
  };

  return (
    <div className="space-y-6">
      {/* Family Selector Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
          Select Meter Platform
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {METER_FAMILIES.map((fam) => {
            const isSelected = fam.id === selectedFamilyId;
            return (
              <button
                key={fam.id}
                onClick={() => handleFamilyChange(fam.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'border-se-green bg-emerald-50 text-se-spruce ring-2 ring-se-green/30 font-semibold'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                }`}
              >
                <Gauge className={`w-5 h-5 mb-1 ${isSelected ? 'text-se-darkgreen' : 'text-slate-400'}`} />
                <span className="text-xs font-medium">{fam.series}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Configurator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Configuration Options */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{selectedFamily.name}</h2>
                <p className="text-xs text-slate-500">{selectedFamily.tagline}</p>
              </div>
              <a
                href={selectedFamily.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-se-spruce hover:text-se-green font-medium transition-colors"
              >
                <span>Product Range Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Option Dropdowns / Pickers */}
            <div className="space-y-4">
              {selectedFamily.options.map((opt) => {
                // If this option depends on other selections and condition is false, hide
                if (opt.dependsOn && !opt.dependsOn(options)) {
                  return null;
                }

                return (
                  <div key={opt.key} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Code: [{options[opt.key] || '0'}]
                      </span>
                    </label>
                    <select
                      value={options[opt.key] ?? ''}
                      onChange={(e) => handleOptionChange(opt.key, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green transition-all"
                    >
                      {opt.choices.map((choice) => (
                        <option key={choice.code} value={choice.code}>
                          {choice.name} {choice.code ? `(${choice.code})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Tag / Custom Designation & Quantity */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Designation / Feeder Tag (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Incomer 1, Feeder Main, Chiller #2"
                  value={userTag}
                  onChange={(e) => setUserTag(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Quantity</label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full text-center border border-slate-300 rounded-lg py-1.5 text-sm font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real-time Part Number & BOM Action Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5 sticky top-36">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-se-green" />
                <span>Generated Part Number</span>
              </div>
              <div className="flex items-center justify-between bg-slate-900 text-white rounded-lg p-3 font-mono text-base font-bold tracking-wide border border-slate-800">
                <span className="truncate">{partNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyPartNumber}
                  title="Copy Part Number"
                  className="ml-2 p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-se-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Catalog Description
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-sm ${
                addedSuccess
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : 'bg-se-spruce hover:bg-se-darkspruce text-white'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to BOM!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {quantity}x to Bill of Materials</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Accessories Section */}
      {selectedFamily.accessories && selectedFamily.accessories.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <PackagePlus className="w-5 h-5 text-se-darkgreen" />
              <h3 className="text-sm font-bold text-slate-900">
                Compatible Accessories & Modules ({selectedFamily.series})
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {selectedFamily.accessories.length} available accessories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFamily.accessories.map((acc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-mono text-xs font-bold text-slate-900 truncate">
                    {acc.Accsy_PN}
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-2">
                    {acc.Accsy_Desc}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddAccessory(acc)}
                  title="Add accessory to BOM"
                  className="flex-shrink-0 p-2 rounded-md bg-white border border-slate-300 hover:border-se-green hover:bg-emerald-50 text-slate-700 hover:text-se-spruce transition-all text-xs font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
