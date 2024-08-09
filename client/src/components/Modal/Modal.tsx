import { ReactNode } from "react";
import { Container } from "./Modal.styled";
import { IoIosArrowBack } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  condition: boolean;
  setCondition: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

function Modal({ children, condition, setCondition, className }: ModalProps) {
  return (
    <>
      {condition && (
        <Container className={className}>
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setCondition(!condition)}
            >
              <IoIosArrowBack />
            </button>
            {children}
          </div>
        </Container>
      )}
    </>
  );
}

export default Modal;
