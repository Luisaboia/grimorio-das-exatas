"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Line, Circle, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

// f(x) = (x²-1)/(x-1) = x+1 for x ≠ 1
const fSimplified = (x: number) => x + 1;

export default function LimiteGraph(_props: GraphProps) {
  const [xVal, setXVal] = useState(0.5);

  const yVal = fSimplified(xVal);
  const limitValue = 2; // limit as x→1

  return (
    <GraphContainer label="Limite — f(x) = (x² − 1)/(x − 1) quando x → 1">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-2, 4], y: [-1, 5] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Function plot (continuous line y = x + 1) */}
        <Plot.OfX y={fSimplified} color="var(--mafs-blue)" weight={2.5} />

        {/* Hole at x = 1 (open circle) */}
        <Circle center={[1, 2]} radius={0.08} color="var(--mafs-red)" fillOpacity={0} />

        {/* Dashed lines to limit point */}
        <Line.Segment
          point1={[xVal, 0]}
          point2={[xVal, yVal]}
          color="var(--mafs-yellow)"
          weight={1}
          opacity={0.5}
        />
        <Line.Segment
          point1={[0, yVal]}
          point2={[xVal, yVal]}
          color="var(--mafs-yellow)"
          weight={1}
          opacity={0.5}
        />

        {/* Horizontal line at L = 2 */}
        <Line.Segment
          point1={[-2, limitValue]}
          point2={[4, limitValue]}
          color="var(--mafs-red)"
          weight={1}
          opacity={0.3}
        />

        {/* Current point */}
        <Point x={xVal} y={yVal} color="var(--mafs-yellow)" />

        {/* Labels */}
        <Text x={3.2} y={limitValue + 0.3} size={12} color="var(--mafs-red)">
          L = 2
        </Text>
        <Text x={xVal + 0.15} y={yVal + 0.3} size={11} color="var(--mafs-yellow)">
          ({xVal.toFixed(2)}, {yVal.toFixed(2)})
        </Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="x" value={xVal} min={-1} max={3} step={0.01} onChange={setXVal} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="x" value={xVal.toFixed(4)} />
        <ValueDisplay label="f(x)" value={yVal.toFixed(4)} />
        <ValueDisplay label="L (limite)" value="2" />
        <ValueDisplay label="|f(x) − L|" value={Math.abs(yVal - limitValue).toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
