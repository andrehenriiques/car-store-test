import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModulesVehicle } from '../shared/models/modulesVehicle.model';
import { Vehicle } from '../shared/models/vehicle.model';
import { VehicleData } from '../shared/models/vehicleData.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly API = 'https://parallelum.com.br/fipe/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  getVehicleBrands(typeVehicle: string): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.API}/${typeVehicle}/marcas`)
  }

  getVehicleModules(typeVehicle: string, idBrand: string): Observable<ModulesVehicle>{
    return this.http.get<ModulesVehicle>(`${this.API}/${typeVehicle}/marcas/${idBrand}/modelos`)
  }

  getVehicleYear(typeVehicle: string, idBrand: string, idModule: string): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.API}/${typeVehicle}/marcas/${idBrand}/modelos/${idModule}/anos`)
  }

  getVehicleData(typeVehicle: string, idBrand: string, idModule: string, idYear:string): Observable<VehicleData>{
    return this.http.get<VehicleData>(`${this.API}/${typeVehicle}/marcas/${idBrand}/modelos/${idModule}/anos/${idYear}`)
  }
}
