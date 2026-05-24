"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  interactive?: boolean;
}

export const GlassCard = ({
  children,
  className,
  glowColor = "rgba(99, 102, 241, 0.15)",
  interactive = true,
  ...props
}: GlassCardProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-xl overflow-hidden glassmorphism transition-all duration-500",
        interactive && "hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {/* Dynamic Interactive Glow Overlay */}
      {interactive && isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 ease-in-out"
          style={{
            width: "300px",
            height: "300px",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            left: `${coords.x - 150}px`,
            top: `${coords.y - 150}px`,
            opacity: 1,
            mixBlendMode: "screen",
          }}
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
