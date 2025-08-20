import React, { useState, useEffect } from 'react';
import { type GeneratedSpa, type SpaFile } from '../types';
import { CloseIcon } from './icons';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { tsx, typescript, markup, css } from 'react-syntax-highlighter/dist/esm/languages/prism';

// Register only the languages we need to keep the bundle size small
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('css', css);

interface GeneratedSpaModalProps {
    isOpen: boolean;
    onClose: () => void;
    spa: GeneratedSpa | null;
}

export default function GeneratedSpaModal({ isOpen, onClose, spa }: GeneratedSpaModalProps): React.ReactNode {
    const [activeFile, setActiveFile] = useState<SpaFile | null>(null);

    useEffect(() => {
        if (spa && spa.files && spa.files.length > 0) {
            setActiveFile(spa.files[0]);
        } else {
            setActiveFile(null);
        }
    }, [spa]);


    if (!isOpen || !spa) return null;

    const hasFiles = spa.files && spa.files.length > 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="glass glass-strong neon w-full max-w-6xl max-h-[90vh] shadow-2xl shadow-indigo-500/20 flex flex-col">
                <header className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{spa.id}: Launched SPA</h2>
                        <p className="text-sm text-indigo-300">{spa.objective}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </header>

                <main className="flex-grow flex flex-row overflow-hidden">
                    {hasFiles ? (
                        <>
                            {/* File Tree & Info Sidebar */}
                            <div className="w-1/3 max-w-[300px] bg-black/20 p-4 overflow-y-auto border-r border-gray-700 flex flex-col">
                                <div className="mb-6">
                                     <h4 className="text-lg font-bold text-white mb-2">Mission Details</h4>
                                      <div className="text-xs space-y-2 text-gray-400">
                                        <p><strong className="text-gray-200">Strategy:</strong> <span className="font-mono text-indigo-300">{spa.strategy}</span></p>
                                        <p><strong className="text-gray-200">Agents:</strong> {spa.agents.join(', ')}</p>
                                    </div>
                                    <h5 className="text-md font-semibold text-gray-200 mt-4 mb-1">Command</h5>
                                     <pre className="bg-black/50 p-2 rounded-md text-xs text-green-300 font-mono whitespace-pre-wrap">
                                        <code>{spa.command}</code>
                                    </pre>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-3 border-t border-gray-700 pt-4">Generated Files</h4>
                                    <ul className="space-y-1">
                                        {spa.files.map((file) => (
                                            <li key={file.name}>
                                                <button 
                                                    onClick={() => setActiveFile(file)}
                                                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors font-mono ${activeFile?.name === file.name ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700/50 text-gray-300'}`}
                                                >
                                                    {file.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Code Viewer */}
                            <div className="w-2/3 flex-grow bg-gray-900/50 flex flex-col">
                                {activeFile ? (
                                    <div className="flex-grow h-0"> {/* h-0 is a trick for flex-grow in overflow container */}
                                       <SyntaxHighlighter 
                                            language={activeFile.language} 
                                            style={vscDarkPlus} 
                                            customStyle={{ 
                                                height: '100%', 
                                                width: '100%',
                                                margin: 0, 
                                                padding: '1rem', 
                                                background: 'transparent',
                                                fontSize: '0.875rem'
                                            }}
                                            codeTagProps={{ style: { fontFamily: '"Roboto Mono", monospace' }}}
                                            showLineNumbers
                                        >
                                            {activeFile.content}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <p>Select a file to view its content.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="p-6 overflow-y-auto w-full text-center text-gray-500">
                            <p>No files were generated for this SPA.</p>
                        </div>
                    )}
                </main>

                 <footer className="text-center text-xs text-gray-500 p-3 border-t border-gray-700 flex-shrink-0">
                    Generated on {new Date(spa.createdAt).toLocaleString()}
                </footer>
            </div>
        </div>
    );
}