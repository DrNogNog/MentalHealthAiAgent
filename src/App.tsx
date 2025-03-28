import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Upload, User, Hexagon, Phone, MessageSquare, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import VoiceSynthesizer from './components/VoiceSynthesizer';
import Navbar from './components/Navbar';
import UploadPage from './components/UploadPage';

const suggestions = {
  Greg: [
    "Contact friends to plan a group dinner together",
    "Reach out to family members for a weekend gathering",
    "Schedule a coffee date with your best friend",
  ],
  Steve: [
    "Plan a movie night with your closest friends",
    "Organize a game night with your social circle",
    "Ask a friend to join you for a walk in the park",
  ],
  Nancy: [
    "Connect with an old friend you miss",
    "Share your feelings with someone you trust",
    "Join a local community group or club",
  ]
};

const voices = [
  { name: "Greg", color: "from-blue-500 to-blue-600" },
  { name: "Steve", color: "from-green-500 to-green-600" },
  { name: "Nancy", color: "from-pink-500 to-pink-600" }
];

function App() {
  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');
  const [email, setEmail] = useState('');
  const [activeVoice, setActiveVoice] = useState(0);
  const [direction, setDirection] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState(suggestions[voices[activeVoice].name]);

  const handleVoiceChange = (newIndex: number) => {
    setDirection(newIndex > activeVoice ? 'left' : 'right');
    setActiveVoice(newIndex);
    setCurrentSuggestions(suggestions[voices[newIndex].name]);
    setMessage(suggestions[voices[newIndex].name][0]); // Set the first suggestion for the selected voice
  };
  const handleChangeTwo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageTwo(e.target.value);  // Update state with the new message
  };

  const handleSendEmail = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    alert('Message will be sent to your email: ' + email);
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-4 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 text-white mb-3">
            <MessageSquare className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Suggested Prompts</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {currentSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-3 hover:bg-opacity-20 transition-colors cursor-pointer"
                onClick={() => {
                    setMessage(suggestion);  // Set the clicked suggestion in the message state
                }}
              >
                <div className="flex items-center gap-2 text-white">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm line-clamp-2">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={
          <main className="container mx-auto px-4 py-8">
            {/* Voice Selection Tabs */}
            <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full shadow-md p-1 flex gap-1">
                {voices.map((voice, index) => (
                  <button
                    key={index}
                    onClick={() => handleVoiceChange(index)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      index === activeVoice
                        ? `bg-gradient-to-r ${voice.color} text-white shadow-sm`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {voice.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
                <button
                  onClick={() => handleVoiceChange((activeVoice - 1 + voices.length) % voices.length)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors transform -translate-x-2 hover:scale-110"
                  aria-label="Previous voice"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={() => handleVoiceChange((activeVoice + 1) % voices.length)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors transform translate-x-2 hover:scale-110"
                  aria-label="Next voice"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

          <div className="relative h-[400px]">
            {voices.map((voice, index) => (
    <div
      key={voice.name}
      className={`absolute w-full transition-all duration-500 ${
        index === activeVoice
          ? 'opacity-100 translate-x-0 z-20'
          : index < activeVoice
          ? 'opacity-0 -translate-x-full z-10'
          : 'opacity-0 translate-x-full z-10'
      }`}
    >
      <div className={`bg-gradient-to-br ${voice.color} rounded-xl p-6 shadow-lg`}>
        {/* Pass message and setMessage to VoiceSynthesizer */}
        <VoiceSynthesizer name={voice.name} message={message} setMessage={setMessage} />
      </div>
    </div>
  ))}
</div>


              {/* Mobile-friendly dots */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {voices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleVoiceChange(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeVoice
                        ? 'bg-purple-600 w-4'
                        : 'bg-purple-200'
                    }`}
                    aria-label={`Switch to voice ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="flex justify-center">
                <a
                  href="tel:929-888-2308"
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Seek Help (929-888-2308)</span>
                </a>
              </div>

              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Write your message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Type your message here..."
                      value={messageTwo}
                      onChange={handleChangeTwo}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleSendEmail}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send to my email</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        } />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;
