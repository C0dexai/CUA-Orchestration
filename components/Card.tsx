
import React from 'react';

interface CardProps {
    title: string;
    subtitle: string;
    onClick: () => void;
    isSelected?: boolean;
    borderColor?: string;
}

export default function Card({ title, subtitle, onClick, isSelected = false, borderColor = 'border-gray-600' }: CardProps): React.ReactNode {
    const selectedClasses = isSelected ? 'scale-105 shadow-[0_0_25px_rgba(59,130,246,0.5)] border-blue-500' : 'hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,255,0.1),_0_0_15px_rgba(0,128,255,0.1)]';
    
    return (
        <div
            className={`bg-gradient-to-br from-gray-800 to-gray-700 transition-transform duration-300 ease-in-out border ${borderColor} ${selectedClasses} rounded-lg p-4 text-center cursor-pointer flex flex-col justify-center items-center h-48`}
            onClick={onClick}
        >
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-blue-300 mt-2">{subtitle}</p>
        </div>
    );
}
