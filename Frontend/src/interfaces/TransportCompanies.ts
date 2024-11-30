export interface TransportCompaniesInterface {
  id?: number;
  TComName?: string;
  Contact?: string;
  Email?: string;
  Address?: string;
  PostalCode?: string;
  start_date?: string;  // Can use Date type if working with actual Date objects
  end_date?: string;  // Can use Date type if working with actual Date objects
  photo?: string;
  year_of_manufacture?: number;  // Standardize to number type
  container_capacity?: number;  // Standardize to number type
  vehicle_name?: string;
}