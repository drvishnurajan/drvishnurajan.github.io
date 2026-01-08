import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAssets } from '../../../hooks/useAssets';
import { SystemControls } from './SystemControls';

const data = [
    { time: '00:00', load: 300 },
    { time: '04:00', load: 250 },
    { time: '08:00', load: 450 },
    { time: '12:00', load: 600 },
    { time: '16:00', load: 550 },
    { time: '20:00', load: 400 },
    { time: '23:59', load: 350 },
];

const ChartCard = ({ title, children }) => (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl flex flex-col h-64">
        <h3 className="text-slate-600 font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
        <div className="flex-1 w-full min-h-0">
            {children}
        </div>
    </div>
);

const AlertsPanel = () => {
    const { assets } = useAssets();
    const alerts = assets.filter(asset => asset.status === 'critical' || asset.status === 'warning');

    return (
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl flex flex-col h-64 overflow-hidden">
            <h3 className="text-slate-600 font-semibold mb-4 text-sm uppercase tracking-wider flex items-center justify-between">
                Active Alerts
                {alerts.length > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full border border-red-200">{alerts.length} Active</span>
                )}
            </h3>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {alerts.length > 0 ? (
                    alerts.map(alert => (
                        <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-xl border ${alert.status === 'critical' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                            <AlertCircle size={18} className={`${alert.status === 'critical' ? 'text-red-500' : 'text-orange-500'} shrink-0 mt-0.5`} />
                            <div>
                                <h4 className={`${alert.status === 'critical' ? 'text-red-700' : 'text-orange-700'} text-sm font-medium`}>{alert.type} - {alert.status}</h4>
                                <p className={`${alert.status === 'critical' ? 'text-red-600/80' : 'text-orange-600/80'} text-xs mt-1`}>{alert.details}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-green-700 text-sm font-medium">All Systems Normal</h4>
                            <p className="text-green-600/80 text-xs mt-1">No active alerts reported.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const AssetGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1200px] ml-auto">
            <ChartCard title="Hourly Load Profile (kW)">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={40} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b' }}
                            itemStyle={{ color: '#f59e0b' }}
                        />
                        <Area type="monotone" dataKey="load" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            <SystemControls />

            <AlertsPanel />
        </div>
    );
};
