import Link from 'next/link';

/**
 * Filet de sécurité racine.
 *
 * `app/[locale]/layout.tsx` est le layout racine de fait (aucun `app/layout.tsx`
 * ne l'entoure) : il fournit `<html>`/`<body>` pour toutes les pages valides.
 * Mais Next.js ne réutilise PAS le `not-found.tsx` d'un segment pour les
 * erreurs `notFound()` levées par le layout de ce même segment (cas d'une
 * langue invalide, en principe déjà écartée par `middleware.ts`) — il faut
 * donc un `not-found.tsx` racine capable de fournir son propre HTML.
 * Volontairement minimal et sans dépendance au dictionnaire : à ce stade,
 * la langue n'est pas résolue.
 */
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06120C',
          color: '#fff',
          fontFamily:
            'ui-sans-serif, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.7 }}>404</p>
          <h1 style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 700 }}>Page introuvable</h1>
          <p style={{ margin: '10px 0 0', fontSize: 15, opacity: 0.75 }}>
            Page not found · الصفحة غير موجودة
          </p>
          <Link
            href="/fr"
            style={{
              display: 'inline-block',
              marginTop: 20,
              padding: '10px 20px',
              borderRadius: 999,
              background: '#9ED84B',
              color: '#06120C',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            robocare.tn
          </Link>
        </div>
      </body>
    </html>
  );
}
