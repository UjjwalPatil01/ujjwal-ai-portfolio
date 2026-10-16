import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'cyan' | 'blue' | 'violet' | 'emerald';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const styles: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
    cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    blue: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
    violet: 'bg-violet-950/60 text-violet-300 border-violet-500/30',
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
