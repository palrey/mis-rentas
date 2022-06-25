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
  airline_name: string;
  airline_fly: string;
  room_type: 'Sencilla' | 'Doble' | 'Triple' | 'Cuadruple';
  commments?: string;
}
