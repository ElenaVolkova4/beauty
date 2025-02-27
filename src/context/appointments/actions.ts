import {
  ActiveAppointment,
  IAppointment,
} from "../../shared/interfaces/appointment.interface";

// enum лучше не использовать, можно заменить на объект
export enum ActionsTypes {
  SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
  SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
  FETCHING_APPOINTMENTS = "FETCHING_APPOINTMENTS",
  ERROR_FETCHING_APPOINTMENTS = "ERROR_FETCHING_APPOINTMENTS",
}

export type AppointmentAction =
  | {
      type: ActionsTypes.SET_ACTIVE_APPOINTMENTS;
      payload: ActiveAppointment[];
    }
  | {
      type: ActionsTypes.SET_ALL_APPOINTMENTS;
      payload: IAppointment[];
    }
  | {
      type: ActionsTypes.FETCHING_APPOINTMENTS;
    }
  | {
      type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS;
    };
