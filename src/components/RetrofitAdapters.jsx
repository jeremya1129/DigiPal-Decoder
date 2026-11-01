import React, { useState } from 'react';
import { RETROFIT_ADAPTERS } from '../data/adapterData';
import { RefreshCw, ArrowRight, Plus, Check } from 'lucide-react';

export function RetrofitAdapters({ onAddToBOM }) {
  const [addedIdx, setAddedIdx] = useState(null);

  const handleAdd = (item, idx) => {
    onAddToBOM({
      product: item.partNumber,
      designation: item.description,
      quantity: 1,
      family: 'Retrofit Adapter Assembly'
    });
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-1">
          <RefreshCw className="w-5 h-5 text-se-darkgreen" />
          <h2 className="text-lg font-bold text-slate-900">Switchgear Retrofit Adapter Assemblies</h2>
        </div>
        <p className="text-xs text-slate-500">
          Factory engineered adapter plates, brackets, and pre-formed wiring harnesses to replace obsolete circuit monitors with current PowerLogic meters without modifying existing door cutouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RETROFIT_ADAPTERS.map((item, idx) => {
          const isAdded = addedIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                    {item.existingMeter}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <div className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
                    {item.targetMeter}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Adapter Assembly Part #
                  </span>
                  <div className="font-mono text-base font-bold text-slate-900">
                    {item.partNumber}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleAdd(item, idx)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center space-x-1.5 transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-se-spruce hover:bg-se-darkspruce text-white border-se-spruce'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to BOM!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Adapter to BOM</span>
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
