import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-glow',
    secondary:
      'bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border border-slate-700 hover:border-cyan-500/40',
    outline:
      'bg-transparent hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
  };

  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
