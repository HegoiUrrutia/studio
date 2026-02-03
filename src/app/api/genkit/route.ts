import { ai } from '@/ai/genkit'; // Fíjate que aquí usamos 'ai', que es lo que exportaste
import { nextJSHandler } from '@genkit-ai/next';

export const POST = nextJSHandler(ai);
