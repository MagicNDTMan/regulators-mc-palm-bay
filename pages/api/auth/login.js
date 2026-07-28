export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Demo login - any email/password works
  // First login with mike@ndt.llc becomes admin
  const token = Buffer.from(JSON.stringify({
    email: email.toLowerCase(),
    role: email.toLowerCase() === 'mike@ndt.llc' ? 'admin' : 'member',
    timestamp: Date.now()
  })).toString('base64');

  res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);

  return res.status(200).json({
    success: true,
    user: {
      email: email.toLowerCase(),
      role: email.toLowerCase() === 'mike@ndt.llc' ? 'admin' : 'member'
    }
  });
}
