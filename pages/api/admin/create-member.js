import { supabaseAdmin, requireOfficerCaller } from '../../../lib/supabase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const caller = await requireOfficerCaller(req);
  if (!caller) {
    return res.status(403).json({ error: 'Officer access required' });
  }

  const { email, name, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email.toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { name: name || '' }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ success: true, userId: data.user.id });
}
