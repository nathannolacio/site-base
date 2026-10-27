import { ServicosGrade } from "./ServicosGrade";
import { ServicosLista } from "./ServicosLista";
import { ServicosCarrossel } from "./ServicosCarrossel";

export const SERVICOS = {
  1: { nome: "Grade de cards", Componente: ServicosGrade },
  2: { nome: "Lista editorial", Componente: ServicosLista },
  3: { nome: "Carrossel com fotos", Componente: ServicosCarrossel },
} as const;
