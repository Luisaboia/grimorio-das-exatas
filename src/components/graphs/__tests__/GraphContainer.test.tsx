import { render, screen } from "@testing-library/react";
import { GraphContainer } from "../GraphContainer";

describe("GraphContainer", () => {
  it("renders children", () => {
    render(<GraphContainer><p>Graph content</p></GraphContainer>);
    expect(screen.getByText("Graph content")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<GraphContainer label="My Label"><p>Content</p></GraphContainer>);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    const { container } = render(<GraphContainer><p>Content</p></GraphContainer>);
    const labelEl = container.querySelector("p.mb-3");
    expect(labelEl).not.toBeInTheDocument();
  });

  it("has the correct border and background classes", () => {
    const { container } = render(<GraphContainer><p>Content</p></GraphContainer>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("border-accent-500");
    expect(wrapper).toHaveClass("bg-accent-950/20");
  });

  it("has role='img' and aria-label on the inner wrapper", () => {
    render(<GraphContainer label="Test Graph"><p>Content</p></GraphContainer>);
    const imgDiv = screen.getByRole("img");
    expect(imgDiv).toHaveAttribute("aria-label", "Test Graph");
  });

  it("uses default aria-label when no label is provided", () => {
    render(<GraphContainer><p>Content</p></GraphContainer>);
    const imgDiv = screen.getByRole("img");
    expect(imgDiv).toHaveAttribute("aria-label", "Gráfico interativo");
  });
});
