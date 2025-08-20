
import React from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: 'agentic' | 'adjectic' | 'config' | 'ajentic' | 'plan' | 'dualLlm' | 'inference') => void;
}

const TABS = [
    { id: 'inference', label: 'INFERENCE & LEDGER' },
    { id: 'dualLlm', label: 'DUAL-LLM CONTROL' },
    { id: 'plan', label: 'ORCHESTRATION PLAN' },
    { id: 'agentic', label: 'AGENTIC CORE' },
    { id: 'adjectic', label: 'ADJECTIC MANIFEST' },
    { id: 'config', label: 'A3 CONFIGURATION' },
    { id: 'ajentic', label: 'AJENTIC NEXUS' },
] as const;


export default function Tabs({ activeTab, setActiveTab }: TabsProps): React.ReactNode {
    return (
        <div className="border-b border-gray-700 flex justify-center flex-wrap">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn text-sm md:text-base text-gray-300 py-2 px-4 rounded-t-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white glow-blue' : 'bg-gray-800/50 border-transparent hover:bg-gray-700/70 hover:glow-yellow'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
