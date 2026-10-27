export function linkWhatsapp(numero: string, mensagem?: string) {
  const n = numero.replace(/\D/g, "");
  return mensagem ? `https://wa.me/${n}?text=${encodeURIComponent(mensagem)}` : `https://wa.me/${n}`;
}

export function linkTelefone(telefone: string) {
  const n = telefone.replace(/\D/g, "");
  // até 11 dígitos = DDD + número (sem o código do país)
  return `tel:+${n.length <= 11 ? `55${n}` : n}`;
}

export function linkMapa(endereco: string, mapsUrl?: string) {
  return mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}

/** Mapa embutido sem chave de API. */
export function embedMapa(endereco: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`;
}

export function enderecoCompleto(endereco: string, bairroCidade: string) {
  return `${endereco}, ${bairroCidade}`;
}

/** 4.9 -> "4,9" */
export function nota(n: number) {
  return n.toFixed(1).replace(".", ",");
}
