import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies base card classes", () => {
    render(<Card data-testid="card">Content</Card>);
    const el = screen.getByTestId("card");
    expect(el).toHaveClass("rounded-2xl");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("backdrop-blur-sm");
  });

  it("applies hover classes when hover prop is true", () => {
    render(<Card hover data-testid="card">Hover card</Card>);
    const el = screen.getByTestId("card");
    expect(el.className).toContain("hover:scale-[1.02]");
    expect(el.className).toContain("hover:shadow-lg");
  });

  it("does not apply hover classes by default", () => {
    render(<Card data-testid="card">No hover</Card>);
    const el = screen.getByTestId("card");
    expect(el.className).not.toContain("hover:scale-[1.02]");
  });

  it("accepts additional className", () => {
    render(<Card className="mt-8" data-testid="card">Styled</Card>);
    expect(screen.getByTestId("card")).toHaveClass("mt-8");
  });

  it("passes through HTML attributes", () => {
    render(<Card id="my-card" data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("id", "my-card");
  });
});
