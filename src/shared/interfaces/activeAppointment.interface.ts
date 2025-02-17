import { IAppointment } from "./appointment.interface";

// export interface IActiveAppointment extends IAppointment {
//   id: number;
//   date: string;
//   name: string;
//   service: string;
//   phone: string;
//   canceled: boolean;
// }

export interface IActiveAppointment extends Omit<IAppointment, "canceled"> {}

export type ActiveAppointment = Omit<IAppointment, "canceled">;
