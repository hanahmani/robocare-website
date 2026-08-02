'use client';

import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';

/** Page 404 : reprend la grammaire sombre des heros internes. */
export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[70vh] items-center bg-forest-950 text-white">
      <div className="grid-overlay absolute inset-0" />
      <div className="container-page relative py-24 text-center">
        <p className="eyebrow justify-center text-lime-500">{t('notFound.eyebrow')}</p>
        <h1 className="mt-4 text-[34px] leading-[1.06] text-white sm:text-[44px]">
          {t('notFound.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-[34rem] text-[16px] leading-[1.65] text-white/70">
          {t('notFound.text')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Button href="/" variant="lime" size="lg">
            {t('actions.backHome')}
          </Button>
          <Button href="/solutions" variant="outline-light" size="lg">
            {t('actions.seeSolutions')}
          </Button>
        </div>
      </div>
    </section>
  );
}
