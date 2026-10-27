import Image from "next/image";

/** Logo em imagem (identidade.logo) ou, sem logo, o nome da marca na fonte de título. */
export function Logo({ nome, logo, className = "", tamanho = "text-2xl" }: { nome: string; logo?: string; className?: string; tamanho?: string }) {
  if (logo) {
    return (
      <span className={`relative block h-10 w-32 ${className}`}>
        <Image src={logo} alt={nome} fill sizes="128px" className="object-contain object-left" priority />
      </span>
    );
  }
  return <span className={`titulo leading-none ${tamanho} ${className}`}>{nome}</span>;
}
