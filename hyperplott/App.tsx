
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DesignOfExperimentView from './components/DesignOfExperimentView';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="h-screen w-full text-slate-900 font-sans flex overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen key="welcome" onAnimationEnd={() => setShowWelcome(false)} />
        ) : (
          <div key="main-content" className="flex-1 flex flex-col min-h-0 relative">
            <main className="flex-grow h-full overflow-hidden relative">
              <DesignOfExperimentView setActiveView={() => {}} />
            </main>
            <footer className="flex-shrink-0 text-center text-[10px] text-slate-400 p-2 border-t border-slate-50 bg-white/50 z-10 font-bold tracking-[0.1em] uppercase">
              HyperPlott Universal Optimization Engine • Scientific Precision Mode
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
