import json
import os

data_dir = '/home/jeremya/AntiGravity/DigiPal-Decoder/extracted_data'
out_dir = '/home/jeremya/AntiGravity/DigiPal-Decoder/src/data'
os.makedirs(out_dir, exist_ok=True)

def load_json(name):
    with open(os.path.join(data_dir, name)) as f:
        return json.load(f)

# 1. Meter Data
ion9_acc = load_json('ION9_Accsy_Data.json')
ion74_acc = load_json('ION74_Accsy_Data.json')
pm8_acc = load_json('PM8_Accsy_Data.json')
pm5_acc = load_json('PM5_Accsy_Data.json')
ion8650_acc = load_json('ION8650_Accsy_Data.json')

meter_data_js = f"""// DigiPal Meter Catalog & Configuration Rules
export const METER_FAMILIES = [
  {{
    id: 'ion9000',
    name: 'PowerLogic ION9000',
    series: 'ION9000',
    tagline: 'Premium power quality meter with high accuracy and high-speed waveform capture',
    websiteUrl: 'https://www.se.com/us/en/product-range/64241-powerlogic-ion9000-series/#products',
    options: [
      {{
        key: 'opt1',
        label: 'Accuracy / Model Type',
        choices: [
          {{ code: '2', name: 'ION9200 Standard (STD CVM)' }},
          {{ code: '3', name: 'ION9300 LVCT Standard (LVCT STD CVM)' }},
          {{ code: '5', name: 'ION9500 High-Speed Transient (HSTC CVM)' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Power Supply',
        choices: [
          {{ code: '0', name: 'Standard AC/DC Power Supply (STD PSU)' }},
          {{ code: '1', name: 'Low Voltage DC Power Supply (LVDC PSU)' }}
        ]
      }},
      {{
        key: 'opt3',
        label: 'Display Option',
        choices: [
          {{ code: '30', name: 'Transducer / No Display (DIN-rail)' }},
          {{ code: '40', name: 'RMD192 Remote Color Touchscreen Display' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => `METSEION9${{opts.opt1 || '2'}}${{opts.opt2 || '0'}}${{opts.opt3 || '30'}}`,
    generateDescription: (opts, choicesMap) => 
      `ION 9000 meter; ${{choicesMap.opt1?.name || ''}}; ${{choicesMap.opt2?.name || ''}}; ${{choicesMap.opt3?.name || ''}}`,
    accessories: {json.dumps(ion9_acc, indent=2)}
  }},
  {{
    id: 'ion7400',
    name: 'PowerLogic ION7400',
    series: 'ION7400',
    tagline: 'Precision energy and power quality monitoring for feeders and sensitive loads',
    websiteUrl: 'https://www.se.com/us/en/product-range/62319-powerlogic-ion7400-series/',
    options: [
      {{
        key: 'opt1',
        label: 'Power Supply',
        choices: [
          {{ code: '0', name: 'Standard AC/DC Power Supply (Std PSU)' }},
          {{ code: '1', name: 'Low Voltage DC Power Supply (LVDC PSU)' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Display Option',
        choices: [
          {{ code: '0', name: 'Integrated Color Display' }},
          {{ code: '3', name: 'Transducer (No Display)' }},
          {{ code: '4', name: 'Remote Display (RMD96)' }}
        ]
      }},
      {{
        key: 'opt3',
        label: 'Feature Level',
        choices: [
          {{ code: '', name: 'Standard' }},
          {{ code: 'E', name: 'Essential' }},
          {{ code: 'A', name: 'Advanced Feature Set' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => `METSEION74${{opts.opt1 || '0'}}${{opts.opt2 || '0'}}${{opts.opt3 || ''}}`,
    generateDescription: (opts, choicesMap) => 
      `ION 7400 meter; ${{choicesMap.opt1?.name || ''}}; ${{choicesMap.opt2?.name || ''}}; ${{choicesMap.opt3?.name || ''}}`,
    accessories: {json.dumps(ion74_acc, indent=2)}
  }},
  {{
    id: 'pm8000',
    name: 'PowerLogic PM8000',
    series: 'PM8000',
    tagline: 'Compact power and energy meter with modular flexibility and power quality analysis',
    websiteUrl: 'https://www.se.com/us/en/product-range/62318-powerlogic-pm8000-series/',
    options: [
      {{
        key: 'opt1',
        label: 'Meter Tier',
        choices: [
          {{ code: '1', name: 'Essential Tier' }},
          {{ code: '2', name: 'Standard Tier' }},
          {{ code: '3', name: 'Advanced Tier' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Power Supply',
        choices: [
          {{ code: '4', name: 'Standard AC/DC PSU' }},
          {{ code: '1', name: 'Low Voltage DC PSU' }}
        ]
      }},
      {{
        key: 'opt3',
        label: 'Display Option',
        choices: [
          {{ code: '0', name: 'Integrated Color Display' }},
          {{ code: '3', name: 'Transducer (No Display)' }},
          {{ code: '4', name: 'Remote Display' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => `METSEPM8${{opts.opt1 || '1'}}${{opts.opt2 || '4'}}${{opts.opt3 || '0'}}`,
    generateDescription: (opts, choicesMap) => 
      `PM 8000 meter; ${{choicesMap.opt1?.name || ''}}; ${{choicesMap.opt2?.name || ''}}; ${{choicesMap.opt3?.name || ''}}`,
    accessories: {json.dumps(pm8_acc, indent=2)}
  }},
  {{
    id: 'pm5000',
    name: 'PowerLogic PM5000 Series',
    series: 'PM5000',
    tagline: 'Versatile multifunction power & energy meters for panels and cost allocation',
    websiteUrl: 'https://www.se.com/us/en/product-range/61280-powerlogic-pm5000-series/',
    options: [
      {{
        key: 'opt1',
        label: 'Model & Accuracy Class',
        choices: [
          {{ code: '11', name: 'PM5110 Basic Power Meter Cl 0.5 Serial Port' }},
          {{ code: '33', name: 'PM5330 Power Meter Cl 0.5 Serial Port + Display' }},
          {{ code: '34', name: 'PM5340 Power Meter Cl 0.5 Ethernet Port + Display' }},
          {{ code: '56', name: 'PM5560 Intermediate PWR Meter Cl 0.2 Dual Ethernet' }},
          {{ code: '58', name: 'PM5580 Panel Mount LVDC AUX' }},
          {{ code: '65', name: 'PM5650 Panel Mount Waveform Capture + Solid State' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Display / Option (For PM5560)',
        dependsOn: (opts) => opts.opt1 === '56',
        choices: [
          {{ code: '0', name: 'Integrated Display' }},
          {{ code: '2', name: 'Integrated Display RMICAN approved HW lockable' }},
          {{ code: '2MC', name: 'Integrated Display RMICAN approved Factory sealed' }},
          {{ code: '3', name: 'Transducer (No Display)' }},
          {{ code: '3RD', name: 'Remote Display' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => {{
      const suffix = opts.opt1 === '56' ? (opts.opt2 || '0') : '0';
      return `METSEPM5${{opts.opt1 || '11'}}${{suffix}}`;
    }},
    generateDescription: (opts, choicesMap) => {{
      const mName = choicesMap.opt1?.name || '';
      const dName = opts.opt1 === '56' ? (choicesMap.opt2?.name || 'Integrated Display') : 'Integrated Display';
      return `PM 5${{opts.opt1 || '11'}}0 meter; ${{mName}}; ${{dName}}`;
    }},
    accessories: {json.dumps(pm5_acc, indent=2)}
  }},
  {{
    id: 'pm2000',
    name: 'EasyLogic PM2000 Series',
    series: 'PM2000',
    tagline: 'Cost-effective basic digital panel meters for voltage, current, and energy',
    websiteUrl: 'https://www.se.com/us/en/product-range/63897-easylogic-pm2000-series/',
    options: [
      {{
        key: 'opt1',
        label: 'Display Type',
        choices: [
          {{ code: '1', name: 'Red LED Display' }},
          {{ code: '2', name: 'LCD Display' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Measurement Class & Comms',
        choices: [
          {{ code: '1', name: '44-277V Class 1 Basic' }},
          {{ code: '2', name: '44-277V Class 1; 15th Harmonics; RS485' }},
          {{ code: '3', name: '80-277V Class 0.5S; 31st Harmonics; RS485' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => `METSEPM2${{opts.opt1 || '1'}}${{opts.opt2 || '1'}}0`,
    generateDescription: (opts, choicesMap) => 
      `PM 2${{opts.opt1 || '1'}}${{opts.opt2 || '1'}}0 meter; ${{choicesMap.opt1?.name || ''}}; ${{choicesMap.opt2?.name || ''}}`,
    accessories: []
  }},
  {{
    id: 'ion8650',
    name: 'PowerLogic ION8650',
    series: 'ION8650',
    tagline: 'High-performance utility revenue and substation socket/switchboard meter',
    websiteUrl: 'https://www.se.com/us/en/product-range/60253-powerlogic-ion8650/',
    options: [
      {{
        key: 'opt1',
        label: 'Feature Set & Memory',
        choices: [
          {{ code: 'A', name: 'Feature Set A (128MB Memory)' }},
          {{ code: 'B', name: 'Feature Set B (64MB Memory)' }},
          {{ code: 'C', name: 'Feature Set C (32MB Memory)' }}
        ]
      }},
      {{
        key: 'opt2',
        label: 'Form Factor / Socket Base',
        choices: [
          {{ code: '0', name: '9/29/36S Base - 57-277 VLN 3-Element 4-Wire' }},
          {{ code: '1', name: '35S Base - 120-480 VLL 2-Element 3-Wire' }},
          {{ code: '4', name: '9/29/35/36S FT21 Switchboard Case Breakout Panel' }},
          {{ code: '7', name: '9/29/35/36S FT21 Switchboard Case Breakout Cable' }}
        ]
      }},
      {{
        key: 'opt3',
        label: 'Power Supply / Control Wiring',
        choices: [
          {{ code: 'E', name: "Powered from meter voltage connections" }},
          {{ code: 'H', name: 'Auxiliary Power Pigtail: 65-120 VAC / 80-160 VDC' }},
          {{ code: 'J', name: 'Auxiliary Power Pigtail: 160-277 VAC / 200-350 VDC' }}
        ]
      }},
      {{
        key: 'opt4',
        label: 'Communications Architecture',
        choices: [
          {{ code: 'C7', name: 'Optical; Ethernet; RS-232/485; RS-485; 56k Modem' }},
          {{ code: 'E1', name: 'Optical; Ethernet; RS-232/485; RS-485' }},
          {{ code: 'F1', name: 'Optical; 100BASE-FX Multi-Mode ST Fiber; RS-232/485; RS-485' }},
          {{ code: 'S1', name: 'Optical; Ethernet; RS-232/485; RS-485; Verizon Cellular Modem' }}
        ]
      }},
      {{
        key: 'opt5',
        label: 'Onboard I/O',
        choices: [
          {{ code: 'A', name: 'No Extra I/O' }},
          {{ code: 'B', name: '4 Form C Digital Output; 3 Digital Input' }},
          {{ code: 'C', name: '4 Form C DO; 1 Form A DO; 1 Digital Input' }},
          {{ code: 'D', name: 'Ride-Through Module - Message over Ethernet' }}
        ]
      }},
      {{
        key: 'opt6',
        label: 'Security & Protocol Lock',
        choices: [
          {{ code: '0', name: 'Password Protected; No Security Lock' }},
          {{ code: '1', name: 'Password Protected with Hardware Security Lock' }},
          {{ code: '7', name: 'Password Protected; No Security Lock (US Only)' }},
          {{ code: '8', name: 'Password Protected with Security Lock (US Only)' }}
        ]
      }}
    ],
    generatePartNumber: (opts) => 
      `S8650${{opts.opt1 || 'A'}}${{opts.opt2 || '0'}}C0${{opts.opt3 || 'E'}}6${{opts.opt4 || 'E1'}}${{opts.opt5 || 'A'}}${{opts.opt6 || '0'}}A`,
    generateDescription: (opts, choicesMap) => 
      `ION8650 ${{choicesMap.opt1?.name || ''}} ${{choicesMap.opt2?.name || ''}} ${{choicesMap.opt3?.name || ''}} ${{choicesMap.opt4?.name || ''}} ${{choicesMap.opt5?.name || ''}} ${{choicesMap.opt6?.name || ''}}`,
    accessories: {json.dumps(ion8650_acc, indent=2)}
  }}
];
"""

