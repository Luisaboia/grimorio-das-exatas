-- ============================================================
-- 001_initial_schema.sql
-- Initial database schema for física-ifpr-app
-- ============================================================

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Formulas table (metadata only — content is in MDX files)
CREATE TABLE formulas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  formula_preview TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  subcategory TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('basico', 'intermediario', 'avancado')),
  tags TEXT[] DEFAULT '{}',
  mdx_path TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Full-text search index (Portuguese)
CREATE INDEX formulas_search_idx ON formulas
  USING GIN(to_tsvector('portuguese', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || array_to_string(tags, ' ')));

-- RLS policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON formulas FOR SELECT USING (is_published = true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER formulas_updated_at
  BEFORE UPDATE ON formulas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
