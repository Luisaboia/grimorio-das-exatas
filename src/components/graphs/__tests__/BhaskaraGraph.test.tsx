jest.mock("mafs");

import { render, screen } from "@testing-library/react";
import BhaskaraGraph from "../formulas/algebra/BhaskaraGraph";

describe("BhaskaraGraph", () => {
  it("renders without crashing", () => {
    render(<BhaskaraGraph />);
    expect(screen.getByText(/Bhaskara/)).toBeInTheDocument();
  });

  it("renders sliders for a, b, and c", () => {
    render(<BhaskaraGraph />);
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(3);
  });

  it("renders the Mafs container", () => {
    render(<BhaskaraGraph />);
    expect(screen.getByTestId("mafs-container")).toBeInTheDocument();
  });

  it("displays discriminant value", () => {
    render(<BhaskaraGraph />);
    expect(screen.getByText("Δ")).toBeInTheDocument();
  });

  it("displays vertex info for default values", () => {
    render(<BhaskaraGraph />);
    expect(screen.getByText("Vértice")).toBeInTheDocument();
  });

  it("renders with role='img' from GraphContainer", () => {
    render(<BhaskaraGraph />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toHaveAttribute("aria-label", "Bhaskara — f(x) = ax² + bx + c");
  });
});
