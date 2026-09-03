'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from '@/i18n';
import { SOLUTIONS } from '@/lib/data/solutions';
import { ButtonAction } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { cn } from '@/lib/utils';

const SUBJECTS = ['demo', 'quote', 'partnership', 'support'] as const;
type Subject = (typeof SUBJECTS)[number];

/*
 * `text-[16px]` sous `sm` n'est pas un choix esthétique : en dessous de 16px,
 * Safari iOS zoome automatiquement la page au focus d'un champ, ce qui décale
 * toute la mise en page. La taille compacte ne reprend qu'à partir de la
 * tablette, où le comportement n'existe pas.
 *
 * `min-h-11` (44px) est le plus petit contrôle confortable au doigt.
 */
const FIELD = [
  'w-full min-h-11 rounded-field border border-forest-950/[0.14] bg-white px-3.5 py-2.5',
  'text-[16px] text-ink-900 sm:text-[13.5px]',
  'transition-[border-color,background-color,box-shadow] duration-base ease-premium',
  'placeholder:text-ink-300 hover:border-forest-950/25',
  'focus:border-leaf-500 focus:bg-sage-50/40',
].join(' ');
const FIELD_ERROR = 'border-danger focus:border-danger focus-visible:outline-danger';
const LABEL = 'font-mono text-[10px] uppercase tracking-[0.13em] text-ink-400';
const ERROR = 'text-[12px] leading-[1.45] text-danger';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN_LENGTH = 20;

type FieldName = 'firstName' | 'lastName' | 'email' | 'message' | 'consent';
type Status = 'idle' | 'submitting' | 'sent' | 'error';

/**
 * Formulaire de contact.
 *
 * La validation est faite en JavaScript plutôt qu'en HTML natif : les messages
 * du navigateur suivent la langue du système, pas celle du site. Ici, chaque
 * erreur vient de `contact.form.errors.*` et suit donc le sélecteur de langue.
 */
