"use client";

import { useMemo } from "react";
import { Mafs, Coordinates, Circle, Line, Point, Plot, Text, useMovablePoint } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function RazoesTrigonometricasGraph(_props: GraphProps) {
  const point = useMovablePoint([Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)], {
    constrain: (p) => {
      const a = Math.atan2(p[1], p[0]);
      return [Math.cos(a), Math.sin(a)];
    },
  });

  const angle = Math.atan2(point.point[1], point.point[0]);
  const angleDeg = ((angle * 180) / Math.PI + 360) % 360;
  const sinVal = Math.sin(angle);
  const cosVal = Math.cos(angle);
  const tanVal = Math.abs(cosVal) > 0.01 ? Math.tan(angle) : NaN;

  const angleEnd = useMemo(() => (angle >= 0 ? angle : angle + 2 * Math.PI), [angle]);

  return (
    <GraphContainer label="Círculo Trigonométrico — Razões Trigonométricas">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-1.8, 1.8], y: [-1.8, 1.8] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 0.5, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 0.5, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Unit circle */}
        <Circle center={[0, 0]} radius={1} strokeStyle="dashed" />

        {/* Cosine segment (horizontal - blue) */}
        <Line.Segment
          point1={[0, 0]}
          point2={[cosVal, 0]}
          color="var(--mafs-blue)"
          weight={3}
        />

        {/* Sine segment (vertical - red) */}
        <Line.Segment
          point1={[cosVal, 0]}
          point2={[cosVal, sinVal]}
          color="var(--mafs-red)"
          weight={3}
        />

        {/* Hypotenuse (radius) */}
        <Line.Segment
          point1={[0, 0]}
          point2={point.point}
          color="var(--mafs-violet)"
          weight={2}
        />

        {/* Angle arc */}
        <Plot.Parametric
          xy={(t) => {
            const a = angleEnd * t;
            return [0.25 * Math.cos(a), 0.25 * Math.sin(a)];
          }}
          domain={[0, 1]}
          color="var(--mafs-yellow)"
          weight={2}
        />

        {/* Labels */}
        <Text x={cosVal / 2} y={-0.15} size={14} color="var(--mafs-blue)">
          cos
        </Text>
        <Text x={cosVal + 0.15} y={sinVal / 2} size={14} color="var(--mafs-red)">
          sin
        </Text>

        {/* Projection points */}
        <Point x={cosVal} y={0} color="var(--mafs-blue)" />
        <Point x={0} y={sinVal} color="var(--mafs-red)" />

        {/* Movable point on circle */}
        {point.element}
      </Mafs>

      <div className="mt-3 flex flex-wrap gap-2">
        <ValueDisplay label="θ" value={`${angleDeg.toFixed(1)}°`} />
        <ValueDisplay label="θ" value={`${angleEnd.toFixed(3)} rad`} />
        <ValueDisplay label="sin θ" value={sinVal.toFixed(4)} />
        <ValueDisplay label="cos θ" value={cosVal.toFixed(4)} />
        <ValueDisplay label="tan θ" value={isNaN(tanVal) ? "∞" : tanVal.toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
