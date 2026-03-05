import { render, screen } from "@testing-library/react";
import { ValueDisplay } from "../ValueDisplay";

describe("ValueDisplay", () => {
  it("renders label and value", () => {
    render(<ValueDisplay label="Δ" value={4.5} />);
    expect(screen.getByText("Δ")).toBeInTheDocument();
    expect(screen.getByText("4.50")).toBeInTheDocument();
  });

  it("renders unit when provided", () => {
    render(<ValueDisplay label="Distância" value={3.14} unit=" m" />);
    expect(screen.getByText("m")).toBeInTheDocument();
  });

  it("renders string values directly", () => {
    render(<ValueDisplay label="Equação" value="y = 2x + 1" />);
    expect(screen.getByText("y = 2x + 1")).toBeInTheDocument();
  });

  it("formats numeric values to 2 decimal places", () => {
    render(<ValueDisplay label="x₁" value={1.23456} />);
    expect(screen.getByText("1.23")).toBeInTheDocument();
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<ValueDisplay label="Test" value={0} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("inline-flex");
    expect(wrapper).toHaveClass("border-surface-700");
  });
});
