import React from 'react';
import { COPILOT_TOOLS, USEFUL_LINKS } from '../data/resourceLinks';
import { Sparkles, ExternalLink, Bot, BookOpen, Layers } from 'lucide-react';

export function ResourcesView() {
  return (
    <div className="space-y-8">
      {/* AI Assistant Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-se-darkgreen" />
          <h2 className="text-lg font-bold text-slate-900">Schneider Electric AI & CoPilot Tools</h2>
        </div>
        <p className="text-xs text-slate-500">
          Specialized Microsoft 365 Copilot prompts and assistants developed for quotation and tendering workflows
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {COPILOT_TOOLS.filter(t => t.Link).map((tool, idx) => (
            <a
              key={idx}
              href={tool.Link}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-se-green transition-all flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-se-spruce">
                    <Sparkles className="w-4 h-4 text-se-darkgreen" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-se-green transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-se-spruce transition-colors">
                  {tool.Name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tool.Tooltip}
                </p>
              </div>

              <span className="text-[11px] font-semibold text-se-spruce group-hover:underline flex items-center space-x-1">
                <span>Launch in Microsoft 365 CoPilot</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Schneider Reference Portals */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-se-darkgreen" />
          <h2 className="text-lg font-bold text-slate-900">Official Product Portals & Catalogs</h2>
        </div>
        <p className="text-xs text-slate-500">
          Schneider Electric engineering portals, documentation catalogs, and EZ product selection tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {USEFUL_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between group space-y-2"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {link.category}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-se-spruce transition-colors">
                    {link.title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-se-green transition-colors" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Migration & Architectural Notes */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-se-darkgreen" />
          <h2 className="text-sm font-bold text-slate-900">Legacy Architecture vs. Modern Edition</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed pt-2">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900">Legacy Power Apps & Power Automate</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-500">
              <li>Locked within Microsoft 365 tenant and PowerApps mobile/web studio.</li>
              <li>Required Power Automate flow execution (<code className="font-mono text-slate-700">Hardware_SEAdv_CSV</code>) to create CSV in OneDrive.</li>
              <li>Fixed 1366x768 canvas layout with horizontal and vertical overflow clipping.</li>
              <li>Static tables tied to PowerApps internal data schema XML.</li>
            </ul>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-950">Modern React & Vite Edition</h4>
            <ul className="list-disc pl-4 space-y-1 text-emerald-800">
              <li>Zero-dependency, open-source web application deployable to GitHub Pages, Netlify, or Vercel.</li>
              <li>Client-side RFC 4180 CSV export and styled Excel (.xlsx) export without requiring cloud flows.</li>
              <li>Full responsive design tailored for desktops, laptops, tablets, and phones.</li>
              <li>Structured ES modules with real-time fuzzy search across 336 competitor meters and 42 relays.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
