import { requireOfficerCaller } from '../../../lib/supabase-admin';

const MAX_FILES = 5;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const PDF_TYPE = 'application/pdf';

// Base64-encoded files inflate ~33% over binary size; the client resizes
// each photo before upload, but scanned PDFs aren't resized, so 5 pages
// still needs more than the 1mb default.
export const config = {
  api: {
    bodyParser: { sizeLimit: '20mb' }
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

  const { files } = req.body;
  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: 'At least one file is required' });
  }
  if (files.length > MAX_FILES) {
    return res.status(400).json({ error: `Please transcribe at most ${MAX_FILES} files at a time` });
  }

  for (const f of files) {
    if (!f.data || !f.mediaType || ![...IMAGE_TYPES, PDF_TYPE].includes(f.mediaType)) {
      return res.status(400).json({ error: 'Invalid file data' });
    }
  }

  try {
    const content = [
      ...files.map(f => f.mediaType === PDF_TYPE
        ? { type: 'document', source: { type: 'base64', media_type: f.mediaType, data: f.data } }
        : { type: 'image', source: { type: 'base64', media_type: f.mediaType, data: f.data } }),
      {
        type: 'text',
        text: files.length > 1
          ? 'These are consecutive pages of handwritten motorcycle club meeting notes, in order (a mix of photos and/or scanned PDFs). Transcribe them into clean plain text, preserving structure (bullet points, sections) where visible. Expand obvious shorthand only if unambiguous; otherwise transcribe as written. Output only the transcription, no commentary or preamble.'
          : 'This file contains handwritten motorcycle club meeting notes (a photo or scanned PDF). Transcribe it into clean plain text, preserving structure (bullet points, sections) where visible. Expand obvious shorthand only if unambiguous; otherwise transcribe as written. Output only the transcription, no commentary or preamble.'
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