with open(os.path.join(out_dir, 'meterData.js'), 'w') as f:
    f.write(meter_data_js)

# 2. Cross Reference Data
full_meter_cross = load_json('Full_Meter_Cross_Ref.json')
relay_cross = load_json('RelayCrossRef.json')
manf_list = load_json('Manf_X_list.json')

cross_ref_js = f"""// Competitor Meter & Relay Cross Reference Data
export const COMPETITOR_METERS = {json.dumps(full_meter_cross, indent=2)};

export const MANUFACTURERS = {json.dumps([m['Manf List'] for m in manf_list if m.get('Manf List')], indent=2)};

export const RELAY_CROSS_REFERENCE = {json.dumps(relay_cross, indent=2)};
"""

with open(os.path.join(out_dir, 'crossReferenceData.js'), 'w') as f:
    f.write(cross_ref_js)

# 3. Enclosure Data
pm5560_9761e = load_json('PM5560_9761E.json')
pm8000_9761e = load_json('PM8000_9761E.json')
_9761e8650 = load_json('_9761E8650.json')
value_series = load_json('Value.json')
comm_9761c = load_json('COMM_9761C.json')
mmu_table = load_json('MMU_table.json')
mmupro = load_json('MMUPRO_1.json')

enclosure_js = f"""// Factory Assembled Enclosures Data
export const ENCLOSURE_PM5560 = {json.dumps(pm5560_9761e, indent=2)};
export const ENCLOSURE_PM8000 = {json.dumps(pm8000_9761e, indent=2)};
export const ENCLOSURE_ION8650 = {json.dumps(_9761e8650, indent=2)};
export const ENCLOSURE_VALUE_SERIES = {json.dumps(value_series, indent=2)};
export const ENCLOSURE_COMM_9761C = {json.dumps(comm_9761c, indent=2)};
export const ENCLOSURE_MMU = {json.dumps(mmu_table, indent=2)};
export const ENCLOSURE_MMUPRO = {json.dumps(mmupro, indent=2)};
"""

