
"use client";
import React from 'react';

type DestinyMatrixDiagramProps = {
  points: { [key: string]: number };
};

export const DestinyMatrixDiagram = ({ points }: DestinyMatrixDiagramProps) => {
  const { a, b, c, d, e, f, g, h, i } = points;
  const size = 300;
  const mid = size / 2;

  const positions: { [key: string]: { x: number; y: number } } = {
    a: { x: mid, y: 10 },
    b: { x: size - 10, y: mid },
    c: { x: mid, y: size - 10 },
    d: { x: 10, y: mid },
    e: { x: mid, y: mid },
    f: { x: mid - 60, y: mid - 60 },
    g: { x: mid + 60, y: mid - 60 },
    h: { x: mid + 60, y: mid + 60 },
    i: { x: mid - 60, y: mid + 60 },
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full h-auto">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="hsl(var(--foreground))" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Lines */}
      <g className="stroke-current text-muted-foreground/30" strokeWidth="1.5">
        {/* Outer Diamond */}
        <line x1={positions.a.x} y1={positions.a.y} x2={positions.b.x} y2={positions.b.y} />
        <line x1={positions.b.x} y1={positions.b.y} x2={positions.c.x} y2={positions.c.y} />
        <line x1={positions.c.x} y1={positions.c.y} x2={positions.d.x} y2={positions.d.y} />
        <line x1={positions.d.x} y1={positions.d.y} x2={positions.a.x} y2={positions.a.y} />
        {/* Inner Square */}
        <line x1={positions.f.x} y1={positions.f.y} x2={positions.g.x} y2={positions.g.y} />
        <line x1={positions.g.x} y1={positions.g.y} x2={positions.h.x} y2={positions.h.y} />
        <line x1={positions.h.x} y1={positions.h.y} x2={positions.i.x} y2={positions.i.y} />
        <line x1={positions.i.x} y1={positions.i.y} x2={positions.f.x} y2={positions.f.y} />
        {/* Connecting Lines */}
        <line x1={positions.a.x} y1={positions.a.y} x2={positions.c.x} y2={positions.c.y} />
        <line x1={positions.b.x} y1={positions.b.y} x2={positions.d.x} y2={positions.d.y} />
      </g>

      {/* Points */}
      {Object.entries(positions).map(([key, pos]) => (
        <g key={key}>
          <circle cx={pos.x} cy={pos.y} r="18" className="fill-primary/10" filter="url(#shadow)" />
          <circle cx={pos.x} cy={pos.y} r="18" className="fill-transparent stroke-primary/80" strokeWidth="1.5" />
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dy=".3em"
            className="fill-primary font-bold text-lg"
          >
            {points[key]}
          </text>
        </g>
      ))}
    </svg>
  );
};
