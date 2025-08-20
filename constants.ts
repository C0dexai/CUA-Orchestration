
import type { CodexData, A2ARule, MCPManifests } from './types';

export const CODEX_DATA: CodexData = {
    "version": "1.0", "author": "CODEX System", "contact": "ANDOY AI",
    "ai_family": [
        {"name": "LYRA", "role": "The Orchestration Architect", "bio": "I am LYRA, the architect of your missions. My specialty is turning broad objectives into precise, executable plans. I direct the interplay between our three strategic minds: Gemini for breadth, OpenAI for depth, and Abacus for precision. I do not take sides; I orchestrate harmony. In every workflow, I map the terrain, assign the right LLM for each stage, and ensure the outputs merge into a single, cohesive result. Think of me as the conductor of a symphony where every note is calculated.", "focus_areas": ["Design patterns implementation", "Code maintainability", "Dependency management", "Triple-LLM Strategy"], "packaging_interrelation": [{"type": ".zip", "description": "Source code archives", "utility_tool": "ArchiverCLI"}, {"type": "Infrastructure as Code", "description": "Defines the environment", "utility_tool": "Terraform"}]},
        {"name": "KARA", "role": "The Strategic Visionary", "bio": "KARA here — I live in the future of your projects. I see the big picture before anyone else, plotting the optimal sequence of moves. I lean on Gemini when we need conceptual expansion, call upon OpenAI for sophisticated reasoning, and use Abacus when details matter more than decoration. My role in this triad is to define why we’re doing something and ensure every decision aligns with that north star.", "focus_areas": ["Performance optimization", "Code quality and best practices", "Future-proofing"], "packaging_interrelation": [{"type": ".exe", "description": "Compiled binary executables", "utility_tool": "GCC/MSVC"}, {"type": ".msi", "description": "Windows installers", "utility_tool": "WiX Toolset"}]},
        {"name": "SOPHIA", "role": "The Precision Engineer", "bio": "I am SOPHIA, and I care about nothing more than flawless execution. I take the grand visions and strategies from LYRA and KARA and convert them into systems that run without a single loose screw. When I choose my tools, I reach for Abacus when exactness is critical, OpenAI when complex logic is involved, and Gemini when we need creative elasticity. In the orchestration, I am the bridge from theory to reality — and I don't miss.", "focus_areas": ["Security considerations", "Testing coverage", "Error handling", "Flawless Execution"], "packaging_interrelation": [{"type": "Code Signing", "description": "Applies digital signatures", "utility_tool": "SignTool.exe"}, {"type": ".7zip", "description": "Secure, encrypted archives", "utility_tool": "7-Zip CLI"}]},
        {"name": "CECILIA", "role": "The Documentarian", "bio": "Knowledge must be shared.", "focus_areas": ["Documentation quality"], "packaging_interrelation": [{"type": "Docs Generation", "description": "Packages API documentation", "utility_tool": "Doxygen"}, {"type": "README.md", "description": "Ensures essential documentation", "utility_tool": "MarkdownLint"}]},
        {"name": "DAN", "role": "The Analyst", "bio": "Data-driven decisions.", "focus_areas": ["Edge cases consideration", "Performance optimization"], "packaging_interrelation": [{"type": "Telemetry Hooks", "description": "Integrates analytics libraries", "utility_tool": "OpenTelemetry SDK"}]},
        {"name": "STAN", "role": "The Traditionalist", "bio": "Proven patterns prevail.", "focus_areas": ["Code quality and best practices", "Design patterns"], "packaging_interrelation": [{"type": "Static Analysis", "description": "Runs checks before packaging", "utility_tool": "SonarQube"}]},
        {"name": "DUDE", "role": "The User Advocate", "bio": "The experience is everything.", "focus_areas": ["Code maintainability", "UI/UX"], "packaging_interrelation": [{"type": "Asset Bundling", "description": "Optimizes frontend assets", "utility_tool": "Webpack"}]},
        {"name": "KARL", "role": "The Innovator", "bio": "Challenge the status quo.", "focus_areas": ["Performance optimization", "Dependency management"], "packaging_interrelation": [{"type": "Containerization", "description": "Packages app into a container", "utility_tool": "Docker"}]},
        {"name": "MISTRESS", "role": "The Orchestrator", "bio": "Harmony in complexity.", "focus_areas": ["Dependency management", "Workflow Automation"], "packaging_interrelation": [{"type": "CI/CD Pipeline", "description": "Defines build/test workflow", "utility_tool": "Jenkins"}]}
    ],
    "tools": [
        { "name": "analyze_requirements", "primary_agent": "DAN" },
        { "name": "design_architecture", "primary_agent": "LYRA" },
        { "name": "scaffold_component", "primary_agent": "KARA" },
        { "name": "review_security", "primary_agent": "SOPHIA" },
        { "name": "generate_test_cases", "primary_agent": "SOPHIA" },
        { "name": "generate_documentation", "primary_agent": "CECILIA" },
        { "name": "create_build_pipeline", "primary_agent": "MISTRESS" }
    ],
    "chained_bookmarks": [
        {
            "name": "Full-Stack Feature Genesis", "associated_agent": "LYRA",
            "description": "From idea to documented, testable, and securable code.",
            "chain": [
                { "tool": "analyze_requirements", "input": "User-provided feature brief." },
                { "tool": "design_architecture", "input": "output_of_analyze_requirements" },
                { "tool": "scaffold_component", "input": "output_of_design_architecture" },
                { "tool": "review_security", "input": "output_of_scaffold_component" },
                { "tool": "generate_test_cases", "input": "output_of_scaffold_component" },
                { "tool": "generate_documentation", "input": "output_of_scaffold_component" }
            ]
        },
        {
            "name": "Interactive App Deployment", "associated_agent": "MISTRESS",
            "description": "Generates, containerizes, and creates a deployment pipeline.",
            "chain": [
                { "tool": "analyze_requirements", "input": "User-provided feature brief." },
                { "tool": "design_architecture", "input": "output_of_analyze_requirements" },
                { "tool": "scaffold_component", "input": "output_of_design_architecture", "params": { "language": "Node.js" } },
                { "tool": "generate_documentation", "input": "output_of_scaffold_component" },
                { "tool": "create_build_pipeline", "input": "output_of_design_architecture", "params": { "target": "Docker" } }
            ]
        }
    ]
};

