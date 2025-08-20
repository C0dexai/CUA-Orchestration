
import React, { useState, useCallback } from 'react';
import { type ChainedBookmark, type RunningOrchestration, type OrchestrationStep } from '../types';
import { CODEX_DATA } from '../constants';
import Card from './Card';
import { LoaderIcon } from './icons';

interface AdjecticManifestTabProps {
    openInstructions: () => void;
    onOrchestrationComplete: (orchestration: RunningOrchestration) => void;
}

const OrchestrationRunner = ({ runningOrchestration }: { runningOrchestration: RunningOrchestration }) => {
    return (
        <div className="glass neon p-6">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
                Executing: {runningOrchestration.bookmark.name}
            </h2>
            <div className="space-y-4">
                {runningOrchestration.steps.map(step => (
                    <div key={step.id} className="p-4 rounded-lg bg-gray-900/70 border border-gray-700">
                        <div className="flex items-center gap-4">
                            <span className={`flex-shrink-0 w-8 h-8 rounded-full text-white font-bold flex items-center justify-center ${step.status === 'complete' ? 'bg-green-600' : 'bg-indigo-600'}`}>
                                {step.status === 'complete' ? '✔' : step.id}
                            </span>
                            <div>
                                <h4 className="text-lg font-bold text-white">Tool: <span className="font-mono">{step.tool}</span></h4>
                                <p className="text-sm text-blue-300">Agent: {step.agent}</p>
                            </div>
                            {step.status === 'running' && <div className="ml-auto text-blue-400"><LoaderIcon className="w-6 h-6" /></div>}
                        </div>
                        {step.status === 'complete' && (
                             <div className="mt-3 pl-12 text-sm space-y-2">
                                <p><strong>Input:</strong> <span className="text-gray-400 font-mono">{step.input}</span></p>
                                <p><strong>Output:</strong> <span className="text-green-400 font-mono">{step.output}</span></p>
                            </div>
                        )}
                    </div>
                ))}
                 {runningOrchestration.steps.every(s => s.status === 'complete') && (
                     <div className="text-center text-green-400 font-bold p-4 mt-4 bg-green-900/50 rounded-lg">
                        Orchestration Complete. You can now export this workflow from the AJENTIC NEXUS CLI using: export "{runningOrchestration.bookmark.name}.it"
                    </div>
                 )}
            </div>
        </div>
    );
};

export default function AdjecticManifestTab({ openInstructions, onOrchestrationComplete }: AdjecticManifestTabProps): React.ReactNode {
    const [runningOrchestration, setRunningOrchestration] = useState<RunningOrchestration | null>(null);
    const [selectedBookmarkName, setSelectedBookmarkName] = useState<string | null>(null);

    const executeChainedBookmark = useCallback(async (bookmark: ChainedBookmark, initialBrief: string) => {
        setSelectedBookmarkName(bookmark.name);
        let currentSteps: OrchestrationStep[] = [];
        setRunningOrchestration({ bookmark, initialBrief, steps: [] });

        let previousOutput = initialBrief;

        for (let i = 0; i < bookmark.chain.length; i++) {
            const chainStep = bookmark.chain[i];
            const tool = CODEX_DATA.tools.find(t => t.name === chainStep.tool);
            if (!tool) continue;

            const newStep: OrchestrationStep = {
                id: i + 1,
                tool: tool.name,
                agent: tool.primary_agent,
                status: 'running',
                input: previousOutput,
                output: '',
            };
            
            currentSteps = [...currentSteps, newStep];
            setRunningOrchestration({ bookmark, initialBrief, steps: [...currentSteps] });
            
            await new Promise(resolve => setTimeout(resolve, 1500));

            const outputId = `output_${tool.name}_${i}.json`;
            previousOutput = outputId;
            
            currentSteps[i] = { ...currentSteps[i], status: 'complete', output: outputId };
            setRunningOrchestration({ bookmark, initialBrief, steps: [...currentSteps] });
        }
        
        const finalOrchestration = { bookmark, initialBrief, steps: currentSteps };
        setRunningOrchestration(finalOrchestration);
        onOrchestrationComplete(finalOrchestration);

    }, [onOrchestrationComplete]);

    const handleBookmarkClick = (bookmark: ChainedBookmark) => {
        setRunningOrchestration(null);
        executeChainedBookmark(bookmark, `User-provided brief for ${bookmark.name}.`);
    };

    return (
        <div>
            {!runningOrchestration ? (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">Available Orchestrations & Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CODEX_DATA.chained_bookmarks.map(bookmark => (
                            <Card
                                key={bookmark.name}
                                title={bookmark.name}
                                subtitle={bookmark.description}
                                onClick={() => handleBookmarkClick(bookmark)}
                                isSelected={selectedBookmarkName === bookmark.name}
                                borderColor="border-indigo-500"
                            />
                        ))}
                        <Card
                            title="Create Custom Instruction"
                            subtitle="Define SYSTEM, AI, and USER personas for this session."
                            onClick={openInstructions}
                            borderColor="border-green-500"
                        />
                    </div>
                </div>
            ) : (
                <OrchestrationRunner runningOrchestration={runningOrchestration} />
            )}
        </div>
    );
}