import { VehicleData } from "./vehicleData.model";

export interface Clients{
  name: string;
  cpf: string;
  phone: string;
  birth: string;
  address: string;
  vehicle: string;
  brand: string;
  modelVehicle: string;
  yearVehicle: string;
  carInfo: VehicleData;
  id:string
}
