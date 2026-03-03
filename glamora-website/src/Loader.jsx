import React, { useState, useEffect } from 'react';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading time
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Start fade out animation
        setTimeout(() => {
          setIsFadingOut(true);
          // Notify parent after fade out completes
          setTimeout(() => {
            onLoadingComplete();
          }, 800); // 800ms fade out duration
        }, 500); // Wait 500ms at 100% before fading out
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center w-full max-w-sm px-6">
        {/* Logo Text Animation */}
        <div className="overflow-hidden mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.3em] text-white uppercase relative">
            GLAM<span className="text-orange-600">O</span>RA
          </h1>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mt-4">
          {/* Animated Progress Line */}
          <div 
            className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Percentage & Text */}
        <div className="flex justify-between w-full mt-4 text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">
          <span>Loading Experience</span>
          <span className="text-white font-medium">{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
