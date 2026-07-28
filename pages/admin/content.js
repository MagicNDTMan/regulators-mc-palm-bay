import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/AdminContent.module.css';

const CONTENT_TYPES = [
  { key: 'meetings', label: 'Chapter Meetings' },
  { key: 'officers', label: 'Chapter Officers' },
  { key: 'directory', label: 'Member Directory' },
  { key: 'privateEvents', label: 'Private Events' }
];

export default function ContentManager() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('meetings');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});
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
        fetchContent('meetings');
      } catch (err) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const fetchContent = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?contentType=${type}`);
      const data = await res.json();
      setContent(Array.isArray(data) ? data : []);
      setActiveTab(type);
    } catch (err) {
      setError('Error fetching content');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (type) => {
    setShowAddForm(false);
    setFormData({});
    fetchContent(type);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/content?contentType=${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setMessage('Item added successfully');
      setFormData({});
      setShowAddForm(false);
      fetchContent(activeTab);
    } catch (err) {
      setError('Error adding item');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure?')) return;

    try {
      const res = await fetch(`/api/admin/content?contentType=${activeTab}&itemId=${itemId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        setError('Error deleting item');
        return;
      }

      setMessage('Item deleted');
      fetchContent(activeTab);
    } catch (err) {
      setError('Error deleting item');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!user || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const getFormFields = () => {
    switch (activeTab) {
      case 'meetings':
        return (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input
                  type="text"
                  placeholder="e.g., First Saturday of each month"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Time</label>
                <input
                  type="text"
                  placeholder="e.g., 7:00 PM"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Description (optional)</label>
              <textarea
                rows="3"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );
      case 'officers':
        return (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Position</label>
                <input
                  type="text"
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </>
        );
      case 'directory':
        return (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
          </>
        );
      case 'privateEvents':
        return (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Time</label>
                <input
                  type="text"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Manage Content — Regulators MC Palm Bay Admin</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Manage Content</h1>
            <p>Members-only information</p>
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </header>

        <nav className={styles.tabs}>
          <a href="/admin/dashboard" className={styles.tabLink}>← Members</a>
          {CONTENT_TYPES.map(type => (
            <button
              key={type.key}
              onClick={() => handleTabChange(type.key)}
              className={`${styles.tab} ${activeTab === type.key ? styles.active : ''}`}
            >
              {type.label}
            </button>
          ))}
        </nav>

        <main className={styles.main}>
          {message && <div className={styles.success}>{message}</div>}
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.toolbar}>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={styles.btn}
            >
              {showAddForm ? 'Cancel' : '+ Add Item'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddItem} className={styles.form}>
              {getFormFields()}
              <button type="submit" className={styles.submit}>Add Item</button>
            </form>
          )}

          <div className={styles.contentList}>
            {content.length === 0 ? (
              <p className={styles.empty}>No items yet. Add one to get started.</p>
            ) : (
              content.map((item) => (
                <div key={item.id} className={styles.contentCard}>
                  <div className={styles.cardContent}>
                    <h3>{item.title || item.name}</h3>
                    <p>{item.description || item.position || item.location || ''}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