export function ContactForm() {
  const { t } = useTranslation();
  const [subject, setSubject] = useState<Subject>('demo');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (form: HTMLFormElement): Partial<Record<FieldName, string>> => {
    const data = new FormData(form);
    const firstName = String(data.get('firstName') ?? '').trim();
    const lastName = String(data.get('lastName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const consent = data.get('consent') === 'on';
    const found: Partial<Record<FieldName, string>> = {};

    if (!firstName) found.firstName = t('contact.form.errors.firstNameRequired');
    if (!lastName) found.lastName = t('contact.form.errors.lastNameRequired');

    if (!email) found.email = t('contact.form.errors.emailRequired');
    else if (!EMAIL_PATTERN.test(email)) found.email = t('contact.form.errors.emailInvalid');

    if (message && message.length < MESSAGE_MIN_LENGTH)
      found.message = t('contact.form.errors.messageTooShort');

    if (!consent) found.consent = t('contact.form.errors.consentRequired');

    return found;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('idle');
      // Renvoie le focus sur le premier champ en erreur.
      const first = Object.keys(found)[0] as FieldName;
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const data = new FormData(form);
    setStatus('submitting');

    const cropSlug = String(data.get('crop') ?? '').trim();
    const cropLabel = !cropSlug
      ? ''
      : cropSlug === 'other'
        ? t('contact.form.fields.crop.other')
        : t(`solutions.items.${cropSlug}.name`);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('firstName') ?? '').trim(),
          lastName: String(data.get('lastName') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          phone: String(data.get('phone') ?? '').trim(),
          org: String(data.get('org') ?? '').trim(),
          crop: cropLabel,
          area: String(data.get('area') ?? '').trim(),
          subject,
          message: String(data.get('message') ?? '').trim(),
          consent: data.get('consent') === 'on',
        }),
      });

      if (!response.ok) throw new Error('send_failed');

      setStatus('sent');
      form.reset();
      setSubject('demo');
    } catch {
      setStatus('error');
    }
  };

  const errorCount = Object.keys(errors).length;
  const submitting = status === 'submitting';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-forest-950/[0.08] bg-white p-4 shadow-soft sm:p-6"
    >
      <h2 className="text-[18px] tracking-[-0.025em] lg:text-[20px]">{t('contact.form.title')}</h2>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-500">{t('contact.form.intro')}</p>

      {errorCount > 0 ? (
        <p
          role="alert"
          className="mt-3.5 rounded-field border border-danger/30 bg-danger/[0.06] px-3 py-2 text-[12.5px] text-danger"
        >
          {t('contact.form.errors.summary', { count: errorCount })}
        </p>
      ) : null}

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={LABEL}>{t('contact.form.fields.firstName.label')}</span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'error-firstName' : undefined}
            placeholder={t('contact.form.fields.firstName.placeholder')}
            className={cn(FIELD, errors.firstName && FIELD_ERROR)}
          />
          {errors.firstName ? (
            <span id="error-firstName" className={ERROR}>
              {errors.firstName}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className={LABEL}>{t('contact.form.fields.lastName.label')}</span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'error-lastName' : undefined}
            placeholder={t('contact.form.fields.lastName.placeholder')}
            className={cn(FIELD, errors.lastName && FIELD_ERROR)}
          />
          {errors.lastName ? (
            <span id="error-lastName" className={ERROR}>
              {errors.lastName}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className={LABEL}>{t('contact.form.fields.org.label')}</span>
          <input
            type="text"
            name="org"
            autoComplete="organization"
            placeholder={t('contact.form.fields.org.placeholder')}
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-1">
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

        <label className="flex flex-col gap-1">
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

        <label className="flex flex-col gap-1">
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

        <label className="flex flex-col gap-1">
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

      <fieldset className="mt-3.5 border-0 p-0">
        <legend className={LABEL}>{t('contact.form.fields.subject.label')}</legend>
        <input type="hidden" name="subject" value={subject} />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SUBJECTS.map((item) => {
            const selected = subject === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setSubject(item)}
                className={cn(
                  // 36px minimum : les pastilles sont alignées en ligne et
                  // restent atteignables au doigt sans casser la densité du
                  // formulaire, contrairement à un `min-h-8` de 32px.
                  'min-h-9 rounded-full px-4 py-2 text-[12.5px] font-semibold',
                  'transition-[background-color,border-color,color,transform] duration-base ease-premium',
                  'active:scale-95 active:duration-fast motion-reduce:active:scale-100',
                  selected
                    ? 'border border-forest-900 bg-forest-900 text-lime-100'
                    : 'border border-forest-950/[0.14] bg-white text-ink-700 hover:border-leaf-500/50 hover:bg-sage-50',
                )}
              >
                {t(`contact.form.subjects.${item}`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-3.5 flex flex-col gap-1">
        <span className={LABEL}>{t('contact.form.fields.message.label')}</span>
        <textarea
          name="message"
          rows={3}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          placeholder={t('contact.form.fields.message.placeholder')}
          className={cn(FIELD, 'resize-y leading-[1.5]', errors.message && FIELD_ERROR)}
        />
        {errors.message ? (
          <span id="error-message" className={ERROR}>
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className="mt-3.5 flex items-start gap-2 text-[12.5px] leading-[1.45] text-ink-500">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'error-consent' : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-leaf-500"
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

      {status === 'error' ? (
        <p
          role="alert"
          className="mt-3.5 rounded-field border border-danger/30 bg-danger/[0.06] px-3 py-2 text-[12.5px] text-danger"
        >
          {t('contact.form.statusError')}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ButtonAction type="submit" size="md" disabled={submitting}>
          {submitting ? t('contact.form.submitting') : t('contact.form.submit')}
          <Arrow />
        </ButtonAction>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'font-mono text-[11px] uppercase tracking-[0.1em]',
            status === 'sent' ? 'text-leaf-600' : 'text-ink-300',
          )}
        >
          {status === 'sent'
            ? t('contact.form.statusSent')
            : status === 'submitting'
              ? t('contact.form.statusSending')
              : t('contact.form.statusIdle')}
        </p>
      </div>
    </form>
  );
}
