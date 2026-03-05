"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Line, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

const refMasses = [1, 5, 10, 15, 20];

export default function SegundaLeiNewtonGraph(_props: GraphProps) {
  const [mass, setMass] = useState(5);
  const [accel, setAccel] = useState(3);

  const force = mass * accel;

  return (
    <GraphContainer label="Segunda Lei de Newton — F = ma">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-0.5, 10], y: [-5, 100] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 2, labels: (n) => (n >= 0 ? String(n) : "") }}
          yAxis={{ lines: 20, labels: (n) => (n >= 0 ? String(n) : "") }}
        />

        {/* Reference lines for other masses (faint) */}
        {refMasses.map((m) => (
          <Plot.OfX
            key={m}
            y={(a) => m * a}
            color="var(--mafs-fg)"
            weight={1}
            opacity={0.15}
          />
        ))}

        {/* Active mass line */}
        <Plot.OfX
          y={(a) => mass * a}
          color="var(--mafs-blue)"
          weight={2.5}
        />

        {/* Current point */}
        <Point x={accel} y={force} color="var(--mafs-yellow)" />

        {/* Dashed lines to axes */}
        <Line.Segment
          point1={[accel, 0]}
          point2={[accel, force]}
          color="var(--mafs-yellow)"
          weight={1}
          opacity={0.4}
        />
        <Line.Segment
          point1={[0, force]}
          point2={[accel, force]}
          color="var(--mafs-yellow)"
          weight={1}
          opacity={0.4}
        />

        {/* Label for the line */}
        <Text x={8} y={mass * 8 + 3} size={12} color="var(--mafs-blue)">
          m = {mass.toFixed(1)} kg
        </Text>

        <Text x={9} y={-3} size={12} color="var(--mafs-fg)">a (m/s²)</Text>
        <Text x={0.5} y={96} size={12} color="var(--mafs-fg)">F (N)</Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="m (massa)" value={mass} min={0.5} max={20} step={0.5} onChange={setMass} unit=" kg" />
        <Slider label="a (aceleração)" value={accel} min={0} max={10} step={0.1} onChange={setAccel} unit=" m/s²" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="F" value={force.toFixed(1)} unit=" N" />
        <ValueDisplay label="Equação" value={`F = ${mass.toFixed(1)} × ${accel.toFixed(1)} = ${force.toFixed(1)} N`} />
      </div>
    </GraphContainer>
  );
}
