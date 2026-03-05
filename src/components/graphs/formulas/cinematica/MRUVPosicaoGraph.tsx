"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Line, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function MRUVPosicaoGraph(_props: GraphProps) {
  const [s0, setS0] = useState(0);
  const [v0, setV0] = useState(2);
  const [a, setA] = useState(-0.5);

  const s = (t: number) => s0 + v0 * t + 0.5 * a * t * t;

  // Vertex: t_v = -v0/a (when a ≠ 0)
  const tVertex = a !== 0 ? -v0 / a : null;
  const sVertex = tVertex !== null ? s(tVertex) : null;

  return (
    <GraphContainer label="MRUV — s(t) = s₀ + v₀t + ½at²">
      <Mafs
        width="auto"
        height={300}
        viewBox={{ x: [-0.5, 10], y: [-20, 20] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 2, labels: (n) => (n >= 0 ? String(n) : "") }}
          yAxis={{ lines: 5, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        <Plot.OfX y={s} color="var(--mafs-blue)" weight={2.5} />
        <Point x={0} y={s0} color="var(--mafs-yellow)" />

        {/* Vertex */}
        {tVertex !== null && tVertex >= 0 && tVertex <= 10 && sVertex !== null && (
          <>
            <Point x={tVertex} y={sVertex} color="var(--mafs-green)" />
            <Line.Segment
              point1={[tVertex, -20]}
              point2={[tVertex, 20]}
              color="var(--mafs-green)"
              weight={1}
              opacity={0.3}
            />
          </>
        )}

        <Text x={9} y={-18} size={12} color="var(--mafs-fg)">t (s)</Text>
        <Text x={0.5} y={19} size={12} color="var(--mafs-fg)">s (m)</Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="s₀" value={s0} min={-10} max={10} step={0.5} onChange={setS0} unit=" m" />
        <Slider label="v₀" value={v0} min={-5} max={5} step={0.1} onChange={setV0} unit=" m/s" />
        <Slider label="a" value={a} min={-3} max={3} step={0.1} onChange={setA} unit=" m/s²" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="Equação" value={`s(t) = ${s0.toFixed(1)} + ${v0.toFixed(1)}t + ${(0.5 * a).toFixed(2)}t²`} />
        {tVertex !== null && tVertex >= 0 && (
          <ValueDisplay label="Vértice" value={`t = ${tVertex.toFixed(2)} s`} />
        )}
      </div>
    </GraphContainer>
  );
}
