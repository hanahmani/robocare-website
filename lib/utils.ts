type ClassValue = string | false | null | undefined | ClassValue[];

/**
 * Concatène des classes conditionnelles sans dépendance externe.
 * Les tableaux sont acceptés et aplatis, ce qui permet de regrouper par
 * intention (état de survol, focus, motion-reduce…) les longues listes de
 * classes d'un même composant.
 */
export function cn(...values: ClassValue[]): string {
  return values
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(' ');
}

/** Formate un entier avec un séparateur de milliers (ex. 100000 → « 100 000 »). */
export function formatNumber(value: number, separator = ''): string {
  const raw = String(Math.round(value));
  return separator ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : raw;
}

/** Numérotation « 01 », « 02 »… pour les listes d'étapes. */
export function pad2(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * Initiales dérivées d'un nom traduit — évite de coder des initiales en dur
 * qui n'auraient aucun sens en arabe.
 */
export function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? '')
    .join('')
    .toLocaleUpperCase();
}
