import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

function AppointmentList() {
  const { allAppointments, getApointments } = useContext(AppointmentContext);

  useEffect(() => {
    getApointments();
  }, []);

  console.log("allAppointments", allAppointments);

  return (
    <>
      {allAppointments[0] ? allAppointments[0].name : null}
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
    </>
  );
}

export default AppointmentList;
