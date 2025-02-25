import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

function AppointmentList() {
  const {
    // allAppointments,
    // getApointments,
    avtiveAppointments,
    getActiveApointments,
  } = useContext(AppointmentContext);

  useEffect(() => {
    // getApointments();
    getActiveApointments(); // получаем активные записи
  }, []);

  //   console.log("avtiveAppointments", avtiveAppointments);

  return (
    <>
      {avtiveAppointments.map((item) => (
        <AppointmentItem data={item} />
      ))}

      {/* {allAppointments[0] ? allAppointments[0].name : null}
      
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem /> */}
    </>
  );
}

export default AppointmentList;
