import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  org?: string;
  crop?: string;
  area?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUBJECT_LABELS: Record<string, string> = {
  demo: 'Démonstration',
  quote: 'Devis',
  partnership: 'Partenariat',
  support: 'Support',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const firstName = String(payload.firstName ?? '').trim();
  const lastName = String(payload.lastName ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const phone = String(payload.phone ?? '').trim();
  const org = String(payload.org ?? '').trim();
  const crop = String(payload.crop ?? '').trim();
  const area = String(payload.area ?? '').trim();
  const subject = String(payload.subject ?? '').trim();
  const message = String(payload.message ?? '').trim();
  const consent = Boolean(payload.consent);

  if (!firstName || !lastName || !email || !consent || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.error('Contact form: missing RESEND_API_KEY, CONTACT_EMAIL_FROM or CONTACT_EMAIL_TO');
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? (subject || 'Non précisé');
  const dateLabel = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const DIVIDER = '━'.repeat(22);

  const clientLines = [
    `Prénom : ${firstName}`,
    `Nom : ${lastName}`,
    `E-mail : ${email}`,
    `Téléphone : ${phone || 'Non renseigné'}`,
  ];
  if (org) clientLines.push('', `Exploitation / Organisation : ${org}`);
  const cropAreaLines = [
    crop ? `Culture principale : ${crop}` : null,
    area ? `Surface : ${area} hectares` : null,
  ].filter((line): line is string => line !== null);
  if (cropAreaLines.length > 0) clientLines.push('', ...cropAreaLines);
  clientLines.push('', `Objet de la demande : ${subjectLabel}`);

  const text = [
    'Bonjour Robocare,',
    '',
    'Une nouvelle demande a été envoyée depuis le formulaire de contact RoboCare.',
    '',
    DIVIDER,
    'INFORMATIONS DU CLIENT',
    DIVIDER,
    '',
    ...clientLines,
    '',
    DIVIDER,
    'MESSAGE',
    DIVIDER,
    '',
    message || 'Non renseigné',
    '',
    DIVIDER,
    '',
    `Date de la demande : ${dateLabel}`,
    '',
    '– Formulaire de contact',
  ].join('\n');

  const clientHtmlRows = [
    `<p style="margin:0 0 6px;">Prénom : ${escapeHtml(firstName)}</p>`,
    `<p style="margin:0 0 6px;">Nom : ${escapeHtml(lastName)}</p>`,
    `<p style="margin:0 0 6px;">E-mail : ${escapeHtml(email)}</p>`,
    `<p style="margin:0;">Téléphone : ${escapeHtml(phone || 'Non renseigné')}</p>`,
    org ? `<p style="margin:16px 0 0;">Exploitation / Organisation : ${escapeHtml(org)}</p>` : '',
    cropAreaLines.length > 0
      ? `<div style="margin-top:16px;">${cropAreaLines.map((line) => `<p style="margin:0 0 6px;">${escapeHtml(line)}</p>`).join('')}</div>`
      : '',
    `<p style="margin:16px 0 0;">Objet de la demande : ${escapeHtml(subjectLabel)}</p>`,
  ].join('');

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #111;">
      <p>Bonjour Robocare,</p>
      <p>Une nouvelle demande a été envoyée depuis le formulaire de contact RoboCare.</p>

      <p style="letter-spacing:2px; color:#888; margin:24px 0 4px;">${DIVIDER}</p>
      <p style="font-weight:bold; letter-spacing:1px; margin:0 0 4px;">INFORMATIONS DU CLIENT</p>
      <p style="letter-spacing:2px; color:#888; margin:0 0 16px;">${DIVIDER}</p>

      ${clientHtmlRows}

      <p style="letter-spacing:2px; color:#888; margin:24px 0 4px;">${DIVIDER}</p>
      <p style="font-weight:bold; letter-spacing:1px; margin:0 0 4px;">MESSAGE</p>
      <p style="letter-spacing:2px; color:#888; margin:0 0 16px;">${DIVIDER}</p>

      <p>${escapeHtml(message || 'Non renseigné').replace(/\n/g, '<br />')}</p>

      <p style="letter-spacing:2px; color:#888; margin:24px 0 16px;">${DIVIDER}</p>

      <p style="margin:0;">Date de la demande : ${dateLabel}</p>
      <p style="margin:16px 0 0; color:#555;">– Formulaire de contact</p>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[Contact RoboCare] ${subjectLabel} — ${firstName} ${lastName}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Contact form: Resend API error', response.status, errorBody);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
