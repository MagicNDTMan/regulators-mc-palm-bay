// Shared Supabase client for all static members pages.
// Anon key is safe to expose client-side by design — Row Level Security
// on every table is what actually enforces who can read/write what.
const SUPABASE_URL = 'https://blhmdbeprfxpubudmxeg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaG1kYmVwcmZ4cHVidWRteGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNTI0ODEsImV4cCI6MjEwMDgyODQ4MX0.iYiAibYrMnwUtryEPrQZlN5LQwtMLvxzfNlxdqQa8Bo';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const OFFICER_ROLES = ['master-admin', 'president', 'vice-president', 'sergeant-at-arms', 'officer', 'secretary', 'treasurer', 'road-captain'];

function isOfficerTier(role) {
  return OFFICER_ROLES.includes(role);
}

function roleLabel(role) {
  const labels = {
    'master-admin': 'Master Admin',
    'president': 'President',
    'vice-president': 'Vice President',
    'sergeant-at-arms': 'Sergeant at Arms',
    'officer': 'Officer',
    'secretary': 'Secretary',
    'treasurer': 'Treasurer',
    'road-captain': 'Road Captain',
    'member': 'Member'
  };
  return labels[role] || role;
}

// Redirects to the public home page if not logged in. Calls back with
// { session, profile } once confirmed. Use at the top of every members-*.html page.
async function requireAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  const { data: profile, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    window.location.href = 'index.html';
    return null;
  }

  return { session, profile };
}

async function signOutAndRedirect() {
  await sb.auth.signOut();
  window.location.href = 'index.html';
}
