import { Zap, Sun, Droplets, Activity } from 'lucide-react';
import { useAssets } from '../../../hooks/useAssets';

const KPI = ({ label, value, unit, icon: Icon, color }) => (
    <div className="bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-lg w-full sm:w-auto min-w-[200px] hover:bg-white/80 transition-colors cursor-default group">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">{value}</span>
                <span className="text-sm text-slate-600 font-medium">{unit}</span>
            </div>
        </div>
    </div>
);

export const KPIStats = () => {
    const { assets } = useAssets();

    // Calculate dynamic stats
    const totalConsumption = assets
        .filter(a => a.category === 'energy' && a.val && a.val.includes('kW'))
        .reduce((acc, curr) => acc + parseInt(curr.val.replace('kW', '') || 0), 0);

    const activeAlerts = assets.filter(a => a.status === 'critical').length;
    const functioningWater = assets.filter(a => a.category === 'water' && a.status === 'normal').length;
    const totalWater = assets.filter(a => a.category === 'water').length;

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <KPI label="Total Load" value={totalConsumption || 0} unit="kW" icon={Zap} color="bg-yellow-500" />
            <KPI label="Peak Demand" value={Math.round((totalConsumption || 0) * 1.2)} unit="kW" icon={Activity} color="bg-orange-500" />
            <KPI label="Systems Active" value={`${functioningWater}/${totalWater}`} unit="Water" icon={Droplets} color="bg-blue-500" />
            <KPI label="Active Alerts" value={activeAlerts} unit="Critical" icon={Sun} color={activeAlerts > 0 ? "bg-red-500" : "bg-green-500"} />
        </div>
    );
};
