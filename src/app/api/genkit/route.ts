import { genkit } from '@/ai/genkit'; // tu instancia de Genkit

export const runtime = 'nodejs';

export async function POST(request: Request) {
  // Llama a tu instancia de Genkit directamente
  const response = await genkit.handleRequest(request);
  return response;
}
