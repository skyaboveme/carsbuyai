import React from 'react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
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

  const getFuelEconomyText = () => {
    if (vehicle.fuelType === 'Electric') {
      return `${vehicle.mpgCity} MPGe`;
    }
    if (vehicle.mpgCity && vehicle.mpgHighway) {
      return `${vehicle.mpgCity}/${vehicle.mpgHighway} MPG`;
    }
    return null;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="relative">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-95 transition-opacity"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.currentTarget.src = `https://via.placeholder.com/400x300/e5e7eb/6b7280?text=${vehicle.make}+${vehicle.model}`;
          }}
        />
        {vehicle.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            NEW
          </span>
        )}
        {vehicle.daysOnLot <= 7 && !vehicle.isNew && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            JUST ADDED
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {vehicle.year} {vehicle.make} {vehicle.model}
            {vehicle.trim && ` ${vehicle.trim}`}
          </h3>
          <p className="text-sm text-gray-600">{vehicle.dealer}</p>
        </div>

        <div className="mb-3">
          <p className="text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</p>
          {vehicle.priceHistory.length > 1 && (
            <p className="text-sm text-green-600">
              Price reduced by {formatPrice(vehicle.priceHistory[0].price - vehicle.price)}
            </p>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Mileage:</span>
            <span className="font-medium">{formatMileage(vehicle.mileage)} miles</span>
          </div>
          
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="font-medium">{vehicle.location}</span>
          </div>

          {getFuelEconomyText() && (
            <div className="flex justify-between">
              <span>Fuel Economy:</span>
              <span className="font-medium">{getFuelEconomyText()}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Transmission:</span>
            <span className="font-medium">{vehicle.transmission}</span>
          </div>

          <div className="flex justify-between">
            <span>Fuel Type:</span>
            <span className="font-medium">{vehicle.fuelType}</span>
          </div>
        </div>

        {vehicle.features.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-1">
              {vehicle.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                  +{vehicle.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;