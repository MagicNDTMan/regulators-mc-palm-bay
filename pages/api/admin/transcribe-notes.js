import { requireOfficerCaller } from '../../../lib/supabase-admin';

const MAX_IMAGES = 5;

// Base64-encoded images inflate ~33% over binary size; the client resizes
// each photo before upload, but 5 pages still needs more than the 1mb default.
export const config = {
  api: {
    bodyParser: { sizeLimit: '15mb' }
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const caller = await requireOfficerCaller(req);
  if (!caller) {
    return res.status(403).json({ error: 'Officer access required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Transcription is not configured yet (missing API key)' });
  }

  const { images } = req.body;
  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }
  if (images.length > MAX_IMAGES) {
    return res.status(400).json({ error: `Please transcribe at most ${MAX_IMAGES} images at a time` });
  }

  const allowedMediaTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  for (const img of images) {
    if (!img.data || !img.mediaType || !allowedMediaTypes.includes(img.mediaType)) {
      return res.status(400).json({ error: 'Invalid image data' });
    }
  }

  try {
    const content = [
      ...images.map(img => ({
        type: 'image',
        source: { type: 'base64', media_type: img.mediaType, data: img.data }
      })),
      {
        type: 'text',
        text: images.length > 1
          ? 'These images are consecutive pages of handwritten motorcycle club meeting notes, in order. Transcribe them into clean plain text, preserving structure (bullet points, sections) where visible. Expand obvious shorthand only if unambiguous; otherwise transcribe as written. Output only the transcription, no commentary or preamble.'
          : 'This image is handwritten motorcycle club meeting notes. Transcribe it into clean plain text, preserving structure (bullet points, sections) where visible. Expand obvious shorthand only if unambiguous; otherwise transcribe as written. Output only the transcription, no commentary or preamble.'
      }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(502).json({ error: data.error?.message || 'Transcription service error' });
    }

    const text = data.content?.[0]?.text || '';
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Transcription error:', error);
    return res.status(500).json({ error: 'Something went wrong during transcription' });
  }
}
