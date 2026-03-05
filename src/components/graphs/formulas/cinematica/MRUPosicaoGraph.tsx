"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function MRUPosicaoGraph(_props: GraphProps) {
  const [s0, setS0] = useState(0);
  const [v, setV] = useState(2);

  const s = (t: number) => s0 + v * t;

  return (
    <GraphContainer label="MRU — s(t) = s₀ + vt">
      <Mafs
        width="auto"
        height={300}
        viewBox={{ x: [-0.5, 10], y: [-15, 15] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 2, labels: (n) => (n >= 0 ? String(n) : "") }}
          yAxis={{ lines: 5, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        <Plot.OfX y={s} color="var(--mafs-blue)" weight={2.5} />
        <Point x={0} y={s0} color="var(--mafs-yellow)" />

        <Text x={9} y={-13.5} size={12} color="var(--mafs-fg)">t (s)</Text>
        <Text x={0.5} y={14} size={12} color="var(--mafs-fg)">s (m)</Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="s₀" value={s0} min={-10} max={10} step={0.5} onChange={setS0} unit=" m" />
        <Slider label="v" value={v} min={-5} max={5} step={0.1} onChange={setV} unit=" m/s" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="Equação" value={`s(t) = ${s0.toFixed(1)} + ${v.toFixed(1)}t`} />
        <ValueDisplay label="s(5)" value={s(5).toFixed(1)} unit=" m" />
      </div>
    </GraphContainer>
  );
}
