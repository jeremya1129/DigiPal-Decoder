import React from 'react';
import { 
  Gauge, 
  ArrowLeftRight, 
  Box, 
  Zap, 
  RefreshCw, 
  ShoppingCart, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function Header({ activeTab, setActiveTab, bomCount }) {
  const tabs = [
    { id: 'meters', label: 'Meter Configurator', icon: Gauge },
    { id: 'crossref', label: 'Competitor Cross-Ref', icon: ArrowLeftRight },
    { id: 'relays', label: 'Relay Cross-Ref', icon: ShieldCheck },
    { id: 'enclosures', label: 'Enclosed Meters', icon: Box },
    { id: 'cts', label: 'CTs & Kits', icon: Zap },
    { id: 'adapters', label: 'Retrofit Adapters', icon: RefreshCw },
    { id: 'resources', label: 'A.I. & Resources', icon: Sparkles },
    { id: 'bom', label: 'Bill of Materials', icon: ShoppingCart, badge: bomCount }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top Brand Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Schneider Electric Logo" className="h-6 w-auto object-contain" />
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <span className="text-xs uppercase tracking-wider text-slate-300 font-medium hidden sm:inline">
              PuppyDEV Production
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="bg-se-spruce/40 text-se-green px-2 py-0.5 rounded border border-se-green/30 font-medium">
              v2.0 Modern Edition
            </span>
            <a 
              href="https://www.se.com/us/en/product-category/4100-power-metering-and-energy-monitoring-systems/" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white flex items-center space-x-1 transition-colors"
            >
              <span>se.com/metering</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-se-green/15 flex items-center justify-center text-se-darkgreen font-bold border border-se-green/30">
              <Gauge className="w-6 h-6 text-se-darkgreen" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">DigiPal</h1>
                <span className="text-xs font-semibold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Meter Selection & Decoder
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Digital Assistant for PowerLogic meters, competitor cross-references, and BOM generation
              </p>
            </div>
          </div>

          {/* Quick BOM button on right */}
          <button
            onClick={() => setActiveTab('bom')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
              activeTab === 'bom'
                ? 'bg-se-spruce text-white border-se-spruce shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-se-green hover:bg-emerald-50/50'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Review BOM</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              bomCount > 0 ? 'bg-se-green text-slate-900' : 'bg-slate-200 text-slate-600'
            }`}>
              {bomCount}
            </span>
          </button>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto mt-4 pt-1 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-se-green text-se-spruce bg-emerald-50/60 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-se-darkgreen' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-se-green text-slate-900 text-xs px-1.5 py-0.2 rounded-full font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
