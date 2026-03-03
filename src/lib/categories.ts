export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  color: "secundario" | "fisica";
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    name: "Matemática",
    slug: "matematica",
    icon: "📐",
    color: "secundario",
    subcategories: [
      { name: "Álgebra", slug: "algebra" },
      { name: "Geometria Plana", slug: "geometria-plana" },
      { name: "Geometria Espacial", slug: "geometria-espacial" },
      { name: "Trigonometria", slug: "trigonometria" },
      { name: "Geometria Analítica", slug: "geometria-analitica" },
      { name: "Cálculo", slug: "calculo" },
      { name: "Estatística", slug: "estatistica" },
    ],
  },
  {
    name: "Física",
    slug: "fisica",
    icon: "⚛️",
    color: "fisica",
    subcategories: [
      { name: "Cinemática", slug: "cinematica" },
      { name: "Dinâmica", slug: "dinamica" },
      { name: "Trabalho e Energia", slug: "trabalho-energia" },
      { name: "Termodinâmica", slug: "termodinamica" },
      { name: "Óptica", slug: "optica" },
      { name: "Ondulatória", slug: "ondulatoria" },
      { name: "Eletrostática", slug: "eletrostatica" },
      { name: "Eletrodinâmica", slug: "eletrodinamica" },
      { name: "Eletromagnetismo", slug: "eletromagnetismo" },
    ],
  },
];
