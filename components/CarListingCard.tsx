import React from 'react';
import type { CarListing } from '../types';
import { ImageIcon } from './IconComponents';

interface CarListingCardProps {
  listing: CarListing;
  onStartNegotiation: (message: string) => void;
}

const getDealQuality = (score: number | undefined | null): { text: string; className: string } => {
  if (score == null) return { text: 'N/A', className: 'bg-slate-500' };
  if (score >= 9) return { text: 'Great Deal', className: 'bg-green-600' };
  if (score >= 7) return { text: 'Good Deal', className: 'bg-green-500' };
  if (score >= 4) return { text: 'Fair Deal', className: 'bg-yellow-500' };
  return { text: 'Overpriced', className: 'bg-red-600' };
};

const CarListingCard: React.FC<CarListingCardProps> = ({ listing, onStartNegotiation }) => {
  const handleNegotiationClick = () => {
    const priceText = listing.price != null ? `$${listing.price.toLocaleString()}` : 'the listed price';
    const message = `Let's start the negotiation for the ${listing.year || ''} ${listing.make || ''} ${listing.model || ''} listed at ${priceText}. Please act as my negotiation agent.`;
    onStartNegotiation(message);
  };

  const formattedPrice = listing.price != null ? `$${listing.price.toLocaleString()}` : 'Price N/A';
  const formattedMileage = listing.mileage != null ? `${listing.mileage.toLocaleString()} mi` : 'Mileage N/A';
  const score = listing.truePrice?.score;
  const analysis = listing.truePrice?.analysis || 'No price analysis available.';
  const formattedMarketValue = listing.truePrice?.marketValue != null ? `$${listing.truePrice.marketValue.toLocaleString()}` : 'N/A';
  const deal = getDealQuality(score);
  const isValidListingUrl = listing.listingUrl && listing.listingUrl.startsWith('http');

  return (
    <div className="flex-shrink-0 w-72 bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700/50 flex flex-col transform hover:-translate-y-1 transition-transform duration-200">
      <div className="relative h-40 bg-slate-700">
        {listing.imageUrl ? (
          <img src={listing.imageUrl} alt={`${listing.year} ${listing.make} ${listing.model}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}
        <div className={`absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${deal.className}`}>
          {deal.text}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-md text-slate-100 truncate">{listing.year} {listing.make} {listing.model}</h3>
        
        <p className="text-xl font-bold text-white mt-1">{formattedPrice}</p>

        <div className="flex text-sm text-slate-400 mt-1">
          <span className="truncate">{formattedMileage}</span>
          <span className="mx-1.5">·</span>
          <span className="truncate">{listing.location}</span>
        </div>

        <div className="group relative mt-2 text-xs text-slate-400 self-start">
          <span className="border-b border-dotted border-slate-500 cursor-help">
            TruePrice Analysis
          </span>
          <div className="absolute bottom-full mb-2 w-60 p-3 bg-slate-900 border border-slate-600 rounded-lg text-sm text-left opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <p className="font-bold text-white">Score: {score != null ? `${score}/10` : 'N/A'}</p>
            <p className="text-slate-300 mt-1">{analysis}</p>
            <p className="text-slate-300 mt-1">Est. Market Value: {formattedMarketValue}</p>
          </div>
        </div>

        <div className="flex-grow" />

        <div className="mt-4 grid grid-cols-2 gap-2">
          {isValidListingUrl ? (
            <a
              href={listing.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
            >
              View Listing
            </a>
          ) : (
            <button
              disabled
              title="Listing URL not provided"
              className="text-center bg-slate-700 text-slate-500 font-semibold py-2 px-3 rounded-lg text-sm cursor-not-allowed"
            >
              View Listing
            </button>
          )}
          <button onClick={handleNegotiationClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm">
            Negotiate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarListingCard;