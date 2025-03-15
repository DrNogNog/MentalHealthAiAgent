import axios from 'axios';

// Define a TypeScript interface for type safety
interface Payload {
  name: string;
  age: number;
}

const sendDataToPython = async (data: Payload): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:5000/api/data', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response from Python:', response.data);
  } catch (error) {
    console.error('Error connecting to Python server:', error);
  }
};

// Sample data to send
const payload: Payload = { name: 'Lady Moody', age: 30 };
sendDataToPython(payload);
