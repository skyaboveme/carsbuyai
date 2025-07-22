export enum Sender {
  USER = 'user',
  AI = 'ai',
}

export interface Source {
  title: string;
  uri: string;
}

export interface TruePriceScore {
  score: number; // A rating from 1-10
  analysis: string; // A brief explanation
  marketValue: number; // Estimated market value
}

export interface CarListing {
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  location: string;
  imageUrl: string;
  listingUrl: string;
  truePrice: TruePriceScore;
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  sources?: Source[];
  listings?: CarListing[];
}

export interface Conversation {
  id:string;
  title: string;
  messages: Message[];
  createdAt: number;
}
