

import React, { useState, useEffect } from 'react';
import { type GeneratedSpa } from '../types';
import { RocketLaunchIcon } from './icons';

interface SpaManagementPanelProps {
    isOpen: boolean;
    onClose: () => void;
    spa: GeneratedSpa | null;
    onPreview: (spa: GeneratedSpa) => void;
    onReenact: (spa: GeneratedSpa) => void;
    onShareContext: (spa: GeneratedSpa) => void;
    onUpdateSpa: (updatedSpa: GeneratedSpa) => void;
}

export default function SpaManagementPanel({ isOpen, onClose, spa, onPreview, onReenact, onShareContext, onUpdateSpa }: SpaManagementPanelProps): React.ReactNode {
    const [apiName, setApiName] = useState('');
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        if (spa) {
            setApiName(spa.env?.API_NAME || '');
            setApiKey(spa.env?.API_KEY || '');
        }
    }, [spa]);

    if (!spa) return null;

    const handleAction = (action: (spa: GeneratedSpa) => void) => {
        action(spa);
    };

    const handleSaveEnv = () => {
        const updatedSpa: GeneratedSpa = {
            ...spa,
            env: {
                ...spa.env,
                API_NAME: apiName,
                API_KEY: apiKey,
            },
        };
        onUpdateSpa(updatedSpa);
        alert('Environment variables saved!');
    };

    return (
        <div className={`fixed top-0 right-0 h-full w-[450px] max-w-[90vw] transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full glass glass-strong neon p-6 overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Manage SPA: {spa.id}</h2>
                        <p className="text-sm text-indigo-300 font-mono">{spa.strategy}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>
                
                <div className="flex-grow flex flex-col">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-1">Mission Objective</h3>
                            <p className="p-3 bg-gray-900/50 rounded-lg text-gray-300 text-sm">{spa.objective}</p>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-1">Generated Command</h3>
                            <pre className="p-3 bg-black/50 rounded-lg text-green-300 text-xs font-mono whitespace-pre-wrap"><code>{spa.command}</code></pre>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
                        <h3 className="text-xl font-bold text-white text-center">Environment Variables</h3>
                        <div>
                            <label htmlFor="apiName" className="block text-sm font-medium text-gray-300 mb-1">API_NAME</label>
                            <input
                                id="apiName"
                                type="text"
                                value={apiName}
                                onChange={(e) => setApiName(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white transition-all duration-300 input-glow-green"
                                placeholder="e.g., GEMINI_API"
                            />
                        </div>
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-1">API_KEY</label>
                            <input
                                id="apiKey"
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white transition-all duration-300 input-glow-green"
                                placeholder="Enter API Key for inference"
                            />
                        </div>
                        <button
                            onClick={handleSaveEnv}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                            Save Environment
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
                         <h3 className="text-xl font-bold text-white text-center">Actions</h3>
                        <button 
                            onClick={() => handleAction(onPreview)}
                            className="w-full text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors bg-blue-600 hover:bg-blue-700">
                            <RocketLaunchIcon className="w-5 h-5"/>
                            Preview SPA
                        </button>
                         <button 
                            onClick={() => handleAction(onShareContext)}
                            className="w-full text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors bg-purple-600 hover:bg-purple-700">
                            Share Context with Orchestrator
                        </button>
                        <button
                            onClick={() => handleAction(onReenact)}
                            className="w-full gemini-btn text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                            Re-enact Mission
                        </button>
                    </div>

                </div>
                 <footer className="text-center text-xs text-gray-500 p-2 mt-4 flex-shrink-0">
                    Generated on {new Date(spa.createdAt).toLocaleString()}
                </footer>
            </div>
        </div>
    );
}