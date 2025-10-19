
"use client";
import React, { useRef, useEffect } from 'react';

type SlopeDiagramProps = {
    calculation: any;
    className?: string;
};

export const SlopeDiagram: React.FC<SlopeDiagramProps> = ({ calculation, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = canvas.width;
        const height = canvas.height;
        const scale = 20;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = "hsl(var(--muted-foreground))";
        ctx.lineWidth = 0.2;
        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = "hsl(var(--foreground))";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        if (!calculation) return;

        const { x1, y1, x2, y2, slope, angle } = calculation;
        
        const p1 = { x: centerX + x1 * scale, y: centerY - y1 * scale };
        const p2 = { x: centerX + x2 * scale, y: centerY - y2 * scale };

        // Draw line
        ctx.strokeStyle = "hsl(var(--primary))";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Draw points
        ctx.fillStyle = "hsl(var(--destructive))";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw labels
        ctx.fillStyle = "hsl(var(--foreground))";
        ctx.font = "12px Arial";
        ctx.fillText("A", p1.x + 5, p1.y - 5);
        ctx.fillText("B", p2.x + 5, p2.y - 5);
        
        ctx.save();
        ctx.translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        ctx.rotate(-Math.atan(slope));
        ctx.textAlign = 'center';
        ctx.fillText(`m=${slope.toFixed(2)}`, 0, -8);
        ctx.fillText(`θ=${angle.toFixed(2)}°`, 0, 18);
        ctx.restore();

    }, [calculation]);

    return (
        <canvas ref={canvasRef} width="300" height="300" className={className}></canvas>
    );
};
