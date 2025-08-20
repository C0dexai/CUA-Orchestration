
import React from 'react';
import { CODEX_DATA } from '../constants';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-8">
        <h3 className="text-2xl font-bold text-indigo-300 mb-3 border-b-2 border-indigo-500/30 pb-2">{title}</h3>
        <div className="text-gray-300 space-y-3">{children}</div>
    </section>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900/70 p-4 rounded-lg text-sm text-cyan-300 font-mono whitespace-pre-wrap">
        <code>{children}</code>
    </pre>
);

const SubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
     <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-lg text-cyan-300 mb-2">{title}</h4>
        <div className="text-gray-400 space-y-2">{children}</div>
    </div>
);

export default function GeminiOpenAIPlan(): React.ReactNode {
    const date = new Date();
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    return (
        <div className="glass neon p-6 md:p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Gemini CLI + OpenAI Orchestration Plan</h2>
                <p className="text-gray-400 mt-2">
                    Authored by: <span className="font-semibold text-indigo-300">{CODEX_DATA.author}</span> | Last Updated: {formattedDate}
                </p>
            </div>

            <Section title="Overview">
                <p>Drafting a comprehensive orchestration and API integration plan for the AI Family ecosystem, enabling seamless coordination, task handoffs, and feedback loops across 15 applications currently in proactive development.</p>
                <blockquote>
                    <ul className="list-disc list-outside pl-5 space-y-2">
                        <li>Serve as the service layer between applications.</li>
                        <li>Leverage Gemini CLI and OpenAI GPT for background intelligence.</li>
                        <li>Provide adaptive, AI-driven orchestration to support the Operator.</li>
                        <li>Automate CI/CD pipelines for cross-application software development and deployment.</li>
                        <li>Enable multi-agent collaboration under a unified orchestration framework.</li>
                    </ul>
                </blockquote>
            </Section>

            <Section title="AI Family Summary and Roles">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>LYRA:</strong> Master Orchestrator</p>
                    <p><strong>KARA:</strong> Security and Compliance</p>
                    <p><strong>SOPHIA:</strong> Semantic Intelligence</p>
                    <p><strong>CECILIA:</strong> Assistive Technology Lead</p>
                    <p><strong>GUAC:</strong> Communication Moderator</p>
                    <p><strong>ANDIE / DAN / STAN / DUDE:</strong> Specialized Agents</p>
                </div>
                <p className="mt-4">Together, these agents use AI technology to maintain service orientation, ensuring the Operator is supported with intelligent, context-aware orchestration throughout the development and deployment lifecycle.</p>
            </Section>

            <Section title="Objective">
                <p>To enable Gemini Studio to integrate with all AI Family applications, provide direct API orchestration instructions, establish handoffs and feedback loops, support CI/CD automation, and enable logical interoperability.</p>
            </Section>

            <Section title="Execution Deliverables">
                <SubSection title="Unified Orchestration Specification">
                    <CodeBlock>{`# templates for defining multi-app workflows.
- workflow: deploy_webapp
  apps: [CUA, WebETA, ContainerManager]
  steps:
    - agent: LYRA
      task: coordinate_deployment
    - app: CUA
      trigger: build
    - app: ContainerManager
      action: package_release
      depends_on: CUA.build_complete
`}</CodeBlock>
                </SubSection>

                <SubSection title="API Documentation and Instructions">
                    <blockquote>
                        <ul className="list-disc list-outside pl-5 space-y-1">
                            <li><strong>Task Submission:</strong> `POST /api/v1/tasks`</li>
                            <li><strong>Data Retrieval:</strong> {'`GET /api/v1/data/{resource_id}`'}</li>
                            <li><strong>Event Hooks:</strong> For orchestration triggers.</li>
                            <li><strong>Authentication:</strong> Secure inter-app communication.</li>
                        </ul>
                    </blockquote>
                </SubSection>

                 <SubSection title="Feedback Loop Architecture">
                    <p>Mechanism for each app to report progress, logs, errors, and results to the orchestrator for dynamic task reassignment and aggregated operator feedback.</p>
                </SubSection>
                
                <SubSection title="CI/CD Orchestration Flow">
                    <p>Scripts and APIs to automate builds, tests, and deployments between applications, with a clear rollback and version control strategy.</p>
                </SubSection>
            </Section>

            <Section title="Next-Phase Dual-LLM Adaptation">
                <blockquote>
                    <p>To future-proof the ecosystem, we will introduce context synchronization between Gemini and OpenAI, enhance the Gemini CLI for multi-agent orchestration, implement parallel task execution, and build a real-time Operator Control Center.</p>
                </blockquote>
            </Section>

        </div>
    );
}
