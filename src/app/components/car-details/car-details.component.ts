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
  hasLiked: boolean = false; // Pour suivre si l'utilisateur a déjà aimé

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    selectable: true, // Permet de sélectionner plusieurs jours
    select: this.handleDateSelect.bind(this),
    unselectAuto: false, // Empêche la désélection automatique
    validRange: {
      start: new Date() // Empêche de sélectionner des dates passées
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
      
      // Vérifier si l'utilisateur a déjà aimé cette voiture
      this.checkIfUserLiked(+carId);
    }
  }

  loadCarDetails(carId: number): void {
    this.carService.findById(carId).subscribe((data) => {
      this.car = data;

      // Charger les événements de réservation depuis le backend
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

  // Vérifier si l'utilisateur a déjà aimé cette voiture
  checkIfUserLiked(carId: number): void {
    // Récupérer les likes de l'utilisateur depuis le localStorage
    const likedCars = JSON.parse(localStorage.getItem('likedCars') || '[]');
    this.hasLiked = likedCars.includes(carId);
  }

  // Méthode pour aimer un véhicule
  likeCar(): void {
    if (this.hasLiked) {
      return; // Ne pas permettre de liker plusieurs fois
    }

    const carId = this.car.id;
    
    this.carService.incrementLikes(carId).subscribe(
      (response) => {
        // Mettre à jour le nombre de likes affiché
        this.car.likes = (this.car.likes || 0) + 1;
        
        // Marquer cette voiture comme aimée pour cet utilisateur
        this.hasLiked = true;
        
        // Sauvegarder dans le localStorage pour persistance
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
          this.car.likes = Math.max((this.car.likes || 1) - 1, 0); // Évite les valeurs négatives
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

          // Déclencher une animation temporaire
          setTimeout(() => {
            this.hasLiked = true; // Maintenir l'état "aimé"
          }, 500); // Durée de l'animation
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
    // Convertir les dates en format lisible
    this.selectedStartDate = selectInfo.startStr;
    this.selectedEndDate = selectInfo.endStr;

    // Calculer le nombre de jours et le prix total
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

    // Préparez les données selon ce que le backend attend
    const reservationData = {
      carId: this.car.id,
      customerName: this.reservationForm.value.customerName,
      customerEmail: this.reservationForm.value.customerEmail,
      customerPhone: this.reservationForm.value.customerPhone,
      reservedFrom: this.selectedStartDate,
      reservedTo: this.selectedEndDate,
      totalPrice: this.totalPrice,
      available: false // Important pour déclencher l'envoi d'email
    };

    console.log('Données de réservation à envoyer :', reservationData);

    this.carService.reserveCar(reservationData).subscribe(
      (response) => {
        alert('Réservation confirmée ! Un email de confirmation a été envoyé à ' + reservationData.customerEmail);
        window.location.href = '/'; // Redirection vers la page d'accueil
      },
      (error) => {
        console.error('Erreur lors de la réservation :', error);
        alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
      }
    );
  }
}
