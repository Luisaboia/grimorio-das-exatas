import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Sobre | Grimório das Exatas",
  description:
    "Conheça o Grimório das Exatas — um catálogo de fórmulas de Matemática e Física para estudantes e professores do ensino médio e superior.",
  openGraph: {
    title: "Sobre | Grimório das Exatas",
    description:
      "Conheça o Grimório das Exatas — um catálogo de fórmulas de Matemática e Física para estudantes e professores do ensino médio e superior.",
  },
};

const technologies = [
  { name: "Next.js", variant: "fisica" as const },
  { name: "TypeScript", variant: "matematica" as const },
  { name: "Tailwind CSS", variant: "fisica" as const },
  { name: "KaTeX", variant: "matematica" as const },
  { name: "MDX", variant: "fisica" as const },
  { name: "Supabase", variant: "matematica" as const },
];

export default function SobrePage() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Sobre" },
          ]}
        />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-surface-50 sm:text-4xl">
            Sobre o Grimório das Exatas
          </h1>
          <p className="mt-3 text-lg text-surface-50/60">
            Um catálogo de fórmulas de Matemática e Física para estudantes e
            professores.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* O Projeto */}
          <Card>
            <h2 className="mb-3 text-xl font-semibold text-surface-50">
              O Projeto
            </h2>
            <p className="leading-relaxed text-surface-50/70">
              O Grimório das Exatas é uma plataforma educacional que reúne as
              principais fórmulas de Física e Matemática em um só lugar. Cada
              fórmula é apresentada de forma clara, com descrição das variáveis,
              exemplos resolvidos e notas explicativas, facilitando o estudo e a
              consulta rápida.
            </p>
          </Card>

          {/* Público-alvo */}
          <Card>
            <h2 className="mb-3 text-xl font-semibold text-surface-50">
              Para quem é
            </h2>
            <p className="leading-relaxed text-surface-50/70">
              Esta ferramenta foi criada pensando em{" "}
              <strong className="text-surface-50">
                alunos e professores do ensino médio e superior
              </strong>
              . Seja para revisar conteúdos antes de uma prova, preparar aulas
              ou simplesmente explorar o mundo das ciências exatas, o Grimório
              das Exatas oferece uma referência acessível e organizada.
            </p>
          </Card>

          {/* Tecnologias */}
          <Card>
            <h2 className="mb-3 text-xl font-semibold text-surface-50">
              Tecnologias
            </h2>
            <p className="mb-4 leading-relaxed text-surface-50/70">
              O projeto foi construído com tecnologias modernas para garantir
              performance, acessibilidade e uma ótima experiência de uso.
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech.name} variant={tech.variant}>
                  {tech.name}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Créditos */}
          <Card>
            <h2 className="mb-3 text-xl font-semibold text-surface-50">
              Créditos
            </h2>
            <p className="leading-relaxed text-surface-50/70">
              Desenvolvido com dedicação para a comunidade acadêmica. O conteúdo
              das fórmulas é baseado em referências bibliográficas amplamente
              utilizadas no ensino de Física e Matemática no Brasil. Agradecemos
              a todos os educadores e estudantes que contribuem para a
              disseminação do conhecimento.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
