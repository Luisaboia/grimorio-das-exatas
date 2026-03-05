"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Line, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function BhaskaraGraph(_props: GraphProps) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-2);

  const f = (x: number) => a * x * x + b * x + c;
  const delta = b * b - 4 * a * c;

  // Vertex
  const xv = a !== 0 ? -b / (2 * a) : 0;
  const yv = f(xv);

  // Roots
  const x1 = delta >= 0 && a !== 0 ? (-b + Math.sqrt(delta)) / (2 * a) : null;
  const x2 = delta >= 0 && a !== 0 ? (-b - Math.sqrt(delta)) / (2 * a) : null;

  // Color based on discriminant
  const curveColor = delta > 0 ? "var(--mafs-blue)" : delta === 0 ? "var(--mafs-yellow)" : "var(--mafs-red)";

  return (
    <GraphContainer label="Bhaskara — f(x) = ax² + bx + c">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-6, 6], y: [-8, 8] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 2, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Parabola */}
        {a !== 0 && <Plot.OfX y={f} color={curveColor} weight={2.5} />}

        {/* Axis of symmetry */}
        {a !== 0 && (
          <Line.Segment
            point1={[xv, -8]}
            point2={[xv, 8]}
            color="var(--mafs-violet)"
            weight={1}
            opacity={0.4}
          />
        )}

        {/* Vertex */}
        {a !== 0 && <Point x={xv} y={yv} color="var(--mafs-violet)" />}

        {/* Roots */}
        {x1 !== null && Math.abs(x1) <= 6 && (
          <Point x={x1} y={0} color="var(--mafs-green)" />
        )}
        {x2 !== null && Math.abs(x2) <= 6 && delta > 0 && (
          <Point x={x2} y={0} color="var(--mafs-green)" />
        )}

        {/* Vertex label */}
        {a !== 0 && (
          <Text x={xv + 0.4} y={yv + (a > 0 ? -0.6 : 0.6)} size={11} color="var(--mafs-violet)">
            V({xv.toFixed(1)}, {yv.toFixed(1)})
          </Text>
        )}
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="a" value={a} min={-3} max={3} step={0.1} onChange={setA} />
        <Slider label="b" value={b} min={-5} max={5} step={0.1} onChange={setB} />
        <Slider label="c" value={c} min={-5} max={5} step={0.1} onChange={setC} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="Δ" value={delta.toFixed(2)} />
        {x1 !== null && <ValueDisplay label="x₁" value={x1.toFixed(3)} />}
        {x2 !== null && delta > 0 && <ValueDisplay label="x₂" value={x2.toFixed(3)} />}
        {delta < 0 && <ValueDisplay label="Raízes" value="Sem raízes reais" />}
        {a !== 0 && <ValueDisplay label="Vértice" value={`(${xv.toFixed(2)}, ${yv.toFixed(2)})`} />}
      </div>
    </GraphContainer>
  );
}
