import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Clients } from '../shared/models/clients.model';
import { ModulesVehicle } from '../shared/models/modulesVehicle.model';
import { VehicleData } from '../shared/models/vehicleData.model';
import { Vehicle } from './../shared/models/vehicle.model';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientForm: FormGroup
  listBrands?: Vehicle[]
  listModules?: ModulesVehicle
  listYearsVehicle?: Vehicle[]
  vehicleData?: VehicleData

  editMode: boolean = false
  idEditMode?: string

  listClientsStorage?: Clients[]

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly vehicleService: VehicleService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      address: ['', Validators.required],
      vehicle: ['', Validators.required],
      brand: ['', Validators.required],
      modelVehicle: ['', Validators.required],
      yearVehicle: ['', Validators.required],
      id: ['']
    })
  }

  ngOnInit(): void {
    this.getListClientsStorage()
  }

  getBrands(): void {
    this.vehicleService.getVehicleBrands(this.getItemForm('vehicle')).subscribe(response => {
      this.listBrands = response
    })
  }

  getModules(): void {
    this.vehicleService.getVehicleModules(this.getItemForm('vehicle'), this.getItemForm('brand')).subscribe(response => {
      this.listModules = response
    })
  }

  getYearVehicle(): void {
    this.vehicleService.getVehicleYear(this.getItemForm('vehicle'), this.getItemForm('brand'), this.getItemForm('modelVehicle'))
      .subscribe(response => {
        this.listYearsVehicle = response
      })
  }

  getVehicleData(): void {
    this.vehicleService.getVehicleData(this.getItemForm('vehicle'), this.getItemForm('brand'), this.getItemForm('modelVehicle'), this.getItemForm('yearVehicle'))
      .subscribe(response => {
        this.vehicleData = response
      })
  }

  submit(): void {
    if (this.clientForm.valid) {
      //se não tiver em modo de edição, criação
      if (!this.editMode) {
        const listClients = JSON.parse(localStorage?.getItem('listClient') ?? "{}")
        if (!listClients) {
          let listClientsItens = [{ ...this.clientForm.value, carInfo: this.vehicleData, id: Math.random().toString(36) }]
          localStorage.setItem('listClient', JSON.stringify(listClientsItens))
        } else {
          listClients.push({ ...this.clientForm.value, carInfo: this.vehicleData, id: Math.random().toString(36) })
          localStorage.setItem('listClient', JSON.stringify(listClients))
        }
        //se tiver em modo de edição
      } else {
        const listClientsStorage = JSON.parse(localStorage?.getItem('listClient') ?? "{}")
        let listClients = listClientsStorage.map((item: Clients) => {
          if (item.id === this.idEditMode)
            return { ...this.clientForm.value, carInfo: this.vehicleData }
          else
            return item
        })
        localStorage.setItem('listClient', JSON.stringify(listClients))
      }
      this.clientForm.reset()
      this.getListClientsStorage()
      this.editMode = false
    } else {
      this.clientForm.markAllAsTouched()
      this.toastr.error('Preencha todos os campos')
    }
  }

  editItem(id: string): void {
    const listClients = JSON.parse(localStorage?.getItem('listClient') ?? "{}")
    const clientItem = listClients.find((item: Clients) => item.id === id)
    this.clientForm.patchValue({
      ...clientItem,
      brand: parseInt(clientItem.brand),
      modelVehicle: parseInt(clientItem.modelVehicle),
     })
    this.getBrands()
    this.getModules()
    this.getYearVehicle()
    this.getVehicleData()
    this.editMode = true
    this.idEditMode = id
  }

  deleteItem(id: string): void {
    const listClients = JSON.parse(localStorage?.getItem('listClient') ?? "{}")
    listClients.map((item: Clients, idx: number) => {
      if (item.id === id) listClients.splice(idx, 1)
    })
    localStorage.setItem('listClient', JSON.stringify(listClients))
    this.getListClientsStorage()
    this.editMode = false
    this.clientForm.reset()
  }

  getListClientsStorage(): void {
    const listClients = JSON.parse(localStorage?.getItem('listClient') ?? "{}")
    console.log(listClients)
    this.listClientsStorage = listClients
  }

  getItemForm(value: string): string {
    return this.clientForm.get(value)?.value
  }

  get valueVehicle(): boolean {
    return this.clientForm.get('vehicle')?.value
  }

  get valueBrand(): boolean {
    return this.clientForm.get('brand')?.value
  }

  get valueYear(): boolean {
    return this.clientForm.get('modelVehicle')?.value
  }

}
