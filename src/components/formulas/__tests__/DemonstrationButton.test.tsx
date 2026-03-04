import { render, screen, fireEvent } from "@testing-library/react";
import { DemonstrationButton } from "../DemonstrationButton";

describe("DemonstrationButton", () => {
  it("renders the Ver Demonstração button", () => {
    render(
      <DemonstrationButton title="Test" type="deducao">
        <p>Demo content</p>
      </DemonstrationButton>
    );
    expect(screen.getByText("Ver Demonstração")).toBeInTheDocument();
  });

  it("opens modal when clicked", () => {
    render(
      <DemonstrationButton title="Test Demo" type="deducao">
        <p>Demo content</p>
      </DemonstrationButton>
    );

    // Modal should not be visible initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Click the button
    fireEvent.click(screen.getByText("Ver Demonstração"));

    // Modal should now be visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Demo content")).toBeInTheDocument();
  });
});
