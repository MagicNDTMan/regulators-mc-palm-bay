import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://blhmdbeprfxpubudmxeg.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Verifies the caller's access token and returns their profile if they're
// officer-tier. Returns null otherwise — callers should respond 401/403.
export async function requireOfficerCaller(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return null;

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  const officerRoles = ['master-admin', 'president', 'vice-president', 'sergeant-at-arms', 'officer', 'secretary', 'treasurer', 'road-captain'];
  if (!officerRoles.includes(profile.role)) return null;

  return profile;
}
