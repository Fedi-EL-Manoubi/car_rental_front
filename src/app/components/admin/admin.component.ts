import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cars: Car[] = [];
  carForm!: FormGroup;
  isEditMode = false;
  currentCarId?: number;

  constructor(private carService: CarService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCars();
    this.initForm();
  }

 
  loadCars(): void {
    this.carService.findAll().subscribe((data: Car[]) => {
      this.cars = data;
    });
  }

 
  initForm(): void {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      available: [true, Validators.required],
      photo: ['', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/)]]
    });
  }


  openAddModal(): void {
    this.isEditMode = false;
    this.currentCarId = undefined;
    this.carForm.reset({ available: true });
    const modal = new bootstrap.Modal(document.getElementById('carModal'));
    modal.show();
  }


  openEditModal(car: Car): void {
    this.isEditMode = true;
    this.currentCarId = car.id;
    this.carForm.patchValue(car);
    const modal = new bootstrap.Modal(document.getElementById('carModal'));
    modal.show();
  }

  onSubmit(): void {
    if (this.carForm.invalid) {
      console.log('Formulaire invalide :', this.carForm.value); // Log 
      return;
    }

    const carData = this.carForm.value;
    console.log('Données envoyées au backend :', carData); // Log 

    if (this.isEditMode && this.currentCarId) {
      this.carService.update(this.currentCarId, carData).subscribe(() => {
        this.loadCars();
      });
    } else {
      this.carService.create(carData).subscribe(() => {
        this.loadCars();
      });
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('carModal'));
    modal.hide();
  }


  deleteCar(id?: number): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.carService.delete(id).subscribe(() => {
        this.loadCars();
      });
    }
  }
}