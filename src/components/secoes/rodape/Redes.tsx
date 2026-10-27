import type { Cliente } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import { IconeFacebook, IconeInstagram, IconeTiktok, IconeWhatsapp } from "@/components/ui/IconesRedes";

export function Redes({ c, className = "" }: { c: Cliente; className?: string }) {
  const { redes, contato } = c;
  const lista = [
    { href: linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp), rotulo: "WhatsApp", Icone: IconeWhatsapp },
    redes.instagram?.url && { href: redes.instagram.url, rotulo: "Instagram", Icone: IconeInstagram },
    redes.facebook && { href: redes.facebook, rotulo: "Facebook", Icone: IconeFacebook },
    redes.tiktok && { href: redes.tiktok, rotulo: "TikTok", Icone: IconeTiktok },
  ].filter(Boolean) as { href: string; rotulo: string; Icone: typeof IconeWhatsapp }[];

  return (
    <ul className={`flex gap-2 ${className}`}>
      {lista.map(({ href, rotulo, Icone }) => (
        <li key={rotulo}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={rotulo}
            className="grid size-11 place-items-center rounded-botao border border-linha transition hover:bg-texto hover:text-fundo"
          >
            <Icone className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
