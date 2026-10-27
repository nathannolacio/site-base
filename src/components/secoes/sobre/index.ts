import { SobreFoto } from "./SobreFoto";
import { SobreNumeros } from "./SobreNumeros";
import { SobreManifesto } from "./SobreManifesto";

export const SOBRES = {
  1: { nome: "Foto com moldura", Componente: SobreFoto },
  2: { nome: "Números", Componente: SobreNumeros },
  3: { nome: "Manifesto", Componente: SobreManifesto },
} as const;
