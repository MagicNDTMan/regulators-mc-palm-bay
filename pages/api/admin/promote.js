import { getUsers, saveUsers, getUserById } from '../../../lib/db';
import { withRole } from '../../../lib/middleware';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, newRole } = req.body;

  if (!userId || !newRole) {
    return res.status(400).json({ error: 'userId and newRole required' });
  }

  const validRoles = ['member', 'officer', 'master-admin'];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const users = getUsers();
  const targetUser = users.find(u => u.id === userId);

  if (!targetUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Only master admin can promote to master admin
  if (newRole === 'master-admin' && req.user.role !== 'master-admin') {
    return res.status(403).json({ error: 'Only master admin can promote to master admin' });
  }

  targetUser.role = newRole;
  saveUsers(users);

  return res.status(200).json({
    success: true,
    user: { id: targetUser.id, email: targetUser.email, name: targetUser.name, role: targetUser.role }
  });
}

export default withRole(handler, 'master-admin');
