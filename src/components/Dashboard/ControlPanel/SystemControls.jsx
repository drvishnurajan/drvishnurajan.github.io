import React from 'react';
import { Power, Activity, Settings2 } from 'lucide-react';
import { useAssets } from '../../../hooks/useAssets';

const ControlItem = ({ asset, onToggle }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${asset.val === 'Active' || asset.val === 'On' ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                <Power size={18} />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-700">{asset.type}</p>
                <p className="text-xs text-slate-500">{asset.details}</p>
            </div>
        </div>

        <button
            onClick={() => onToggle(asset)}
            className={`
                relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${asset.val === 'Active' || asset.val === 'On' ? 'bg-green-500' : 'bg-slate-300'}
            `}
        >
            <span
                className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
                    ${asset.val === 'Active' || asset.val === 'On' ? 'translate-x-6' : 'translate-x-0'}
                `}
            />
        </button>
    </div>
);

export const SystemControls = () => {
    const { assets, updateAsset } = useAssets();

    // Filter for controllable assets - for now, things that have 'Active'/'Inactive' or 'On'/'Off' values
    // We can also use a specific property like 'isControllable' if we add it to the schema later.
    // For this demo, we'll look for specific types or categories.
    const controllableAssets = assets.filter(a =>
        ['Street Lights', 'Irrigation Pump', 'Diesel Gen'].includes(a.type) ||
        a.category === 'controls'
    );

    const handleToggle = async (asset) => {
        const newVal = (asset.val === 'Active' || asset.val === 'On') ? 'Off' : 'Active';
        try {
            // Optimistic UI update (optional, but Realtime DB is fast enough usually)
            await updateAsset(asset.firebaseId || asset.id, {
                val: newVal,
                // Also update status logic if needed:
                status: newVal === 'Active' ? 'normal' : 'offline'
            });
        } catch (error) {
            console.error("Failed to toggle asset:", error);
            alert("Failed to update system state. Check connection.");
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl flex flex-col h-64 overflow-hidden">
            <h3 className="text-slate-600 font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <Settings2 size={16} />
                System Controls
            </h3>

            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {controllableAssets.length > 0 ? (
                    controllableAssets.map(asset => (
                        <ControlItem key={asset.id} asset={asset} onToggle={handleToggle} />
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm p-4 text-center">
                        <Activity size={24} className="mb-2 opacity-50" />
                        No controllable systems online.
                    </div>
                )}
            </div>
        </div>
    );
};
