'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { ContactForm } from '@/sections/contact/ContactForm';

type DemoModalContextValue = {
  openDemoModal: () => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

/** Ouvre/ferme la modale "Demander une démo", disponible sur toutes les pages. */
export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) throw new Error('useDemoModal doit être utilisé sous DemoModalProvider');
  return context;
}

/**
 * Fournit la modale de démonstration à toute l'app : les CTA "Demander une
 * démo" hors page contact ouvrent ce panneau au lieu de naviguer, avec le
 * même formulaire que /contact.
 */
export function DemoModalProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const openDemoModal = useCallback(() => setOpen(true), []);
  const closeDemoModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDemoModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeDemoModal]);

  return (
    <DemoModalContext.Provider value={{ openDemoModal, closeDemoModal }}>
      {children}

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-forest-950/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDemoModal();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('actions.requestDemo')}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.26 }}
              className="relative my-8 w-full max-w-[620px]"
            >
              <button
                type="button"
                onClick={closeDemoModal}
                aria-label={t('a11y.closeModal')}
                className="absolute end-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-500 shadow-soft transition-colors hover:bg-sage-100 hover:text-forest-900"
              >
                <X size={18} aria-hidden />
              </button>
              <ContactForm />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
}
