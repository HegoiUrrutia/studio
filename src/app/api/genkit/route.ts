import { genkit } from '@/ai/genkit';
import { nextJSHandler } from '@genkit-ai/next';

// Forzar el uso de Node.js en lugar de Edge
export const runtime = 'nodejs';

export const POST = nextJSHandler(genkit);
