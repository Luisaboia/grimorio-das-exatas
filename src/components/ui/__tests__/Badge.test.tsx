import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Física</Badge>);
    expect(screen.getByText("Física")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>);
    const el = screen.getByText("Default");
    expect(el).toHaveClass("inline-flex");
    expect(el).toHaveClass("rounded-full");
  });

  it("renders with 'fisica' variant", () => {
    render(<Badge variant="fisica">Física</Badge>);
    const el = screen.getByText("Física");
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("bg-primary-900");
  });

  it("renders with 'matematica' variant", () => {
    render(<Badge variant="matematica">Matemática</Badge>);
    const el = screen.getByText("Matemática");
    expect(el.className).toContain("bg-secondary-900");
  });

  it("renders with difficulty variants", () => {
    const { rerender } = render(<Badge variant="basico">Básico</Badge>);
    expect(screen.getByText("Básico").className).toContain("bg-green-900");

    rerender(<Badge variant="intermediario">Intermediário</Badge>);
    expect(screen.getByText("Intermediário").className).toContain("bg-yellow-900");

    rerender(<Badge variant="avancado">Avançado</Badge>);
    expect(screen.getByText("Avançado").className).toContain("bg-red-900");
  });

  it("accepts additional className", () => {
    render(<Badge className="mt-4">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("mt-4");
  });
});
