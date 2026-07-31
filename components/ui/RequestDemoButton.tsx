'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useTranslation } from '@/i18n';
import { useDemoModal } from '@/components/demo/DemoModalProvider';
import { ButtonAction, type Size, type Variant } from '@/components/ui/Button';

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'>;

/** CTA "Demander une démo" : ouvre la modale au lieu de naviguer vers /contact. */
export function RequestDemoButton({ variant = 'primary', size = 'md', className, onClick, ...rest }: Props) {
  const { t } = useTranslation();
  const { openDemoModal } = useDemoModal();

  return (
    <ButtonAction
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={(event) => {
        openDemoModal();
        onClick?.(event);
      }}
      {...rest}
    >
      {t('actions.requestDemo')}
    </ButtonAction>
  );
}
