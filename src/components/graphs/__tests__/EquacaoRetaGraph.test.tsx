jest.mock("mafs");

import { render, screen } from "@testing-library/react";
import EquacaoRetaGraph from "../formulas/geometria-analitica/EquacaoRetaGraph";

describe("EquacaoRetaGraph", () => {
  it("renders without crashing", () => {
    render(<EquacaoRetaGraph />);
    expect(screen.getByText(/Equação da Reta/)).toBeInTheDocument();
  });

  it("renders sliders for m and b", () => {
    render(<EquacaoRetaGraph />);
    expect(screen.getByText("m (angular)")).toBeInTheDocument();
    expect(screen.getByText("b (linear)")).toBeInTheDocument();
  });

  it("renders the Mafs container", () => {
    render(<EquacaoRetaGraph />);
    expect(screen.getByTestId("mafs-container")).toBeInTheDocument();
  });

  it("displays initial value displays", () => {
    render(<EquacaoRetaGraph />);
    expect(screen.getByText("Equação")).toBeInTheDocument();
    expect(screen.getByText("α")).toBeInTheDocument();
  });

  it("renders with role='img' from GraphContainer", () => {
    render(<EquacaoRetaGraph />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toHaveAttribute("aria-label", "Equação da Reta — y = mx + b");
  });
});
