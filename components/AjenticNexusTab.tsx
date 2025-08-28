
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

// --- UI Enhancement Constants ---
const KNOWN_COMMANDS = ['help', 'connect', 'status', 'clear', 'export', '/intersession'];
const COLORS = {
    prompt: '\x1b[36m',       // Cyan
    command: '\x1b[33m',      // Yellow
    argument: '\x1b[37m',     // White
    success: '\x1b[32m',      // Green
    error: '\x1b[31m',        // Red
    info: '\x1b[1;34m',       // Bright Blue
    meta: '\x1b[90m',         // Gray
    reset: '\x1b[0m'
};
const NETWORK_ID = '255.8.8.8';

const runWithSpinner = async (term: any, message: string, action: () => Promise<any>): Promise<void> => {
    term.write(message + ' ');
    const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const interval = setInterval(() => {
        term.write('\b' + spinnerChars[i++ % spinnerChars.length]);
    }, 80);

    try {
        await action();
        clearInterval(interval);
        term.write(`\b${COLORS.success}✔${COLORS.reset}\r\n`);
    } catch (e) {
        clearInterval(interval);
        term.write(`\b${COLORS.error}✖${COLORS.reset}\r\n`);
        throw e;
    }
};


export default function AjenticNexusTab({ lastCompletedOrchestration }: AjenticNexusTabProps): React.ReactNode {
    const terminalRef = useRef<HTMLDivElement>(null);
    const term = useRef<any>(null);
    const fitAddonRef = useRef<any>(null);
    const [isTerminalReady, setTerminalReady] = useState(false);

    const handleCliCommand = useCallback(async (command: string): Promise<void> => {
        if (!term.current) return;
        const [cmd, ...args] = command.trim().split(' ');
        const termInstance = term.current;

        switch (cmd) {
            case 'help':
                termInstance.writeln(`${COLORS.success}Available Commands:${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}help${COLORS.reset}            ${COLORS.meta}- Show this help message.${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}connect${COLORS.reset} ${COLORS.argument}<agent>${COLORS.reset}   ${COLORS.meta}- Connect to an agent. (e.g., connect LYRA)${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}status${COLORS.reset}          ${COLORS.meta}- Check system status.${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}clear${COLORS.reset}           ${COLORS.meta}- Clear the terminal screen.${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}export${COLORS.reset} ${COLORS.argument}<file>${COLORS.reset}    ${COLORS.meta}- Export last run orchestration.${COLORS.reset}`);
                termInstance.writeln(`  ${COLORS.command}/intersession${COLORS.reset}   ${COLORS.meta}- Conceptualize an orchestration taskflow.${COLORS.reset}`);
                break;
            case 'connect':
                 if (args.length === 0) {
                    termInstance.writeln(`${COLORS.error}Error: Missing agent name. Usage: connect <agent>${COLORS.reset}`);
                    break;
                }
                const connectAction = () => new Promise(resolve => setTimeout(resolve, 1000));
                await runWithSpinner(
                    termInstance,
                    `${COLORS.info}Connecting to agent:${COLORS.reset} ${COLORS.argument}${args.join(' ')}${COLORS.reset}`,
                    connectAction
                );
                termInstance.writeln(`${COLORS.success}Connection established.${COLORS.reset}`);
                break;
            case 'status':
                termInstance.writeln(`${COLORS.info}System Status:      ${COLORS.success}● All systems nominal${COLORS.reset}`);
                termInstance.writeln(`${COLORS.info}Active Network:     ${COLORS.argument}${NETWORK_ID}${COLORS.reset}`);
                termInstance.writeln(`${COLORS.info}Last Orchestration: ${COLORS.argument}${lastCompletedOrchestration?.bookmark.name || 'None'}${COLORS.reset}`);
                break;
            case 'clear':
                termInstance.clear();
                break;
            case 'export':
                if (lastCompletedOrchestration) {
                    const filename = args[0] || `"${lastCompletedOrchestration.bookmark.name}.it"`;
                     const exportAction = () => new Promise(resolve => setTimeout(resolve, 1500));
                    await runWithSpinner(
                        termInstance,
                        `${COLORS.info}Exporting workflow to${COLORS.reset} ${COLORS.command}${filename}${COLORS.reset}`,
                        exportAction
                    );
                    termInstance.writeln(`${COLORS.success}Successfully exported.${COLORS.reset}`);
                } else {
                    termInstance.writeln(`${COLORS.error}Error: No orchestration has been completed in this session to export.${COLORS.reset}`);
                }
                break;
            case '/intersession':
                 termInstance.writeln(`${COLORS.info}Conceptualizing intersession for 'Deploy Webapp'...${COLORS.reset}`);
                 termInstance.writeln(`  \x1b[1;35m[LYRA]${COLORS.reset}: Initiating taskflow.`);
                 termInstance.writeln(`    ${COLORS.meta}├─>${COLORS.reset} \x1b[33m[SOPHIA]${COLORS.reset}: Analyze requirements for security implications. ${COLORS.meta}(LLM: OpenAI for complex logic)${COLORS.reset}`);
                 termInstance.writeln(`    ${COLORS.meta}├─>${COLORS.reset} \x1b[33m[KARA]${COLORS.reset}: Design scalable architecture. ${COLORS.meta}(LLM: Gemini for creative patterns)${COLORS.reset}`);
                 termInstance.writeln(`    ${COLORS.meta}└─>${COLORS.reset} \x1b[33m[DAN]${COLORS.reset}: Develop core components. ${COLORS.meta}(LLM: Abacus for precise implementation)${COLORS.reset}`);
                 termInstance.writeln(`  \x1b[1;35m[LYRA]${COLORS.reset}: ${COLORS.success}Taskflow conceptualized. Awaiting execution command.${COLORS.reset}`);
                 break;
            default:
                 termInstance.writeln(`${COLORS.error}Command not found:${COLORS.reset} ${command}`);
        }

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
                background: '#020617', // slate-950
                foreground: '#94a3b8', // slate-400
                cursor: 'rgba(148, 163, 184, 0.8)',
                selectionBackground: 'rgba(148, 163, 184, 0.3)',
                black: '#020617',
                red: '#ef4444',
                green: '#22c55e',
                yellow: '#eab308',
                blue: '#3b82f6',
                magenta: '#d946ef',
                cyan: '#06b6d4',
                white: '#f8fafc',
            }
        });

        term.current = terminal;
        terminal.loadAddon(fitAddonRef.current);
        terminal.open(terminalRef.current);
        fitAddonRef.current.fit();
        terminal.focus();

        setTerminalReady(true);
        
        terminal.prompt = () => {
            terminal.write(`\r\n${COLORS.prompt}CUAG> ${COLORS.reset}`);
        };

        const welcomeMessage = [
            `\r\n\x1b[1;32m██████╗ ██╗   ██╗ █████╗  ██████╗ \x1b[0m`,
            `\x1b[1;32m██╔════╝ ██║   ██║██╔══██╗██╔════╝ \x1b[0m`,
            `\x1b[1;32m██║      ██║   ██║███████║██║  ███╗\x1b[0m`,
            `\x1b[1;32m██║      ╚██╗ ██╔╝██╔══██║██║   ██║\x1b[0m`,
            `\x1b[1;32m╚██████╗  ╚████╔╝ ██║  ██║╚██████╔╝\x1b[0m`,
            `\x1b[1;32m ╚═════╝   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ \x1b[0m`,
            `\r\n\x1b[36mWelcome to the CUAG Agent CLI.\x1b[0m`,
            `Type ${COLORS.command}help${COLORS.reset} for a list of commands.`,
        ];
        welcomeMessage.forEach(line => terminal.writeln(line));
        terminal.prompt();

        let currentCommand = '';
        let commandHistory: string[] = [];
        let historyIndex = -1;
        
        terminal.onKey(({ key, domEvent }: { key: string, domEvent: KeyboardEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

            if (terminal.getOption('disableStdin')) {
                return;
            }

            switch (domEvent.key) {
                case 'Enter':
                    if (currentCommand.trim() === '') {
                        terminal.write('\r\n');
                        terminal.prompt();
                        return;
                    }
                    terminal.write('\r\n');
                    const cmdToRun = currentCommand;
                    commandHistory.push(cmdToRun);
                    historyIndex = commandHistory.length;
                    currentCommand = '';
                    
                    terminal.setOption('disableStdin', true);

                    (async () => {
                        try {
                            await handleCliCommand(cmdToRun);
                        } catch (error) {
                             terminal.writeln(`${COLORS.error}An unexpected error occurred.${COLORS.reset}`);
                        } finally {
                            terminal.setOption('disableStdin', false);
                            terminal.prompt();
                            terminal.focus();
                        }
                    })();
                    break;
                case 'Backspace':
                    if (currentCommand.length > 0) {
                        terminal.write('\b \b');
                        currentCommand = currentCommand.slice(0, -1);
                    }
                    break;
                 case 'ArrowUp':
                    domEvent.preventDefault();
                    if (historyIndex > 0) {
                        historyIndex--;
                        const newCommand = commandHistory[historyIndex];
                        terminal.write('\x1b[2K\r' + `${COLORS.prompt}CUAG> ${COLORS.reset}` + newCommand);
                        currentCommand = newCommand;
                    }
                    break;
                case 'ArrowDown':
                    domEvent.preventDefault();
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        const newCommand = commandHistory[historyIndex];
                        terminal.write('\x1b[2K\r' + `${COLORS.prompt}CUAG> ${COLORS.reset}` + newCommand);
                        currentCommand = newCommand;
                    } else {
                        historyIndex = commandHistory.length;
                        terminal.write('\x1b[2K\r' + `${COLORS.prompt}CUAG> ${COLORS.reset}`);
                        currentCommand = "";
                    }
                    break;
                case 'Tab':
                    domEvent.preventDefault();
                    const matches = KNOWN_COMMANDS.filter(c => c.startsWith(currentCommand));
                    if (matches.length === 1) {
                        const completion = matches[0].substring(currentCommand.length);
                        terminal.write(completion);
                        currentCommand = matches[0];
                    } else if (matches.length > 1) {
                        let sorted = matches.slice().sort();
                        let first = sorted[0], last = sorted[sorted.length - 1], i = 0;
                        while (i < first.length && first.charAt(i) === last.charAt(i)) i++;
                        const commonPrefix = first.substring(0, i);

                        if (commonPrefix.length > currentCommand.length) {
                            const completion = commonPrefix.substring(currentCommand.length);
                            terminal.write(completion);
                            currentCommand = commonPrefix;
                        } else {
                            terminal.writeln(`\r\n${matches.map(m => `${COLORS.command}${m}${COLORS.reset}`).join('   ')}`);
                            terminal.prompt();
                            terminal.write(currentCommand);
                        }
                    }
                    break;
                default:
                    if (printable) {
                        currentCommand += key;
                        terminal.write(key);
                    }
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
    }, [handleCliCommand]);
    
    useEffect(() => {
        if (isTerminalReady && term.current && fitAddonRef.current) {
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
