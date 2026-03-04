import { render, screen } from "@testing-library/react";
import { DemonstrationDisabled } from "../DemonstrationDisabled";

describe("DemonstrationDisabled", () => {
  it("renders disabled button with correct text", () => {
    render(<DemonstrationDisabled />);
    const button = screen.getByText("Demonstração em breve");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("has not-allowed cursor styling", () => {
    render(<DemonstrationDisabled />);
    const button = screen.getByText("Demonstração em breve");
    expect(button.className).toContain("cursor-not-allowed");
  });
});
