# DigiPal - Schneider Electric Meter Selection & Decoding Assistant ⚡

A modern, responsive, open-source web application for configuring, decoding, and cross-referencing **Schneider Electric PowerLogic digital meters**, factory-assembled enclosures, current transformers (CTs), and protective relays.

Re-architected from the legacy Microsoft Power Apps (`DigiPal`) and Power Automate (`Hardware_SEAdv_CSV`) solution into an ultra-fast, client-side application built with **React 18**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Capabilities

### 1. 🎛️ Digital Meter Part Number Decoder & Configurator
- **Supported Platforms**:
  - **PowerLogic ION9000**: ION9200, ION9300 LVCT, ION9500 Transient capture, power supplies, touchscreen remote displays (`METSEION9...`).
  - **PowerLogic ION7400**: Precision feeder monitoring, power supplies, remote displays (`METSEION74...`).
  - **PowerLogic PM8000**: Compact modular PQ meters, Essential/Standard/Advanced tiers (`METSEPM8...`).
  - **PowerLogic PM5000 Series**: PM5110, PM5330, PM5340, PM5560, PM5580, PM5650, RMICAN revenue options (`METSEPM5...`).
  - **EasyLogic PM2000 Series**: Cost-effective digital panel meters with red LED / LCD displays (`METSEPM2...`).
  - **PowerLogic ION8650**: Utility revenue & substation switchboard meters, Form 9S/35S/36S bases, cellular modems, test switches (`S8650...`).
- **Interactive Part Number Generation**: Instant, real-time code calculation and full catalog specification string.
- **Integrated Accessories**: Compatible expansion modules, digital/analog I/O cards, and mounting hardware ready to add in one click.

### 2. 🔄 Competitor Meter Cross-Reference (336+ Models)
- Searchable database mapping competitor and legacy meters to current Schneider Electric equivalents.
- Covers major manufacturers: **ABB**, **Eaton**, **Siemens**, **AccuEnergy**, **E-Mon**, **Electro Industries**, **Algodue**, **Elspec**, **Enerdis**, **GE Multilin**, **Shark**, **SATEC**, and more.
- Instant search by competitor model, manufacturer, or target Schneider product.
- Direct "+ Add Cross to BOM" workflow.

### 3. 🛡️ Protective Relay Cross-Reference
- Direct cross-reference for utility and feeder protection relays (**SEL**, **GE Multilin**) to Schneider Electric **PowerLogic / Sepam / Easergy** relays.
- Comprehensive accessory mapping (45mm raise mounts, adapter collars, control power specs, ethernet options).

### 4. 📦 Factory Assembled Enclosures & Multi-Meter Units
- **9761E5560**: Pre-wired Type 12 (Indoor) & Type 4X Stainless Steel (Outdoor) 1–4 meter enclosures.
- **9761E8000**: Pre-wired Type 12 & Type 4X enclosures supporting PM8000 with pre-wired I/O modules.
- **9761E8650**: Type 3R weather-resistant utility revenue meter enclosure with CT shorting blocks and test switches.
- **Value Series (FAEV)**: Pre-packaged 1–8 meter wall enclosures with optional gateway communications.
- **Multi-Meter Units (MMU & MMUPRO)**: High-density multi-tenant submetering systems.

### 5. ⚡ Current Transformers (CTs) & Pre-Packaged Meter Kits
- **5A Secondary CTs**: Split-core and solid-core (`METSECTSP5A...`) from 200A to 4000A.
- **Low Voltage CTs (LVCT)**: 0.333V micro and standard split-core CTs from 50A to 3000A.
- **HDPM6000 CTs**: Specialized high-density branch monitoring sensors.
- **iEM3455 Energy Meter Kits**: Pre-bundled kits with 1, 2, or 3 split/solid core CTs (`EMKA93455...`).

### 6. 🔄 Retrofit Adapter Assemblies
- Factory-engineered adapter plates and wiring harnesses to replace obsolete circuit monitors without modifying door cutouts:
  - CM2000 / CM3000 / CM4000 ➔ ION9000 or PM8000
  - GE EPM ➔ PM5563RD
  - GE PQM ➔ PM8244
  - PowerLogic PM600 ➔ PM5000 / PM8000

