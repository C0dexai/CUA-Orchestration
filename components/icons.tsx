
import React from 'react';

export function LoaderIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return (
        <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
}

export function RocketLaunchIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2zm3.43.913a8.973 8.973 0 0 0-6.86 0L9.43 1.93a1 1 0 0 1 .841-.583h3.458a1 1 0 0 1 .841.583l.86 1.017zM9.47 13.999l-2.03 2.03a1 1 0 0 1-1.414-1.414l2.03-2.03a.5.5 0 0 1 .707 0l.707.707a.5.5 0 0 1 0 .707zM11 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3.53-1.999a.5.5 0 0 1 0-.707l.707-.707a.5.5 0 0 1 .707 0l2.03 2.03a1 1 0 0 1-1.414 1.414l-2.03-2.03zM7.5 17.5a1.5 1.5 0 0 0 1.5-1.5h6a1.5 1.5 0 0 0 1.5 1.5v.5h-9v-.5z"/>
        </svg>
    );
}

export function CloseIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.414-9.414a1 1 0 0 1 1.414-1.414L12 10.586l1.414-1.414a1 1 0 1 1 1.414 1.414L13.414 12l1.414 1.414a1 1 0 1 1-1.414 1.414L12 13.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L10.586 12l-1.414-1.414z" clipRule="evenodd"/>
        </svg>
    );
}

export function AbacusIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <line x1="3" x2="21" y1="15" y2="15" />
            <line x1="9" x2="9" y1="3" y2="21" />
            <line x1="15" x2="15" y1="3" y2="21" />
        </svg>
    );
}

export function CogIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5M12 9.75v1.5m0 0v1.5m0-1.5a1.5 1.5 0 0 1 1.5 1.5m-1.5-1.5a1.5 1.5 0 0 0-1.5 1.5m1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m1.5-1.5a1.5 1.5 0 0 0 1.5 1.5m-1.5-1.5H12m0 0H12m0 0a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5a1.5 1.5 0 0 0-1.5-1.5m1.5-1.5a1.5 1.5 0 0 1 1.5-1.5m1.5 1.5a1.5 1.5 0 0 0 1.5-1.5m-15 6a7.5 7.5 0 0 1 15 0" />
        </svg>
    );
}

export function GeminiIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d6a85590ce2e624f923a.svg" alt="Gemini" className={className} />;
}

export function OpenAiIcon({ className = "w-6 h-6" }: { className?: string }): React.ReactNode {
    return <img src="https://openai.com/favicon.ico" alt="OpenAI" className={`${className} rounded-full`} />;
}