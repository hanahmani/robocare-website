import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';

/**
 * Fait de l'URL la seule source de vérité de la langue.
 *
 * Toute requête dont le premier segment n'est pas `/fr`, `/en` ou `/ar` est
 * redirigée en 308 (permanent, méthode préservée) vers son équivalent
 * français — y compris `/` et les anciennes URL sans préfixe
 * (`/solutions` → `/fr/solutions`), pour ne pas laisser d'ancien lien ou
 * favori créer de contenu dupliqué.
 *
 * Volontairement **pas** de redirection basée sur `Accept-Language` : Google
 * déconseille de deviner la langue d'un visiteur pour le rediriger
 * automatiquement, car cela peut empêcher moteurs et utilisateurs de
 * découvrir les autres versions linguistiques. `hreflang` s'en charge dans
 * les résultats de recherche ; ici, l'URL demandée fait foi.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const [, first] = pathname.split('/');
  if ((LOCALES as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Exclut les fichiers statiques (tout segment avec un point), /_next, /api,
  // et la route générée /apple-icon (sans extension dans son URL publique).
  matcher: ['/((?!_next|api|apple-icon|.*\\..*).*)'],
};
