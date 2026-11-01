import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  FileSpreadsheet, 
  FileText, 
  Copy, 
  Check, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { exportToCSV, exportToExcel, copyBOMToClipboard } from '../utils/exportUtils';

export function BOMView({ items, onUpdateQuantity, onUpdateDesignation, onRemoveItem, onClearBOM, onNavigateToConfig }) {
  const [copied, setCopied] = useState(false);

  const totalQuantity = items.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0);

  const handleCopy = async () => {
    const success = await copyBOMToClipboard(items);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all items from your Bill of Materials?')) {
      onClearBOM();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Action Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-se-darkgreen" />
              <h2 className="text-lg font-bold text-slate-900">Configured Bill of Materials (BOM)</h2>
            </div>
            <p className="text-xs text-slate-500">
              Review, edit quantities, and export your selected equipment list directly to Excel or CSV
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Lines</span>
              <span className="text-base font-bold text-slate-900">{items.length}</span>
            </div>
            <div className="h-6 w-px bg-slate-300"></div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Units</span>
              <span className="text-base font-bold text-se-spruce">{totalQuantity}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {items.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => exportToCSV(items)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Export CSV (SEAdv Format)</span>
              </button>

              <button
                type="button"
                onClick={() => exportToExcel(items)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-se-spruce hover:bg-se-darkspruce text-white shadow-sm transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Excel (.xlsx)</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-se-green" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy BOM Table'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-700 font-medium py-1 px-2 rounded hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear BOM</span>
            </button>
          </div>
        )}
      </div>

      {/* BOM Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Your Bill of Materials is currently empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Configure digital meters, select accessories, browse CTs, or add competitor crosses to populate your list.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateToConfig}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-se-spruce text-white rounded-lg text-xs font-semibold hover:bg-se-darkspruce transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go to Meter Configurator</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Part Number</th>
                  <th className="py-3 px-4">Designation / Specification</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 w-32 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right w-16">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs font-bold text-slate-900 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <input
                        type="text"
                        value={item.designation || ''}
                        onChange={(e) => onUpdateDesignation(idx, e.target.value)}
                        placeholder="Add tag or note..."
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-se-green focus:bg-white focus:outline-none px-1.5 py-1 text-xs text-slate-700 transition-colors rounded"
                      />
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {item.family || 'Equipment'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, Math.max(1, (item.quantity || 1) - 1))}
                          className="w-7 h-7 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={item.quantity || 1}
                          onChange={(e) =>
                            onUpdateQuantity(idx, Math.max(1, parseInt(e.target.value, 10) || 1))
                          }
                          className="w-12 text-center border border-slate-300 rounded py-1 text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, (item.quantity || 1) + 1)}
                          className="w-7 h-7 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        title="Remove Line"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Persistence Note */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Your Bill of Materials is saved automatically to browser storage (localStorage).</span>
      </div>
    </div>
  );
}
