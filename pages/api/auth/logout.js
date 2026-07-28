export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Set-Cookie', `authToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
  return res.status(200).json({ success: true, message: 'Logged out' });
}
