
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

import { VILLAGE_CENTER } from '../../../data/mockData';
import { useAssets } from '../../../hooks/useAssets';

export const MapVisualizer = ({ activeLayer = 'all' }) => {
    const { assets } = useAssets();

    // Filter assets based on active layer
    const filteredAssets = activeLayer === 'all'
        ? assets
        : activeLayer === 'controls'
            ? assets.filter(asset => asset.category === 'controls' || asset.type === 'Diesel Gen')
            : assets.filter(asset => asset.category === activeLayer);

    const getAssetColor = (asset) => {
        if (asset.status === 'critical') return '#ef4444'; // Red
        if (asset.status === 'warning') return '#f59e0b'; // Amber
        if (asset.status === 'offline') return '#64748b'; // Slate
        if (asset.category === 'water') return '#06b6d4'; // Cyan
        if (asset.category === 'energy') return '#eab308'; // Yellow
        return '#3b82f6'; // Blue default
    };

    return (
        <div className="w-full h-full bg-slate-50 relative">
            <MapContainer
                center={VILLAGE_CENTER}
                zoom={16}
                scrollWheelZoom={true}
                zoomControl={false}
                className="w-full h-full outline-none"
                style={{ background: '#f8fafc' }}
            >
                {/* Modern Light Mode Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Filtered Digital Twin Assets */}
                {filteredAssets.map(asset => (
                    <CircleMarker
                        key={asset.id}
                        center={asset.coords}
                        pathOptions={{
                            color: getAssetColor(asset),
                            fillColor: getAssetColor(asset),
                            fillOpacity: 0.6,
                            weight: 2
                        }}
                        radius={10}
                    >
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                            <div className="text-xs font-bold text-slate-700">
                                {asset.type}
                            </div>
                        </Tooltip>
                        <Popup>
                            <div className="p-2 min-w-[150px]">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-slate-800 text-sm">{asset.type}</h3>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${asset.status === 'normal' ? 'bg-green-100 text-green-700' :
                                        asset.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                            asset.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                        }`}>{asset.status}</span>
                                </div>

                                <div className="space-y-1 text-xs text-slate-600">
                                    <p><span className="font-semibold text-slate-500">ID:</span> {asset.id}</p>
                                    <p><span className="font-semibold text-slate-500">Reading:</span> <span className="text-slate-900 font-medium">{asset.val}</span></p>
                                    <p><span className="font-semibold text-slate-500">Location:</span> {asset.details}</p>
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}

                {/* Custom Overlay Effect for "Scanning" look - Lighter for Light Mode */}
                <div className="leaflet-top leaflet-left w-full h-full pointer-events-none z-[400] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)]"></div>
                </div>
            </MapContainer>
        </div>
    );
};
