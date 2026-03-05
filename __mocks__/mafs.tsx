import React from "react";

const Mafs = ({ children }: { children?: React.ReactNode }) => <div data-testid="mafs-container">{children}</div>;
const Coordinates = { Cartesian: () => <div data-testid="coordinates" /> };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Plot = {
  OfX: ({ y: _y }: { y: (x: number) => number }) => <div data-testid="plot-of-x" />,
  Parametric: () => <div data-testid="plot-parametric" />,
};
const Point = () => <div data-testid="point" />;
const Circle = () => <div data-testid="circle" />;
const Line = {
  Segment: () => <div data-testid="line-segment" />,
  ThroughPoints: () => <div data-testid="line-through-points" />,
};
const Text = ({ children }: { children?: React.ReactNode }) => <span>{children}</span>;
const Vector = () => <div data-testid="vector" />;
const Polygon = () => <div data-testid="polygon" />;
const useMovablePoint = (initial: [number, number]) => ({
  point: initial,
  x: initial[0],
  y: initial[1],
  element: <div data-testid="movable-point" />,
});
const vec = { dist: (a: number[], b: number[]) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) };
const Theme = { blue: "#blue", red: "#red", green: "#green", orange: "#orange", indigo: "#indigo", violet: "#violet", pink: "#pink", yellow: "#yellow" };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LaTeX = ({ at: _at, tex }: { at: [number, number]; tex: string }) => <span data-testid="latex">{tex}</span>;

export { Mafs, Coordinates, Plot, Point, Circle, Line, Text, Vector, Polygon, useMovablePoint, vec, Theme, LaTeX };
