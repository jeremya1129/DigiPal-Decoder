import React, { useState, useMemo } from 'react';
import { RELAY_CROSS_REFERENCE } from '../data/crossReferenceData';
import { Search, ShieldCheck, Plus, Check } from 'lucide-react';

export function RelayCrossRef({ onAddToBOM }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComp, setSelectedComp] = useState('');
  const [addedRow, setAddedRow] = useState(null);

  const filteredRelays = useMemo(() => {
    return RELAY_CROSS_REFERENCE.filter((item) => {
      const matchesComp = !selectedComp || item.Competitor === selectedComp;
      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesComp;

      const matchesSearch =
        item.Competitor?.toLowerCase().includes(term) ||
        item['Comp Model']?.toLowerCase().includes(term) ||
        item['PL Family']?.toLowerCase().includes(term) ||
        item['PL Model']?.toLowerCase().includes(term) ||
        item['Accessory']?.toLowerCase().includes(term) ||
        item['Accessory Notes']?.toLowerCase().includes(term);

      return matchesComp && matchesSearch;
    });
  }, [searchTerm, selectedComp]);

  const handleAdd = (item, idx) => {
    const mainPN = item['PL Model'];
    const accPN = item['Accessory'];
    const desc = `${item['PL Family']} ${item['PL Model']} (Cross for ${item.Competitor} ${item['Comp Model']})`;

    onAddToBOM({
      product: mainPN,
      designation: desc,
      quantity: 1,
      family: `Protective Relay (${item['PL Family']})`
    });

    if (accPN) {
      onAddToBOM({
        product: accPN,
        designation: `Accessory for ${mainPN}: ${item['Accessory Notes'] || 'Mounting / Adapter Kit'}`,
        quantity: 1,
        family: 'Relay Accessory'
      });
    }

    setAddedRow(idx);
    setTimeout(() => setAddedRow(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-se-darkgreen" />
              <h2 className="text-lg font-bold text-slate-900">Protective Relay Cross-Reference</h2>
            </div>
            <p className="text-xs text-slate-500">
              Cross-reference competitor utility and feeder protection relays (SEL, GE) to Schneider Electric PowerLogic & Easergy solutions
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Relay Mappings:</span>
            <span className="font-bold text-slate-900">{RELAY_CROSS_REFERENCE.length}</span>
            <span>|</span>
            <span>Showing:</span>
            <span className="font-bold text-se-spruce">{filteredRelays.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by competitor (SEL, GE), model number, or Schneider relay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
            />
          </div>

          <div>
            <select
              value={selectedComp}
              onChange={(e) => setSelectedComp(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
            >
              <option value="">All Competitors (SEL & GE)</option>
              <option value="SEL">SEL (Schweitzer Engineering Labs)</option>
              <option value="GE">GE (General Electric Multilin)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Competitor</th>
                <th className="py-3 px-4">Model</th>
                <th className="py-3 px-4">Schneider Family</th>
                <th className="py-3 px-4">Schneider Cross</th>
                <th className="py-3 px-4">Mounting / Accessory</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRelays.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No matching relays found.
                  </td>
                </tr>
              ) : (
                filteredRelays.map((item, idx) => {
                  const isAdded = addedRow === idx;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {item.Competitor}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        {item['Comp Model']}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {item['PL Family']}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item['PL Model']}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        {item['Accessory'] ? (
                          <div>
                            <span className="font-mono font-semibold text-slate-700">{item['Accessory']}</span>
                            {item['Accessory Notes'] && <span className="block text-[11px] text-slate-400">{item['Accessory Notes']}</span>}
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleAdd(item, idx)}
                          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
