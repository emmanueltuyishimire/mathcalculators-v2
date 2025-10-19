
"use client";
import React from 'react';

type PythagoreanDiagramProps = {
  a?: string;
  b?: string;
  c?: string;
};

export const PythagoreanDiagram = ({ a, b, c }: PythagoreanDiagramProps) => {
  return (
    <svg width="200" height="170" viewBox="0 0 200 170" className="max-w-full h-auto">
      <defs>
        <filter id="diagram-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="hsl(var(--foreground))" floodOpacity="0.1" />
        </filter>
      </defs>
      
      {/* Triangle with shadow */}
      <polygon points="10,10 10,160 190,160" className="fill-primary/10 stroke-primary stroke-2" filter="url(#diagram-shadow)" />
      
      {/* Right angle symbol */}
      <rect x="10" y="140" width="20" height="20" className="fill-none stroke-primary/50 stroke-1" />

      {/* Labels */}
      <text x="5" y="85" dy=".3em" textAnchor="middle" className="fill-foreground font-semibold" transform="rotate(-90 5 85)">
        a = {a || '?'}
      </text>
      <text x="100" y="168" textAnchor="middle" className="fill-foreground font-semibold">
        b = {b || '?'}
      </text>
      <text x="100" y="80" dy=".3em" textAnchor="middle" className="fill-foreground font-bold text-lg" transform="rotate(-38.66 100 85)">
        c = {c || '?'}
      </text>
    </svg>
  );
};
