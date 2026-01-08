import { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { FullMapView } from './components/Views/FullMapView';
import { LiveMonitoring } from './components/Views/LiveMonitoring';
import { SystemConfig } from './components/Views/PlaceholderViews';
import { SplashScreen } from './components/Layout/SplashScreen';


function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [showSplash, setShowSplash] = useState(true);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <Dashboard />;
            case 'map': return <FullMapView initialLayer="all" />;
            case 'live': return <LiveMonitoring />;
            case 'energy': return <FullMapView initialLayer="energy" />;
            case 'water': return <FullMapView initialLayer="water" />;
            case 'controls': return <FullMapView initialLayer="controls" showControls={true} />;
            case 'incidents': return <FullMapView initialLayer="incidents" />;
            case 'settings': return <SystemConfig />;
            default: return <Dashboard />;
        }
    };

    return (
        <>
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            <MainLayout activeView={activeView} setActiveView={setActiveView}>
                {renderView()}
            </MainLayout>
        </>
    );
}

export default App;
