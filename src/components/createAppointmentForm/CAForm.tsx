import { ChangeEvent, FormEvent, useContext, useState } from "react";

import useAppointmentService from "../../services/AppointmentServices";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./caform.scss";
import { SubmitHandler, useForm } from "react-hook-form";

// для примера
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

/** Компонент Форма для создания новой записи */
function CAForm() {
  const { createNewAppointment } = useAppointmentService();
  const { getActiveAppointments } = useContext(AppointmentContext);

  const initialState: IAppointment = {
    id: 0,
    date: "",
    name: "",
    service: "",
    phone: "",
    canceled: false,
  };

  // данные формы
  const [formData, setFormData] = useState<IAppointment>(initialState);

  // для блокировки кнопки Create при отправке формы
  const [creationStatus, setCreationStatus] = useState<boolean>(false);

  /** Создание записи */
  const handleSubmit2 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreationStatus(true);

    createNewAppointment(formData)
      .then(() => {
        setFormData(initialState);
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

  //   const { register, handleSubmit } = useForm<FormValues>();
  //   const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <input {...register("lastName")} />
        <input type="email" {...register("email")} />

        <input type="submit" />
      </form> */}

      <form className="caform" onSubmit={handleSubmit2}>
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
    </>
  );
}

export default CAForm;
