import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, StopCircle } from 'lucide-react';
import OpenAI from 'openai';

interface VoiceSynthesizerProps {
  name: string;
  message: string;  // Add the message prop
  setMessage: React.Dispatch<React.SetStateAction<string>>;  // Add setMessage prop
}

const VoiceSynthesizer: React.FC<VoiceSynthesizerProps> = ({ name, message, setMessage }) => {
  const [response, setResponse] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const getPersonalityPrompt = () => {
    switch (name) {
      case 'Greg':
        return "You are Greg, a friendly and professional AI assistant with a calm demeanor. You speak clearly and concisely, using professional language while maintaining a warm tone. Respond in a way that reflects this personality, keeping responses helpful and direct.";
      case 'Steve':
        return "You are Steve, an enthusiastic and energetic AI assistant who loves technology. You're knowledgeable but casual in your communication style, often using modern expressions. Make your responses engaging and upbeat while being informative.";
      case 'Nancy':
        return "You are Nancy, a compassionate and understanding AI assistant with a nurturing personality. You communicate with empathy and patience, making complex topics easier to understand. Your responses should be supportive and encouraging.";
      default:
        return "You are a helpful AI assistant. Please provide a clear and informative response.";
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      if (availableVoices.length > 0) {
        if (name === 'Nancy') {
          const femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('female') || 
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('victoria')
          );
          setSelectedVoice(femaleVoice?.name || availableVoices[0].name);
        } else {
          const maleVoice = availableVoices.find(voice =>
            voice.name.toLowerCase().includes('male') ||
            voice.name.toLowerCase().includes('david') ||
            voice.name.toLowerCase().includes('alex')
          );
          setSelectedVoice(maleVoice?.name || availableVoices[0].name);
        }
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setText(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [name]);

  const startListening = () => {
    setText('');
    setResponse('');
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      
      try {
        const openai = new OpenAI({
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true
        });

        const completion = await openai.chat.completions.create({
          messages: [
            { 
              role: "system", 
              content: getPersonalityPrompt()
            },
            { 
              role: "user", 
              content: message  // Use the message prop here
            }
          ],
          model: "gpt-3.5-turbo",
        });

        const aiResponse = completion.choices[0].message.content || '';
        setResponse(aiResponse);
        speakResponse(aiResponse);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setResponse('Sorry, I encountered an error processing your request.');
      }
    }
  };

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        {isListening ? (
          <Mic className="w-6 h-6 text-red-600 animate-pulse" />
        ) : (
          <Volume2 className={`w-6 h-6 ${isSpeaking ? 'text-purple-600 animate-pulse' : 'text-purple-600'}`} />
        )}
        <h2 className="text-xl font-semibold text-gray-800">{name}'s Voice</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <div className="relative">
            <textarea
              value={message}  // Use message as the value
              onChange={(e) => setMessage(e.target.value)}  // Use setMessage to update message
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
              placeholder="Speak or type your message..."
              readOnly={isListening}
            />
            {message && (
              <div className="absolute right-2 top-2 text-xs text-gray-500">
                {message.length} characters
              </div>
            )}
          </div>
        </div>

        {response && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AI Response
            </label>
            <div className="w-full px-3 py-2 border border-purple-200 rounded-lg bg-purple-50">
              {response}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {isListening ? (
            <button
              onClick={stopListening}
              className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <StopCircle className="w-5 h-5" />
              <span>Stop Recording</span>
            </button>
          ) : (
            <button
              onClick={startListening}
              disabled={isSpeaking}
              className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mic className="w-5 h-5" />
              <span>Start Recording</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSynthesizer;
