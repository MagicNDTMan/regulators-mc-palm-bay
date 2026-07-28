import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/AdminDash.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', { method: 'GET' });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);
        fetchMembers();
      } catch (err) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/members');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setMessage('Member created successfully');
      setFormData({ name: '', email: '', password: '', role: 'member' });
      setShowAddForm(false);
      fetchMembers();
    } catch (err) {
      setError('Error creating member');
    }
  };

  const handlePromote = async (userId, newRole) => {
    try {
      const res = await fetch('/api/admin/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setMessage(`User role updated to ${newRole}`);
      fetchMembers();
    } catch (err) {
      setError('Error updating role');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!user || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — Regulators MC Palm Bay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Logged in as: <strong>{user.email}</strong> ({user.role})</p>
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </header>

        <nav className={styles.nav}>
          <a href="/admin/dashboard" className={styles.active}>Members</a>
          <a href="/admin/content">Manage Content</a>
          {user.role === 'master-admin' && (
            <a href="/admin/officers">Manage Officers</a>
          )}
        </nav>

        <main className={styles.main}>
          {message && <div className={styles.success}>{message}</div>}
          {error && <div className={styles.error}>{error}</div>}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Members</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={styles.btn}
              >
                {showAddForm ? 'Cancel' : '+ Add Member'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddMember} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="member">Member</option>
                      {user.role === 'master-admin' && (
                        <option value="officer">Officer</option>
                      )}
                    </select>
                  </div>
                </div>

                <button type="submit" className={styles.submit}>Create Member</button>
              </form>
            )}

            <div className={styles.membersList}>
              {members.length === 0 ? (
                <p className={styles.empty}>No members yet</p>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      {user.role === 'master-admin' && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.role}</td>
                        <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                        {user.role === 'master-admin' && (
                          <td className={styles.actions}>
                            {member.role === 'member' ? (
                              <button
                                onClick={() => handlePromote(member.id, 'officer')}
                                className={styles.promote}
                              >
                                Make Officer
                              </button>
                            ) : member.role === 'officer' ? (
                              <>
                                <button
                                  onClick={() => handlePromote(member.id, 'master-admin')}
                                  className={styles.promote}
                                >
                                  Make Master Admin
                                </button>
                                <button
                                  onClick={() => handlePromote(member.id, 'member')}
                                  className={styles.demote}
                                >
                                  Demote
                                </button>
                              </>
                            ) : null}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
