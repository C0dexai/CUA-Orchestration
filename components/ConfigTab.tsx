
import React, { useState } from 'react';
import { type A2ARule } from '../types';
import { INITIAL_A2A_RULES, INITIAL_MCP_MANIFESTS, CODEX_DATA } from '../constants';

type ConfigView = 'a2a' | 'mcp';

interface ConfigTabProps {
    onOrchestrationStart: () => void;
}

export default function ConfigTab({ onOrchestrationStart }: ConfigTabProps): React.ReactNode {
    const [activeView, setActiveView] = useState<ConfigView>('a2a');
    const [a2aRules, setA2aRules] = useState<A2ARule[]>(INITIAL_A2A_RULES);
    const [mcpManifests] = useState(INITIAL_MCP_MANIFESTS);
    const [selectedMcp, setSelectedMcp] = useState<string>(Object.keys(mcpManifests)[0]);
    
    const [newRule, setNewRule] = useState({ trigger: '', command: '' });
    const [mcpBrief, setMcpBrief] = useState('');

    const handleAddRule = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRule.trigger && newRule.command) {
            setA2aRules(prev => [...prev, newRule]);
            setNewRule({ trigger: '', command: '' });
        }
    };

    const handleInvokeMcp = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simulation. A real app would dispatch an action.
        const bookmark = CODEX_DATA.chained_bookmarks.find(b => selectedMcp.toLowerCase().includes(b.name.toLowerCase().split(' ')[0]));
        if(bookmark) {
            alert(`Invoking orchestration for ${selectedMcp} with brief: "${mcpBrief || 'No brief provided'}".\nSwitch to 'ADJECTIC MANIFEST' tab to see execution.`);
             onOrchestrationStart();
        } else {
             alert(`Error: Could not find a matching orchestration for MCP: ${selectedMcp}`);
        }
    };

    return (
        <div className="glass neon p-6">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">A3 Engine Configuration</h2>
            <p className="text-center text-gray-300 mb-6">Manage parsers, manifests, and connectivity rules for the CUA ecosystem.</p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-lg mb-2 text-white">Configuration Menu</h3>
                    <div className="space-y-2">
                        <button onClick={() => setActiveView('a2a')} className={`w-full text-left p-3 rounded transition-colors ${activeView === 'a2a' ? 'bg-indigo-600 text-white' : 'bg-gray-800 hover:bg-indigo-600/50'}`}>A2A Parser Rules</button>
                        <button onClick={() => setActiveView('mcp')} className={`w-full text-left p-3 rounded transition-colors ${activeView === 'mcp' ? 'bg-indigo-600 text-white' : 'bg-gray-800 hover:bg-indigo-600/50'}`}>MCP Manifest Registry</button>
                    </div>
                </div>
                <div className="md:col-span-2">
                    {activeView === 'a2a' && (
                         <div className="bg-gray-900/50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-2 text-white">A2A Connectivity Parser</h3>
                            <div className="space-y-2 text-sm font-mono mb-4 h-48 overflow-y-auto">
                                {a2aRules.map((rule, i) => (
                                    <div key={i} className="p-2 bg-gray-800 rounded">"<span className="text-sky-300">{rule.trigger}</span>" -&gt; <span className="text-green-300">{rule.command}</span></div>
                                ))}
                            </div>
                            <form onSubmit={handleAddRule} className="space-y-3 border-t border-gray-700 pt-4">
                                <h4 className="font-semibold text-white">Register New Rule</h4>
                                <input type="text" value={newRule.trigger} onChange={e => setNewRule(p => ({ ...p, trigger: e.target.value }))} placeholder="Trigger Phrase (e.g., 'review code')" className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                <input type="text" value={newRule.command} onChange={e => setNewRule(p => ({ ...p, command: e.target.value }))} placeholder="CLI Command (e.g., 'connect KARA SOPHIA')" className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                <button type="submit" className="w-full gemini-btn text-white font-bold py-2 px-4 rounded-lg">Register Rule</button>
                            </form>
                        </div>
                    )}
                    {activeView === 'mcp' && (
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-2 text-white">MCP Manifest Viewer</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {Object.keys(mcpManifests).map(name => (
                                    <button key={name} onClick={() => setSelectedMcp(name)} className={`text-sm p-2 rounded transition-colors ${selectedMcp === name ? 'bg-indigo-600 text-white' : 'bg-gray-800 hover:bg-indigo-600/50'}`}>{name}</button>
                                ))}
                            </div>
                            <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto h-60 bg-black/50 p-2 rounded">{mcpManifests[selectedMcp]}</pre>
                            <div className="mt-4 border-t border-gray-700 pt-4">
                                <h4 className="font-semibold mb-2 text-white">Invoke Selected Manifest</h4>
                                <form onSubmit={handleInvokeMcp} className="space-y-3">
                                    <input type="text" value={mcpBrief} onChange={e => setMcpBrief(e.target.value)} placeholder="Enter a brief for this run..." className="w-full bg-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                                    <button type="submit" className="w-full gemini-btn text-white font-bold py-2 px-4 rounded-lg">Invoke MCP</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}