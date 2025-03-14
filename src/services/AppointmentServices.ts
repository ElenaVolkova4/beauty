import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";

import { useHttp } from "../hooks/http.hook";
import {
  IAppointment,
  ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

import hasRequiredFields from "../utils/hasRequiredFields";

dayjs.extend(customParseFormat);

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

  const createNewAppointment = async (body: IAppointment) => {
    const id = new Date().getTime();
    body.id = id; //или так ..   body["id"] = id;
    body.date = dayjs(body.date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm");

    return await request({
      url: _apiBase,
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
    cancelOneAppointment,
    createNewAppointment,
  };
};

export default useAppointmentService;
