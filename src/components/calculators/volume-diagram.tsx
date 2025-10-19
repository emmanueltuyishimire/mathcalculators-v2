
"use client";
import React from 'react';

type Shape = 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Ellipsoid' | 'Square Pyramid' | 'Tube';

const SphereDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="70" y="45" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const ConeDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <polygon points="10,80 90,80 50,10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="80" rx="40" ry="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="10" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="50" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="40" y="50" fontSize="10" fill="currentColor">h</text>
        <text x="70" y="75" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const CubeDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="20" x2="40" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="80" y1="20" x2="100" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="20" y1="80" x2="40" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <rect x="40" y="40" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="20" x2="40" y2="40" stroke="currentColor" strokeWidth="1"/>
        <line x1="80" y1="20" x2="100" y2="40" stroke="currentColor" strokeWidth="1"/>
        <line x1="20" y1="80" x2="40" y2="100" stroke="currentColor" strokeWidth="1"/>
        <line x1="80" y1="80" x2="100" y2="100" stroke="currentColor" strokeWidth="1"/>
        <text x="50" y="15" fontSize="10" fill="currentColor">a</text>
    </svg>
);

const CylinderDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <ellipse cx="50" cy="20" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" strokeDashoffset="2"/>
        <ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" style={{clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"}} />
        <line x1="82" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1"/>
        <line x1="87" y1="20" x2="87" y2="80" stroke="currentColor" strokeWidth="1"/>
        <text x="90" y="55" fontSize="10" fill="currentColor">h</text>
        <line x1="50" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="65" y="75" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const RectangularTankDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M10 30 L10 70 L50 90 L90 70 L90 30 L50 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M50 10 L50 50" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1"/>
        <path d="M10 30 L50 50 L90 30" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1"/>
        <path d="M50 50 L50 90" stroke="currentColor" strokeWidth="1"/>
        <text x="50" y="65" fontSize="10" fill="currentColor">h</text>
        <text x="70" y="25" fontSize="10" fill="currentColor">l</text>
        <text x="25" y="25" fontSize="10" fill="currentColor">w</text>
    </svg>
);

const CapsuleDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M 30 20 A 20 20 0 0 1 30 80" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M 70 20 A 20 20 0 0 0 70 80" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="80" x2="70" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="45" y="45" fontSize="10" fill="currentColor">h</text>
        <line x1="50" y1="80" x2="50" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="50" y1="100" x2="70" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="55" y="95" fontSize="10" fill="currentColor">r</text>
    </svg>
);

const SphericalCapDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M 20 60 A 40 40 0 0 1 80 60" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="50" fontSize="10" fill="currentColor">h</text>
        <line x1="20" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="35" y="55" fontSize="10" fill="currentColor">r</text>
        <path d="M 50 40 A 40 40 0 0 0 50 120" fill="none" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1"/>
        <line x1="50" y1="80" x2="20" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="30" y="75" fontSize="10" fill="currentColor">R</text>
    </svg>
);

const ConicalFrustumDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <ellipse cx="50" cy="20" rx="20" ry="6" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="80" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="20" x2="10" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="70" y1="20" x2="90" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="50" fontSize="10" fill="currentColor">h</text>
        <line x1="50" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="60" y="18" fontSize="10" fill="currentColor">r</text>
        <line x1="50" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="70" y="78" fontSize="10" fill="currentColor">R</text>
    </svg>
);

const EllipsoidDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="50" rx="15" ry="30" fill="none" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1"/>
        <line x1="50" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="70" y="48" fontSize="10" fill="currentColor">a</text>
        <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="35" fontSize="10" fill="currentColor">b</text>
        <line x1="50" y1="50" x2="35" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="40" y="48" fontSize="10" fill="currentColor">c</text>
    </svg>
);

const SquarePyramidDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <path d="M10 80 L50 20 L90 80 L50 100 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 80 L90 80" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="20" x2="10" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="20" x2="90" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="50" y1="20" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="52" y="60" fontSize="10" fill="currentColor">h</text>
        <text x="70" y="95" fontSize="10" fill="currentColor">a</text>
    </svg>
);

const TubeDiagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" {...props}>
        <ellipse cx="50" cy="20" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="20" rx="15" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="80" rx="15" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <line x1="82" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1"/>
        <line x1="87" y1="20" x2="87" y2="80" stroke="currentColor" strokeWidth="1"/>
        <text x="90" y="55" fontSize="10" fill="currentColor">l</text>
        <line x1="50" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="65" y="18" fontSize="10" fill="currentColor">d1/2</text>
        <line x1="50" y1="20" x2="65" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="55" y="28" fontSize="10" fill="currentColor">d2/2</text>
    </svg>
);


const diagramMap: Record<Shape, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Sphere: SphereDiagram,
    Cone: ConeDiagram,
    Cube: CubeDiagram,
    Cylinder: CylinderDiagram,
    'Rectangular Tank': RectangularTankDiagram,
    Capsule: CapsuleDiagram,
    'Spherical Cap': SphericalCapDiagram,
    'Conical Frustum': ConicalFrustumDiagram,
    Ellipsoid: EllipsoidDiagram,
    'Square Pyramid': SquarePyramidDiagram,
    Tube: TubeDiagram,
};

export const VolumeDiagram = ({ shape, ...props }: { shape: Shape } & React.SVGProps<SVGSVGElement>) => {
    const DiagramComponent = diagramMap[shape];
    if (!DiagramComponent) return null;
    return <DiagramComponent {...props} />;
};
