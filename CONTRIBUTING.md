# Contribuindo com o Grimório das Exatas

Obrigado pelo interesse em contribuir! Este guia explica como adicionar novas fórmulas e colaborar com o projeto.

## 📝 Adicionando uma Nova Fórmula

### 1. Crie o arquivo MDX

Crie um arquivo `.mdx` na pasta correspondente:

- **Física** → `src/content/fisica/nome-da-formula.mdx`
- **Matemática** → `src/content/matematica/nome-da-formula.mdx`

O nome do arquivo deve ser o slug da fórmula (letras minúsculas, sem acentos, separado por hífens).

### 2. Adicione o frontmatter

Todo arquivo MDX precisa de um frontmatter YAML no início:

```yaml
---
title: "Nome da Fórmula"
slug: "nome-da-formula"
category: "fisica"              # "fisica" ou "matematica"
subcategory: "cinematica"       # slug da subcategoria (ver lista abaixo)
tags: ["tag1", "tag2", "tag3"]
difficulty: "basico"            # "basico" | "intermediario" | "avancado"
description: "Descrição breve da fórmula para SEO e cards do catálogo"
formula_preview: "F = m \\cdot a"  # LaTeX exibido no card (escape com \\)
---
```

### 3. Subcategorias disponíveis

**Física:**
- `mecanica` — Mecânica (cinemática, dinâmica, estática)
- `termodinamica` — Termodinâmica e Calorimetria
- `ondulatoria` — Ondulatória e Acústica
- `optica` — Óptica
- `eletricidade` — Eletricidade e Magnetismo

**Matemática:**
- `geometria-plana` — Geometria Plana
- `geometria-espacial` — Geometria Espacial
- `trigonometria` — Trigonometria
- `algebra` — Álgebra
- `geometria-analitica` — Geometria Analítica
- `logaritmos` — Logaritmos

### 4. Componentes MDX disponíveis

Use estes componentes dentro do conteúdo MDX:

#### `<FormulaBlock>`
Exibe uma fórmula em destaque (bloco centralizado):
```mdx
<FormulaBlock math="F = m \cdot a" label="Segunda Lei de Newton" />
```

#### `<Formula>`
Fórmula inline no meio do texto:
```mdx
A força é dada por <Formula math="F = m \cdot a" />.
```

#### `<Variable>`
Descreve uma variável da fórmula:
```mdx
<Variable symbol="F" description="Força resultante" unit="N (Newton)" />
<Variable symbol="m" description="Massa do corpo" unit="kg" />
<Variable symbol="a" description="Aceleração" unit="m/s²" />
```

#### `<Example>`
Bloco de exemplo resolvido:
```mdx
<Example title="Cálculo da força">
Um corpo de 10 kg é acelerado a 2 m/s².

<Formula math="F = 10 \times 2 = 20 \, \text{N}" />
</Example>
```

#### `<Note>`
Nota, dica ou aviso:
```mdx
<Note type="tip">Lembre-se de converter as unidades antes de substituir.</Note>
<Note type="info">Esta fórmula é válida apenas para MRU.</Note>
<Note type="warning">Não confunda peso com massa!</Note>
```

### 5. Verificação

Após criar o arquivo:

```bash
# Verifica se compila corretamente
npm run build

# Executa os testes
npm test

# Verifica o lint
npm run lint
```

## 🛠️ Desenvolvimento

### Setup local

```bash
git clone https://github.com/your-username/fisica-ifpr-app.git
cd fisica-ifpr-app
npm install
npm run dev
```

### Convenções de código

- **TypeScript** para todo código
- **Tailwind CSS v4** para estilização (sem CSS modules)
- **Server Components** por padrão; use `"use client"` apenas quando necessário
- Nomes de arquivos em **camelCase** (componentes) ou **kebab-case** (conteúdo MDX)

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — nova feature
- `fix:` — correção de bug
- `docs:` — documentação
- `content:` — novo conteúdo (fórmulas)
- `test:` — testes
- `chore:` — manutenção

Exemplos:
```
feat: add search pagination
content(fisica): add lei-gravitacao-universal formula
fix: correct KaTeX rendering for fractions
docs: update README with new scripts
```

## 📐 Padrão de Qualidade para Fórmulas

- Toda fórmula deve ter **pelo menos 1 exemplo resolvido**
- Use **unidades SI** nas variáveis
- A `description` do frontmatter deve ter entre 50–160 caracteres (SEO)
- O `formula_preview` deve ser a fórmula principal (a mais conhecida)
- Adicione **tags relevantes** para melhorar a busca
- Revise a renderização LaTeX no navegador antes de submeter

## ❓ Dúvidas

Abra uma [issue](https://github.com/your-username/fisica-ifpr-app/issues) no repositório.
