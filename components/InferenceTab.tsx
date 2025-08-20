
import React, { useState, useMemo } from 'react';
import { type GeneratedSpa } from '../types';
import { CogIcon } from './icons';

interface InferenceTabProps {
    spas: GeneratedSpa[];
    onManage: (spa: GeneratedSpa) => void;
}

const SpaLedgerCard = ({ spa, onManage }: { spa: GeneratedSpa; onManage: (spa: GeneratedSpa) => void }) => {
    return (
        <div className="bg-gray-800/60 p-4 rounded-lg border border-blue-500/30 glow-blue hover:glow-yellow transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{spa.id}</h3>
                    <span className="text-xs bg-indigo-500/50 text-indigo-200 px-2 py-1 rounded-full font-mono">{spa.strategy}</span>
                </div>
                <p className="text-gray-300 mt-2 text-sm h-10 overflow-hidden">{spa.objective}</p>
            </div>
            <button
                onClick={() => onManage(spa)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
                <CogIcon className="w-5 h-5" />
                Manage
            </button>
        </div>
    );
};

export default function InferenceTab({ spas, onManage }: InferenceTabProps): React.ReactNode {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSpas = useMemo(() => {
        if (!searchTerm) return spas;
        return spas.filter(spa => 
            spa.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spa.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spa.command.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [spas, searchTerm]);

    return (
        <div className="glass neon p-6">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Inference & Ledger</h2>
            <p className="text-center text-gray-300 mb-6">A file explorer for all generated SPAs from completed Dual-LLM missions.</p>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by ID, Mission, or Command..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white transition-all duration-300 input-glow-green"
                />
            </div>

            {filteredSpas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSpas.map(spa => (
                        <SpaLedgerCard key={spa.id} spa={spa} onManage={onManage} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-400">No SPAs Generated Yet</h3>
                    <p className="text-gray-500 mt-2">Complete a mission in the 'DUAL-LLM CONTROL' tab to generate one.</p>
                </div>
            )}
        </div>
    );
}