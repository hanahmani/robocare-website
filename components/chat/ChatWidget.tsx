'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle, Moon, RotateCcw, Send, Sun, X } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { QUICK_REPLIES, findEntry, type KnowledgeEntry } from '@/lib/chat/knowledge';
import { resolveProvider, type ChatTurn } from '@/lib/chat/engine';

/**
 * Assistant RoboCare — bulle flottante disponible sur toutes les pages.
 *
 * Le composant ne connaît pas la provenance des réponses : il consomme un
 * `ChatProvider` (base locale par défaut, API d'IA si `NEXT_PUBLIC_CHAT_ENDPOINT`
 * est défini). Brancher une IA ne demande donc aucune modification ici.
 *
 * Le thème clair / sombre est **local au widget** : il n'introduit pas de mode
 * sombre global sur le site et n'altère aucun style existant.
 */

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  /** Renvoi contextuel affiché sous une réponse. */
  link?: { href: string; labelKey: string };
  /** Pistes proposées quand la question n'a pas été comprise. */
  suggestions?: string[];
};

const STORAGE_KEY = 'robocare.chat.session';
const THEME_KEY = 'robocare.chat.theme';

/* ------------------------------------------------------------------ */
/* Palettes                                                            */
/* ------------------------------------------------------------------ */

const LIGHT = {
  panel: 'border-forest-950/[0.10] bg-white',
  header: 'border-forest-950/[0.08] bg-sage-50',
  title: 'text-ink-900',
  status: 'text-ink-400',
  body: 'bg-white',
  botBubble: 'bg-sage-50 text-ink-700',
  userBubble: 'bg-forest-900 text-white',
  chip: 'border-forest-950/[0.12] bg-white text-ink-700 hover:border-leaf-500/50 hover:bg-sage-100 hover:text-leaf-600',
  linkChip: 'bg-sage-100 text-leaf-600 hover:bg-sage-200 hover:text-leaf-600',
  iconButton: 'text-ink-400 hover:bg-white hover:text-forest-900',
  field: 'border-forest-950/[0.12] bg-white text-ink-900 placeholder:text-ink-300',
  footer: 'border-forest-950/[0.08] bg-white text-ink-300',
  footerLink: 'text-leaf-600 hover:text-leaf-500',
  scroll: 'scrollbar-chat-light',
  dots: 'bg-ink-300',
} as const;

const DARK = {
  panel: 'border-lime-500/20 bg-[linear-gradient(165deg,#0B2015,#06120C_62%)]',
  header: 'border-white/10 bg-white/[0.04]',
  title: 'text-white',
  status: 'text-white/50',
  body: 'bg-transparent',
  botBubble: 'bg-white/[0.07] text-white/[0.88]',
  userBubble: 'bg-lime-500 text-forest-950',
  chip: 'border-white/15 bg-white/[0.05] text-white/[0.78] hover:border-lime-500/50 hover:bg-lime-500/[0.12] hover:text-lime-100',
  linkChip: 'bg-lime-500/[0.14] text-lime-100 hover:bg-lime-500/25 hover:text-lime-100',
  iconButton: 'text-white/50 hover:bg-white/10 hover:text-lime-500',
  field: 'border-white/15 bg-white/[0.06] text-white placeholder:text-white/35',
  footer: 'border-white/10 bg-transparent text-white/40',
  footerLink: 'text-lime-500 hover:text-lime-400',
  scroll: 'scrollbar-chat-dark',
  dots: 'bg-white/45',
} as const;

/* ------------------------------------------------------------------ */
/* Sous-composants                                                     */
/* ------------------------------------------------------------------ */

/** Marque RoboCare : feuille stylisée sur fond forêt, avec pastille d'activité. */
function Avatar({ size = 38, online = false }: { size?: number; online?: boolean }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span
        aria-hidden
        className="flex h-full w-full items-center justify-center rounded-[12px] bg-[linear-gradient(150deg,#123322,#06120C)] ring-1 ring-lime-500/30"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden>
          <path
            d="M20 4c0 8.5-4.4 13-11 13H5.5C5.5 8.5 11 4 20 4Z"
            fill="#9ED84B"
            fillOpacity=".22"
            stroke="#9ED84B"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M4 21c1.8-5.2 4.7-8.6 9-10.5" stroke="#9ED84B" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      {online ? (
        <span aria-hidden className="absolute -bottom-0.5 -end-0.5 flex h-3 w-3">
          <span className="absolute inset-0 rounded-full bg-lime-500 ring-2 ring-white/90" />
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-lime-500" />
        </span>
      ) : null}
    </span>
  );
}