with open(os.path.join(out_dir, 'enclosureData.js'), 'w') as f:
    f.write(enclosure_js)

# 4. CT & Kit Data
ct_3090 = load_json('CT_3090.json')
lvct = load_json('LVCT.json')
ct_hdpm6k = load_json('CT_HDPM6K.json')
kit_1ct = load_json('Kit_1CT.json')
kit_2ct = load_json('Kit_2CT.json')
kit_3ct = load_json('Kit_3CT.json')

ct_data_js = f"""// Current Transformers (CT) and Meter Kit Data
export const CTS_5A = {json.dumps(ct_3090, indent=2)};
export const CTS_LVCT = {json.dumps(lvct, indent=2)};
export const CTS_HDPM6K = {json.dumps(ct_hdpm6k, indent=2)};

export const METER_KITS = [
  ...{json.dumps(kit_1ct)}.map(k => ({{ ...k, ctCount: 1 }})),
  ...{json.dumps(kit_2ct)}.map(k => ({{ ...k, ctCount: 2 }})),
  ...{json.dumps(kit_3ct)}.map(k => ({{ ...k, ctCount: 3 }}))
];
"""

with open(os.path.join(out_dir, 'ctAndKitData.js'), 'w') as f:
    f.write(ct_data_js)

# 5. Retrofit Adapters
adapt_assy = load_json('ADAPTASSY_1.json')

