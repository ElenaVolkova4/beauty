import { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Portal from "../portal/portal";
import "./modal.scss";
import useAppointmentService from "../../services/AppointmentServices";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
  isOpen: boolean;
}

/** Модальное окно отмены записи */
function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
  const { getActiveAppointments } = useContext(AppointmentContext);

  const { cancelOneAppointment } = useAppointmentService();

  const nodeRef = useRef<HTMLDivElement>(null);

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

  /** Отмена записи  */
  const handleCancelAppointment = (id: number) => {
    setBtnDisabled(true); //при нажатии на ОК кнопка блокируется, чтобы пользователь не смог нажать еще раз
    cancelOneAppointment(id)
      .then(() => {
        setCancelStatus(true);
      })
      .catch((e) => {
        console.error(e);
        setCancelStatus(false);
        setBtnDisabled(false);
      });
  };

  const closeModal = () => {
    handleClose(false);

    if (cancelStatus) {
      getActiveAppointments();
    }
  };

  // закрытие модального окна по escape
  const closeOnEscapeKey = (event: KeyboardEvent): void => {
    if (event.code === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.addEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose, cancelStatus]);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 500, exit: 500 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal__body">
            <span className="modal__title">
              Are you sure you want to delete the appointment? #{selectedId}
            </span>
            <div className="modal__btns">
              <button
                className="modal__ok"
                disabled={btnDisabled}
                onClick={() => {
                  handleCancelAppointment(selectedId);
                }}
              >
                Ok
              </button>
              <button className="modal__close" onClick={() => closeModal()}>
                Close
              </button>
            </div>
            <div className="modal__status">
              {cancelStatus === null
                ? ""
                : cancelStatus
                ? "Success"
                : "Error, rty again"}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
}

export default CancelModal;
