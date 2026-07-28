import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Regulators MC — Palm Bay, FL</title>
        <meta name="description" content="Regulators Motorcycle Club, Palm Bay Chapter — Palm Bay, Florida. My Brothers Keepers." />
        <style>{`
          body { background: #0d0b10; color: #c9c9d1; font-family: "Barlow", sans-serif; margin: 0; }
          header { background: #2a1145; border-bottom: 3px solid #7b2fbf; padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
          .nav-bar { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
          nav ul { display: flex; list-style: none; gap: 2rem; }
          nav a { color: #c9c9d1; text-decoration: none; font-weight: 600; }
          .hero { background: linear-gradient(135deg, #2a1145, #4b1f7a); color: white; padding: 4rem 2rem; text-align: center; }
          .hero h1 { font-size: 3rem; margin: 1rem 0; }
          main { max-width: 1100px; margin: 0 auto; padding: 2rem; }
          section { margin-bottom: 3rem; }
          h2 { color: #c9c9d1; border-left: 5px solid #d42b1e; padding-left: 1rem; margin-top: 2rem; }
          .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
          .card { background: #17131d; border-top: 4px solid #7b2fbf; padding: 1.5rem; border-radius: 8px; }
          .card h3 { color: #c9c9d1; }
          .date { color: #b98ae8; font-weight: 600; }
          .info-split { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
          .info-split img { border-radius: 8px; max-width: 100%; }
          .btn { background: #7b2fbf; color: white; padding: 0.7rem 1.6rem; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 1rem; }
          .btn:hover { background: #4b1f7a; }
          footer { background: #2a1145; border-top: 3px solid #7b2fbf; padding: 2rem; text-align: center; }
          @media (max-width: 760px) { .info-split { grid-template-columns: 1fr; } }
        `}</style>
      </Head>

      <header>
        <div className="nav-bar">
          <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c9c9d1', textDecoration: 'none' }}>Regulators MC</a>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/login">Members</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="hero">
        <img src="/assets/palm-bay-patch.webp" alt="Palm Bay Patch" style={{ width: '200px', height: '200px', marginBottom: '1rem' }} />
        <h1>Regulators MC</h1>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Palm Bay, FL</div>
        <div style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem' }}>My Brothers Keepers</div>
        <a className="btn" href="/events">See What's Happening</a>
        <a className="btn" href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener" style={{ background: 'transparent', border: '2px solid white', marginLeft: '1rem' }}>Follow Us</a>
      </div>

      <main>
        <section>
          <h2>Who We Are</h2>
          <div className="info-split">
            <div>
              <p><strong>The Regulators Motorcycle Club, Palm Bay Chapter, rides Florida's Space Coast and beyond.</strong> We are a brotherhood built on respect, loyalty, and the open road.</p>
              <p style={{ marginTop: '1rem' }}>Founded out of the Regulators MC Nation, our chapter brings that same spirit to Brevard County — backing our brother and sister chapters and living our motto: <em>My Brothers Keepers</em>.</p>
              <p style={{ marginTop: '1rem' }}>Community is the heart of what we do: mentoring young people, keeping kids in school, and showing up for the neighborhoods we ride through.</p>
            </div>
            <img src="/assets/members-2025.jpg" alt="Chapter members" />
          </div>
        </section>

        <section>
          <h2>What's Happening</h2>
          <div className="card-grid">
            <div className="card">
              <div className="date">Every Sunday</div>
              <h3>Sunday Bike Night</h3>
              <div>Roy's Grill &amp; Lounge</div>
              <p>Good food, cold drinks, good vibes. $10 admission.</p>
            </div>
            <div className="card">
              <div className="date">2nd &amp; 4th Wednesdays · 8 PM</div>
              <h3>Click Tight Rydaz MC</h3>
              <div>D'Junction Island Bar, Orlando</div>
              <p>Free entry, food and drinks, live DJ, free parking.</p>
            </div>
            <div className="card">
              <div className="date">October</div>
              <h3>Biketoberfest</h3>
              <div>Daytona Beach, FL</div>
              <p>The chapter rides for Biketoberfest every fall.</p>
            </div>
          </div>
          <a className="btn" href="/events">Full Events Page</a>
        </section>

        <section>
          <h2>The Patch</h2>
          <p><strong>Every piece of the Regulators patch tells you who we are:</strong> a rider laid low over the tank because riding is the heart of it all, a checkered flag because we ride to win, a blade because we carry a soldier's discipline, and open hands beneath it all because each of us is our brother's keeper. And it's all set in purple — the color of royalty.</p>
        </section>

        <section>
          <h2>Ride With Us</h2>
          <div className="info-split">
            <img src="/assets/chapter-ride.jpg" alt="Chapter bikes" />
            <div>
              <p><strong>Interested in the Regulators MC Palm Bay Chapter?</strong></p>
              <p>We don't recruit — becoming a Regulator starts with your own interest. The basics: you ride your own motorcycle, you're licensed and insured, and you carry yourself with good character.</p>
              <a className="btn" href="/contact">Get In Touch</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic' }}>My Brothers Keepers</div>
        <div>Regulators MC — Palm Bay Chapter — Palm Bay, Florida</div>
        <div style={{ marginTop: '1rem' }}>
          <a href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener" style={{ color: '#c9c9d1', marginRight: '2rem' }}>Facebook</a>
          <a href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener" style={{ color: '#c9c9d1' }}>Nation</a>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: '0.7' }}>© 2026 Regulators MC Palm Bay Chapter</div>
      </footer>
    </>
  );
}
