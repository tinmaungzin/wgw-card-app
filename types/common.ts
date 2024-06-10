export type Card = {
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvc: string;
    type?: string;
  };
  
  export interface CardDetails {
    card: {
      name: string;
      city?: string;
      postal_code?: number;
      number: string;
      expiration_month: number;
      expiration_year: number;
      security_code: string;
    };
  }
  
  export interface ChargeDetails {
    description: string;
    amount: number;
    currency: string;
    capture: boolean;
    card: string;
  }
  