import React, { useState, useEffect } from 'react';
import { MapVisualizer } from '../Dashboard/MapVisualizer/MapVisualizer';
import { SystemControls } from '../Dashboard/ControlPanel/SystemControls';
import { Layers, Settings2 } from 'lucide-react';

export const FullMapView = ({ initialLayer = 'all', showControls = false }) => {
    const [activeLayer, setActiveLayer] = useState(initialLayer);

    // Update local state if prop changes (e.g. navigation)
    useEffect(() => {
        setActiveLayer(initialLayer);
    }, [initialLayer]);

    return (
        <div className="relative w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200">
            {/* Map Component */}
            <div className="absolute inset-0 z-0">
                <MapVisualizer activeLayer={activeLayer} />
            </div>

            {/* Map Controls Overlay */}
            <div className="absolute top-4 right-4 z-[500] flex flex-col gap-4 items-end">
                {/* Layer Switcher */}
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-slate-200 shadow-lg flex flex-col gap-2 w-40">
                    <div className="p-2 border-b border-slate-100 flex items-center gap-2">
                        <Layers size={18} className="text-slate-600" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Map Layers</span>
                    </div>
                    {[
                        { id: 'all', label: 'All Assets', color: 'bg-blue-100 text-blue-700' },
                        { id: 'water', label: 'Water Network', color: 'bg-cyan-100 text-cyan-700' },
                        { id: 'energy', label: 'Energy Grid', color: 'bg-yellow-100 text-yellow-700' },
                        { id: 'controls', label: 'System Controls', color: 'bg-violet-100 text-violet-700' },
                        { id: 'incidents', label: 'Incidents', color: 'bg-red-100 text-red-700' }
                    ].map(layer => (
                        <button
                            key={layer.id}
                            onClick={() => setActiveLayer(layer.id)}
                            className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors text-left ${activeLayer === layer.id ? layer.color : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            {layer.label}
                        </button>
                    ))}
                </div>

                {/* System Controls Panel - Only show if specifically requested via prop or layer */}
                {(showControls || activeLayer === 'controls') && (
                    <div className="w-80">
                        <SystemControls />
                    </div>
                )}
            </div>
        </div>
    );
};
