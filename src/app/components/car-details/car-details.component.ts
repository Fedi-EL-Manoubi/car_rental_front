import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: any;
  reservationForm!: FormGroup;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  totalPrice: number = 0;
  totalDays: number = 0;
  showReservationForm: boolean = false;
  hasLiked: boolean = false; 

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    selectable: true, 
    select: this.handleDateSelect.bind(this),
    unselectAuto: false, 
    validRange: {
      start: new Date() 
    }
  };

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.loadCarDetails(+carId);
      
   
      this.checkIfUserLiked(+carId);
    }
  }

  loadCarDetails(carId: number): void {
    this.carService.findById(carId).subscribe((data) => {
      this.car = data;

    
      this.carService.getReservations(carId).subscribe((reservations) => {
        this.calendarOptions.events = reservations.map((reservation: any) => ({
          title: 'Réservé',
          start: reservation.reservedFrom,
          end: reservation.reservedTo,
          color: '#dc3545', // Rouge pour indiquer que c'est réservé
          display: 'background' // Affiche un arrière-plan coloré
        }));
      });
    });
  }


  checkIfUserLiked(carId: number): void {
    const likedCars = JSON.parse(localStorage.getItem('likedCars') || '[]');
    this.hasLiked = likedCars.includes(carId);
  }

// like
  likeCar(): void {
    if (this.hasLiked) {
      return; // Ne pas permettre de liker plusieurs fois
    }

    const carId = this.car.id;
    
    this.carService.incrementLikes(carId).subscribe(
      (response) => {
        this.car.likes = (this.car.likes || 0) + 1;
      
        this.hasLiked = true;
        
        const likedCars = JSON.parse(localStorage.getItem('likedCars') || '[]');
        likedCars.push(carId);
        localStorage.setItem('likedCars', JSON.stringify(likedCars));
        
        // Feedback à l'utilisateur
        console.log('Like ajouté avec succès !');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du like:', error);
        alert('Une erreur est survenue lors de l\'ajout du like.');
      }
    );
  }

  toggleLike(): void {
    if (this.hasLiked) {
      // Si déjà aimé, retirer le like
      this.carService.decrementLikes(this.car.id).subscribe(
        () => {
          this.car.likes = Math.max((this.car.likes || 1) - 1, 0); 
          this.hasLiked = false;
        },
        (error) => {
          console.error('Erreur lors du retrait du like :', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
    } else {
      // Ajouter un like
      this.carService.incrementLikes(this.car.id).subscribe(
        () => {
          this.car.likes = (this.car.likes || 0) + 1;
          this.hasLiked = true;
          setTimeout(() => {
            this.hasLiked = true; 
          }, 500); 
        },
        (error) => {
          console.error('Erreur lors de lajout du like :', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
    }
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required]
    });
  }

  handleDateSelect(selectInfo: any): void {
    this.selectedStartDate = selectInfo.startStr;
    this.selectedEndDate = selectInfo.endStr;

    const start = new Date(selectInfo.start);
    const end = new Date(selectInfo.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.totalPrice = this.totalDays * (this.car?.price || 0);

    console.log('Dates sélectionnées:', this.selectedStartDate, 'à', this.selectedEndDate);
    console.log('Nombre de jours:', this.totalDays);
    console.log('Prix total:', this.totalPrice);
  }

  toggleReservationForm(): void {
    if (!this.selectedStartDate || !this.selectedEndDate) {
      alert('Veuillez sélectionner des dates de réservation dans le calendrier.');
      return;
    }
    this.showReservationForm = !this.showReservationForm;
  }

  onSubmit(): void {
    if (this.reservationForm.invalid || !this.selectedStartDate || !this.selectedEndDate) {
      alert('Veuillez remplir tous les champs et sélectionner des dates.');
      return;
    }

    const reservationData = {
      carId: this.car.id,
      customerName: this.reservationForm.value.customerName,
      customerEmail: this.reservationForm.value.customerEmail,
      customerPhone: this.reservationForm.value.customerPhone,
      reservedFrom: this.selectedStartDate,
      reservedTo: this.selectedEndDate,
      totalPrice: this.totalPrice,
      available: false 
    };

    console.log('Données de réservation à envoyer :', reservationData);

    this.carService.reserveCar(reservationData).subscribe(
      (response) => {
        alert('Réservation confirmée ! Un email de confirmation a été envoyé à ' + reservationData.customerEmail);
        window.location.href = '/'; 
      },
      (error) => {
        console.error('Erreur lors de la réservation :', error);
        alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
      }
    );
  }
}