adapters_js = f"""// Switchgear Retrofit Adapter Assemblies
export const RETROFIT_ADAPTERS = [
  {{
    existingMeter: 'CM2000 (Square D / PowerLogic)',
    targetMeter: 'ION9000',
    partNumber: 'CM2TOION9K',
    description: 'CM2000 to ION9000 Retrofit Adapter Assembly with mounting bracket & wiring harness'
  }},
  {{
    existingMeter: 'CM3000 / CM4000',
    targetMeter: 'ION9000',
    partNumber: 'CM3TOION9K',
    description: 'CM3000/CM4000 to ION9000 Retrofit Adapter Assembly'
  }},
  {{
    existingMeter: 'CM2000 (Square D / PowerLogic)',
    targetMeter: 'PM8000',
    partNumber: 'CM2TOPM8K',
    description: 'CM2000 to PM8000 Retrofit Adapter Assembly'
  }},
  {{
    existingMeter: 'GE EPM',
    targetMeter: 'PM5563RD',
    partNumber: 'EPMTOPM5K',
    description: 'GE EPM to PM5563RD Retrofit Adapter Assembly'
  }},
  {{
    existingMeter: 'GE PQM',
    targetMeter: 'PM8244',
    partNumber: 'GEPQMTOPM8K',
    description: 'GE PQM to PM8244 Retrofit Adapter Assembly'
  }},
  {{
    existingMeter: 'PowerLogic PM600 Series',
    targetMeter: 'PM5000 / PM8000',
    partNumber: 'PM600TOPM5K',
    description: 'PM600 to PM5000 Retrofit Adapter Assembly'
  }}
];
"""

