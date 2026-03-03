"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

/**
 * A curated selection of formulas from the catalog, chosen for visual variety
 * and recognition value.
 */
const FORMULAS = [
  { title: "Fórmula de Bhaskara", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
  { title: "Segunda Lei de Newton", latex: "F = m \\cdot a" },
  { title: "Energia Cinética", latex: "E_c = \\frac{1}{2}mv^2" },
  { title: "Teorema de Pitágoras", latex: "a^2 = b^2 + c^2" },
  { title: "Área do Círculo", latex: "A = \\pi r^2" },
  { title: "Equação de Torricelli", latex: "v^2 = v_0^2 + 2a\\Delta s" },
  { title: "Lei de Ohm", latex: "U = R \\cdot I" },
  { title: "Derivada", latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}" },
  { title: "Equação de Clapeyron", latex: "PV = nRT" },
  { title: "Lei de Coulomb", latex: "F = k \\frac{|q_1 q_2|}{d^2}" },
];

const TYPING_SPEED = 60; // ms per character
const DELETING_SPEED = 35; // ms per character (faster erase)
const PAUSE_AFTER_TYPING = 2800; // ms to hold the full formula
const PAUSE_AFTER_DELETING = 400; // ms before starting the next formula

type Phase = "typing" | "paused" | "deleting" | "waiting";

export function FormulaTypewriter() {
  const [formulaIndex, setFormulaIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Shuffle order on mount so it feels fresh each visit
  const order = useMemo(() => {
    const indices = FORMULAS.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  const current = FORMULAS[order[formulaIndex % order.length]];
  const displayedTitle = current.title.slice(0, charIndex);

  const advance = useCallback(() => {
    switch (phase) {
      case "typing":
        if (charIndex < current.title.length) {
          setCharIndex((c) => c + 1);
        } else {
          setPhase("paused");
        }
        break;
      case "paused":
        setPhase("deleting");
        break;
      case "deleting":
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setPhase("waiting");
        }
        break;
      case "waiting":
        setFormulaIndex((i) => i + 1);
        setPhase("typing");
        break;
    }
  }, [phase, charIndex, current.title.length]);

  useEffect(() => {
    const delays: Record<Phase, number> = {
      typing: TYPING_SPEED,
      paused: PAUSE_AFTER_TYPING,
      deleting: DELETING_SPEED,
      waiting: PAUSE_AFTER_DELETING,
    };

    const timer = setTimeout(advance, delays[phase]);
    return () => clearTimeout(timer);
  }, [advance, phase]);

  // Formula is visible only when title is fully typed or being held
  const showFormula = phase === "paused" || (phase === "deleting" && charIndex > 0);

  return (
    <div className="mt-5 flex flex-col items-center gap-2" aria-live="polite">
      {/* Title line with blinking cursor */}
      <span className="text-sm tracking-wide text-surface-50/50">
        {displayedTitle}
        <span className="animate-blink ml-px inline-block w-[2px] translate-y-[1px] bg-primary-400">
          &nbsp;
        </span>
      </span>

      {/* Rendered formula — fades in/out */}
      <span
        className={`text-base transition-opacity duration-500 ${
          showFormula ? "opacity-90" : "opacity-0"
        }`}
      >
        <InlineMath math={current.latex} />
      </span>
    </div>
  );
}
