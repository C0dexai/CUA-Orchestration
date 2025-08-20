
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { type RunningOrchestration } from '../types';

declare global {
    interface Window {
        Terminal: any;
        FitAddon: any;
    }
}
interface AjenticNexusTabProps {
    lastCompletedOrchestration: RunningOrchestration | null;
}

export default function AjenticNexusTab({ lastCompletedOrchestration }: AjenticNexusTabProps): React.ReactNode {
    const terminalRef = useRef<HTMLDivElement>(null);
    const term = useRef<any>(null);
    const fitAddonRef = useRef<any>(null);
    const [isTerminalReady, setTerminalReady] = useState(false);

    const handleCliCommand = useCallback((command: string) => {
        if (!term.current) return;
        const [cmd, ...args] = command.trim().split(' ');
        const termInstance = term.current;

        switch (cmd) {
            case 'help':
                termInstance.writeln('\r\n\x1b[32mAvailable Commands:\x1b[0m');
                termInstance.writeln('  \x1b[33mhelp\x1b[0m            - Show this help message.');
                termInstance.writeln('  \x1b[33mconnect\x1b[0m         - Connect to an agent. (e.g., connect LYRA)');
                termInstance.writeln('  \x1b[33mstatus\x1b[0m          - Check system status.');
                termInstance.writeln('  \x1b[33mclear\x1b[0m           - Clear the terminal screen.');
                termInstance.writeln('  \x1b[33mexport\x1b[0m          - Export last run orchestration. (e.g., export "My Workflow.it")');
                termInstance.writeln('  \x1b[33m/intersession\x1b[0m   - Conceptualize an orchestration taskflow.');
                break;
            case 'connect':
                termInstance.writeln(`\r\n\x1b[36mConnecting to agent: ${args.join(' ')}...\x1b[0m`);
                setTimeout(() => termInstance.writeln(`\x1b[32mConnection established.\x1b[0m`), 500);
                break;
            case 'status':
                termInstance.writeln('\r\n\x1b[36mSystem Status: \x1b[32mAll systems nominal.\x1b[0m');
                termInstance.writeln(`\x1b[36mActive Network: \x1b[37m255.8.8.8\x1b[0m`);
                termInstance.writeln(`\x1b[36mLast Orchestration: \x1b[37m${lastCompletedOrchestration?.bookmark.name || 'None'}\x1b[0m`);
                break;
            case 'clear':
                termInstance.clear();
                break;
            case 'export':
                if (lastCompletedOrchestration) {
                    const filename = args[0] || `${lastCompletedOrchestration.bookmark.name}.it`;
                    termInstance.writeln(`\r\n\x1b[36mExporting workflow to \x1b[33m${filename}\x1b[0m...`);
                    // Simulating file creation
                    setTimeout(() => termInstance.writeln(`\x1b[32mSuccessfully exported.\x1b[0m`), 800);
                } else {
                    termInstance.writeln('\r\n\x1b[31mError: No orchestration has been completed in this session to export.\x1b[0m');
                }
                break;
            case '/intersession':
                 termInstance.writeln(`\r\n\x1b[36mConceptualizing intersession for 'Deploy Webapp'...\x1b[0m`);
                 termInstance.writeln(`\r\n  \x1b[35m[LYRA]\x1b[0m: Initiating taskflow.`);
                 termInstance.writeln(`\r\n    \x1b[35m[LYRA]\x1b[0m -> \x1b[33m[SOPHIA]\x1b[0m: Analyze requirements for security implications. \x1b[37m(LLM: OpenAI for complex logic)\x1b[0m`);
                 termInstance.writeln(`\r\n    \x1b[35m[LYRA]\x1b[0m -> \x1b[33m[KARA]\x1b[0m: Design scalable architecture. \x1b[37m(LLM: Gemini for creative patterns)\x1b[0m`);
                 termInstance.writeln(`\r\n    \x1b[35m[LYRA]\x1b[0m -> \x1b[33m[DAN]\x1b[0m: Develop core components. \x1b[37m(LLM: Abacus for precise implementation)\x1b[0m`);
                 termInstance.writeln(`\r\n  \x1b[35m[LYRA]\x1b[0m: Taskflow conceptualized. Awaiting execution command.`);
                 break;
            default:
                if (command.trim().length > 0) {
                     termInstance.writeln(`\r\n\x1b[31mCommand not found: ${command}\x1b[0m`);
                }
        }
        termInstance.prompt();

    }, [lastCompletedOrchestration]);

    useEffect(() => {
        if (!terminalRef.current || term.current) return;
        if (typeof window.Terminal === 'undefined' || typeof window.FitAddon === 'undefined') {
            console.error("xterm.js or FitAddon not loaded");
            return;
        }

        fitAddonRef.current = new window.FitAddon.FitAddon();
        const terminal = new window.Terminal({
            cursorBlink: true,
            convertEol: true,
            fontFamily: `'Roboto Mono', monospace`,
            fontSize: 14,
            theme: {
                background: '#000000',
                foreground: '#00FF00',
                cursor: 'rgba(0, 255, 0, 0.8)',
                selectionBackground: 'rgba(255, 255, 255, 0.3)',
            }
        });

        term.current = terminal;
        terminal.loadAddon(fitAddonRef.current);
        terminal.open(terminalRef.current);
        fitAddonRef.current.fit();

        setTerminalReady(true);
        
        terminal.prompt = () => {
            terminal.write('\r\n\x1b[36mCUAG> \x1b[0m');
        };

        terminal.writeln('Welcome to the CUAG Agent CLI. Type \x1b[32mhelp\x1b[0m for a list of commands.');
        terminal.prompt();

        let currentCommand = '';
        terminal.onKey(({ key, domEvent }: { key: string, domEvent: KeyboardEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

            if (domEvent.key === 'Enter') {
                handleCliCommand(currentCommand);
                currentCommand = '';
            } else if (domEvent.key === 'Backspace') {
                if (currentCommand.length > 0) {
                    terminal.write('\b \b');
                    currentCommand = currentCommand.slice(0, -1);
                }
            } else if (printable) {
                currentCommand += key;
                terminal.write(key);
            }
        });
        
        const resizeObserver = new ResizeObserver(() => {
            if (fitAddonRef.current) {
                fitAddonRef.current.fit();
            }
        });
        if (terminalRef.current) {
            resizeObserver.observe(terminalRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            terminal.dispose();
            term.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleCliCommand]);
    
    // Ensure fit is called on tab visibility change
    useEffect(() => {
        if (isTerminalReady && term.current && fitAddonRef.current) {
            // This is a bit of a hack to get fitAddon to work on tab switch
            setTimeout(() => {
                if(fitAddonRef.current) fitAddonRef.current.fit()
            }, 0);
        }
    }, [isTerminalReady]);


    return (
        <div className="glass neon p-4">
            <h3 className="text-xl font-bold text-center mb-4 text-white">Agent Command Line Interface (A2A / CUAG)</h3>
            <div className="p-1 bg-black rounded-lg glow-green border border-green-500/30">
                 <div id="terminal-container" ref={terminalRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    );
}