import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "../Slider";

describe("Slider", () => {
  const defaultProps = {
    label: "Velocidade",
    value: 5,
    min: 0,
    max: 10,
    step: 0.1,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label text", () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByText("Velocidade")).toBeInTheDocument();
  });

  it("renders with correct min/max/step attributes", () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "10");
    expect(input).toHaveAttribute("step", "0.1");
  });

  it("has aria-label", () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("aria-label", "Velocidade: 5.0");
  });

  it("calls onChange when input changes", () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "7" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(7);
  });

  it("renders unit when provided", () => {
    render(<Slider {...defaultProps} unit=" m/s" />);
    expect(screen.getByText("m/s")).toBeInTheDocument();
  });

  it("includes unit in aria-label when provided", () => {
    render(<Slider {...defaultProps} unit=" m/s" />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("aria-label", "Velocidade: 5.0 m/s");
  });

  it("displays current value formatted", () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });
});
