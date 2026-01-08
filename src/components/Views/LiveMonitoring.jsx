
import React from 'react';
import { Activity, Thermometer, Wind, Wifi, Battery, Server } from 'lucide-react';
import { DashboardCard } from '../Shared/DashboardCard';

const sensors = [
    { id: 'S-101', type: 'Env. Hub', location: 'Main Gate', status: 'Active', battery: '98%', lastUpdate: '2s ago', value: '28°C' },
    { id: 'S-102', type: 'Water Flow', location: 'Tank A', status: 'Active', battery: '100%', lastUpdate: '5s ago', value: '120 L/m' },
    { id: 'S-103', type: 'Energy Meter', location: 'Sub-station', status: 'Active', battery: 'Line', lastUpdate: '1s ago', value: '450 V' },
    { id: 'S-104', type: 'Air Quality', location: 'Campus Park', status: 'Warning', battery: '15%', lastUpdate: '10m ago', value: 'AQI 85' },
    { id: 'S-105', type: 'Traffic Cam', location: 'South Exit', status: 'Offline', battery: '0%', lastUpdate: '1h ago', value: 'N/A' },
    { id: 'S-106', type: 'Waste Bin', location: 'Canteen', status: 'Active', battery: '75%', lastUpdate: '30s ago', value: '60% Full' },
    { id: 'S-107', type: 'Parking', location: 'Block B', status: 'Active', battery: '92%', lastUpdate: '1s ago', value: '2 Slots' },
    { id: 'S-108', type: 'Noise', location: 'Library Area', status: 'Active', battery: '88%', lastUpdate: '5s ago', value: '45 dB' },
];

const SensorCard = ({ data }) => (
    <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-all hover:shadow-md ${data.status === 'Active' ? 'bg-white border-slate-200' :
            data.status === 'Warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200 opacity-60'
        }`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${data.status === 'Active' ? 'bg-green-100 text-green-600' :
                        data.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-200 text-slate-500'
                    }`}>
                    <Server size={16} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-700">{data.id}</h4>
                    <p className="text-xs text-slate-500">{data.type}</p>
                </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${data.status === 'Active' ? 'bg-green-100 text-green-700' :
                    data.status === 'Warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'
                }`}>{data.status}</span>
        </div>

        <div className="flex items-end justify-between mt-1">
            <div>
                <p className="text-xs text-slate-400 mb-0.5">Reading</p>
                <p className="text-lg font-bold text-slate-800">{data.value}</p>
            </div>
            <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-0.5">
                    <Battery size={10} /> {data.battery}
                </div>
                <p className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">Updated: {data.lastUpdate}</p>
            </div>
        </div>

        <div className="pt-2 border-t border-slate-100 mt-1">
            <p className="text-xs text-slate-500 flex items-center gap-1">
                <Wifi size={10} /> {data.location}
            </p>
        </div>
    </div>
);

export const LiveMonitoring = () => {
    return (
        <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Live Sensor Network</h2>
                    <p className="text-slate-500">Real-time telemetry from field devices</p>
                </div>
                <div className="flex gap-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        128 Online
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        3 Offline
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
                    {sensors.map(sensor => (
                        <SensorCard key={sensor.id} data={sensor} />
                    ))}
                    {/* Duplicate specifically to show scrolling content if needed, or just relying on these 8 */}
                    {sensors.map(sensor => (
                        <SensorCard key={`${sensor.id}-dup`} data={{ ...sensor, id: `${sensor.id}-X` }} />
                    ))}
                </div>
            </div>
        </div>
    );
};
