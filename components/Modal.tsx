
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps): React.ReactNode {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="glass p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in-up glow-red border border-red-500/50">
                <h3 className="text-2xl font-bold text-red-500 mb-4">{title}</h3>
                <div className="text-gray-300 mb-6">{children}</div>
                <button 
                    onClick={onClose} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}