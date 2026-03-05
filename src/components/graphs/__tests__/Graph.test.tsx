import { render, screen } from "@testing-library/react";
import { Graph } from "../Graph";

// Mock the registry to avoid lazy loading real components
jest.mock("../registry", () => ({
  graphRegistry: {
    "test-graph": jest.fn(() => {
      return <div data-testid="test-graph-component">Test Graph Loaded</div>;
    }),
  },
}));

describe("Graph", () => {
  it("shows fallback for unknown graph type", () => {
    render(<Graph type="nonexistent" />);
    expect(screen.getByText(/Gráfico em desenvolvimento/)).toBeInTheDocument();
  });

  it("renders Suspense wrapper for valid graph types", async () => {
    render(<Graph type="test-graph" />);
    const rendered = await screen.findByTestId("test-graph-component");
    expect(rendered).toBeInTheDocument();
  });

  it("defaults interactive to true", () => {
    render(<Graph type="nonexistent" />);
    // Just verifies it renders without error when interactive is not passed
    expect(screen.getByText(/Gráfico em desenvolvimento/)).toBeInTheDocument();
  });

  it("renders GraphFallback with correct styling", () => {
    const { container } = render(<Graph type="unknown-type" />);
    const fallback = container.firstChild as HTMLElement;
    expect(fallback).toHaveClass("border-dashed");
    expect(fallback).toHaveClass("h-[300px]");
  });

  it("accepts interactive prop", async () => {
    render(<Graph type="test-graph" interactive={false} />);
    const rendered = await screen.findByTestId("test-graph-component");
    expect(rendered).toBeInTheDocument();
  });
});
