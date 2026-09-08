export interface ConsultationBooking {
  treatment: string;
  date: Date | null;
  time: string;

  fullName: string;
  age: string;
  email: string;
  phone: string;
  healthConcern: string;
  communication: string;

  amount: number;

  consultationId?: string;
  paymentReference?: string;
}