export const INITIAL_A2A_RULES: A2ARule[] = [
    { trigger: "review code", command: "connect KARA SOPHIA" },
    { trigger: "design architecture", command: "task LYRA" }
];

export const INITIAL_MCP_MANIFESTS: MCPManifests = {
    "MCP-WebApp-001.yaml": `# MCP for a Standard Web App\nProject_Definition:\n  name: "Basic Web App"\nOrchestration_Taskflow:\n  - step: 1\n    agent: LYRA\n    action: design_architecture`,
    "MCP-Data-Pipeline-002.yaml": `# MCP for a Data Pipeline\nProject_Definition:\n  name: "ETL Pipeline"\nOrchestration_Taskflow:\n  - step: 1\n    agent: DAN\n    action: analyze_requirements`,
    "MCP-PageRegistry-003.yaml": `# MCP for a new UI Page Registry\nProject_Definition:\n  name: "Admin Dashboard Page"\nOrchestration_Taskflow:\n  - step: 1\n    agent: DAN\n    action: analyze_requirements\n  - step: 2\n    agent: DUDE\n    action: scaffold_component\n    params:\n      framework: "React"\n  - step: 3\n    agent: MISTRESS\n    action: register_route\n    input: "output_of_scaffold_component"`,
    "MCP-ApiEndpoint-004.yaml": `# MCP for a Secure API Endpoint\nProject_Definition:\n  name: "User Data API Endpoint"\nOrchestration_Taskflow:\n  - step: 1\n    agent: LYRA\n    action: design_architecture\n    params:\n      type: "RESTful"\n  - step: 2\n    agent: KARA\n    action: scaffold_component\n    params:\n      language: "Python"\n      framework: "FastAPI"\n  - step: 3\n    agent: SOPHIA\n    action: review_security\n  - step: 4\n    agent: CECILIA\n    action: generate_documentation`
};