### 7. 🛒 Interactive Bill of Materials (BOM) & Multi-Format Export
- **No Cloud Flow Bottlenecks**: Replaces legacy Power Automate + OneDrive flow with instantaneous client-side file generation.
- **Export Options**:
  - **CSV Export**: Clean RFC 4180 CSV export formatted for quotation tools (SEAdv / SAP).
  - **Excel Export**: Formatted `.xlsx` spreadsheet with styled headers and auto-sized columns.
  - **Copy to Clipboard**: Formatted plain text table for pasting directly into emails, RFQs, or customer proposals.
- **Local Persistence**: Selections are saved to browser `localStorage` automatically.

### 8. 🤖 Digital Assistant & CoPilot Tools
- Direct links to Schneider Electric tendering CoPilot prompts:
  - **SE RFQ Assistant**: Digital coworker for technical proposals.
  - **ScopeDrafter**: Automated scope draft creation based on BoMs and specs.
  - **SE FileFind**: Bid document summarizer and alert analyzer.

---

## 🏗️ Architecture & Migration Summary

| Aspect | Legacy Solution | Modern DigiPal Edition |
| :--- | :--- | :--- |
| **Runtime** | Microsoft Power Apps Canvas App | Modern Web App (React 18 + Vite) |
| **Flows** | Power Automate (`Hardware_SEAdv_CSV`) | Client-side RFC 4180 CSV + SheetJS XLSX |
| **Layout** | Fixed 1366×768 px canvas | Fully responsive mobile/desktop UI |
| **Dependencies** | M365 Tenant, OneDrive, PowerApps license | Zero runtime dependencies, 100% static |
| **Hosting** | Power Apps Maker Portal | GitHub Pages, Vercel, Netlify, or local |
| **Performance** | Multi-second screen transitions | Instantaneous client-side state (<5ms) |

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on v22)
- npm v9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Production output is bundled to `dist/` ready for static web hosting.

---

## 🌐 Deploying to GitHub Pages

1. In `vite.config.js`, set `base: '/<repo-name>/'` (if deploying to project pages).
2. Install `gh-pages` or use GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📁 Repository Structure

```text
DigiPal-Decoder/
├── extracted_data/          # 63 normalized JSON datasets extracted from PowerApps
├── original_source_code/    # Archived PowerApps (.msapp), Power Automate flows, and Excel support files
│   ├── unpacked_msapp/      # Deconstructed canvas app controls, formulas, and screens
│   ├── unpacked_digipal_app/# Unpacked solution flows and PowerApps manifest
│   ├── DigiPal_Main_Tables.xlsx
│   └── Proj_XREF.xlsx       # Competitor meter cross-reference workbook
├── public/                  # Static assets & Schneider Electric icons
│   ├── favicon.ico
│   ├── favicon.png
│   └── logo.png
├── scripts/
│   └── build_data.py        # Python ETL pipeline converting extracted tables to ES modules
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top navigation, SE branding, and live BOM badge
│   │   ├── MeterConfigurator.jsx # Interactive part number decoder & options
│   │   ├── CompetitorCrossRef.jsx# 336-meter competitor cross-reference
│   │   ├── RelayCrossRef.jsx# Protective relay competitor cross-reference
│   │   ├── EnclosureConfigurator.jsx # 9761E & Value series pre-wired enclosures
│   │   ├── CTSelector.jsx   # 5A CTs, LVCTs, and energy meter kits
│   │   ├── RetrofitAdapters.jsx # Switchgear adapter plates & brackets
│   │   ├── BOMView.jsx      # Bill of Materials manager with CSV/Excel export
│   │   └── ResourcesView.jsx# CoPilot AI links and documentation portals
│   ├── data/                # Typed ES modules containing catalog datasets
│   │   ├── adapterData.js
│   │   ├── crossReferenceData.js
│   │   ├── ctAndKitData.js
│   │   ├── enclosureData.js
│   │   ├── meterData.js
│   │   └── resourceLinks.js
│   ├── utils/
│   │   └── exportUtils.js   # RFC 4180 CSV & XLSX spreadsheet generation
│   ├── App.jsx              # Main application router and persistent BOM state
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind directives and Schneider Electric theme
├── package.json
└── vite.config.js
```

---

## 📄 License & Attribution
Maintained by Schneider Electric Digital Power Proximity Team. Re-engineered as a modern web application for quotation, tendering, and field engineering teams.
