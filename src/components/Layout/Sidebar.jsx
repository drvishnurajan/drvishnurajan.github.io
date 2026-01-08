
import {
    LayoutDashboard,
    Map as MapIcon,
    Zap,
    Droplets,
    AlertTriangle,
    Settings,
    Activity
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${active
                ? 'bg-blue-600/10 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)] border border-blue-200'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:translate-x-1'}
    `}
    >
        <Icon size={20} className={active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span className="font-medium tracking-wide text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_currentColor]" />}
    </button>
);

export const Sidebar = ({ activeView = 'dashboard', onNavigate, isOpen, onClose }) => {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-72 lg:w-64 h-full
                bg-white/80 backdrop-blur-xl border-r border-slate-200
                flex flex-col
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <img src={`${import.meta.env.BASE_URL}shr.png`} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 leading-tight">
                            Gram Vista
                        </h1>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Sahrdaya CPS Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <div className="px-4 pb-2 text-xs font-semibold text-slate-600 uppercase tracking-widest">Main</div>
                    <NavItem icon={LayoutDashboard} label="Dashboard" active={activeView === 'dashboard'} onClick={() => { onNavigate('dashboard'); onClose?.(); }} />
                    <NavItem icon={MapIcon} label="City Map" active={activeView === 'map'} onClick={() => { onNavigate('map'); onClose?.(); }} />
                    <NavItem icon={Activity} label="Live Monitoring" active={activeView === 'live'} onClick={() => { onNavigate('live'); onClose?.(); }} />

                    <div className="px-4 pb-2 pt-6 text-xs font-semibold text-slate-600 uppercase tracking-widest">Utilities</div>
                    <NavItem icon={Zap} label="Energy Grid" active={activeView === 'energy'} onClick={() => { onNavigate('energy'); onClose?.(); }} />
                    <NavItem icon={Droplets} label="Water System" active={activeView === 'water'} onClick={() => { onNavigate('water'); onClose?.(); }} />
                    <NavItem icon={Settings} label="System Controls" active={activeView === 'controls'} onClick={() => { onNavigate('controls'); onClose?.(); }} />
                    <NavItem icon={AlertTriangle} label="Incidents" active={activeView === 'incidents'} onClick={() => { onNavigate('incidents'); onClose?.(); }} />
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <NavItem icon={Settings} label="System Config" active={activeView === 'settings'} onClick={() => { onNavigate('settings'); onClose?.(); }} />
                </div>
            </aside>
        </>
    );
};
