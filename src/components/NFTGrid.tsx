import React from 'react';
import { X } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  image: string;
  openseaLink: string;
}

interface NFTGridProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Cool NFT #1',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop',
    openseaLink: 'https://opensea.io/'
  },
  {
    id: '2',
    name: 'Awesome NFT #2',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop',
    openseaLink: 'https://opensea.io/'
  },
  {
    id: '3',
    name: 'Epic NFT #3',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop',
    openseaLink: 'https://opensea.io/'
  },
  {
    id: '4',
    name: 'Rare NFT #4',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop',
    openseaLink: 'https://opensea.io/'
  }
];

const NFTGrid: React.FC<NFTGridProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Your NFT Collection</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockNFTs.map((nft) => (
            <a
              key={nft.id}
              href={nft.openseaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-purple-50 rounded-lg p-3 transition-transform transform hover:scale-105">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-medium text-purple-800 group-hover:text-purple-600 truncate">
                  {nft.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTGrid;