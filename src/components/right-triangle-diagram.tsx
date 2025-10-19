
"use client";

export function RightTriangleDiagram() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" className="mx-auto my-4 max-w-[300px] h-auto">
            <polygon points="10,10 10,160 190,160" className="fill-primary/10 stroke-primary stroke-2" />
            
            {/* Sides */}
            <text x="90" y="175" className="text-sm fill-foreground font-semibold">a</text>
            <text x="-5" y="85" className="text-sm fill-foreground font-semibold">b</text>
            <text x="100" y="70" className="text-sm fill-foreground font-semibold -rotate-15">c</text>

            {/* Angles */}
            <text x="170" y="150" className="text-lg fill-foreground font-mono">β</text>
            <text x="18" y="35" className="text-lg fill-foreground font-mono">α</text>
            
            {/* Altitude */}
            <line x1="10" y1="160" x2="41.3" y2="128.7" strokeDasharray="2,2" className="stroke-foreground/70" />
            <rect x="33" y="132" width="8" height="8" className="fill-foreground/50 stroke-foreground" transform="rotate(-56.3 37.3 136.7)" />
            <text x="20" y="135" className="text-sm fill-foreground font-semibold">h</text>
            
            {/* Right angle symbol */}
            <rect x="10" y="150" width="10" height="10" className="fill-foreground/50 stroke-foreground" />
        </svg>
    );
}
