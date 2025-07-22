import React, { useState } from 'react';
import { UserLocation } from '../types';

interface LocationInputProps {
  currentLocation: UserLocation;
  onLocationSelect: (location: UserLocation) => void;
  onClose: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  currentLocation,
  onLocationSelect,
  onClose
}) => {
  const [zipcode, setZipcode] = useState(currentLocation.zipcode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipcode.trim()) return;

    setLoading(true);
    setError('');

    try {
      // In a real app, this would call a geocoding API
      // For demo, we'll simulate with predefined locations
      const mockLocations: Record<string, UserLocation> = {
        '92101': { zipcode: '92101', city: 'San Diego', state: 'CA', latitude: 32.7157, longitude: -117.1611 },
        '90210': { zipcode: '90210', city: 'Beverly Hills', state: 'CA', latitude: 34.0901, longitude: -118.4065 },
        '10001': { zipcode: '10001', city: 'New York', state: 'NY', latitude: 40.7505, longitude: -73.9934 },
        '60601': { zipcode: '60601', city: 'Chicago', state: 'IL', latitude: 41.8781, longitude: -87.6298 },
        '33101': { zipcode: '33101', city: 'Miami', state: 'FL', latitude: 25.7617, longitude: -80.1918 },
      };

      const location = mockLocations[zipcode] || {
        zipcode,
        city: 'Unknown',
        state: 'Unknown',
        latitude: 0,
        longitude: 0
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onLocationSelect(location);
    } catch (err) {
      setError('Unable to find location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const popularZipcodes = [
    { zipcode: '92101', city: 'San Diego, CA' },
    { zipcode: '90210', city: 'Beverly Hills, CA' },
    { zipcode: '10001', city: 'New York, NY' },
    { zipcode: '60601', city: 'Chicago, IL' },
    { zipcode: '33101', city: 'Miami, FL' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Enter Your Location</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="Enter ZIP code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !zipcode.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Location...' : 'Update Location'}
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Locations</h3>
          <div className="space-y-1">
            {popularZipcodes.map((location) => (
              <button
                key={location.zipcode}
                onClick={() => setZipcode(location.zipcode)}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                {location.city} ({location.zipcode})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;