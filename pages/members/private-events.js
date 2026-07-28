import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/MemberContent.module.css';

export default function PrivateEvents() {
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
      const res = await fetch('/api/admin/content?contentType=privateEvents');
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
        <title>Private Events — Members Only</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <Link href="/members">
              <a className={styles.backLink}>← Back to Portal</a>
            </Link>
            <h1>Private Events</h1>
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </header>

        <main className={styles.main}>
          {content.length === 0 ? (
            <div className={styles.empty}>
              <p>No private events scheduled.</p>
            </div>
          ) : (
            <div className={styles.contentList}>
              {content.map((item) => (
                <div key={item.id} className={styles.item}>
                  <h3>{item.title}</h3>
                  <p className={styles.date}>{item.date}</p>
                  <p className={styles.time}>{item.time}</p>
                  <p className={styles.location}>{item.location}</p>
                  {item.description && (
                    <p className={styles.description}>{item.description}</p>
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
