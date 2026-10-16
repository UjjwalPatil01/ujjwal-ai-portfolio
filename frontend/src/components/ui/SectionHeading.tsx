import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
}) => {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClass}`}>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 mb-4`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
