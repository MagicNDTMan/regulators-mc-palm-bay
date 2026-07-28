import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/MemberPortal.module.css';

export default function MembersPortal() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Members Portal — Regulators MC Palm Bay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Members Portal</h1>
            <p>Welcome, {user.email}</p>
          </div>
          <div className={styles.headerActions}>
            {(user.role === 'master-admin' || user.role === 'officer') && (
              <Link href="/admin/dashboard">
                <a className={styles.adminLink}>Admin</a>
              </Link>
            )}
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2>Members Only Information</h2>
            <div className={styles.grid}>
              <Link href="/members/meetings">
                <a className={styles.card}>
                  <h3>Chapter Meetings</h3>
                  <p>Meeting dates, times, and locations</p>
                </a>
              </Link>

              <Link href="/members/officers">
                <a className={styles.card}>
                  <h3>Chapter Officers</h3>
                  <p>Chapter leadership contact info</p>
                </a>
              </Link>

              <Link href="/members/directory">
                <a className={styles.card}>
                  <h3>Member Directory</h3>
                  <p>Chapter member contact information</p>
                </a>
              </Link>

              <Link href="/members/private-events">
                <a className={styles.card}>
                  <h3>Private Events</h3>
                  <p>Members-only rides and events</p>
                </a>
              </Link>
            </div>
          </section>

          <footer className={styles.footer}>
            <a href="/" className={styles.homeLink}>← Back to Public Site</a>
          </footer>
        </main>
      </div>
    </>
  );
}
