import React, { useState } from 'react';
import { X, Download, Save, Palette } from 'lucide-react';

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileData {
  name: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    occupation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the profile data
    console.log('Profile data:', profile);
    alert('Profile updated successfully!');
  };

  const creatives = [
    {
      name: 'Modern Portfolio Template',
      description: 'Clean and professional portfolio design',
      url: 'https://docs.google.com/spreadsheets/d/1-example1/export?format=xlsx'
    },
    {
      name: 'Creative Resume Layout',
      description: 'Stand out with this unique resume design',
      url: 'https://docs.google.com/spreadsheets/d/1-example2/export?format=xlsx'
    },
    {
      name: 'Business Card Design',
      description: 'Professional business card template',
      url: 'https://docs.google.com/spreadsheets/d/1-example3/export?format=xlsx'
    },
    {
      name: 'Social Media Kit',
      description: 'Complete social media branding package',
      url: 'https://docs.google.com/spreadsheets/d/1-example4/export?format=xlsx'
    },
    {
      name: 'Presentation Template',
      description: 'Professional slide deck design',
      url: 'https://docs.google.com/spreadsheets/d/1-example5/export?format=xlsx'
    },
    {
      name: 'Brand Guidelines',
      description: 'Complete brand identity package',
      url: 'https://docs.google.com/spreadsheets/d/1-example6/export?format=xlsx'
    },
    {
      name: 'Marketing Plan Template',
      description: 'Comprehensive marketing strategy framework',
      url: 'https://docs.google.com/spreadsheets/d/1-example7/export?format=xlsx'
    },
    {
      name: 'Project Timeline Template',
      description: 'Professional project management timeline',
      url: 'https://docs.google.com/spreadsheets/d/1-example8/export?format=xlsx'
    },
    {
      name: 'Budget Tracker',
      description: 'Financial planning and tracking template',
      url: 'https://docs.google.com/spreadsheets/d/1-example9/export?format=xlsx'
    },
    {
      name: 'Content Calendar',
      description: 'Social media content planning template',
      url: 'https://docs.google.com/spreadsheets/d/1-example10/export?format=xlsx'
    },
    {
      name: 'Client Proposal Template',
      description: 'Professional business proposal format',
      url: 'https://docs.google.com/spreadsheets/d/1-example11/export?format=xlsx'
    },
    {
      name: 'Invoice Template',
      description: 'Clean and professional invoice design',
      url: 'https://docs.google.com/spreadsheets/d/1-example12/export?format=xlsx'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Your Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Form */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Personal Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Software Developer"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Save Profile</span>
              </button>
            </form>
          </div>

          {/* Creatives Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-700">Download Creatives</h3>
            </div>
            <div className="h-[600px] overflow-y-auto pr-2 space-y-2">
              {creatives.map((creative, index) => (
                <div
                  key={index}
                  className="bg-purple-50 rounded-lg p-3 border border-purple-100 hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-purple-800">
                        {creative.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {creative.description}
                      </p>
                    </div>
                    <a
                      href={creative.url}
                      download
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 ml-4"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;