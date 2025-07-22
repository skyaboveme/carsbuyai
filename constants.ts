import type { Vehicle, UserLocation } from './types';

// Sample vehicle data for demonstration
export const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: '1',
    year: 2022,
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    price: 28500,
    mileage: 15420,
    location: 'San Diego, CA',
    zipcode: '92101',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    listingUrl: '#',
    dealer: 'Metro Toyota',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Silver Metallic',
    interiorColor: 'Black',
    vin: '4T1G11AK6NU123456',
    description: 'Excellent condition, one owner, full service history',
    features: ['Apple CarPlay', 'Bluetooth', 'Backup Camera', 'Lane Departure Warning'],
    isNew: false,
    daysOnLot: 12,
    priceHistory: [
      { date: '2024-01-01', price: 29500 },
      { date: '2024-01-15', price: 28500 }
    ],
    mpgCity: 28,
    mpgHighway: 39
  },
  {
    id: '2',
    year: 2023,
    make: 'Honda',
    model: 'CR-V',
    trim: 'EX',
    price: 32900,
    mileage: 8750,
    location: 'San Diego, CA',
    zipcode: '92102',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
    listingUrl: '#',
    dealer: 'Honda of San Diego',
    transmission: 'CVT',
    fuelType: 'Gasoline',
    exteriorColor: 'Crystal Black Pearl',
    interiorColor: 'Gray',
    vin: '7FARW2H60NE123456',
    description: 'Like new condition, still under warranty',
    features: ['Honda Sensing', 'Sunroof', 'Heated Seats', 'Apple CarPlay', 'Android Auto'],
    isNew: false,
    daysOnLot: 5,
    priceHistory: [
      { date: '2024-01-10', price: 32900 }
    ],
    mpgCity: 27,
    mpgHighway: 32
  },
  {
    id: '3',
    year: 2024,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    price: 47240,
    mileage: 0,
    location: 'San Diego, CA',
    zipcode: '92103',
    imageUrl: 'https://images.unsplash.com/photo-1617654112329-f26d0d65a5a4?w=400',
    listingUrl: '#',
    dealer: 'Tesla San Diego',
    transmission: 'Single-Speed',
    fuelType: 'Electric',
    exteriorColor: 'Pearl White Multi-Coat',
    interiorColor: 'Black',
    vin: '5YJ3E1EA8PF123456',
    description: 'Brand new Tesla Model 3 with latest features',
    features: ['Autopilot', 'Supercharger', 'Premium Interior', 'Glass Roof'],
    isNew: true,
    daysOnLot: 1,
    priceHistory: [
      { date: '2024-01-20', price: 47240 }
    ],
    mpgCity: 134, // MPGe equivalent
    mpgHighway: 126
  },
  {
    id: '4',
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    price: 39500,
    mileage: 32100,
    location: 'San Diego, CA',
    zipcode: '92104',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
    listingUrl: '#',
    dealer: 'Ford Country',
    transmission: '10-Speed Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Magnetic Metallic',
    interiorColor: 'Medium Earth Gray',
    vin: '1FTFW1E50MFA123456',
    description: 'Well-maintained work truck, towing package included',
    features: ['4WD', 'Towing Package', 'Sync 3', 'Bed Liner'],
    isNew: false,
    daysOnLot: 18,
    priceHistory: [
      { date: '2023-12-01', price: 41500 },
      { date: '2024-01-01', price: 39500 }
    ],
    mpgCity: 20,
    mpgHighway: 24
  },
  {
    id: '5',
    year: 2023,
    make: 'BMW',
    model: '3 Series',
    trim: '330i',
    price: 42900,
    mileage: 12500,
    location: 'San Diego, CA',
    zipcode: '92105',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
    listingUrl: '#',
    dealer: 'BMW of San Diego',
    transmission: '8-Speed Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Alpine White',
    interiorColor: 'Black SensaTec',
    vin: 'WBA5R1C05NBK123456',
    description: 'Luxury sedan with premium features and excellent performance',
    features: ['iDrive 7', 'Heated Seats', 'Wireless Charging', 'Premium Audio'],
    isNew: false,
    daysOnLot: 8,
    priceHistory: [
      { date: '2024-01-05', price: 42900 }
    ],
    mpgCity: 26,
    mpgHighway: 36
  }
];

// Car makes for filter dropdown
export const CAR_MAKES = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge',
  'Ford', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia',
  'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan',
  'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
];

// Transmission options
export const TRANSMISSION_TYPES = [
  'Manual',
  'Automatic',
  'CVT',
  'Single-Speed'
];

// Fuel types
export const FUEL_TYPES = [
  'Gasoline',
  'Hybrid',
  'Electric',
  'Diesel',
  'Plug-in Hybrid'
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
  { value: 'year-desc', label: 'Year: Newest First' },
  { value: 'newest', label: 'Recently Added' }
];

// Default search radius options (in miles)
export const RADIUS_OPTIONS = [5, 10, 25, 50, 100, 200, 500];

// Default user location (San Diego for demo)
export const DEFAULT_LOCATION: UserLocation = {
  zipcode: '92101',
  city: 'San Diego',
  state: 'CA',
  latitude: 32.7157,
  longitude: -117.1611
};