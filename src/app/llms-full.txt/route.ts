import { generateLlmsFullTxt } from '@/lib/llms';

export const revalidate = false;

export async function GET() {
  const text = await generateLlmsFullTxt();
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
