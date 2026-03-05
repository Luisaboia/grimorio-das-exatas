import { lazy, type ComponentType } from "react";
import type { GraphProps } from "./types";

type LazyGraph = React.LazyExoticComponent<ComponentType<GraphProps>>;

export const graphRegistry: Record<string, LazyGraph> = {
  // Trigonometria
  "razoes-trigonometricas": lazy(() => import("./formulas/trigonometria/RazoesTrigonometricasGraph")),
  "identidades-fundamentais": lazy(() => import("./formulas/trigonometria/IdentidadesFundamentaisGraph")),
  "formulas-adicao": lazy(() => import("./formulas/trigonometria/FormulasAdicaoGraph")),
  // Cálculo
  "derivada": lazy(() => import("./formulas/calculo/DerivadaGraph")),
  "integral": lazy(() => import("./formulas/calculo/IntegralGraph")),
  "limite": lazy(() => import("./formulas/calculo/LimiteGraph")),
  // Cinemática
  "mru-posicao": lazy(() => import("./formulas/cinematica/MRUPosicaoGraph")),
  "mruv-posicao": lazy(() => import("./formulas/cinematica/MRUVPosicaoGraph")),
  "queda-livre": lazy(() => import("./formulas/cinematica/QuedaLivreGraph")),
  // Geometria Analítica
  "equacao-reta": lazy(() => import("./formulas/geometria-analitica/EquacaoRetaGraph")),
  "distancia-dois-pontos": lazy(() => import("./formulas/geometria-analitica/DistanciaDoisPontosGraph")),
  "equacao-circunferencia": lazy(() => import("./formulas/geometria-analitica/EquacaoCircunferenciaGraph")),
  "coeficiente-angular": lazy(() => import("./formulas/geometria-analitica/CoeficienteAngularGraph")),
  // Álgebra
  "bhaskara": lazy(() => import("./formulas/algebra/BhaskaraGraph")),
  // Dinâmica
  "segunda-lei-newton": lazy(() => import("./formulas/dinamica/SegundaLeiNewtonGraph")),
};
