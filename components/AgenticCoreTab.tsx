
import React, { useState } from 'react';
import { type Agent, type ConversationTurn } from '../types';
import { CODEX_DATA } from '../constants';
import Card from './Card';
import { AbacusIcon, GeminiIcon, OpenAiIcon } from './icons';

const WelcomePanel = () => (
    <div className="glass neon p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Select an Agent</h2>
        <p className="text-gray-300">Choose an AI Family member to view their profile and start a conversation.</p>
    </div>
);

const TriChatInterface = ({ agent, conversation, onSendMessage }: { agent: Agent, conversation: ConversationTurn[], onSendMessage: (msg: string) => void }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    return (
        <div className="mt-6">
            <div className="space-y-6 mb-4 h-96 overflow-y-auto p-4 bg-black/20 rounded-lg">
                {conversation.length === 0 && (
                     <div className="text-center text-gray-400 pt-16">
                        <p className="text-lg">The conversation begins here.</p>
                        <p className="text-sm">Your first inference will be answered by Gemini, OpenAI, and Abacus through the lens of {agent.name}.</p>
                    </div>
                )}
                {conversation.map((turn, index) => (
                    <div key={index} className="space-y-4">
                        {/* User Prompt */}
                        <div className="flex justify-end">
                            <div className="p-3 rounded-lg max-w-2xl bg-blue-600 text-white">
                               {turn.user}
                            </div>
                        </div>

                        {/* AI Responses */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 rounded-lg bg-gray-700/80">
                                <h4 className="flex items-center gap-2 text-md font-semibold text-cyan-300 mb-2"><GeminiIcon className="w-5 h-5" /> Gemini</h4>
                                <p className="text-sm text-gray-200">{turn.gemini}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-700/80">
                                <h4 className="flex items-center gap-2 text-md font-semibold text-green-300 mb-2"><OpenAiIcon className="w-5 h-5" /> OpenAI</h4>
                                <p className="text-sm text-gray-200">{turn.openai}</p>
                            </div>
                             <div className="p-3 rounded-lg bg-gray-700/80">
                                <h4 className="flex items-center gap-2 text-md font-semibold text-yellow-300 mb-2"><AbacusIcon className="w-5 h-5" /> Abacus</h4>
                                <p className="text-sm text-gray-200">{turn.abacus}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg p-3 text-white transition-all duration-300 input-glow-green" 
                    placeholder={`Converse with ${agent.name}...`} 
                    required 
                    autoComplete="off"
                />
                <button type="submit" className="gemini-btn font-bold p-3 rounded-lg flex items-center text-white">Send Inference</button>
            </form>
        </div>
    );
};


const AgentDetailPanel = ({ agent }: { agent: Agent }) => {
    const [conversation, setConversation] = useState<ConversationTurn[]>([]);

    const handleSendMessage = (text: string) => {
        // Simulate AI responses from all three LLMs
        const geminiResponse = `[Gemini via ${agent.name}] Considering your prompt '${text}', a creative approach would involve leveraging my multi-modal capabilities to generate a novel solution.`;
        const openaiResponse = `[OpenAI via ${agent.name}] Based on my training, your request for '${text}' can be broken down into the following logical steps, ensuring a structured and comprehensive answer.`;
        const abacusResponse = `[Abacus via ${agent.name}] The most precise and data-driven response to '${text}' requires a quantitative analysis. The key variables are...`;
        
        const newTurn: ConversationTurn = {
            user: text,
            gemini: geminiResponse,
            openai: openaiResponse,
            abacus: abacusResponse,
        };

        setConversation(prev => [...prev, newTurn]);
    };

    return (
        <div className="glass neon p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 text-center md:w-1/4">
                    <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto border-2 border-blue-400">
                        <span className="text-4xl font-bold">{agent.name.charAt(0)}</span>
                    </div>
                    <h2 className="text-2xl font-bold mt-2 text-white">{agent.name}</h2>
                    <p className="text-blue-300">{agent.role}</p>
                </div>
                <div className="flex-grow md:w-3/4">
                     <p className="text-gray-300 border-l-4 border-blue-400 pl-4 mb-4">{agent.bio}</p>
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-white">Primary Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                        {agent.focus_areas.map(area => <span key={area} className="bg-gray-600 text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">{area}</span>)}
                    </div>
                </div>
            </div>

            <TriChatInterface agent={agent} conversation={conversation} onSendMessage={handleSendMessage} />
        </div>
    );
}


export default function AgenticCoreTab(): React.ReactNode {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">AI Family Agents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
                {CODEX_DATA.ai_family.map(agent => (
                    <Card
                        key={agent.name}
                        title={agent.name}
                        subtitle={agent.role}
                        onClick={() => setSelectedAgent(agent)}
                        isSelected={selectedAgent?.name === agent.name}
                    />
                ))}
            </div>
            {selectedAgent ? <AgentDetailPanel agent={selectedAgent} /> : <WelcomePanel />}
        </div>
    );
}