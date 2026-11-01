// DigiPal Meter Catalog & Configuration Rules
export const METER_FAMILIES = [
  {
    id: 'ion9000',
    name: 'PowerLogic ION9000',
    series: 'ION9000',
    tagline: 'Premium power quality meter with high accuracy and high-speed waveform capture',
    websiteUrl: 'https://www.se.com/us/en/product-range/64241-powerlogic-ion9000-series/#products',
    options: [
      {
        key: 'opt1',
        label: 'Accuracy / Model Type',
        choices: [
          { code: '2', name: 'ION9200 Standard (STD CVM)' },
          { code: '3', name: 'ION9300 LVCT Standard (LVCT STD CVM)' },
          { code: '5', name: 'ION9500 High-Speed Transient (HSTC CVM)' }
        ]
      },
      {
        key: 'opt2',
        label: 'Power Supply',
        choices: [
          { code: '0', name: 'Standard AC/DC Power Supply (STD PSU)' },
          { code: '1', name: 'Low Voltage DC Power Supply (LVDC PSU)' }
        ]
      },
      {
        key: 'opt3',
        label: 'Display Option',
        choices: [
          { code: '30', name: 'Transducer / No Display (DIN-rail)' },
          { code: '40', name: 'RMD192 Remote Color Touchscreen Display' }
        ]
      }
    ],
    generatePartNumber: (opts) => `METSEION9${opts.opt1 || '2'}${opts.opt2 || '0'}${opts.opt3 || '30'}`,
    generateDescription: (opts, choicesMap) => 
      `ION 9000 meter; ${choicesMap.opt1?.name || ''}; ${choicesMap.opt2?.name || ''}; ${choicesMap.opt3?.name || ''}`,
    accessories: [
  {
    "Accsy_Desc": "ANALOG-I/O-MODULE;-2-OUT;-4-IN",
    "Accsy_PN": "METSEPM89M0024"
  },
  {
    "Accsy_Desc": "DIGITAL-I/O-MOD;-2R-OUT;6-D-IN",
    "Accsy_PN": "METSEPM89M2600"
  },
  {
    "Accsy_Desc": "REMOTE-DISPLAY-WITH-3M-CABLE",
    "Accsy_PN": "METSEPM89RD96"
  },
  {
    "Accsy_Desc": "Fiber Eth Module PM8K; ION9K; ION7400",
    "Accsy_PN": "METSEPMFIBER"
  },
  {
    "Accsy_Desc": "2-4W RS485 Mod PM8K ION9K ION7400",
    "Accsy_PN": "METSEPMRS4854W"
  },
  {
    "Accsy_Desc": "MOUNTING ADAPTER; ION7X50 TO ION9000",
    "Accsy_PN": "METSE7X4MAK"
  },
  {
    "Accsy_Desc": "MOUNTING ADAPTER; BACK-TO-BACK; RMD",
    "Accsy_PN": "METSE9B2BMA"
  },
  {
    "Accsy_Desc": "KIT; ION9000 CURRENT INPUT HARDWARE",
    "Accsy_PN": "METSE9CTHWK"
  },
  {
    "Accsy_Desc": "KIT; ION9000 METER HARDWARE",
    "Accsy_PN": "METSE9HWK"
  },
  {
    "Accsy_Desc": "KIT; ION9000 LVCS METER HARDWARE",
    "Accsy_PN": "METSE9HWKLVCS"
  },
  {
    "Accsy_Desc": "KIT; ION9000 USB COVER HARDWARE",
    "Accsy_PN": "METSE9USBK"
  },
  {
    "Accsy_Desc": "REMOTE DISPLAY; 192MM",
    "Accsy_PN": "METSERD192"
  },
  {
    "Accsy_Desc": "KIT; RD192 REMOTE DISPLAY HARDWARE",
    "Accsy_PN": "METSERD192HWK"
  }
]
  },
  {
    id: 'ion7400',
    name: 'PowerLogic ION7400',
    series: 'ION7400',
    tagline: 'Precision energy and power quality monitoring for feeders and sensitive loads',
    websiteUrl: 'https://www.se.com/us/en/product-range/62319-powerlogic-ion7400-series/',
    options: [
      {
        key: 'opt1',
        label: 'Power Supply',
        choices: [
          { code: '0', name: 'Standard AC/DC Power Supply (Std PSU)' },
          { code: '1', name: 'Low Voltage DC Power Supply (LVDC PSU)' }
        ]
      },
      {
        key: 'opt2',
        label: 'Display Option',
        choices: [
          { code: '0', name: 'Integrated Color Display' },
          { code: '3', name: 'Transducer (No Display)' },
          { code: '4', name: 'Remote Display (RMD96)' }
        ]
      },
      {
        key: 'opt3',
        label: 'Feature Level',
        choices: [
          { code: '', name: 'Standard' },
          { code: 'E', name: 'Essential' },
          { code: 'A', name: 'Advanced Feature Set' }
        ]
      }
    ],
    generatePartNumber: (opts) => `METSEION74${opts.opt1 || '0'}${opts.opt2 || '0'}${opts.opt3 || ''}`,
    generateDescription: (opts, choicesMap) => 
      `ION 7400 meter; ${choicesMap.opt1?.name || ''}; ${choicesMap.opt2?.name || ''}; ${choicesMap.opt3?.name || ''}`,
    accessories: [
  {
    "Accsy_Desc": "ANALOG-I/O-MODULE;-2-OUT;-4-IN",
    "Accsy_PN": "METSEPM89M0024"
  },
  {
    "Accsy_Desc": "DIGITAL-I/O-MOD;-2R-OUT;6-D-IN",
    "Accsy_PN": "METSEPM89M2600"
  },
  {
    "Accsy_Desc": "REMOTE-DISPLAY-WITH-3M-CABLE",
    "Accsy_PN": "METSEPM89RD96"
  },
  {
    "Accsy_Desc": "HARDWARE-REPLACEMENT-KIT",
    "Accsy_PN": "METSEPM8HWK"
  },
  {
    "Accsy_Desc": "REMOTE-DISPLAY-HW-REPLACE-KIT",
    "Accsy_PN": "METSEPM8RDHWK"
  },
  {
    "Accsy_Desc": "PM MOUNTING ADAPTER KIT",
    "Accsy_PN": "METSEPMAK"
  },
  {
    "Accsy_Desc": "Fiber Eth Module PM8K; ION9K; ION7400",
    "Accsy_PN": "METSEPMFIBER"
  },
  {
    "Accsy_Desc": "2-4W RS485 Mod PM8K ION9K ION7400",
    "Accsy_PN": "METSEPMRS4854W"
  }
]
  },
  {
    id: 'pm8000',
    name: 'PowerLogic PM8000',
    series: 'PM8000',
    tagline: 'Compact power and energy meter with modular flexibility and power quality analysis',
    websiteUrl: 'https://www.se.com/us/en/product-range/62318-powerlogic-pm8000-series/',
    options: [
      {
        key: 'opt1',
        label: 'Meter Tier',
        choices: [
          { code: '1', name: 'Essential Tier' },
          { code: '2', name: 'Standard Tier' },
          { code: '3', name: 'Advanced Tier' }
        ]
      },
      {
        key: 'opt2',
        label: 'Power Supply',
        choices: [
          { code: '4', name: 'Standard AC/DC PSU' },
          { code: '1', name: 'Low Voltage DC PSU' }
        ]
      },
      {
        key: 'opt3',
        label: 'Display Option',
        choices: [
          { code: '0', name: 'Integrated Color Display' },
          { code: '3', name: 'Transducer (No Display)' },
          { code: '4', name: 'Remote Display' }
        ]
      }
    ],
    generatePartNumber: (opts) => `METSEPM8${opts.opt1 || '1'}${opts.opt2 || '4'}${opts.opt3 || '0'}`,
    generateDescription: (opts, choicesMap) => 
      `PM 8000 meter; ${choicesMap.opt1?.name || ''}; ${choicesMap.opt2?.name || ''}; ${choicesMap.opt3?.name || ''}`,
    accessories: [
  {
    "Accsy_Desc": "ANALOG-I/O-MODULE;-2-OUT;-4-IN",
    "Accsy_PN": "METSEPM89M0024"
  },
  {
    "Accsy_Desc": "DIGITAL-I/O-MOD;-2R-OUT;6-D-IN",
    "Accsy_PN": "METSEPM89M2600"
  },
  {
    "Accsy_Desc": "REMOTE-DISPLAY-WITH-3M-CABLE",
    "Accsy_PN": "METSEPM89RD96"
  },
  {
    "Accsy_Desc": "HARDWARE-REPLACEMENT-KIT",
    "Accsy_PN": "METSEPM8HWK"
  },
  {
    "Accsy_Desc": "REMOTE-DISPLAY-HW-REPLACE-KIT",
    "Accsy_PN": "METSEPM8RDHWK"
  },
  {
    "Accsy_Desc": "PM MOUNTING ADAPTER KIT",
    "Accsy_PN": "METSEPMAK"
  },
  {
    "Accsy_Desc": "Fiber Eth Module PM8K; ION9K; ION7400",
    "Accsy_PN": "METSEPMFIBER"
  },
  {
    "Accsy_Desc": "2-4W RS485 Mod PM8K ION9K ION7400",
    "Accsy_PN": "METSEPMRS4854W"
  }
]
  },
  {
    id: 'pm5000',
    name: 'PowerLogic PM5000 Series',
    series: 'PM5000',
    tagline: 'Versatile multifunction power & energy meters for panels and cost allocation',
    websiteUrl: 'https://www.se.com/us/en/product-range/61280-powerlogic-pm5000-series/',
    options: [
      {
        key: 'opt1',
        label: 'Model & Accuracy Class',
        choices: [
          { code: '11', name: 'PM5110 Basic Power Meter Cl 0.5 Serial Port' },
          { code: '33', name: 'PM5330 Power Meter Cl 0.5 Serial Port + Display' },
          { code: '34', name: 'PM5340 Power Meter Cl 0.5 Ethernet Port + Display' },
          { code: '56', name: 'PM5560 Intermediate PWR Meter Cl 0.2 Dual Ethernet' },
          { code: '58', name: 'PM5580 Panel Mount LVDC AUX' },
          { code: '65', name: 'PM5650 Panel Mount Waveform Capture + Solid State' }
        ]
      },
      {
        key: 'opt2',
        label: 'Display / Option (For PM5560)',
        dependsOn: (opts) => opts.opt1 === '56',
        choices: [
          { code: '0', name: 'Integrated Display' },
          { code: '2', name: 'Integrated Display RMICAN approved HW lockable' },
          { code: '2MC', name: 'Integrated Display RMICAN approved Factory sealed' },
          { code: '3', name: 'Transducer (No Display)' },
          { code: '3RD', name: 'Remote Display' }
        ]
      }
    ],
    generatePartNumber: (opts) => {
      const suffix = opts.opt1 === '56' ? (opts.opt2 || '0') : '0';
      return `METSEPM5${opts.opt1 || '11'}${suffix}`;
    },
    generateDescription: (opts, choicesMap) => {
      const mName = choicesMap.opt1?.name || '';
      const dName = opts.opt1 === '56' ? (choicesMap.opt2?.name || 'Integrated Display') : 'Integrated Display';
      return `PM 5${opts.opt1 || '11'}0 meter; ${mName}; ${dName}`;
    },
    accessories: [
  {
    "Accsy_Desc": "PM51/PM53 REVENUE SEALING KIT",
    "Accsy_PN": "METSEPM513RSK"
  },
  {
    "Accsy_Desc": "PM53 TERMINAL & MOUNTING HARDWARE KIT",
    "Accsy_PN": "METSEPM53HK"
  },
  {
    "Accsy_Desc": "PM5563 Remote Display Cable 0.3 M",
    "Accsy_PN": "METSEPM5CAB03"
  },
  {
    "Accsy_Desc": "PM5563 Remote Display Cable 1 M",
    "Accsy_PN": "METSEPM5CAB1"
  },
  {
    "Accsy_Desc": "PM5563 REMOTE DISPLAY CABLE 4 M",
    "Accsy_PN": "METSEPM5CAB4"
  },
  {
    "Accsy_Desc": "PM5563 Remote Display",
    "Accsy_PN": "METSEPM5RD"
  }
]
  },
  {
    id: 'pm2000',
    name: 'EasyLogic PM2000 Series',
    series: 'PM2000',
    tagline: 'Cost-effective basic digital panel meters for voltage, current, and energy',
    websiteUrl: 'https://www.se.com/us/en/product-range/63897-easylogic-pm2000-series/',
    options: [
      {
        key: 'opt1',
        label: 'Display Type',
        choices: [
          { code: '1', name: 'Red LED Display' },
          { code: '2', name: 'LCD Display' }
        ]
      },
      {
        key: 'opt2',
        label: 'Measurement Class & Comms',
        choices: [
          { code: '1', name: '44-277V Class 1 Basic' },
          { code: '2', name: '44-277V Class 1; 15th Harmonics; RS485' },
          { code: '3', name: '80-277V Class 0.5S; 31st Harmonics; RS485' }
        ]
      }
    ],
    generatePartNumber: (opts) => `METSEPM2${opts.opt1 || '1'}${opts.opt2 || '1'}0`,
    generateDescription: (opts, choicesMap) => 
      `PM 2${opts.opt1 || '1'}${opts.opt2 || '1'}0 meter; ${choicesMap.opt1?.name || ''}; ${choicesMap.opt2?.name || ''}`,
    accessories: []
  },
  {
    id: 'ion8650',
    name: 'PowerLogic ION8650',
    series: 'ION8650',
    tagline: 'High-performance utility revenue and substation socket/switchboard meter',
    websiteUrl: 'https://www.se.com/us/en/product-range/60253-powerlogic-ion8650/',
    options: [
      {
        key: 'opt1',
        label: 'Feature Set & Memory',
        choices: [
          { code: 'A', name: 'Feature Set A (128MB Memory)' },
          { code: 'B', name: 'Feature Set B (64MB Memory)' },
          { code: 'C', name: 'Feature Set C (32MB Memory)' }
        ]
      },
      {
        key: 'opt2',
        label: 'Form Factor / Socket Base',
        choices: [
          { code: '0', name: '9/29/36S Base - 57-277 VLN 3-Element 4-Wire' },
          { code: '1', name: '35S Base - 120-480 VLL 2-Element 3-Wire' },
          { code: '4', name: '9/29/35/36S FT21 Switchboard Case Breakout Panel' },
          { code: '7', name: '9/29/35/36S FT21 Switchboard Case Breakout Cable' }
        ]
      },
      {
        key: 'opt3',
        label: 'Power Supply / Control Wiring',
        choices: [
          { code: 'E', name: "Powered from meter voltage connections" },
          { code: 'H', name: 'Auxiliary Power Pigtail: 65-120 VAC / 80-160 VDC' },
          { code: 'J', name: 'Auxiliary Power Pigtail: 160-277 VAC / 200-350 VDC' }
        ]
      },
      {
        key: 'opt4',
        label: 'Communications Architecture',
        choices: [
          { code: 'C7', name: 'Optical; Ethernet; RS-232/485; RS-485; 56k Modem' },
          { code: 'E1', name: 'Optical; Ethernet; RS-232/485; RS-485' },
          { code: 'F1', name: 'Optical; 100BASE-FX Multi-Mode ST Fiber; RS-232/485; RS-485' },
          { code: 'S1', name: 'Optical; Ethernet; RS-232/485; RS-485; Verizon Cellular Modem' }
        ]
      },
      {
        key: 'opt5',
        label: 'Onboard I/O',
        choices: [
          { code: 'A', name: 'No Extra I/O' },
          { code: 'B', name: '4 Form C Digital Output; 3 Digital Input' },
          { code: 'C', name: '4 Form C DO; 1 Form A DO; 1 Digital Input' },
          { code: 'D', name: 'Ride-Through Module - Message over Ethernet' }
        ]
      },
      {
        key: 'opt6',
        label: 'Security & Protocol Lock',
        choices: [
          { code: '0', name: 'Password Protected; No Security Lock' },
          { code: '1', name: 'Password Protected with Hardware Security Lock' },
          { code: '7', name: 'Password Protected; No Security Lock (US Only)' },
          { code: '8', name: 'Password Protected with Security Lock (US Only)' }
        ]
      }
    ],
    generatePartNumber: (opts) => 
      `S8650${opts.opt1 || 'A'}${opts.opt2 || '0'}C0${opts.opt3 || 'E'}6${opts.opt4 || 'E1'}${opts.opt5 || 'A'}${opts.opt6 || '0'}A`,
    generateDescription: (opts, choicesMap) => 
      `ION8650 ${choicesMap.opt1?.name || ''} ${choicesMap.opt2?.name || ''} ${choicesMap.opt3?.name || ''} ${choicesMap.opt4?.name || ''} ${choicesMap.opt5?.name || ''} ${choicesMap.opt6?.name || ''}`,
    accessories: [
  {
    "Accsy_Desc": "LABEL-STDMEASURE",
    "Accsy_PN": "LABEL86500548STDAA542"
  },
  {
    "Accsy_Desc": "LABEL-AA553",
    "Accsy_PN": "LABEL86500548STDAA553"
  },
  {
    "Accsy_Desc": "SD LABELS FOR STANDARD METERS",
    "Accsy_PN": "LABEL86500548STDAA558"
  },
  {
    "Accsy_Desc": "LABEL-8650",
    "Accsy_PN": "LABEL86XX7352STDAA480"
  },
  {
    "Accsy_Desc": "10A/1-VAC-CLAMP-ON-CURRENT-PROBE",
    "Accsy_PN": "M1UB10A1V10A"
  },
  {
    "Accsy_Desc": "85 DIG I/O CARD -NO CABLE PM",
    "Accsy_PN": "P850EA0"
  },
  {
    "Accsy_Desc": "85 0-20MA I/O CARD AN. NOCAB PM",
    "Accsy_PN": "P850EB0"
  },
  {
    "Accsy_Desc": "85 -1 1MA AN I/O CARD NOCABLE PM",
    "Accsy_PN": "P850EC0"
  },
  {
    "Accsy_Desc": "85 -1 1MA AN I/O CARD NOCABLE PM",
    "Accsy_PN": "P850EC0AA645"
  },
  {
    "Accsy_Desc": "85 -20TO20 AN I/O CARD NOCB PM",
    "Accsy_PN": "P850ED0"
  },
  {
    "Accsy_Desc": "ION GATEWAY, WITH DB9 CBL PM",
    "Accsy_PN": "PWG60Z0Z0Z0Z0A0Z"
  },
  {
    "Accsy_Desc": "RACK, IEC/DIN 34862 19\" Rack (2 METER)",
    "Accsy_PN": "RACK8800RAW"
  },
  {
    "Accsy_Desc": "8XXX Series REPAIR - PWRM",
    "Accsy_PN": "RMA8XXXREPAIR"
  },
  {
    "Accsy_Desc": "Calibration Only (includes FW upgrade)",
    "Accsy_PN": "RMACALIBRATION"
  },
  {
    "Accsy_Desc": "Comm Card REPAIR - PWRM",
    "Accsy_PN": "RMACOMMREPAIR"
  },
  {
    "Accsy_Desc": "I/O Card REPAIR - PWRM",
    "Accsy_PN": "RMAIOCARDREPAIR"
  }
]
  }
];
