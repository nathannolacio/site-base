import { IconeWhatsapp } from "@/components/ui/IconesRedes";

export function WhatsappFlutuante({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] transition hover:scale-105 md:right-6 md:bottom-6 md:size-16"
    >
      <IconeWhatsapp className="size-7 md:size-8" />
    </a>
  );
}
