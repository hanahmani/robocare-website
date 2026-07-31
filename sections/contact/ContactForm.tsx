'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from '@/i18n';
import { SOLUTIONS } from '@/lib/data/solutions';
import { ButtonAction } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { cn } from '@/lib/utils';

const SUBJECTS = ['demo', 'quote', 'partnership', 'support'] as const;
type Subject = (typeof SUBJECTS)[number];

const FIELD =
  'w-full min-h-12 rounded-field border border-forest-950/[0.14] bg-white px-4 py-3.5 text-[15px] text-ink-900 transition-all duration-[250ms] placeholder:text-ink-300';
const FIELD_ERROR = 'border-danger focus-visible:outline-danger';
const LABEL = 'font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400';
const ERROR = 'text-[13px] leading-[1.5] text-danger';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN_LENGTH = 20;

type FieldName = 'name' | 'email' | 'message' | 'consent';

/**
 * Formulaire de contact.
 *
 * La validation est faite en JavaScript plutôt qu'en HTML natif : les messages
 * du navigateur suivent la langue du système, pas celle du site. Ici, chaque
 * erreur vient de `contact.form.errors.*` et suit donc le sélecteur de langue.
 *
 * TODO : brancher `handleSubmit` sur /api/contact ou le CRM.
 */
export function ContactForm() {
  const { t } = useTranslation();
  const [subject, setSubject] = useState<Subject>('demo');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState(false);

  const validate = (form: HTMLFormElement): Partial<Record<FieldName, string>> => {
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const consent = data.get('consent') === 'on';
    const found: Partial<Record<FieldName, string>> = {};

    if (!name) found.name = t('contact.form.errors.nameRequired');

    if (!email) found.email = t('contact.form.errors.emailRequired');
    else if (!EMAIL_PATTERN.test(email)) found.email = t('contact.form.errors.emailInvalid');

    if (!message) found.message = t('contact.form.errors.messageRequired');
    else if (message.length < MESSAGE_MIN_LENGTH)
      found.message = t('contact.form.errors.messageTooShort');

    if (!consent) found.consent = t('contact.form.errors.consentRequired');

    return found;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(event.currentTarget);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setSent(false);
      // Renvoie le focus sur le premier champ en erreur.
      const first = Object.keys(found)[0] as FieldName;
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSent(true);
    event.currentTarget.reset();
    setSubject('demo');
  };

  const errorCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-forest-950/[0.08] bg-white p-6 shadow-soft sm:p-9"
    >
      <h2 className="text-[22px] tracking-[-0.025em] lg:text-[26px]">{t('contact.form.title')}</h2>
      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-500">{t('contact.form.intro')}</p>

      {errorCount > 0 ? (
        <p
          role="alert"
          className="mt-5 rounded-field border border-danger/30 bg-danger/[0.06] px-4 py-3 text-[14px] text-danger"
        >
          {t('contact.form.errors.summary', { count: errorCount })}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.name.label')}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            placeholder={t('contact.form.fields.name.placeholder')}
            className={cn(FIELD, errors.name && FIELD_ERROR)}
          />
          {errors.name ? (
            <span id="error-name" className={ERROR}>
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.org.label')}</span>
          <input
            type="text"
            name="org"
            autoComplete="organization"
            placeholder={t('contact.form.fields.org.placeholder')}
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.email.label')}</span>
          <input
            type="email"
            name="email"
            dir="ltr"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            placeholder={t('contact.form.fields.email.placeholder')}
            className={cn(FIELD, 'rtl:text-right', errors.email && FIELD_ERROR)}
          />
          {errors.email ? (
            <span id="error-email" className={ERROR}>
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.phone.label')}</span>
          <input
            type="tel"
            name="phone"
            dir="ltr"
            autoComplete="tel"
            placeholder={t('contact.form.fields.phone.placeholder')}
            className={cn(FIELD, 'rtl:text-right')}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.crop.label')}</span>
          <select name="crop" className={FIELD} defaultValue={SOLUTIONS[0].slug}>
            {SOLUTIONS.map((solution) => (
              <option key={solution.slug} value={solution.slug}>
                {t(`solutions.items.${solution.slug}.name`)}
              </option>
            ))}
            <option value="other">{t('contact.form.fields.crop.other')}</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>{t('contact.form.fields.area.label')}</span>
          <input
            type="text"
            name="area"
            inputMode="numeric"
            dir="ltr"
            placeholder={t('contact.form.fields.area.placeholder')}
            className={cn(FIELD, 'rtl:text-right')}
          />
        </label>
      </div>

      <fieldset className="mt-5 border-0 p-0">
        <legend className={LABEL}>{t('contact.form.fields.subject.label')}</legend>
        <input type="hidden" name="subject" value={subject} />
        <div className="mt-3 flex flex-wrap gap-2.5">
          {SUBJECTS.map((item) => {
            const selected = subject === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setSubject(item)}
                className={cn(
                  'min-h-11 rounded-full px-[18px] py-2.5 text-[14px] font-semibold transition-all duration-[250ms] ease-premium',
                  selected
                    ? 'border border-forest-900 bg-forest-900 text-lime-100'
                    : 'border border-forest-950/[0.14] bg-white text-ink-700 hover:border-leaf-500/50',
                )}
              >
                {t(`contact.form.subjects.${item}`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-5 flex flex-col gap-2">
        <span className={LABEL}>{t('contact.form.fields.message.label')}</span>
        <textarea
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          placeholder={t('contact.form.fields.message.placeholder')}
          className={cn(FIELD, 'resize-y leading-[1.6]', errors.message && FIELD_ERROR)}
        />
        {errors.message ? (
          <span id="error-message" className={ERROR}>
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className="mt-[18px] flex items-start gap-3 text-[13.5px] leading-[1.55] text-ink-500">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'error-consent' : undefined}
          className="mt-1 h-[18px] w-[18px] shrink-0 accent-leaf-500"
        />
        <span>
          {t('contact.form.consent')}
          {errors.consent ? (
            <span id="error-consent" className={cn('mt-1 block', ERROR)}>
              {errors.consent}
            </span>
          ) : null}
        </span>
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <ButtonAction type="submit" size="lg">
          {t('contact.form.submit')}
          <Arrow />
        </ButtonAction>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'font-mono text-[11px] uppercase tracking-[0.1em]',
            sent ? 'text-leaf-600' : 'text-ink-300',
          )}
        >
          {sent ? t('contact.form.statusSent') : t('contact.form.statusIdle')}
        </p>
      </div>
    </form>
  );
}
