
import React, { useState, useEffect } from 'react';
import { Vehicle, SearchFilters, UserLocation } from './types';
import { SAMPLE_VEHICLES, DEFAULT_LOCATION } from './constants';
import Header from './components/Header';
import LocationInput from './components/LocationInput';
import SearchFiltersComponent from './components/SearchFilters';
import VehicleGrid from './components/VehicleGrid';
import VehicleDetail from './components/VehicleDetail';
import './index.css';

function App() {
  const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    zipcode: DEFAULT_LOCATION.zipcode,
    radius: 25
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  // Load vehicles when location changes
  useEffect(() => {
    loadVehicles();
  }, [userLocation]);

  // Filter vehicles when filters change
  useEffect(() => {
    filterVehicles();
  }, [vehicles, filters]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll use sample data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setVehicles(SAMPLE_VEHICLES);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = [...vehicles];

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(v => v.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(v => v.price <= filters.maxPrice!);
    }

    // Filter by year range
    if (filters.minYear) {
      filtered = filtered.filter(v => v.year >= filters.minYear!);
    }
    if (filters.maxYear) {
      filtered = filtered.filter(v => v.year <= filters.maxYear!);
    }

    // Filter by mileage
    if (filters.maxMileage) {
      filtered = filtered.filter(v => v.mileage <= filters.maxMileage!);
    }

    // Filter by makes
    if (filters.makes && filters.makes.length > 0) {
      filtered = filtered.filter(v => filters.makes!.includes(v.make));
    }

    // Filter by new/used
    if (filters.isNew !== undefined) {
      filtered = filtered.filter(v => v.isNew === filters.isNew);
    }

    // Filter by transmission
    if (filters.transmission && filters.transmission.length > 0) {
      filtered = filtered.filter(v => filters.transmission!.includes(v.transmission));
    }

    // Filter by fuel type
    if (filters.fuelType && filters.fuelType.length > 0) {
      filtered = filtered.filter(v => filters.fuelType!.includes(v.fuelType));
    }

    // Sort vehicles
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: number, bValue: number;
        
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'mileage':
            aValue = a.mileage;
            bValue = b.mileage;
            break;
          case 'year':
            aValue = a.year;
            bValue = b.year;
            break;
          case 'newest':
            aValue = a.daysOnLot;
            bValue = b.daysOnLot;
            break;
          default:
            return 0;
        }

        return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }

    setFilteredVehicles(filtered);
  };

  const handleLocationChange = (location: UserLocation) => {
    setUserLocation(location);
    setFilters(prev => ({ ...prev, zipcode: location.zipcode }));
    setShowLocationInput(false);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseDetail = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userLocation={userLocation}
        onLocationClick={() => setShowLocationInput(true)}
      />
      
      {showLocationInput && (
        <LocationInput
          currentLocation={userLocation}
          onLocationSelect={handleLocationChange}
          onClose={() => setShowLocationInput(false)}
        />
      )}

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFiltersComponent
              filters={filters}
              onFiltersChange={handleFiltersChange}
              vehicleCount={filteredVehicles.length}
            />
          </div>

          {/* Vehicle Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Vehicles near {userLocation.city}, {userLocation.state}
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredVehicles.length} vehicles found`}
              </p>
            </div>
            
            <VehicleGrid
              vehicles={filteredVehicles}
              loading={loading}
              onVehicleSelect={handleVehicleSelect}
            />
          </div>
        </div>
      </main>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetail
          vehicle={selectedVehicle}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
