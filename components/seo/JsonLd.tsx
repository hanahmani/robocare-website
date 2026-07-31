/**
 * Injecte un graphe Schema.org dans la page.
 *
 * Rendu côté serveur : les moteurs le voient dans le HTML initial, sans coût
 * JavaScript côté client. Le `<` est échappé pour empêcher toute fermeture
 * prématurée de la balise si une chaîne traduite contenait du balisage.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- contenu généré par nos soins, échappé ci-dessous.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
