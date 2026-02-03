import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai'; // Verifica que no sea @genkit-ai/google-genai

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash', // Corregido el nombre del modelo
});
