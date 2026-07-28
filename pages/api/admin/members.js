import { getUsers, saveUsers, getUserByEmail } from '../../../lib/db';
import { withRole } from '../../../lib/middleware';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all members
    const users = getUsers();
    const members = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }));
    return res.status(200).json(members);
  }

  if (req.method === 'POST') {
    // Create new member
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }

    const validRoles = ['member', 'officer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const users = getUsers();
    if (getUserByEmail(email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return res.status(201).json({
      success: true,
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withRole(handler, 'officer');
