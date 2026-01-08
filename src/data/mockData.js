
// Mock Data for "Sahrdaya College"
export const VILLAGE_CENTER = [10.3594, 76.2858];

export const ASSETS = [
    // Water Assets
    { id: 'W-01', type: 'Water Tank A', category: 'water', coords: [10.3598, 76.2860], status: 'critical', val: '15%', details: 'Main Campus (Low Level)' },
    { id: 'W-02', type: 'Water Tank B', category: 'water', coords: [10.3585, 76.2875], status: 'warning', val: '45%', details: 'Mens Hostel' },
    { id: 'W-03', type: 'Water Tank C', category: 'water', coords: [10.3610, 76.2850], status: 'normal', val: '92%', details: 'Lab Block' },
    { id: 'W-04', type: 'Water Tank D', category: 'water', coords: [10.3575, 76.2865], status: 'warning', val: '30%', details: 'Main Mess' },
    { id: 'W-05', type: 'Water Tank E', category: 'water', coords: [10.3592, 76.2842], status: 'normal', val: '78%', details: 'Admin Block' },
    { id: 'W-06', type: 'Treatment Plant', category: 'water', coords: [10.3615, 76.2845], status: 'normal', val: 'Active', details: 'RO Unit' },

    // Energy Assets
    { id: 'E-01', type: 'Main Substation', category: 'energy', coords: [10.3590, 76.2855], status: 'normal', val: '482kW', details: 'Grid Connection' },
    { id: 'E-02', type: 'Solar Array', category: 'energy', coords: [10.3582, 76.2868], status: 'normal', val: '125kW', details: 'Rooftop Generation' },
    { id: 'E-03', type: 'Feeder 1', category: 'energy', coords: [10.3595, 76.2840], status: 'normal', val: 'Active', details: 'Admin Block Supply' },
    { id: 'E-04', type: 'Feeder 2', category: 'energy', coords: [10.3578, 76.2880], status: 'normal', val: 'Active', details: 'Hostel Zone Supply' },
    { id: 'E-05', type: 'Feeder 3', category: 'energy', coords: [10.3608, 76.2852], status: 'normal', val: 'Active', details: 'Lab Complex Supply' },
    { id: 'E-06', type: 'Diesel Gen', category: 'energy', coords: [10.3595, 76.2870], status: 'offline', val: 'Standby', details: 'Backup Power' },
    { id: 'E-07', type: 'Biogas Plant', category: 'energy', coords: [10.3570, 76.2860], status: 'normal', val: 'Active', details: 'Waste to Energy' },
    { id: 'E-08', type: 'Battery Bank', category: 'energy', coords: [10.3588, 76.2858], status: 'normal', val: '85%', details: 'Energy Storage' },

    // Incidents/Other
    { id: 'I-01', type: 'Traffic Alert', category: 'incidents', coords: [10.3602, 76.2858], status: 'critical', val: 'Congestion', details: 'Gate 2 Entrance' },
    { id: 'I-02', type: 'Sensor Hub 5', category: 'incidents', coords: [10.3585, 76.2848], status: 'warning', val: 'Timeout', details: 'Connection Error' },
    { id: 'S-01', type: 'Waste Bin #42', category: 'incidents', coords: [10.3600, 76.2862], status: 'critical', val: 'Full', details: 'Canteen Area' },
];
