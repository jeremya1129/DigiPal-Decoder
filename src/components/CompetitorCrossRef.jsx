import React, { useState, useMemo } from 'react';
import { COMPETITOR_METERS, MANUFACTURERS } from '../data/crossReferenceData';
import { Search, Plus, Filter, ArrowLeftRight, Check, Sparkles } from 'lucide-react';

export function CompetitorCrossRef({ onAddToBOM }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManf, setSelectedManf] = useState('');
  const [addedRow, setAddedRow] = useState(null);

  // Top manufacturers for quick filter pills
  const topManfs = ['All', 'ABB', 'Eaton', 'Siemens', 'AccuEnergy', 'E-Mon', 'Electro Industries', 'GE'];

  const filteredMeters = useMemo(() => {
    return COMPETITOR_METERS.filter((item) => {
      const matchesManf = !selectedManf || item.manufacturer === selectedManf;
      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesManf;

      const matchesSearch =
        item.manufacturer?.toLowerCase().includes(term) ||
        item.competitorMeter?.toLowerCase().includes(term) ||
        item.schneiderCross?.toLowerCase().includes(term);

      return matchesManf && matchesSearch;
    });
  }, [searchTerm, selectedManf]);

  const handleAdd = (item, idx) => {
    onAddToBOM({
      product: item.schneiderCross,
      designation: `Schneider Cross for ${item.manufacturer} ${item.competitorMeter}`,
      quantity: 1,
      family: `Competitor Cross (${item.manufacturer})`
    });
    setAddedRow(idx);
    setTimeout(() => setAddedRow(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search & Header Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ArrowLeftRight className="w-5 h-5 text-se-darkgreen" />
              <h2 className="text-lg font-bold text-slate-900">Competitor Meter Cross-Reference</h2>
            </div>
            <p className="text-xs text-slate-500">
              Lookup legacy & competitor digital panel meters to find direct Schneider Electric equivalents
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Database Records:</span>
            <span className="font-bold text-slate-900">{COMPETITOR_METERS.length}</span>
            <span>|</span>
            <span>Showing:</span>
            <span className="font-bold text-se-spruce">{filteredMeters.length}</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by competitor meter, manufacturer, or Schneider model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
            />
          </div>

          {/* Manufacturer Dropdown */}
          <div className="relative">
            <select
              value={selectedManf}
              onChange={(e) => setSelectedManf(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-se-green focus:border-se-green"
            >
              <option value="">All Manufacturers ({MANUFACTURERS.length})</option>
              {MANUFACTURERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 flex items-center space-x-1 pr-1 font-medium">
            <Filter className="w-3 h-3" />
            <span>Popular:</span>
          </span>
          {topManfs.map((m) => {
            const isSelected = (m === 'All' && !selectedManf) || selectedManf === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedManf(m === 'All' ? '' : m)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-se-spruce text-white border-se-spruce font-medium shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Manufacturer</th>
                <th className="py-3 px-4">Competitor Model</th>
                <th className="py-3 px-4">Schneider Electric Cross</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMeters.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No matching competitor meters found. Try adjusting your search term or manufacturer filter.
                  </td>
                </tr>
              ) : (
                filteredMeters.map((item, idx) => {
                  const isAdded = addedRow === idx;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {item.manufacturer}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 font-semibold">
                        {item.competitorMeter}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item.schneiderCross || 'Consult Schneider FAE'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {item.schneiderCross ? (
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
                                <span>Add Cross</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No direct cross</span>
                        )}
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
