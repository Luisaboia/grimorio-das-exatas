import { render, screen, fireEvent } from "@testing-library/react";
import { DemonstrationModal } from "../DemonstrationModal";

describe("DemonstrationModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Demonstração: Teste",
    type: "deducao" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(
      <DemonstrationModal {...defaultProps} isOpen={false}>
        <p>Content</p>
      </DemonstrationModal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <DemonstrationModal {...defaultProps}>
        <p>Test content</p>
      </DemonstrationModal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Demonstração: Teste")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("shows correct badge for deducao type", () => {
    render(
      <DemonstrationModal {...defaultProps} type="deducao">
        <p>Content</p>
      </DemonstrationModal>
    );
    expect(screen.getByText("Dedução")).toBeInTheDocument();
  });

  it("shows correct badge for historia type", () => {
    render(
      <DemonstrationModal {...defaultProps} type="historia">
        <p>Content</p>
      </DemonstrationModal>
    );
    expect(screen.getByText("História")).toBeInTheDocument();
  });

  it("shows correct badge for mista type", () => {
    render(
      <DemonstrationModal {...defaultProps} type="mista">
        <p>Content</p>
      </DemonstrationModal>
    );
    expect(screen.getByText("Mista")).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", () => {
    render(
      <DemonstrationModal {...defaultProps}>
        <p>Content</p>
      </DemonstrationModal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <DemonstrationModal {...defaultProps}>
        <p>Content</p>
      </DemonstrationModal>
    );
    const closeButton = screen.getByLabelText("Fechar demonstração");
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when footer button is clicked", () => {
    render(
      <DemonstrationModal {...defaultProps}>
        <p>Content</p>
      </DemonstrationModal>
    );
    const fecharButton = screen.getByText("Fechar");
    fireEvent.click(fecharButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
