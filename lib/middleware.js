import { verifyToken } from './auth';

export function withAuth(handler) {
  return async (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded;
    return handler(req, res);
  };
}

export function withRole(handler, requiredRole) {
  return async (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const roles = {
      'master-admin': 3,
      'officer': 2,
      'member': 1
    };

    const userRoleLevel = roles[decoded.role] || 0;
    const requiredRoleLevel = roles[requiredRole] || 0;

    if (userRoleLevel < requiredRoleLevel) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    req.user = decoded;
    return handler(req, res);
  };
}
