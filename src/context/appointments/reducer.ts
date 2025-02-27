import { loadingStatusOptoins } from "../../hooks/http.hook";
import {
  ActiveAppointment,
  IAppointment,
} from "../../shared/interfaces/appointment.interface";
import { ActionsTypes, AppointmentAction } from "./actions";

export interface IAppointmentState {
  allAppointments: IAppointment[] | [];
  avtiveAppointments: ActiveAppointment[] | [];
  appointmentLoadingStatus: loadingStatusOptoins;
}

export default function reducer(
  state: IAppointmentState,
  action: AppointmentAction
): IAppointmentState {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return {
        ...state,
        allAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return {
        ...state,
        avtiveAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "loading" };
    case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "error" };
    default:
      return state;
  }
}
