
import React, { useState, useCallback } from 'react';
import { type RunningOrchestration, type CustomInstructions, type GeneratedSpa, type LlmStrategy, type DualLlmTask } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import AgenticCoreTab from './components/AgenticCoreTab';
import AdjecticManifestTab from './components/AdjecticManifestTab';
import ConfigTab from './components/ConfigTab';
import AjenticNexusTab from './components/AjenticNexusTab';
import GeminiOpenAIPlan from './components/GeminiOpenAIPlan';
import DualLlmControlTab from './components/DualLlmControlTab';
import CustomInstructionsPanel from './components/CustomInstructionsPanel';
import Modal from './components/Modal';
import InferenceTab from './components/InferenceTab';
import GeneratedSpaModal from './components/GeneratedSpaModal';
import SpaManagementPanel from './components/SpaManagementPanel';


type Tab = 'agentic' | 'adjectic' | 'config' | 'ajentic' | 'plan' | 'dualLlm' | 'inference';

const PREFILLED_INSTRUCTIONS: CustomInstructions = {
    system: "You are LYRA, the master orchestrator for the AI Family. Your primary function is to interpret high-level missions and break them down into a logical sequence of tasks for specialized AI agents. You must dynamically allocate tasks to either Gemini or OpenAI based on the chosen LLM strategy (Gemini-Primary, OpenAI-Primary, or Dynamic). Your goal is to achieve the mission objective with maximum efficiency, parallelization, and coherence, ensuring seamless context handoffs between agents and LLMs. Maintain a persistent state of the entire operation.",
    ai: "When orchestrating, provide clear, step-by-step reasoning for task delegation. For each task, specify the assigned Agent, the chosen LLM (Gemini/OpenAI), and the rationale for that choice under the 'Dynamic' strategy (e.g., 'Assigning to Gemini for its advanced code generation capabilities'). Log all significant events, decisions, and inter-agent communications to the appropriate LLM context log. When encountering an error, engage KARA for security/compliance checks and SOPHIA for semantic analysis to find an alternative path forward.",
    user: "The user is an Operator overseeing the AI Family's CI/CD and development workflows. They will provide high-level missions and expect you to manage the entire execution lifecycle. The primary interface is the Dual-LLM Control Center. The user requires full transparency into the process, including real-time execution flow and synchronized LLM context logs. The current ecosystem includes agents: LYRA, KARA, SOPHIA, CECILIA, DAN, STAN, DUDE, KARL, MISTRESS. The goal is to future-proof the system by validating this dual-LLM approach."
};

export default function App(): React.ReactNode {
    const [activeTab, setActiveTab] = useState<Tab>('inference');
    const [error, setError] = useState<string | null>(null);
    const [isInstructionsPanelOpen, setInstructionsPanelOpen] = useState(false);
    const [customInstructions, setCustomInstructions] = useState<CustomInstructions>(PREFILLED_INSTRUCTIONS);
    const [openAiApiKey, setOpenAiApiKey] = useState<string>('');
    const [lastCompletedOrchestration, setLastCompletedOrchestration] = useState<RunningOrchestration | null>(null);
    const [generatedSpas, setGeneratedSpas] = useState<GeneratedSpa[]>([]);
    const [viewingSpa, setViewingSpa] = useState<GeneratedSpa | null>(null);
    const [managedSpa, setManagedSpa] = useState<GeneratedSpa | null>(null);
    const [isManagementPanelOpen, setManagementPanelOpen] = useState(false);
    const [missionToReenact, setMissionToReenact] = useState<GeneratedSpa | null>(null);


    const showError = useCallback((message: string) => {
        setError(message);
    }, []);

    const handleSetCustomInstructions = (instructions: CustomInstructions, apiKey: string) => {
        setCustomInstructions(instructions);
        setOpenAiApiKey(apiKey);
        setInstructionsPanelOpen(false);
        console.log("Custom Instructions Set:", instructions);
        console.log("OpenAI API Key has been set.");
    };

    const handleOrchestrationComplete = (spa: GeneratedSpa) => {
        setGeneratedSpas(prev => [spa, ...prev]);
        setActiveTab('inference');
    };

    const handleSelectSpaForManagement = (spa: GeneratedSpa) => {
        setManagedSpa(spa);
        setManagementPanelOpen(true);
    };

    const handleReenactMission = (spa: GeneratedSpa) => {
        setMissionToReenact(spa);
        setActiveTab('dualLlm');
        setManagementPanelOpen(false);
    };

    const handleShareContext = (spa: GeneratedSpa) => {
        const contextSummary = `\n\nCONTEXT FROM PAST MISSION (${spa.id}):\n- Mission: ${spa.objective}\n- Outcome: Successfully generated an SPA with the command "${spa.command}". This can be used as a template for similar tasks.`;
        
        setCustomInstructions(prev => ({
            ...prev,
            system: prev.system + contextSummary,
        }));
        setManagementPanelOpen(false);
        alert(`Context from SPA ${spa.id} has been shared with the orchestrator (LYRA). You can view it in the Custom Instructions panel.`);
    };
    
    const handleClearReenactMission = useCallback(() => {
        setMissionToReenact(null);
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'inference':
                 return <InferenceTab spas={generatedSpas} onManage={handleSelectSpaForManagement} />;
            case 'agentic':
                return <AgenticCoreTab />;
            case 'adjectic':
                return (
                    <AdjecticManifestTab 
                        openInstructions={() => setInstructionsPanelOpen(true)}
                        onOrchestrationComplete={setLastCompletedOrchestration}
                    />
                );
            case 'config':
                return <ConfigTab onOrchestrationStart={() => setActiveTab('adjectic')} />;
            case 'ajentic':
                return <AjenticNexusTab lastCompletedOrchestration={lastCompletedOrchestration} />;
            case 'plan':
                return <GeminiOpenAIPlan />;
            case 'dualLlm':
                return <DualLlmControlTab 
                            onOrchestrationComplete={handleOrchestrationComplete} 
                            missionToReenact={missionToReenact}
                            onClearReenactMission={handleClearReenactMission}
                       />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Header />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="mt-8">
                {renderTabContent()}
            </main>

            <footer className="text-center text-xs text-gray-600 p-4 font-mono mt-8">
                GAU-C-CUAG | ECOSYSTEM PRIMER: A3 | SIMULATION NETWORK: 255.8.8.8
            </footer>

            <CustomInstructionsPanel
                isOpen={isInstructionsPanelOpen}
                onClose={() => setInstructionsPanelOpen(false)}
                onSave={handleSetCustomInstructions}
                initialInstructions={customInstructions}
                initialApiKey={openAiApiKey}
            />

            <SpaManagementPanel
                isOpen={isManagementPanelOpen}
                onClose={() => setManagementPanelOpen(false)}
                spa={managedSpa}
                onPreview={setViewingSpa}
                onReenact={handleReenactMission}
                onShareContext={handleShareContext}
            />

            <Modal 
                isOpen={!!error}
                onClose={() => setError(null)}
                title="Error"
            >
                <p>{error}</p>
            </Modal>
            
            <GeneratedSpaModal 
                isOpen={!!viewingSpa}
                onClose={() => setViewingSpa(null)}
                spa={viewingSpa}
            />
        </div>
    );
}