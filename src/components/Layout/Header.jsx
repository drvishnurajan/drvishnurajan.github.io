import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, MapPin, AlertCircle, Menu } from 'lucide-react';
import { useAssets } from '../../hooks/useAssets';

export const Header = ({ onNavigate, onMenuClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const { assets } = useAssets();
    const notificationRef = useRef(null);

    // Filter assets for search
    const searchResults = searchQuery.length > 0
        ? assets.filter(asset =>
            asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Filter assets for notifications (Critical/Warning)
    const notifications = assets.filter(asset => asset.status === 'critical' || asset.status === 'warning');

    const handleSearchSelect = () => {
        setSearchQuery('');
        if (onNavigate) onNavigate('map');
    };

    // Click outside to close notifications
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 md:h-20 w-full flex items-center justify-between px-4 md:px-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm relative z-30">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Breadcrumbs or Title */}
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-800 tracking-tight">Overview</h2>
                    <p className="hidden md:block text-sm text-slate-500">Welcome back, Vishnu Rajan</p>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {/* Search */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-500/50 focus:bg-white focus:ring-1 focus:ring-blue-500/50 transition-all w-32 md:w-64 focus:w-48 md:focus:w-64"
                    />

                    {/* Search Dropdown */}
                    {searchQuery && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 transform transition-all">
                            {searchResults.length > 0 ? (
                                searchResults.map(asset => (
                                    <button
                                        key={asset.id}
                                        onClick={handleSearchSelect}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-start gap-3 border-b border-slate-50 last:border-0"
                                    >
                                        <div className={`p-2 rounded-lg ${asset.category === 'energy' ? 'bg-amber-100 text-amber-600' :
                                            asset.category === 'water' ? 'bg-cyan-100 text-cyan-600' :
                                                'bg-red-100 text-red-600'
                                            }`}>
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{asset.type}</p>
                                            <p className="text-xs text-slate-500">{asset.details} • <span className="uppercase">{asset.status}</span></p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-slate-500">No assets found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                    {/* Notification Bell */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100 outline-none"
                        >
                            <Bell size={20} />
                            {notifications.length > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 ring-2 ring-white"></span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transform transition-all origin-top-right z-50">
                                <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                                    <h3 className="font-semibold text-sm text-slate-700">Notifications</h3>
                                    <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{notifications.length} Active</span>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map(note => (
                                            <div key={note.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3">
                                                <div className="mt-0.5 text-red-500">
                                                    <AlertCircle size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{note.type}: {note.val}</p>
                                                    <p className="text-xs text-slate-500">{note.details}</p>
                                                    <p className="text-[10px] uppercase font-bold text-red-500 mt-1">{note.status} Alert</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                                            No pending alerts.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                            <User size={18} />
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-slate-700">Vishnu Rajan</p>
                            <p className="text-xs text-slate-400">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