with open(os.path.join(out_dir, 'adapterData.js'), 'w') as f:
    f.write(adapters_js)

# 6. Resources & Tools
copilot_data = load_json('CoPilotScriptsData.json')

resources_js = f"""// Digital Assistant Tools and Supporting Portals
export const COPILOT_TOOLS = {json.dumps(copilot_data, indent=2)};

export const USEFUL_LINKS = [
  {{
    category: 'Product Documentation & Catalogs',
    title: 'Schneider Electric Power Management',
    url: 'https://www.se.com/us/en/product-subcategory/59326966-power-management/',
    description: 'Official product documentation, catalogs, user manuals, and technical brochures'
  }},
  {{
    category: 'Product Documentation & Catalogs',
    title: 'PowerLogic Metering Selection & Category',
    url: 'https://www.se.com/us/en/product-category/4100-power-metering-and-energy-monitoring-systems/?filter=business-6-m',
    description: 'PowerLogic meter series comparison, technical specifications, and ordering guides'
  }},
  {{
    category: 'Product Documentation & Catalogs',
    title: 'Energy Management Software Solutions',
    url: 'https://www.se.com/us/en/product-category/26426075-energy-management-software-solutions/',
    description: 'EcoStruxure Power Monitoring Expert (PME) and EcoStruxure Power Operation (EPO)'
  }},
  {{
    category: 'Engineering & Quotation Support',
    title: 'Schneider Electric EZ Product Selectors',
    url: 'https://www.se.com/us/en/work/support/resources-and-tools/calculators-and-online-tools/ez-selectors/',
    description: 'Online configuration and selector tools for energy and power distribution equipment'
  }},
  {{
    category: 'Engineering & Quotation Support',
    title: 'Medium Voltage Switchgear & Grid Automation',
    url: 'https://www.se.com/us/en/work/products/medium-voltage-switchgear-and-energy-automation/',
    description: 'Protective relays, feeder automation, and substation communication systems'
  }}
];
"""

with open(os.path.join(out_dir, 'resourceLinks.js'), 'w') as f:
    f.write(resources_js)

print('All data files built successfully!')
