# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o versionamento segue o [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2026-03-03

### Added
- Release inicial com 62+ fórmulas (33 Física + 29 Matemática)
- Catálogo de fórmulas com grid de cards, filtros por categoria e busca
- Páginas de detalhe com renderização completa MDX e KaTeX
- Command Palette de busca (`Ctrl+K`) com resultados em tempo real
- Dark mode com persistência (localStorage)
- Layout responsivo (mobile, tablet, desktop)
- Sidebar de navegação com categorias e subcategorias
- Breadcrumbs para navegação contextual
- SEO: sitemap.xml, robots.txt, JSON-LD (structured data), meta tags
- 35 testes automatizados (Jest + React Testing Library)
- Integração Supabase opcional com busca full-text em português
- Componentes MDX: FormulaBlock, Formula, Variable, Example, Note
- Design system com componentes UI: Button, Card, Badge, Input, Skeleton
- Header com busca integrada e toggle de tema
- Footer com links e informações do projeto
- Página de busca dedicada (`/busca`)
- API route de busca (`/api/search`)
- Mobile navigation com menu hamburger
