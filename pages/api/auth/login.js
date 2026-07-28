import { getUserByEmail, getUsers, saveUsers, initializeData } from '../../../lib/db';
import { verifyPassword, createToken, hashPassword } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    initializeData();

    // Check if first login (no users exist) - set up master admin
    const users = getUsers();
    if (users.length === 0) {
      // First user becomes master-admin
      const hashedPassword = await hashPassword(password);
      const newUser = {
        id: '1',
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'master-admin',
        name: 'Master Admin',
        createdAt: new Date().toISOString()
      };

      saveUsers([newUser]);
      const token = createToken(newUser.id, newUser.email, newUser.role);

      res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);
      return res.status(200).json({
        success: true,
        message: 'Master Admin account created',
        user: { id: newUser.id, email: newUser.email, role: newUser.role }
      });
    }

    // Regular login
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createToken(user.id, user.email, user.role);

    res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`);
    return res.status(200).json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role, name: user.name }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
