
export interface PackagingInterrelation {
  type: string;
  description: string;
  utility_tool: string;
}

export interface Agent {
  name: string;
  role: string;
  bio: string;
  focus_areas: string[];
  packaging_interrelation: PackagingInterrelation[];
}

export interface Tool {
  name: string;
  primary_agent: string;
}

export interface ChainStep {
  tool: string;
  input: string;
  params?: Record<string, string>;
}

export interface ChainedBookmark {
  name: string;
  associated_agent: string;
  description: string;
  chain: ChainStep[];
}

export interface CodexData {
  version: string;
  author: string;
  contact: string;
  ai_family: Agent[];
  tools: Tool[];
  chained_bookmarks: ChainedBookmark[];
}

export interface A2ARule {
  trigger: string;
  command: string;
}

export interface MCPManifests {
  [key: string]: string;
}

export interface CustomInstructions {
  system: string;
  ai: string;
  user: string;
}

export interface ConversationTurn {
    user: string;
    gemini: string;
    openai: string;
    abacus: string;
}

export interface OrchestrationStep {
  id: number;
  tool: string;
  agent: string;
  status: 'pending' | 'running' | 'complete';
  input: string;
  output: string;
}

export interface RunningOrchestration {
    bookmark: ChainedBookmark;
    initialBrief: string;
    steps: OrchestrationStep[];
}

// Types for Dual-LLM Control Center
export type LlmStrategy = 'GEMINI_PRIMARY' | 'OPENAI_PRIMARY' | 'ABACUS_PRIMARY' | 'TRIPLE_DYNAMIC';
export type OrchestrationStatus = 'idle' | 'planning' | 'running' | 'completed' | 'failed';
export type TaskStatus = 'pending' | 'running' | 'completed' | 'error';
export type LlmName = 'gemini' | 'openai' | 'abacus';

export interface DualLlmTask {
    id: number;
    description: string;
    agent: string;
    llm: LlmName;
    status: TaskStatus;
    dependencies: number[];
    log?: string;
}

export type SpaFile = {
  name: string;
  language: string;
  content: string;
};

// Type for the Orchestration Ledger, as per the new plan
export type GeneratedSpa = {
  id: string;
  objective: string;
  command: string;
  agents: string[];
  strategy: LlmStrategy;
  summary: { stages: { name: string; agent?: string; app?: string }[] };
  tasks: DualLlmTask[];
  createdAt: number;
  files: SpaFile[];
};