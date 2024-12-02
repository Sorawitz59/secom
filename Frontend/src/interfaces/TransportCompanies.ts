import { TransportVehiclesInterface } from "./TransportVehicles";

export interface TransportCompaniesInterface {
  id?: number;
  CompanyName?: string;
  Contact?: string;
  Email?: string;
  Address?: string;
  PostalCode?: string;
  start_date?: string;  // Can use Date type if working with actual Date objects
  end_date?: string;  // Can use Date type if working with actual Date objects
  photo?: string;

  transportVehicles: TransportVehiclesInterface[];
}