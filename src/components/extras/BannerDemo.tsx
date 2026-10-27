/** Aviso discreto de que o site é uma prévia (cliente.json → "modoDemo": true). */
export function BannerDemo({ nome }: { nome: string }) {
  return (
    <p
      role="note"
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-6.5rem)] rounded-full bg-tinta/90 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur md:bottom-6 md:left-6"
    >
      Prévia de proposta para {nome}
    </p>
  );
}
