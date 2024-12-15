import { TransportVehiclesInterface } from "./TransportVehicles";

export interface TransportCompaniesInterface {
  id?: number;
  company_name?: string;
  contact?: string;
  email?: string;
  address?: string;
  postal_code?: string;
  start_date?: string;  // Can use Date type if working with actual Date objects
  end_date?: string;  // Can use Date type if working with actual Date objects
  photo?: string;

  transportVehicles: TransportVehiclesInterface[];
}