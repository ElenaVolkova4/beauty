import {
  ActiveAppointment,
  IAppointment,
} from "../../shared/interfaces/appointment.interface";
import { ActionsTypes, IAppointmentAction } from "./actions";

export interface IInitialState {
  allAppointments: IAppointment[] | [];
  avtiveAppointments: ActiveAppointment[] | [];
}

export default function reducer(
  state: IInitialState,
  action: IAppointmentAction
) {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return { ...state, allAppointments: action.payload };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return { ...state, avtiveAppointments: action.payload };
    default:
      return state;
  }
}
