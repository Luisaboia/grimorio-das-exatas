jest.mock("mafs");

import { render, screen } from "@testing-library/react";
import MRUPosicaoGraph from "../formulas/cinematica/MRUPosicaoGraph";

describe("MRUPosicaoGraph", () => {
  it("renders without crashing", () => {
    render(<MRUPosicaoGraph />);
    expect(screen.getByText(/MRU/)).toBeInTheDocument();
  });

  it("renders sliders for s₀ and v", () => {
    render(<MRUPosicaoGraph />);
    expect(screen.getByText("s₀")).toBeInTheDocument();
    expect(screen.getByText("v")).toBeInTheDocument();
  });

  it("renders the Mafs container", () => {
    render(<MRUPosicaoGraph />);
    expect(screen.getByTestId("mafs-container")).toBeInTheDocument();
  });

  it("displays equation value display", () => {
    render(<MRUPosicaoGraph />);
    expect(screen.getByText("Equação")).toBeInTheDocument();
  });

  it("displays s(5) value display", () => {
    render(<MRUPosicaoGraph />);
    expect(screen.getByText("s(5)")).toBeInTheDocument();
  });

  it("renders with role='img' from GraphContainer", () => {
    render(<MRUPosicaoGraph />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toHaveAttribute("aria-label", "MRU — s(t) = s₀ + vt");
  });
});
