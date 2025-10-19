
"use client";
import React from 'react';

type Shape = 'Rectangle' | 'Triangle' | 'Trapezoid' | 'Circle' | 'Sector' | 'Ellipse' | 'Parallelogram';

const RectangleDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <rect x="10" y="25" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="50" y="20" fontSize="10" textAnchor="middle" fill="currentColor">l</text>
        <text x="5" y="50" dy=".3em" fontSize="10" fill="currentColor">w</text>
    </svg>
);

const TriangleDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <polygon points="10,80 90,80 50,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="50" y="95" fontSize="10" textAnchor="middle" fill="currentColor">a</text>
        <text x="75" y="55" fontSize="10" fill="currentColor">b</text>
        <text x="25" y="55" fontSize="10" fill="currentColor">c</text>
    </svg>
);

const TrapezoidDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <polygon points="20,80 80,80 90,20 10,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="50" fontSize="10" fill="currentColor">h</text>
        <text x="50" y="15" fontSize="10" textAnchor="middle" fill="currentColor">b1</text>
        <text x="50" y="95" fontSize="10" textAnchor="middle" fill="currentColor">b2</text>
    </svg>
);

const CircleDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="70" y="45" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const SectorDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M 50 50 L 90 50 A 40 40 0 0 1 50 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="65" y="30" fontSize="10" fill="currentColor">A</text>
        <text x="75" y="60" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const EllipseDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="70" y="48" fontSize="10" fill="currentColor">a</text>
        <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="35" fontSize="10" fill="currentColor">b</text>
    </svg>
);

const ParallelogramDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <polygon points="10,80 70,80 90,20 30,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="40" y1="20" x2="40" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="42" y="50" fontSize="10" fill="currentColor">h</text>
        <text x="40" y="95" fontSize="10" textAnchor="middle" fill="currentColor">b</text>
    </svg>
);


const diagramMap: Record<Shape, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Rectangle: RectangleDiagram,
    Triangle: TriangleDiagram,
    Trapezoid: TrapezoidDiagram,
    Circle: CircleDiagram,
    Sector: SectorDiagram,
    Ellipse: EllipseDiagram,
    Parallelogram: ParallelogramDiagram,
};

export const AreaDiagram = ({ shape, ...props }: { shape: Shape } & React.SVGProps<SVGSVGElement>) => {
    const DiagramComponent = diagramMap[shape];
    if (!DiagramComponent) return null;
    return <DiagramComponent {...props} />;
};
