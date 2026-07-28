import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/MemberContent.module.css';

export default function Directory() {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', { method: 'GET' });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        fetchContent();
      } catch (err) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content?contentType=directory');
      const data = await res.json();
      setContent(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Member Directory — Members Only</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <Link href="/members">
              <a className={styles.backLink}>← Back to Portal</a>
            </Link>
            <h1>Member Directory</h1>
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </header>

        <main className={styles.main}>
          {content.length === 0 ? (
            <div className={styles.empty}>
              <p>Member directory coming soon.</p>
            </div>
          ) : (
            <div className={styles.contentList}>
              {content.map((item) => (
                <div key={item.id} className={styles.item}>
                  <h3>{item.name}</h3>
                  {item.email && (
                    <p className={styles.email}>
                      Email: <a href={`mailto:${item.email}`}>{item.email}</a>
                    </p>
                  )}
                  {item.phone && (
                    <p className={styles.phone}>Phone: {item.phone}</p>
                  )}
                  {item.location && (
                    <p className={styles.location}>Location: {item.location}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
