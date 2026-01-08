import React, { useEffect, useState } from 'react';

export const SplashScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Display for 2.5 seconds total
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Gram Vista
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 font-medium uppercase tracking-widest">
                        Sahrdaya CPS Dashboard
                    </p>
                </div>

                <div className="w-64 md:w-96 relative">
                    <img
                        src={`${import.meta.env.BASE_URL}full.png`}
                        alt="Sahrdaya CPS"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};
