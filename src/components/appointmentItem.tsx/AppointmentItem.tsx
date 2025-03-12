import { useEffect, memo, useState } from "react";
import { Optional } from "utility-types";
import dayjs from "dayjs";

import { IAppointment } from "../../shared/interfaces/appointment.interface";
import "./appointmentItem.scss";

// создаем сами тип, в котором одно поле "Отменен" будет необязательное
// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
// либо можно подключить библиотеку utility-types, в которой много вариантов

type AppointmentProps = Optional<IAppointment, "canceled"> & {
  openModal: (state: number) => void;
  getActiveAppointments: () => void;
};

const AppointmentItem = memo(
  ({
    id,
    date,
    name,
    service,
    phone,
    canceled,
    openModal,
    getActiveAppointments,
  }: AppointmentProps) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");

    const [timeLeft, changeTimeLeft] = useState<string | null>(null);

    useEffect(() => {
      changeTimeLeft(
        `${dayjs(date).diff(undefined, "h")}:${
          dayjs(date).diff(undefined, "m") % 60
        }`
      );

      // каждые 60 сек цифры будут обновляться до времени 0:0, потом список будет перерисовываться
      const intervalId = setInterval(() => {
        if (dayjs(date).diff(undefined, "m") <= 0) {
          if (getActiveAppointments) {
            getActiveAppointments();
          }
          clearInterval(intervalId);
        } else {
          changeTimeLeft(
            `${dayjs(date).diff(undefined, "h")}:${
              dayjs(date).diff(undefined, "m") % 60
            }`
          );
        }
      }, 60000);

      //отписываемся от таймера
      return () => {
        clearInterval(intervalId);
      };
    }, [date]);

    console.log("timeLeft", timeLeft);

    return (
      <div className="appointment">
        <div className="appointment__info">
          <span className="appointment__date">Date: {formattedDate}</span>
          <span className="appointment__name">Name: {name}</span>
          <span className="appointment__service">Service: {service}</span>
          <span className="appointment__phone">Phone: {phone}</span>
        </div>

        {!canceled ? (
          <>
            <div className="appointment__time">
              <span>Time left:</span>
              <span className="appointment__timer">{timeLeft}</span>
            </div>
            <button
              className="appointment__cancel"
              onClick={() => {
                openModal(id);
              }}
            >
              Cancel
            </button>
          </>
        ) : null}

        {canceled ? (
          <div className="appointment__canceled">Canceled</div>
        ) : null}
      </div>
    );
  }
);

export default AppointmentItem;
