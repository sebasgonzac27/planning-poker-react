import Modal from "./modal.molecule";
import { render, screen } from "@testing-library/react";

describe("Modal component", () => {
  let $modal: HTMLDivElement;

  beforeEach(() => {
    $modal = document.createElement("div");
    $modal.id = "modal";
    document.body.appendChild($modal);
  });

  afterEach(() => {
    document.body.removeChild($modal);
  });

  it("should render the modal", () => {
    render(
      <Modal>
        <Modal.Header>
          <h1>Modal Header</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Modal Body</p>
        </Modal.Body>
      </Modal>
    );

    expect(screen.getByText("Modal Header")).toBeInTheDocument();
    expect(screen.getByText("Modal Body")).toBeInTheDocument();
  });
});
