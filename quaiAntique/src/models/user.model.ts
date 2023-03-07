export interface user {
  id?: number;
  email: string;
  password?: string;
  createdAt?: Date;
  firstname?: string;
  lastname?: string;
  averageGuests?: number;
  role?: string;
  allergies?: string[];
  reservations?: string[];
}
