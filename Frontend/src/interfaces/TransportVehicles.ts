export interface TransportVehiclesInterface {
  id?: number;
  Photo?: string;
  vehicle_name?: string;
  vehicle_number?: string;
  capacity?: number;  // Ensure it's a number
  manufacture_year?: number;  // Ensure it's a number
  model?: string;
  start_date?: string;  // Can use Date type if working with actual Date objects
  end_date?: string;  // Can use Date type if working with actual Date objects
  Description?: string;
  MaxWeight?: number;  // Ensure it's a number
}