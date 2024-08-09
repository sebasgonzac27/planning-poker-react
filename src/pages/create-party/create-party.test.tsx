import { render, screen, fireEvent } from "@testing-library/react";
import CreateParty from "./create-party";
import { useCreateForm } from "./hooks/use-create-form/useCreateForm";

// Mock the useCreateForm hook
jest.mock("./hooks/use-create-form/useCreateForm");

describe("CreateParty Component", () => {
  const mockUseCreateForm = useCreateForm as jest.MockedFunction<
    typeof useCreateForm
  >;

  beforeEach(() => {
    mockUseCreateForm.mockReturnValue({
      partyName: "",
      errors: [],
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  it("should render the component correctly", () => {
    render(<CreateParty />);
    expect(screen.getByText("Crear Partida")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa un nombre")
    ).toBeInTheDocument();
    expect(screen.getByText("Crear partida")).toBeInTheDocument();
  });

  it("should call handleChange when input value changes", () => {
    const { handleChange } = mockUseCreateForm();
    render(<CreateParty />);
    const input = screen.getByPlaceholderText("Ingresa un nombre");
    fireEvent.change(input, { target: { value: "New Party" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should call handleSubmit when form is submitted", () => {
    const { handleSubmit } = mockUseCreateForm();
    render(<CreateParty />);
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should disable the button if there are errors or partyName is empty", () => {
    mockUseCreateForm.mockReturnValueOnce({
      partyName: "",
      errors: ["Error"],
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
    render(<CreateParty />);
    const button = screen.getByText("Crear partida");
    expect(button).toBeDisabled();
  });
});
