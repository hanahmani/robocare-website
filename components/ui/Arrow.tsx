import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Flèche directionnelle : pointe toujours vers le sens de lecture.
 * En RTL, `rtl:rotate-180` la retourne automatiquement (aucun JS requis).
 */
export function Arrow({ size = 16, className }: { size?: number; className?: string }) {
  return <ArrowRight size={size} aria-hidden className={cn('shrink-0 rtl:rotate-180', className)} />;
}
