
import React from 'react';
import type { ViewType } from '../types';
// Fix: Import ArrowLeftIcon from constants.tsx
import { ArrowLeftIcon } from '../constants'; 

interface SettingsViewProps {
  setActiveView: (view: ViewType) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ setActiveView }) => {
  return (
    <div className="h-full flex flex-col gap-6 bg-white/60 backdrop-blur-lg border border-black/5 rounded-2xl shadow-lg shadow-black/5 p-6">
      <div className="flex items-center gap-4">
        {/* SettingsView does not currently have a back button. If it did, it would look like this: */}
        {/* <button onClick={() => setActiveView('Design of Experiment')} className="p-2 rounded-full hover:bg-black/5 text-stone-600 hover:text-stone-900 transition-colors" aria-label="Go back to workspace">
            <ArrowLeftIcon className="w-6 h-6"/>
        </button> */}
        <h2 className="text-3xl font-bold text-stone-900">Settings</h2>
      </div>
      
      <div className="space-y-6 max-w-2xl">
        {/* Theme Toggle */}
        <div className="bg-white/70 p-4 rounded-lg border border-black/5">
          <h3 className="font-semibold text-stone-800 mb-2">Theme</h3>
          <p className="text-sm text-stone-600">Theme selection is coming soon.</p>
        </div>

        {/* Voice/Text Preferences */}
        <div className="bg-white/70 p-4 rounded-lg border border-black/5">
          <h3 className="font-semibold text-stone-800 mb-2">Voice & Text Preferences</h3>
          <p className="text-sm text-stone-600">Customize your interaction preferences here in a future update.</p>
        </div>

        {/* File Limits */}
        <div className="bg-white/70 p-4 rounded-lg border border-black/5">
          <h3 className="font-semibold text-stone-800 mb-2">File Limits</h3>
          <p className="text-sm text-stone-600">Information about file upload limits will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
