
import React, { useState, useEffect } from 'react';

export default function Header(): React.ReactNode {
    const [userId, setUserId] = useState('');
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        setUserId(`user_${crypto.randomUUID().slice(0, 8)}`);
        setSessionId(`session_${crypto.randomUUID().slice(0, 12)}`);
    }, []);

    return (
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">CUA Orchestration Engine</h1>
            <p className="text-lg text-gray-400 mt-2">Persona: GAU-C-CUAG</p>
            <p className="text-sm text-gray-500 mt-1">
                System USER: <span className="font-mono">{userId}</span> | Session ID: <span className="font-mono">{sessionId}</span>
            </p>
        </header>
    );
}
