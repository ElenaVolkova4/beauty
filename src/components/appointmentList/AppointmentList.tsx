import { useCallback, useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

/** Компонент списка записей */
function AppointmentList() {
  const {
    appointmentLoadingStatus,
    avtiveAppointments,
    getActiveAppointments,
  } = useContext(AppointmentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, selectId] = useState(0);

  useEffect(() => {
    getActiveAppointments(); // получаем активные записи
  }, []);

  // закешировали открытие модального окна, чтобы не было лишнего перерендера
  const handleOpenModal = useCallback((id: number) => {
    setIsOpen(true);
    selectId(id);
  }, []);

  if (appointmentLoadingStatus === "loading") {
    return <Spinner />;
  } else if (appointmentLoadingStatus === "error") {
    return (
      <>
        <Error />
        <button className="schedule__reload" onClick={getActiveAppointments}>
          Try to reload
        </button>
      </>
    );
  }

  return (
    <>
      {avtiveAppointments.map((item) => (
        <AppointmentItem
          {...item}
          key={item.id}
          openModal={handleOpenModal}
          getActiveAppointments={getActiveAppointments}
        />
      ))}

      <CancelModal
        handleClose={setIsOpen}
        selectedId={selectedId}
        isOpen={isOpen}
      />
    </>
  );
}

export default AppointmentList;
