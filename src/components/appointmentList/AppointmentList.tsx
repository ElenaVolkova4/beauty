import { useCallback, useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
  const { appointmentLoadingStatus, avtiveAppointments, getActiveApointments } =
    useContext(AppointmentContext);

  // const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
  // useAppointmentService();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, selectId] = useState(0);

  useEffect(() => {
    getActiveApointments(); // получаем активные записи
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
        <button className="schedule__reload" onClick={getActiveApointments}>
          Try to reload
        </button>
      </>
    );
  }

  return (
    <>
      {avtiveAppointments.map((item) => (
        <AppointmentItem {...item} key={item.id} openModal={handleOpenModal} />
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
