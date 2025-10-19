
"use client";

export function PythagoreanDiagram() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" viewBox="0 0 200 180" className="mx-auto my-4">
          <polygon points="10,10 10,160 190,160" className="fill-primary/10 stroke-primary stroke-2" />
          <text x="100" y="175" className="text-sm fill-foreground">a</text>
          <text x="0" y="85" className="text-sm fill-foreground" transform="rotate(-90 0 85)">b</text>
          <text x="100" y="80" className="text-sm fill-foreground">c</text>
          <rect x="10" y="150" width="10" height="10" className="fill-foreground/50 stroke-foreground" />
        </svg>
    );
}
