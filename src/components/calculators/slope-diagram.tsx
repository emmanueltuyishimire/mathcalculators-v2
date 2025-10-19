
"use client";
import React from 'react';

export const SlopeDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 150 150" {...props}>
        {/* Grid lines */}
        <path d="M10 10 H 140 M10 40 H 140 M10 70 H 140 M10 100 H 140 M10 130 H 140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M10 10 V 140 M40 10 V 140 M70 10 V 140 M100 10 V 140 M130 10 V 140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Axes */}
        <path d="M10 140 V 10 H 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="140" y="15" fontSize="10" fill="currentColor" textAnchor="middle">x</text>
        <text x="15" y="15" fontSize="10" fill="currentColor" textAnchor="middle">y</text>

        {/* Line */}
        <line x1="25" y1="115" x2="115" y2="25" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        
        {/* Points */}
        <circle cx="25" cy="115" r="4" fill="hsl(var(--primary))" />
        <text x="20" y="128" fontSize="10" fill="currentColor">(x₁, y₁)</text>
        <circle cx="115" cy="25" r="4" fill="hsl(var(--primary))" />
        <text x="110" y="18" fontSize="10" fill="currentColor">(x₂, y₂)</text>

        {/* Rise and Run lines */}
        <path d="M25 115 H 115" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M115 115 V 25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Rise and Run labels */}
        <text x="70" y="128" fontSize="10" fill="currentColor" textAnchor="middle">Run (Δx = x₂ - x₁)</text>
        <text x="122" y="70" fontSize="10" fill="currentColor" transform="rotate(-90, 122, 70)" textAnchor="middle">Rise (Δy = y₂ - y₁)</text>

        {/* Angle */}
        <path d="M40 115 A 15 15 0 0 1 29.3 102.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="40" y="108" fontSize="10" fill="currentColor">θ</text>
    </svg>
);
