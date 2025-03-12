import dayjs from "dayjs";

import { useHttp } from "../hooks/http.hook";
import {
  IAppointment,
  ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

import hasRequiredFields from "../utils/hasRequiredFields";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];
// const requiredFields = ["canceled", "date", "id", "name", "phone", "service"];

const useAppointmentService = () => {
  const { loadingStatus, request } = useHttp();

  const _apiBase = "http://localhost:3001/appointments";

  // проверка полей
  /** получение всех записей */
  const getAllAppointments = async (): Promise<IAppointment[]> => {
    const res = await request({ url: _apiBase });
    if (
      res.every((item: IAppointment) => {
        return hasRequiredFields(item, requiredFields);
      })
    ) {
      return res;
    } else {
      throw new Error("Data doesnt all the fields");
    }
  };

  /** получение всех активных записей */
  const getAllActiveAppointments = async (): Promise<ActiveAppointment[]> => {
    const res = await request({ url: _apiBase });
    const base = await getAllAppointments();
    const transformed: ActiveAppointment[] = base
      .filter((item) => {
        return !item.canceled && dayjs(item.date).diff(undefined, "minute") > 0;
        // или dayjs(item.date) > dayjs();
      })
      .map((item) => {
        return {
          id: item.id,
          date: item.date,
          name: item.name,
          service: item.service,
          phone: item.phone,
        };
      });

    return transformed;
  };

  /** смена статуса записи */
  const cancelOneAppointment = async (id: number) => {
    return await request({
      url: `${_apiBase}/${id}`,
      method: "PATCH",
      body: JSON.stringify({ canceled: true }),
    });
  };

  return {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
    cancelOneAppointment,
  };
};

export default useAppointmentService;
