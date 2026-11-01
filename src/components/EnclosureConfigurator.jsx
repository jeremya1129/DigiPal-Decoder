import React, { useState } from 'react';
import { 
  ENCLOSURE_PM5560, 
  ENCLOSURE_PM8000, 
  ENCLOSURE_ION8650, 
  ENCLOSURE_VALUE_SERIES,
  ENCLOSURE_MMU,
  ENCLOSURE_MMUPRO
} from '../data/enclosureData';
import { Box, Plus, Check, Sparkles, ShieldAlert } from 'lucide-react';

export function EnclosureConfigurator({ onAddToBOM }) {
  const [activeSubTab, setActiveSubTab] = useState('5560');

  // State for 9761E5560
  const [enc5560Opt1, setEnc5560Opt1] = useState(ENCLOSURE_PM5560[0].Option1);
  const [enc5560Opt3, setEnc5560Opt3] = useState('Z');

  // State for 9761E8000
  const [enc8000Opt1, setEnc8000Opt1] = useState(ENCLOSURE_PM8000[0].Option1);
  const [enc8000Opt3, setEnc8000Opt3] = useState('Z');

  // State for 9761E8650
  const [enc8650Opt1, setEnc8650Opt1] = useState('A');
  const [enc8650Opt2, setEnc8650Opt2] = useState('A0A');
  const [enc8650Opt3, setEnc8650Opt3] = useState('1');
  const [enc8650Opt4, setEnc8650Opt4] = useState('B');
  const [enc8650Opt5, setEnc8650Opt5] = useState('1');
  const [enc8650Opt6, setEnc8650Opt6] = useState('B');

  // State for Value Series
  const [valueModel, setValueModel] = useState(ENCLOSURE_VALUE_SERIES[0].Option1);
  const [valueEncl, setValueEncl] = useState('C01');
  const [valueInstalled, setValueInstalled] = useState('D01');

  // State for MMU
  const [mmuSelected, setMmuSelected] = useState(ENCLOSURE_MMU[0].Option1);

  const [added, setAdded] = useState(false);

  const triggerAdded = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Helper to add current selection to BOM
  const handleAdd5560 = () => {
    const opt1Obj = ENCLOSURE_PM5560.find(i => i.Option1 === enc5560Opt1) || {};
    const opt3Obj = ENCLOSURE_PM5560.find(i => i.Option3 === enc5560Opt3) || {};
    const pn = `9761E5560${enc5560Opt1}${enc5560Opt3}`;
    const desc = `${opt1Obj.Option1Desc || ''} - ${opt3Obj.Option3Desc || ''}`;
    onAddToBOM({ product: pn, designation: desc, quantity: 1, family: 'Factory Enclosure (9761E5560)' });
    triggerAdded();
  };

  const handleAdd8000 = () => {
    const opt1Obj = ENCLOSURE_PM8000.find(i => i.Option1 === enc8000Opt1) || {};
    const opt3Obj = ENCLOSURE_PM8000.find(i => i.Option3 === enc8000Opt3) || {};
    const pn = `9761E8000${enc8000Opt1}${enc8000Opt3}`;
    const desc = `${opt1Obj.Option1Desc || ''} - ${opt3Obj.Option3Desc || ''}`;
    onAddToBOM({ product: pn, designation: desc, quantity: 1, family: 'Factory Enclosure (9761E8000)' });
    triggerAdded();
  };

  const handleAdd8650 = () => {
    const pn = `9761E865${enc8650Opt1}${enc8650Opt2}${enc8650Opt3}${enc8650Opt4}${enc8650Opt5}${enc8650Opt6}`;
    const desc = `ION8650 Type 3R Enclosure; Form ${enc8650Opt2}; Feat ${enc8650Opt1}`;
    onAddToBOM({ product: pn, designation: desc, quantity: 1, family: 'Factory Enclosure (9761E8650)' });
    triggerAdded();
  };

  const handleAddValue = () => {
    const modelObj = ENCLOSURE_VALUE_SERIES.find(i => i.Option1 === valueModel) || {};
    const pn = `FAEV${valueModel}${valueEncl}${valueInstalled}`;
    const desc = `${modelObj.Option1Desc || ''} Enclosed Meter System`;
    onAddToBOM({ product: pn, designation: desc, quantity: 1, family: 'Value Series Enclosure' });
    triggerAdded();
  };

  const handleAddMMU = () => {
    const mmuObj = ENCLOSURE_MMU.find(i => i.Option1 === mmuSelected) || {};
    const pn = `MMU${mmuSelected}`;
    const desc = mmuObj.Option1Desc || 'Multi-Meter Unit Enclosure';
    onAddToBOM({ product: pn, designation: desc, quantity: 1, family: 'Multi-Meter Unit (MMU)' });
    triggerAdded();
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
          Select Enclosure Series
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: '5560', label: '9761E5560 (PM5560)' },
            { id: '8000', label: '9761E8000 (PM8000)' },
            { id: '8650', label: '9761E8650 (ION8650)' },
            { id: 'value', label: 'Value Series Encl.' },
            { id: 'mmu', label: 'MMU Multi-Meter' }
          ].map(tab => {
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'border-se-green bg-emerald-50 text-se-spruce ring-2 ring-se-green/30 font-semibold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 9761E5560 */}
      {activeSubTab === '5560' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">9761E5560 Factory Assembled Enclosures (PM5560)</h3>
            <p className="text-xs text-slate-500">
              Pre-wired Type 12 (Indoor) and Type 4X Stainless Steel (Outdoor) multi-meter enclosures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Enclosure Type & Meter Capacity
                </label>
                <select
                  value={enc5560Opt1}
                  onChange={(e) => setEnc5560Opt1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                >
                  {ENCLOSURE_PM5560.map((opt, i) => (
                    <option key={i} value={opt.Option1}>
                      {opt.Option1Desc} ({opt.Type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  I/O Wiring Configuration
                </label>
                <select
                  value={enc5560Opt3}
                  onChange={(e) => setEnc5560Opt3(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                >
                  <option value="Z">Z - No I/O wired</option>
                  <option value="A">A - (4-I/2-O) Base I/O wired</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Generated Part Number
                </span>
                <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-300">
                  9761E5560{enc5560Opt1}{enc5560Opt3}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd5560}
                className="w-full py-2.5 px-4 bg-se-spruce hover:bg-se-darkspruce text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                {added ? <Check className="w-4 h-4 text-se-green" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to BOM!' : 'Add Enclosure to BOM'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9761E8000 */}
      {activeSubTab === '8000' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">9761E8000 Factory Assembled Enclosures (PM8000)</h3>
            <p className="text-xs text-slate-500">
              Pre-wired Type 12 and Type 4X enclosures supporting PM8000 series with I/O modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Enclosure Type & Meter Capacity
                </label>
                <select
                  value={enc8000Opt1}
                  onChange={(e) => setEnc8000Opt1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                >
                  {ENCLOSURE_PM8000.map((opt, i) => (
                    <option key={i} value={opt.Option1}>
                      {opt.Option1Desc} ({opt.Type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  I/O Wiring Configuration
                </label>
                <select
                  value={enc8000Opt3}
                  onChange={(e) => setEnc8000Opt3(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
                >
                  <option value="Z">Z - No I/O wired</option>
                  <option value="A">A - (3-I/1-O) Base I/O wired</option>
                  <option value="B">B - (9-I/3-O) Base I/O & PM89M2600 wired</option>
                  <option value="C">C - (15-I/5-O) Base I/O & 2-PM89M2600 wired</option>
                  <option value="D">D - (9-I/3-O & 4AI/2AO) Base I/O & PM89M2600 & PM89M0024 wired</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Generated Part Number
                </span>
                <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-300">
                  9761E8000{enc8000Opt1}{enc8000Opt3}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd8000}
                className="w-full py-2.5 px-4 bg-se-spruce hover:bg-se-darkspruce text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                {added ? <Check className="w-4 h-4 text-se-green" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to BOM!' : 'Add Enclosure to BOM'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9761E8650 */}
      {activeSubTab === '8650' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">9761E8650 Utility Revenue Meter Enclosures (ION8650)</h3>
            <p className="text-xs text-slate-500">
              Type 3R weather-resistant outdoor enclosure with socket base and test switches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Feature Level</label>
                <select
                  value={enc8650Opt1}
                  onChange={(e) => setEnc8650Opt1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="A">Feature A Type 3R</option>
                  <option value="B">Feature B Type 3R</option>
                  <option value="C">Feature C Type 3R</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Socket Form Base</label>
                <select
                  value={enc8650Opt2}
                  onChange={(e) => setEnc8650Opt2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="A0A">Form 9S (13 term)</option>
                  <option value="B0A">Form 35S (8 term)</option>
                  <option value="C0A">Form 36S (13 term)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Control Power</label>
                <select
                  value={enc8650Opt3}
                  onChange={(e) => setEnc8650Opt3(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="1">1 - Socket control power</option>
                  <option value="2">2 - Separate control power</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Generated Part Number
                </span>
                <div className="font-mono text-sm font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-300 break-all">
                  9761E865{enc8650Opt1}{enc8650Opt2}{enc8650Opt3}{enc8650Opt4}{enc8650Opt5}{enc8650Opt6}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdd8650}
                className="w-full py-2.5 px-4 bg-se-spruce hover:bg-se-darkspruce text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                {added ? <Check className="w-4 h-4 text-se-green" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to BOM!' : 'Add Enclosure to BOM'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Value Series */}
      {activeSubTab === 'value' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Value Series Enclosed Meters (FAEV)</h3>
            <p className="text-xs text-slate-500">
              Turnkey enclosed digital power metering assemblies (PM5110, PM5330, PM5340, PM5560)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Meter Model & Gateway</label>
                <select
                  value={valueModel}
                  onChange={(e) => setValueModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  {ENCLOSURE_VALUE_SERIES.map((opt, i) => (
                    <option key={i} value={opt.Option1}>
                      {opt.Option1Desc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Enclosure Size</label>
                <select
                  value={valueEncl}
                  onChange={(e) => setValueEncl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="C01">C01 - 10X8X6 1-meter enclosure</option>
                  <option value="C04">C04 - 16X16X8 4-meter enclosure</option>
                  <option value="C08">C08 - 24X24X8 8-meter enclosure</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Installed Meters</label>
                <select
                  value={valueInstalled}
                  onChange={(e) => setValueInstalled(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-sm"
                >
                  <option value="D01">D01 - 1 meter installed</option>
                  <option value="D02">D02 - 2 meters installed</option>
                  <option value="D03">D03 - 3 meters installed</option>
                  <option value="D04">D04 - 4 meters installed</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Generated Part Number
                </span>
                <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-300">
                  FAEV{valueModel}{valueEncl}{valueInstalled}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddValue}
                className="w-full py-2.5 px-4 bg-se-spruce hover:bg-se-darkspruce text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                {added ? <Check className="w-4 h-4 text-se-green" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to BOM!' : 'Add Enclosure to BOM'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MMU */}
      {activeSubTab === 'mmu' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Multi-Meter Units (MMU)</h3>
            <p className="text-xs text-slate-500">
              Compact high-density multi-meter panel systems for commercial tenant submetering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                MMU Package Option
              </label>
              <select
                value={mmuSelected}
                onChange={(e) => setMmuSelected(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm"
              >
                {ENCLOSURE_MMU.map((opt, i) => (
                  <option key={i} value={opt.Option1}>
                    {opt.Option1Desc}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Generated Part Number
                </span>
                <div className="font-mono text-base font-bold text-slate-900 bg-white p-3 rounded-lg border border-slate-300">
                  MMU{mmuSelected}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddMMU}
                className="w-full py-2.5 px-4 bg-se-spruce hover:bg-se-darkspruce text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                {added ? <Check className="w-4 h-4 text-se-green" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to BOM!' : 'Add MMU to BOM'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
