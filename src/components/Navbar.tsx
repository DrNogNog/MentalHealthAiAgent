import React, { useState } from 'react';
import { Upload, User, Hexagon, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import NFTGrid from './NFTGrid';
import ProfilePage from './ProfilePage';

const Navbar = () => {
  const [isNFTGridOpen, setIsNFTGridOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link
              to="/upload"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Documents</span>
            </Link>
          </div>

          <Link 
            to="/" 
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">VoiceAI</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setIsNFTGridOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Hexagon className="w-5 h-5" />
              <span>NFT</span>
            </button>
          </div>
        </div>
      </div>
      
      <NFTGrid isOpen={isNFTGridOpen} onClose={() => setIsNFTGridOpen(false)} />
      <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </nav>
  );
};

export default Navbar;