import React from 'react';
import { Vehicle } from '../types';

interface VehicleDetailProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle, onClose }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFuelEconomyText = () => {
    if (vehicle.fuelType === 'Electric') {
      return `${vehicle.mpgCity} MPGe (city) / ${vehicle.mpgHighway} MPGe (highway)`;
    }
    if (vehicle.mpgCity && vehicle.mpgHighway) {
      return `${vehicle.mpgCity} MPG (city) / ${vehicle.mpgHighway} MPG (highway)`;
    }
    return 'Not available';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
            {vehicle.trim && ` ${vehicle.trim}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              <div className="relative mb-6">
                <img
                  src={vehicle.imageUrl}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/600x400/e5e7eb/6b7280?text=${vehicle.make}+${vehicle.model}`;
                  }}
                />
                {vehicle.isNew && (
                  <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    NEW
                  </span>
                )}
                {vehicle.daysOnLot <= 7 && !vehicle.isNew && (
                  <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    JUST ADDED
                  </span>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                  </div>
                  {vehicle.priceHistory.length > 1 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Original Price:</span>
                        <span className="text-gray-900">{formatPrice(vehicle.priceHistory[0].price)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Price Reduction:</span>
                        <span className="text-green-600 font-semibold">
                          -{formatPrice(vehicle.priceHistory[0].price - vehicle.price)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {vehicle.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{vehicle.description}</p>
                </div>
              )}
            </div>

            {/* Right Column - Detailed Specs */}
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Year:</span>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Make:</span>
                    <p className="font-medium">{vehicle.make}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Model:</span>
                    <p className="font-medium">{vehicle.model}</p>
                  </div>
                  {vehicle.trim && (
                    <div>
                      <span className="text-gray-600">Trim:</span>
                      <p className="font-medium">{vehicle.trim}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Mileage:</span>
                    <p className="font-medium">{formatMileage(vehicle.mileage)} miles</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Condition:</span>
                    <p className="font-medium">{vehicle.isNew ? 'New' : 'Used'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Transmission:</span>
                    <p className="font-medium">{vehicle.transmission}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Fuel Type:</span>
                    <p className="font-medium">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Exterior Color:</span>
                    <p className="font-medium">{vehicle.exteriorColor}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Interior Color:</span>
                    <p className="font-medium">{vehicle.interiorColor}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Fuel Economy:</span>
                    <p className="font-medium">{getFuelEconomyText()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">VIN:</span>
                    <p className="font-medium font-mono text-xs">{vehicle.vin}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dealer Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Dealer:</span>
                    <p className="font-medium">{vehicle.dealer}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium">{vehicle.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Days on Lot:</span>
                    <p className="font-medium">{vehicle.daysOnLot} days</p>
                  </div>
                </div>
              </div>

              {vehicle.features.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {vehicle.priceHistory.length > 1 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History</h3>
                  <div className="space-y-2">
                    {vehicle.priceHistory.map((pricePoint, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{formatDate(pricePoint.date)}:</span>
                        <span className="font-medium">{formatPrice(pricePoint.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium">
                Contact Dealer
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium">
                Schedule Test Drive
              </button>
              <button className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-medium">
                Get Financing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;