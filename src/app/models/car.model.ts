  export class Car {
    id?: number; 
    brand!: string;
    model!: string;
    year!: number;
    photo!: string;
    price!: number;
    description!: string;
    available!: boolean;
    reservedFrom?: Date;
    reservedTo?: Date;
  }

  export class Reservation {
      id?: number;
      carId?: number;
      car?: Car;
      available!: boolean;
      reservedFrom!: Date;
      reservedTo!: Date;
      customerName!: string;
      customerEmail!: string;
  }