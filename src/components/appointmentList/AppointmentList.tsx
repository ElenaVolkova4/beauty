import { useContext, useEffect } from "react";

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

  useEffect(() => {
    getActiveApointments(); // получаем активные записи
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
        <AppointmentItem {...item} key={item.id} />
      ))}
    </>
  );
}

export default AppointmentList;
