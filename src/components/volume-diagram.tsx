
"use client";

type Shape = 'Sphere' | 'Cone' | 'Cube' | 'Cylinder' | 'Rectangular Tank' | 'Capsule' | 'Spherical Cap' | 'Conical Frustum' | 'Ellipsoid' | 'Square Pyramid' | 'Tube';

export function VolumeDiagram({ shape }: { shape: Shape }) {
    const commonProps = {
        className: "mx-auto my-4 fill-primary/10 stroke-primary stroke-1",
        width: 150,
        height: 150,
        viewBox: "0 0 100 100",
    }
    const textClass = "text-[10px] fill-foreground";
    
    switch (shape) {
        case 'Sphere':
            return (
                <svg {...commonProps}>
                    <circle cx="50" cy="50" r="40" />
                    <line x1="50" y1="50" x2="90" y2="50" />
                    <text x="68" y="45" className={textClass}>r</text>
                </svg>
            );
        case 'Cone':
            return (
                <svg {...commonProps}>
                    <polygon points="50,10 10,90 90,90" />
                    <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2,2" />
                    <line x1="50" y1="90" x2="90" y2="90" />
                    <text x="70" y="85" className={textClass}>r</text>
                    <text x="55" y="50" className={textClass}>h</text>
                </svg>
            );
        case 'Cube':
             return (
                <svg {...commonProps}>
                    <path d="M20 30 L50 10 L80 30 L80 70 L50 90 L20 70 Z" />
                    <path d="M20 30 L50 50 L80 30" />
                    <path d="M50 50 L50 90" />
                    <text x="30" y="55" className={textClass}>a</text>
                    <text x="65" y="55" className={textClass}>a</text>
                    <text x="55" y="20" className={textClass}>a</text>
                </svg>
            );
        case 'Cylinder':
             return (
                <svg {...commonProps}>
                    <ellipse cx="50" cy="20" rx="40" ry="10" />
                    <ellipse cx="50" cy="80" rx="40" ry="10" className="fill-primary/20" />
                    <path d="M10 20 L10 80 M90 20 L90 80" />
                    <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2" />
                    <line x1="50" y1="80" x2="90" y2="80" />
                    <text x="70" y="75" className={textClass}>r</text>
                    <text x="55" y="50" className={textClass}>h</text>
                </svg>
            );
        case 'Rectangular Tank':
            return (
                <svg {...commonProps}>
                    <path d="M10 30 L60 10 L90 30 L40 50 Z" />
                    <path d="M10 30 L10 70 L40 90 L40 50" />
                    <path d="M40 50 L90 30 L90 70 L40 90" />
                    <text x="45" y="28" className={textClass}>l</text>
                    <text x="20" y="55" className={textClass}>h</text>
                    <text x="70" y="45" className={textClass}>w</text>
                </svg>
            );
        case 'Capsule':
            return (
                <svg {...commonProps}>
                    <path d="M30 20 H70 A20 20 0 0 1 70 80 H30 A20 20 0 0 1 30 20 Z" />
                    <line x1="30" y1="50" x2="70" y2="50" strokeDasharray="2,2" />
                    <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2" />
                    <text x="48" y="45" className={textClass}>h</text>
                    <text x="75" y="55" className={textClass}>r</text>
                </svg>
            );
        case 'Spherical Cap':
             return (
                <svg {...commonProps}>
                    <path d="M10 50 A 50 50 0 0 1 90 50" fill="none"/>
                    <path d="M30 70 A 40 40 0 0 0 70 70" className="fill-primary/20" />
                    <line x1="50" y1="30" x2="50" y2="70" strokeDasharray="2,2" />
                     <line x1="30" y1="70" x2="50" y2="70" strokeDasharray="2,2"/>
                    <line x1="50" y1="30" x2="30" y2="70" strokeDasharray="2,2"/>
                    <text x="55" y="50" className={textClass}>h</text>
                    <text x="35" y="65" className={textClass}>r</text>
                    <text x="35" y="50" className={textClass}>R</text>
                </svg>
            );
        case 'Conical Frustum':
            return (
                 <svg {...commonProps}>
                    <path d="M20 80 L30 20 L70 20 L80 80 Z" />
                    <ellipse cx="50" cy="20" rx="20" ry="5" />
                    <ellipse cx="50" cy="80" rx="30" ry="5" className="fill-primary/20" />
                    <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2" />
                    <line x1="50" y1="20" x2="70" y2="20" strokeDasharray="2,2"/>
                    <line x1="50" y1="80" x2="80" y2="80" strokeDasharray="2,2"/>
                    <text x="60" y="18" className={textClass}>r</text>
                    <text x="65" y="78" className={textClass}>R</text>
                    <text x="55" y="50" className={textClass}>h</text>
                </svg>
            );
         case 'Ellipsoid':
            return (
                 <svg {...commonProps}>
                    <ellipse cx="50" cy="50" rx="45" ry="30" />
                    <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="2,2"/>
                    <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2"/>
                    <text x="70" y="45" className={textClass}>a</text>
                    <text x="55" y="35" className={textClass}>b</text>
                </svg>
            );
        case 'Square Pyramid':
            return (
                 <svg {...commonProps}>
                    <path d="M20 80 L50 20 L80 80 L50 95 Z" />
                    <path d="M20 80 L50 95 L-10 90Z" fill="none" />
                    <line x1="50" y1="20" x2="50" y2="87.5" strokeDasharray="2,2" />
                    <text x="55" y="60" className={textClass}>h</text>
                    <text x="65" y="88" className={textClass}>a</text>
                </svg>
            );
        case 'Tube':
             return (
                <svg {...commonProps}>
                    <ellipse cx="50" cy="20" rx="40" ry="10" />
                    <ellipse cx="50" cy="20" rx="25" ry="6" fill="white" />
                    <ellipse cx="50" cy="80" rx="40" ry="10" className="fill-primary/20" />
                    <ellipse cx="50" cy="80" rx="25" ry="6" fill="white" />
                    <path d="M10 20 L10 80 M90 20 L90 80" />
                    <path d="M25 20 L25 80 M75 20 L75 80" />
                    <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2" />
                    <text x="55" y="50" className={textClass}>l</text>
                    <text x="70" y="15" className={textClass}>d1</text>
                    <text x="60" y="28" className={textClass}>d2</text>
                </svg>
            );
        default:
            return null;
    }
}
