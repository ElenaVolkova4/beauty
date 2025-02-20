// AppointmentsContext

import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import useAppointmentService from "../../services/AppointmentServices";
import { ActionsTypes } from "./actions";

const initialState: IInitialState = {
  allAppointments: [],
  avtiveAppointments: [],
};

interface ProviderProps {
  children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
  getApointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
  allAppointments: initialState.allAppointments,
  avtiveAppointments: initialState.avtiveAppointments,
  getApointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
    useAppointmentService();

  const value: AppointmentContextValue = {
    allAppointments: state.allAppointments,
    avtiveAppointments: state.avtiveAppointments,
    getApointments: () => {
      // получение данных и обновление через dispatch
      getAllAppointments().then((data) =>
        dispatch({
          type: ActionsTypes.SET_ALL_APPOINTMENTS,
          payload: data,
        })
      );
    },

    // getActiveApointments:()=>{} ДЗ
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;
