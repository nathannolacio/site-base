import type { Cliente } from "@/content/conteudo";
import { itensDoMenu } from "@/content/conteudo";
import { linkTelefone, linkWhatsapp } from "@/lib/links";
import { Navbar } from "./secoes/navbar";
import { RODAPES, SECOES } from "./secoes/registro";
import { BannerDemo } from "./extras/BannerDemo";
import { WhatsappFlutuante } from "./extras/WhatsappFlutuante";

/** Monta a página inteira a partir de cliente.json (layout.secoes define ordem, variação e tom). */
export function Site({ c }: { c: Cliente }) {
  const { layout, contato } = c;
  const primeira = layout.secoes[0];
  const Rodape = RODAPES[layout.rodape.variacao].Componente;
  const horario = contato.horarios
    .filter((h) => !/fechado/i.test(h.horas))
    .slice(0, 1)
    .map((h) => `${h.dias}, ${h.horas}`)[0] ?? "";

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-base focus:bg-fundo focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <Navbar
        variacao={layout.navbar}
        nome={c.negocio.nome}
        logo={c.identidade.logo}
        itens={itensDoMenu(c)}
        whatsappHref={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)}
        telefone={contato.telefone}
        telefoneHref={linkTelefone(contato.telefone)}
        horario={horario}
        sobreFoto={primeira?.tipo === "hero" && primeira.variacao === 3}
      />
      <main id="conteudo">
        {layout.secoes.map((s, i) => {
          const { Componente } = SECOES[s.tipo][s.variacao];
          return <Componente key={`${s.tipo}-${i}`} c={c} tom={s.tom} />;
        })}
      </main>
      <Rodape c={c} tom={layout.rodape.tom} />
      {layout.whatsappFlutuante && <WhatsappFlutuante href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} />}
      {c.modoDemo && <BannerDemo nome={c.negocio.nome} />}
    </>
  );
}
