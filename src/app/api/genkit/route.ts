import {genkit} from '@/ai/genkit';
import {nextJSHandler} from '@genkit-ai/next';

export const POST = nextJSHandler(genkit);
