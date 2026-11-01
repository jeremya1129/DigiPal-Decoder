import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MeterConfigurator } from './components/MeterConfigurator';
import { CompetitorCrossRef } from './components/CompetitorCrossRef';
import { RelayCrossRef } from './components/RelayCrossRef';
import { EnclosureConfigurator } from './components/EnclosureConfigurator';
import { CTSelector } from './components/CTSelector';
import { RetrofitAdapters } from './components/RetrofitAdapters';
import { BOMView } from './components/BOMView';
import { ResourcesView } from './components/ResourcesView';
import { CheckCircle2, ShoppingCart } from 'lucide-react';

const STORAGE_KEY = 'digipal_bom_items_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState('meters');

  // Load persistent BOM from localStorage
  const [bomItems, setBomItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bomItems));
    } catch (e) {
      console.error('Failed to save BOM to localStorage', e);
    }
  }, [bomItems]);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToBOM = (newItem) => {
    setBomItems((prev) => {
      // Check if item with same product part number exists
      const existingIdx = prev.findIndex((i) => i.product === newItem.product);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: (updated[existingIdx].quantity || 1) + (newItem.quantity || 1)
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
          ...newItem,
          timestamp: new Date().toISOString()
        }
      ];
    });
    showToast(`Added ${newItem.quantity || 1}x ${newItem.product} to BOM`);
  };

  const handleUpdateQuantity = (idx, newQty) => {
    setBomItems((prev) => {
      const updated = [...prev];
      if (updated[idx]) {
        updated[idx] = { ...updated[idx], quantity: newQty };
      }
      return updated;
    });
  };

  const handleUpdateDesignation = (idx, newDesignation) => {
    setBomItems((prev) => {
      const updated = [...prev];
      if (updated[idx]) {
        updated[idx] = { ...updated[idx], designation: newDesignation };
      }
      return updated;
    });
  };

  const handleRemoveItem = (idx) => {
    setBomItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearBOM = () => {
    setBomItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bomCount={bomItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'meters' && (
          <MeterConfigurator onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'crossref' && (
          <CompetitorCrossRef onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'relays' && (
          <RelayCrossRef onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'enclosures' && (
          <EnclosureConfigurator onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'cts' && (
          <CTSelector onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'adapters' && (
          <RetrofitAdapters onAddToBOM={handleAddToBOM} />
        )}
        {activeTab === 'resources' && (
          <ResourcesView />
        )}
        {activeTab === 'bom' && (
          <BOMView
            items={bomItems}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateDesignation={handleUpdateDesignation}
            onRemoveItem={handleRemoveItem}
            onClearBOM={handleClearBOM}
            onNavigateToConfig={() => setActiveTab('meters')}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center space-x-3 transition-all animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-se-green flex-shrink-0" />
          <span className="text-xs font-semibold">{toast}</span>
          <button
            onClick={() => setActiveTab('bom')}
            className="ml-2 text-xs text-se-green hover:underline flex items-center space-x-1"
          >
            <span>View BOM</span>
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">Schneider Electric DigiPal</span>
            <span>•</span>
            <span>Digital Power Solutions Proximity Team</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Modern Open Source Web Edition</span>
            <span>•</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-se-spruce hover:text-se-green font-medium"
            >
              GitHub Project
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
