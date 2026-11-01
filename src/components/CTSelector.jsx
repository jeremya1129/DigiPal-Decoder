import React, { useState, useMemo } from 'react';
import { CTS_5A, CTS_LVCT, CTS_HDPM6K, METER_KITS } from '../data/ctAndKitData';
import { Zap, Search, Plus, Check } from 'lucide-react';

export function CTSelector({ onAddToBOM }) {
  const [activeTab, setActiveTab] = useState('5a');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedIdx, setAddedIdx] = useState(null);

  const triggerAdded = (idx) => {
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 1500);
  };

  const currentList = useMemo(() => {
    let list = [];
    if (activeTab === '5a') {
      list = CTS_5A.map((ct) => ({
        partNumber: ct.Option1,
        description: ct.Option1Desc,
        category: '5A Secondary CT'
      }));
    } else if (activeTab === 'lvct') {
      list = CTS_LVCT.map((ct) => ({
        partNumber: ct.Option1,
        description: ct.Option1Desc,
        category: 'Low Voltage 0.333V CT'
      }));
    } else if (activeTab === 'hdpm') {
      list = CTS_HDPM6K.map((ct) => ({
        partNumber: ct.Option1,
        description: ct.Option1Desc,
        category: 'HDPM6000 Branch CT'
      }));
    } else if (activeTab === 'kits') {
      list = METER_KITS.map((kit) => ({
        partNumber: `EMKA93455${kit.Number}`,
        description: `iEM3455 Energy Meter Kit with ${kit.ctCount}x ${kit.Amps}A ${kit.Type} Core CTs`,
        category: 'Energy Meter Kit'
      }));
    }

    if (!searchTerm.trim()) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(
      (item) =>
        item.partNumber.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [activeTab, searchTerm]);

  const handleAdd = (item, idx) => {
    onAddToBOM({
      product: item.partNumber,
      designation: item.description,
      quantity: 1,
      family: item.category
    });
    triggerAdded(idx);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-se-darkgreen" />
              <h2 className="text-lg font-bold text-slate-900">Current Transformers (CTs) & Meter Kits</h2>
            </div>
            <p className="text-xs text-slate-500">
              Browse standard 5A CTs, 0.333V Low Voltage CTs, HDPM6000 sensors, and pre-packaged iEM3455 meter kits
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
            {[
              { id: '5a', label: '5A CTs' },
              { id: 'lvct', label: 'LVCT (0.333V)' },
              { id: 'hdpm', label: 'HDPM6K CTs' },
              { id: 'kits', label: 'iEM3455 Kits' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-se-spruce shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by part number, amperage rating, split/solid core..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
          />
        </div>
      </div>

      {/* Grid of CT items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentList.map((item, idx) => {
          const isAdded = addedIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 mb-1">
                  {item.partNumber}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAdd(item, idx)}
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-se-spruce border-slate-300 hover:border-se-green hover:bg-emerald-50'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to BOM</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
