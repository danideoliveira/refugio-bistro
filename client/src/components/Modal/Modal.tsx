import { ReactNode } from "react";
import { Container } from "./Modal.styled";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  return (
    <>
      <Container>
        <div className="modal-box">{children}</div>
      </Container>
    </>
  );
}

export default Modal;
