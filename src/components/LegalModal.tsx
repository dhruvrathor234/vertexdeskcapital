import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalDocType } from '../data/programData';

interface LegalModalProps {
  activeDoc: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ activeDoc, onClose }) => {
  useEffect(() => {
    if (!activeDoc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoc, onClose]);

  const docData = activeDoc ? LEGAL_DOCUMENTS[activeDoc] : null;

  return (
    <AnimatePresence>
      {docData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between gap-4">
              <div>
                <h2 id="legal-modal-title" className="font-display text-xl font-bold text-white">
                  {docData.title}
                </h2>
                <p className="mt-0.5 text-xs text-slate-400">{docData.updated}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close legal document"
                className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 overflow-y-auto space-y-5">
              {docData.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-display text-sm font-semibold text-white">
                    {section.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800/80 flex justify-end bg-[#070B14]/60">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
