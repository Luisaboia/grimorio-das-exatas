"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Line, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function FormulasAdicaoGraph(_props: GraphProps) {
  const [a, setA] = useState(Math.PI / 4);
  const [b, setB] = useState(Math.PI / 6);

  const sinA = Math.sin(a);
  const sinB = Math.sin(b);
  const cosA = Math.cos(a);
  const cosB = Math.cos(b);
  const sinAplusB = Math.sin(a + b);

  return (
    <GraphContainer label="Fórmulas de Adição — sin(a + b)">
      <Mafs
        width="auto"
        height={300}
        viewBox={{ x: [-0.5, 7], y: [-1.5, 1.5] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{
            lines: Math.PI / 2,
            labels: (n) => {
              if (Math.abs(n) < 0.01) return "0";
              const multiple = n / (Math.PI / 2);
              if (Math.abs(multiple - Math.round(multiple)) < 0.01) {
                const m = Math.round(multiple);
                if (m === 2) return "π";
                if (m === 4) return "2π";
                return `${m}π/2`;
              }
              return "";
            },
          }}
          yAxis={{ lines: 0.5, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* sin(x) — base curve (faded) */}
        <Plot.OfX y={(x) => Math.sin(x)} color="var(--mafs-blue)" opacity={0.4} weight={1.5} />

        {/* sin(x + b) — shifted curve */}
        <Plot.OfX y={(x) => Math.sin(x + b)} color="var(--mafs-green)" weight={2} />

        {/* Vertical line at x = a */}
        <Line.Segment
          point1={[a, -1.5]}
          point2={[a, 1.5]}
          color="var(--mafs-yellow)"
          weight={1}
          opacity={0.5}
        />

        {/* Vertical line at x = a + b */}
        <Line.Segment
          point1={[a + b, -1.5]}
          point2={[a + b, 1.5]}
          color="var(--mafs-green)"
          weight={1}
          opacity={0.5}
        />

        {/* Labels */}
        <Text x={a} y={1.35} size={12} color="var(--mafs-yellow)">a</Text>
        <Text x={a + b} y={1.35} size={12} color="var(--mafs-green)">a+b</Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="a" value={a} min={0} max={2 * Math.PI} step={0.05} onChange={setA} unit=" rad" />
        <Slider label="b" value={b} min={0} max={2 * Math.PI} step={0.05} onChange={setB} unit=" rad" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="sin(a)" value={sinA.toFixed(4)} />
        <ValueDisplay label="sin(b)" value={sinB.toFixed(4)} />
        <ValueDisplay label="sin(a+b)" value={sinAplusB.toFixed(4)} />
        <ValueDisplay label="sin a·cos b + cos a·sin b" value={(sinA * cosB + cosA * sinB).toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
