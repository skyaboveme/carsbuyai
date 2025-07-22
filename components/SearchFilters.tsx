import React, { useState } from 'react';
import { SearchFilters, UserLocation } from '../types';
import { CAR_MAKES, TRANSMISSION_TYPES, FUEL_TYPES, SORT_OPTIONS, RADIUS_OPTIONS } from '../constants';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  vehicleCount: number;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  vehicleCount
}) => {
  const [showMoreMakes, setShowMoreMakes] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (key: keyof SearchFilters, value: string, checked: boolean) => {
    const currentArray = (localFilters[key] as string[]) || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleFilterChange(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearAllFilters = () => {
    const clearedFilters: SearchFilters = {
      zipcode: filters.zipcode,
      radius: filters.radius
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const displayedMakes = showMoreMakes ? CAR_MAKES : CAR_MAKES.slice(0, 8);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {vehicleCount} vehicles found
        </div>

        {/* Search Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius
          </label>
          <select
            value={filters.radius || 25}
            onChange={(e) => handleFilterChange('radius', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {RADIUS_OPTIONS.map(radius => (
              <option key={radius} value={radius}>
                {radius} miles
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Year"
              value={filters.minYear || ''}
              onChange={(e) => handleFilterChange('minYear', e.target.value ? parseInt(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max Year"
              value={filters.maxYear || ''}
              onChange={(e) => handleFilterChange('maxYear', e.target.value ? parseInt(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Max Mileage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Mileage
          </label>
          <input
            type="number"
            placeholder="Max mileage"
            value={filters.maxMileage || ''}
            onChange={(e) => handleFilterChange('maxMileage', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New/Used */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                checked={filters.isNew === undefined}
                onChange={() => handleFilterChange('isNew', undefined)}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                checked={filters.isNew === true}
                onChange={() => handleFilterChange('isNew', true)}
                className="mr-2"
              />
              New
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                checked={filters.isNew === false}
                onChange={() => handleFilterChange('isNew', false)}
                className="mr-2"
              />
              Used
            </label>
          </div>
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {displayedMakes.map(make => (
              <label key={make} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.makes || []).includes(make)}
                  onChange={(e) => handleArrayFilterChange('makes', make, e.target.checked)}
                  className="mr-2"
                />
                {make}
              </label>
            ))}
            {CAR_MAKES.length > 8 && (
              <button
                onClick={() => setShowMoreMakes(!showMoreMakes)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showMoreMakes ? 'Show Less' : `Show ${CAR_MAKES.length - 8} More`}
              </button>
            )}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <div className="space-y-2">
            {TRANSMISSION_TYPES.map(transmission => (
              <label key={transmission} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.transmission || []).includes(transmission)}
                  onChange={(e) => handleArrayFilterChange('transmission', transmission, e.target.checked)}
                  className="mr-2"
                />
                {transmission}
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type
          </label>
          <div className="space-y-2">
            {FUEL_TYPES.map(fuelType => (
              <label key={fuelType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.fuelType || []).includes(fuelType)}
                  onChange={(e) => handleArrayFilterChange('fuelType', fuelType, e.target.checked)}
                  className="mr-2"
                />
                {fuelType}
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={`${filters.sortBy || 'price'}-${filters.sortOrder || 'asc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              handleFilterChange('sortBy', sortBy as any);
              handleFilterChange('sortOrder', sortOrder as 'asc' | 'desc');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;