
import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { DashboardCard } from '../Shared/DashboardCard';

const incidents = [
    { id: 'INC-2024-001', type: 'Critical', source: 'Water Tank A', message: 'Water level below 15%', time: '10:30 AM', status: 'Pending' },
    { id: 'INC-2024-002', type: 'Warning', source: 'Energy Grid', message: 'Voltage fluctuation detected', time: '09:15 AM', status: 'Investigating' },
    { id: 'INC-2024-003', type: 'resolved', source: 'Waste Mgmt', message: 'Bin #42 Full', time: 'Yesterday', status: 'Resolved' },
    { id: 'INC-2024-004', type: 'Critical', source: 'Traffic', message: 'Congestion at Gate 2', time: 'Yesterday', status: 'Resolved' },
    { id: 'INC-2024-005', type: 'Warning', source: 'Sensor Hub 5', message: 'Connection Timeout', time: '2 days ago', status: 'Resolved' },
];

export const Incidents = () => {
    return (
        <div className="p-6 h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Incident Management</h2>
                    <p className="text-slate-500">Real-time alerts and issue tracking</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold border border-red-200">2 Active</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">3 Resolved</span>
                </div>
            </div>

            <DashboardCard className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Incident ID</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {incidents.map((inc) => (
                                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-sm font-medium text-slate-700">{inc.id}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${inc.type === 'Critical' ? 'bg-red-50 text-red-600 border-red-100' :
                                                inc.type === 'Warning' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                            {inc.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{inc.source}</td>
                                    <td className="p-4 text-sm text-slate-800 font-medium">{inc.message}</td>
                                    <td className="p-4 text-sm text-slate-500 flex items-center gap-1">
                                        <Clock size={14} /> {inc.time}
                                    </td>
                                    <td className="p-4">
                                        <span className={`flex items-center gap-1.5 text-sm font-medium ${inc.status === 'Resolved' ? 'text-green-600' :
                                                inc.status === 'Pending' ? 'text-red-500' : 'text-blue-500'
                                            }`}>
                                            {inc.status === 'Resolved' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                            {inc.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardCard>
        </div>
    );
};
