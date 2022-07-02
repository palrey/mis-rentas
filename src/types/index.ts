/**
 * @interface IBooking
 */
export interface IBooking {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  address: string;
  passport: string;
  date: { from: string; to: string };
  price: number;
  currency: 'MXN' | 'CUP' | 'USD' | 'EUR';
  airline_name: string;
  airline_fly: string;
  room_id: number;
  room?: IRoom;
  room_type: IRoomType;
  comments?: string;
  report_code?: string;
}
/**
 * -----------------------------------------
 *	task
 * -----------------------------------------
 */
/**
 * ITask
 */
export interface ITask {
  id: number;
  type: string;
  message: string;
  date: string;
  completed: boolean;
}
/**
 * -----------------------------------------
 *	Room
 * -----------------------------------------
 */

export type IRoomType = 'Sencilla' | 'Doble' | 'Triple' | 'Cuadruple';
/**
 * @interface IRoom
 */
export interface IRoom {
  id: number;
  title: string;
  type: IRoomType;
  capacity: number;
  open: boolean;
  address: string;
}
