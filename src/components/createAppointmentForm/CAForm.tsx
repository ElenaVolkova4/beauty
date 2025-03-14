import { ChangeEvent, FormEvent, useContext, useState } from "react";

import useAppointmentService from "../../services/AppointmentServices";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./caform.scss";

/** Компонент Форма для создания новой записи */
function CAForm() {
  const { createNewAppointment } = useAppointmentService();
  const { getActiveAppointments } = useContext(AppointmentContext);

  // данные формы
  const [formData, setFormData] = useState<IAppointment>({
    id: 0,
    date: "",
    name: "",
    service: "",
    phone: "",
    canceled: false,
  });

  // для блокировки кнопки Create при отправке формы
  const [creationStatus, setCreationStatus] = useState<boolean>(false);

  /** Создание записи */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreationStatus(true);

    createNewAppointment(formData)
      .then(() => {
        setFormData({
          id: 0,
          date: "",
          name: "",
          service: "",
          phone: "",
          canceled: false,
        });
        setCreationStatus(false);
        getActiveAppointments();
      })
      .catch((error) => {
        console.error(error);
        alert("Error");
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="caform" onSubmit={handleSubmit}>
      <div className="caform__title">Create new appointment</div>
      <label htmlFor="name">
        Name<span>*</span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="User name"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="service">
        Service<span>*</span>
      </label>
      <input
        type="text"
        name="service"
        id="service"
        placeholder="Service name"
        required
        value={formData.service}
        onChange={handleChange}
      />

      <label htmlFor="phone">
        Phone number<span>*</span>
      </label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="+1 890 335 372"
        pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
        title="Format should be +1 804 944 567"
        required
        value={formData.phone}
        onChange={handleChange}
      />

      <label htmlFor="date">
        Date<span>*</span>
      </label>
      <input
        type="text"
        name="date"
        id="date"
        placeholder="DD/MM/YYYY HH:mm"
        pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
        title="Format should be DD/MM/YYYY HH:mm"
        required
        value={formData.date}
        onChange={handleChange}
      />
      <button disabled={creationStatus}>Create</button>
    </form>
  );
}

export default CAForm;
