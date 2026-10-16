import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Smartphone, X } from 'lucide-react';
import { profileIdentity } from '../../data/portfolioData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press and manage document body scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content Window */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-5xl rounded-2xl border border-slate-700/80 bg-[#0a0f1d] p-4 sm:p-6 shadow-2xl shadow-cyan-950/30 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="resume-modal-title"
                    className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2"
                  >
                    <span>Resume Preview</span>
                    {/* File badge */}
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800 text-cyan-300 border border-slate-700">
                      Ujjwal_Pradip_Patil_Resume.pdf
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono hidden sm:block">
                    {profileIdentity.name} • {profileIdentity.location}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={profileIdentity.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open in New Tab</span>
                </a>

                <a
                  href={profileIdentity.resumePath}
                  download="Ujjwal_Pradip_Patil_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Fallback Banner */}
            <div className="sm:hidden mt-3 p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                Mobile PDF viewer
              </span>
              <a
                href={profileIdentity.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-semibold underline underline-offset-2"
              >
                Tap to View Fullscreen
              </a>
            </div>

            {/* Modal Body: Embedded PDF iframe */}
            <div className="mt-4 flex-1 min-h-0">
              <iframe
                src="/resume.pdf"
                className="w-full h-[78vh] rounded-xl border border-slate-800 bg-slate-950"
                title="Ujjwal Pradip Patil Resume PDF"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
