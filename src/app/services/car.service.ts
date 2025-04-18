import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api/cars'; // Ajustez l'URL selon votre backend

  constructor(private http: HttpClient) { }

  findAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  findById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  findAvailable(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/available`);
  }

  create(carData: Partial<Car>): Observable<Car> {
    console.log('Données envoyées au backend (CarService) :', carData); // Log des données envoyées
    return this.http.post<Car>(this.apiUrl, carData);
  }

  update(id: number, carData: Partial<Car>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, carData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  incrementLikes(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/like`, {});
  }

  searchByBrandOrModel(query: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/search?query=${query}`);
  }

  reserveCar(reservationData: any): Observable<any> {
    console.log('Données de réservation envoyées au backend :', reservationData);
    
    return this.http.put<any>(`${this.apiUrl}/${reservationData.carId}`, reservationData);
  }

  getReservations(carId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${carId}/reservations`);
  }
}