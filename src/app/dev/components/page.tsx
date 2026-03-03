"use client";

import { Button, Card, Badge, Input, Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-50">
        {title}
      </h2>
      <div className="rounded-2xl border border-surface-200 bg-surface-50/50 p-6 dark:border-surface-800 dark:bg-surface-900/50">
        {children}
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-surface-800 dark:text-surface-50">
              Design System
            </h1>
            <p className="mt-2 text-lg text-surface-800/60 dark:text-surface-50/60">
              Componentes UI — Física IFPR
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Theme Toggle */}
        <Section title="Theme Toggle">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-surface-800/70 dark:text-surface-50/70">
              Clique para alternar entre modo claro e escuro
            </span>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Button">
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Variantes
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Tamanhos
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Desabilitado
              </p>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Card">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-50">
                Card padrão
              </h3>
              <p className="mt-2 text-sm text-surface-800/70 dark:text-surface-50/70">
                Card com glassmorphism sutil e bordas arredondadas.
              </p>
            </Card>
            <Card hover>
              <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-50">
                Card com hover
              </h3>
              <p className="mt-2 text-sm text-surface-800/70 dark:text-surface-50/70">
                Passe o mouse para ver a elevação e scale.
              </p>
            </Card>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Disciplinas
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="fisica">Física</Badge>
                <Badge variant="matematica">Matemática</Badge>
                <Badge variant="default">Default</Badge>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Dificuldade
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="basico">Básico</Badge>
                <Badge variant="intermediario">Intermediário</Badge>
                <Badge variant="avancado">Avançado</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* Input */}
        <Section title="Input">
          <div className="max-w-md space-y-4">
            <Input placeholder="Buscar fórmulas..." icon={<SearchIcon />} />
            <Input placeholder="Sem ícone..." />
          </div>
        </Section>

        {/* Skeleton */}
        <Section title="Skeleton">
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Skeleton básico
              </p>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                SkeletonText
              </p>
              <SkeletonText lines={4} />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                SkeletonCard
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Tipografia">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Font Sans (Geist)
              </p>
              <p className="font-sans text-xl text-surface-800 dark:text-surface-50">
                A velocidade é a taxa de variação da posição.
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Font Mono (JetBrains Mono)
              </p>
              <p className="font-mono text-xl text-surface-800 dark:text-surface-50">
                v = d / t → F = m × a
              </p>
            </div>
          </div>
        </Section>

        {/* Color Palette */}
        <Section title="Paleta de Cores">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Primary
              </p>
              <div className="flex flex-wrap gap-1">
                <div className="h-10 w-10 rounded-lg bg-primary-50" title="primary-50" />
                <div className="h-10 w-10 rounded-lg bg-primary-100" title="primary-100" />
                <div className="h-10 w-10 rounded-lg bg-primary-200" title="primary-200" />
                <div className="h-10 w-10 rounded-lg bg-primary-300" title="primary-300" />
                <div className="h-10 w-10 rounded-lg bg-primary-400" title="primary-400" />
                <div className="h-10 w-10 rounded-lg bg-primary-500" title="primary-500" />
                <div className="h-10 w-10 rounded-lg bg-primary-600" title="primary-600" />
                <div className="h-10 w-10 rounded-lg bg-primary-700" title="primary-700" />
                <div className="h-10 w-10 rounded-lg bg-primary-800" title="primary-800" />
                <div className="h-10 w-10 rounded-lg bg-primary-900" title="primary-900" />
                <div className="h-10 w-10 rounded-lg bg-primary-950" title="primary-950" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Secondary
              </p>
              <div className="flex flex-wrap gap-1">
                <div className="h-10 w-10 rounded-lg bg-secondary-50" title="secondary-50" />
                <div className="h-10 w-10 rounded-lg bg-secondary-100" title="secondary-100" />
                <div className="h-10 w-10 rounded-lg bg-secondary-200" title="secondary-200" />
                <div className="h-10 w-10 rounded-lg bg-secondary-300" title="secondary-300" />
                <div className="h-10 w-10 rounded-lg bg-secondary-400" title="secondary-400" />
                <div className="h-10 w-10 rounded-lg bg-secondary-500" title="secondary-500" />
                <div className="h-10 w-10 rounded-lg bg-secondary-600" title="secondary-600" />
                <div className="h-10 w-10 rounded-lg bg-secondary-700" title="secondary-700" />
                <div className="h-10 w-10 rounded-lg bg-secondary-800" title="secondary-800" />
                <div className="h-10 w-10 rounded-lg bg-secondary-900" title="secondary-900" />
                <div className="h-10 w-10 rounded-lg bg-secondary-950" title="secondary-950" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-surface-800/70 dark:text-surface-50/70">
                Accent
              </p>
              <div className="flex flex-wrap gap-1">
                <div className="h-10 w-10 rounded-lg bg-accent-50" title="accent-50" />
                <div className="h-10 w-10 rounded-lg bg-accent-100" title="accent-100" />
                <div className="h-10 w-10 rounded-lg bg-accent-200" title="accent-200" />
                <div className="h-10 w-10 rounded-lg bg-accent-300" title="accent-300" />
                <div className="h-10 w-10 rounded-lg bg-accent-400" title="accent-400" />
                <div className="h-10 w-10 rounded-lg bg-accent-500" title="accent-500" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
