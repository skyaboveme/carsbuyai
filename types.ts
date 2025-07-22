export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  location: string;
  zipcode: string;
  imageUrl: string;
  listingUrl: string;
  dealer: string;
  transmission: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  description?: string;
  features: string[];
  isNew: boolean;
  daysOnLot: number;
  priceHistory: PricePoint[];
  mpgCity?: number;
  mpgHighway?: number;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface SearchFilters {
  zipcode?: string;
  radius?: number; // miles
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  makes?: string[];
  models?: string[];
  isNew?: boolean;
  transmission?: string[];
  fuelType?: string[];
  minMpg?: number;
  sortBy?: 'price' | 'mileage' | 'year' | 'distance' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface UserLocation {
  zipcode: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface SearchResults {
  vehicles: Vehicle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: SearchFilters;
}