/** Trois points animés pendant la préparation de la réponse. */
function TypingDots({ className }: { className: string }) {
  return (
    <span className="flex items-center gap-1.5 py-1" aria-hidden>
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className={cn('h-1.5 w-1.5 rounded-full', className)}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Widget                                                              */
/* ------------------------------------------------------------------ */

export function ChatWidget() {
  const { t, locale, isRtl } = useTranslation();
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  const provider = useMemo(() => resolveProvider(), []);
  const palette = dark ? DARK : LIGHT;

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* --- Persistance : la conversation survit à un changement de page --- */

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as Message[]);
      setDark(window.localStorage.getItem(THEME_KEY) === 'dark');
    } catch {
      // Stockage indisponible (navigation privée) : le chat fonctionne sans.
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignoré */
    }
  }, [messages]);

  // Nettoie les minuteries en attente au démontage.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* --- Comportement d'ouverture --- */

  useEffect(() => {
    if (!open) return;
    const focus = setTimeout(() => inputRef.current?.focus(), 260);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(focus);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Défilement vers le dernier message.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [messages, pending, reduceMotion]);

  /* --- Envoi --- */

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || pending) return;

      const history: ChatTurn[] = messages.map((message) => ({
        role: message.role,
        content: message.text,
      }));

      setMessages((current) => [
        ...current,
        { id: `u-${Date.now()}`, role: 'user', text: question },
      ]);
      setDraft('');
      setPending(true);

      const answer = await provider.ask(question, locale, history);

      // Court délai : le message n'apparaît pas avant que l'indicateur de
      // saisie ait été perçu, ce qui rend l'échange plus lisible.
      const delay = reduceMotion ? 0 : 420 + Math.min(700, answer.text.length * 3);
      const timer = setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: answer.entry ? answer.text : answer.text || t('chat.fallback'),
            link: answer.entry?.link,
            suggestions: answer.entry ? undefined : answer.suggestions.map((item) => item.id),
          },
        ]);
        setPending(false);
      }, delay);
      timers.current.push(timer);
    },
    [locale, messages, pending, provider, reduceMotion, t],
  );

  const askEntry = useCallback((entry: KnowledgeEntry) => send(entry.question[locale]), [locale, send]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMessages([]);
    setPending(false);
    setDraft('');
    inputRef.current?.focus();
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      } catch {
        /* ignoré */
      }
      return next;
    });
  }, []);

  /** Réponses rapides : masquées dès que la conversation est engagée. */
  const quickReplies = messages.length === 0 ? QUICK_REPLIES : QUICK_REPLIES.slice(0, 3);

  const slide = isRtl ? -18 : 18;

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Panneau                                                       */}
      {/* ------------------------------------------------------------ */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={t('chat.title')}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.94, x: slide }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.34, ease: EASE }}
            style={{ transformOrigin: isRtl ? 'bottom left' : 'bottom right' }}
            className={cn(
              'fixed bottom-[92px] z-[70] flex flex-col overflow-hidden rounded-card border shadow-lift',
              'end-4 start-4 max-h-[min(620px,calc(100dvh-140px))] sm:start-auto sm:end-6 sm:w-[396px]',
              palette.panel,
            )}
          >
            {/* En-tête */}
            <header
              className={cn('flex items-center gap-3 border-b px-4 py-3.5', palette.header)}
            >
              <Avatar online />
              <div className="min-w-0 flex-1">
                <p className={cn('truncate font-display text-[15px] font-semibold', palette.title)}>
                  {t('chat.title')}
                </p>
                <p className={cn('truncate text-[12px]', palette.status)}>{t('chat.status')}</p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={dark ? t('chat.toLight') : t('chat.toDark')}
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  palette.iconButton,
                )}
              >
                {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={messages.length === 0}
                aria-label={t('chat.reset')}
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-35',
                  palette.iconButton,
                )}
              >
                <RotateCcw size={15} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('chat.launcherClose')}
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  palette.iconButton,
                )}
              >
                <X size={17} aria-hidden />
              </button>
            </header>

            {/* Historique */}
            <div
              ref={scrollRef}
              aria-label={t('chat.historyLabel')}
              aria-live="polite"
              className={cn(
                'flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4',
                palette.body,
                palette.scroll,
              )}
            >
              {/* Message d'accueil, toujours présent */}
              <div className="flex gap-2.5">
                <Avatar size={30} />
                <div
                  className={cn(
                    'max-w-[85%] rounded-[16px] rounded-ss-md px-3.5 py-3 text-[14px] leading-[1.6]',
                    palette.botBubble,
                  )}
                >
                  {t('chat.greeting')}
                </div>
              </div>

              {messages.map((message) =>
                message.role === 'user' ? (
                  <motion.div
                    key={message.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex justify-end"
                  >
                    <p
                      className={cn(
                        'max-w-[85%] rounded-[16px] rounded-ee-md px-3.5 py-3 text-[14px] leading-[1.6]',
                        palette.userBubble,
                      )}
                    >
                      {message.text}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={message.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex gap-2.5"
                  >
                    <Avatar size={30} />
                    <div className="max-w-[85%]">
                      <div
                        className={cn(
                          'rounded-[16px] rounded-ss-md px-3.5 py-3 text-[14px] leading-[1.6]',
                          palette.botBubble,
                        )}
                      >
                        {message.text}
                      </div>

                      {message.link ? (
                        <Link
                          href={message.link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors',
                            palette.linkChip,
                          )}
                        >
                          {t(message.link.labelKey)}
                          <ArrowRight size={13} aria-hidden className="rtl:-scale-x-100" />
                        </Link>
                      ) : null}

                      {message.suggestions?.length ? (
                        <div className="mt-2.5">
                          <p className={cn('mb-1.5 text-[11.5px]', palette.status)}>
                            {t('chat.suggestionsLabel')}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {message.suggestions.map((id) => {
                              const entry = findEntry(id);
                              if (!entry) return null;
                              const label = entry.question[locale];
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => askEntry(entry)}
                                  className={cn(
                                    'rounded-full border px-3 py-1.5 text-start text-[12.5px] font-semibold transition-colors',
                                    palette.chip,
                                  )}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ),
              )}

              {pending ? (
                <div className="flex items-center gap-2.5">
                  <Avatar size={30} />
                  <div className={cn('rounded-[16px] rounded-ss-md px-3.5 py-2.5', palette.botBubble)}>
                    <span className="sr-only">{t('chat.typing')}</span>
                    <TypingDots className={palette.dots} />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Réponses rapides */}
            <div className={cn('border-t px-4 pt-3', palette.header)}>
              <p className={cn('mb-2 font-mono text-[10px] uppercase tracking-[0.14em]', palette.status)}>
                {messages.length === 0 ? t('chat.hint') : t('chat.quickRepliesLabel')}
              </p>
              <div className="flex flex-wrap gap-1.5 pb-3">
                {quickReplies.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => askEntry(entry)}
                    disabled={pending}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-start text-[12.5px] font-semibold transition-colors disabled:opacity-50',
                      palette.chip,
                    )}
                  >
                    {entry.question[locale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Saisie */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send(draft);
              }}
              className={cn('flex items-center gap-2 border-t px-4 py-3', palette.header)}
            >
              <label htmlFor={`${panelId}-input`} className="sr-only">
                {t('chat.inputLabel')}
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t('chat.inputPlaceholder')}
                autoComplete="off"
                className={cn(
                  'min-h-[44px] flex-1 rounded-full border px-4 text-[14px] outline-none transition-colors focus:border-leaf-500/60',
                  palette.field,
                )}
              />
              <button
                type="submit"
                disabled={!draft.trim() || pending}
                aria-label={t('chat.send')}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-500 text-forest-950 shadow-leaf transition-all duration-300 ease-premium hover:bg-[#5DB53A] disabled:pointer-events-none disabled:opacity-40"
              >
                <Send size={17} aria-hidden className="rtl:-scale-x-100" />
              </button>
            </form>

            {/* Mention */}
            <p
              className={cn(
                'flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5 text-[11.5px]',
                palette.footer,
              )}
            >
              <span>{t('chat.disclaimer')}</span>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={cn('font-semibold', palette.footerLink)}
              >
                {t('chat.contactCta')}
              </Link>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ------------------------------------------------------------ */}
      {/* Bouton flottant                                               */}
      {/* ------------------------------------------------------------ */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('chat.launcherClose') : t('chat.launcherOpen')}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.6, ease: EASE }}
        whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-5 end-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-lime-500 shadow-lift ring-1 ring-lime-500/25 transition-colors hover:bg-forest-800 sm:end-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: open ? -70 : 70, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: open ? 70 : -70, scale: 0.7 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="inline-flex"
          >
            {open ? <X size={23} aria-hidden /> : <MessageCircle size={23} aria-hidden />}
          </motion.span>
        </AnimatePresence>

        {/* Halo d'appel, uniquement quand le panneau est fermé */}
        {!open ? (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-lime-500/25"
          />
        ) : null}
      </motion.button>
    </>
  );
}
