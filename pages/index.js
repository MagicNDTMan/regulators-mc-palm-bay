export default function Home() {
  return (
    <div style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '20px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <a href="/" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold'}}>
            <img src="/assets/centerpiece.jpg" alt="Logo" style={{width: '50px', height: '50px'}} />
            <span>Regulators MC<br/><small style={{fontSize: '11px', color: '#666'}}>Palm Bay, FL</small></span>
          </a>
          <nav>
            <ul style={{display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0}}>
              <li><a href="/" style={{color: '#7b2fbf', fontWeight: '600', textDecoration: 'none'}}>Home</a></li>
              <li><a href="/events" style={{color: '#666', fontWeight: '600', textDecoration: 'none'}}>Events</a></li>
              <li><a href="/gallery" style={{color: '#666', fontWeight: '600', textDecoration: 'none'}}>Gallery</a></li>
              <li><a href="/contact" style={{color: '#666', fontWeight: '600', textDecoration: 'none'}}>Contact</a></li>
              <li><a href="/login" style={{color: '#666', fontWeight: '600', textDecoration: 'none'}}>Members</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div style={{background: 'linear-gradient(135deg, #2a1145 0%, #4b1f7a 100%)', color: 'white', padding: '80px 20px', textAlign: 'center'}}>
        <img src="/assets/palm-bay-patch.webp" alt="Patch" style={{width: '200px', height: '200px', marginBottom: '20px'}} />
        <h1 style={{margin: '10px 0', fontSize: '56px'}}>Regulators MC</h1>
        <div style={{fontSize: '24px', fontWeight: '600', marginBottom: '5px'}}>Palm Bay, FL</div>
        <div style={{fontSize: '18px', marginBottom: '30px', fontStyle: 'italic'}}>My Brothers Keepers</div>
        <a href="/events" style={{display: 'inline-block', padding: '12px 24px', background: '#7b2fbf', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '600', margin: '0 10px'}}>See What's Happening</a>
        <a href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener" style={{display: 'inline-block', padding: '12px 24px', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '4px', textDecoration: 'none', fontWeight: '600', margin: '0 10px'}}>Follow Us on Facebook</a>
      </div>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
        <section style={{marginBottom: '60px'}}>
          <h2 style={{fontSize: '36px', color: '#7b2fbf', marginBottom: '30px'}}>Who We Are</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'}}>
            <div>
              <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '1.6', marginBottom: '1rem'}}>The Regulators Motorcycle Club, Palm Bay Chapter, rides Florida's Space Coast and beyond. We are a brotherhood built on respect, loyalty, and the open road.</p>
              <p style={{marginTop:'1rem'}}>Founded out of the Regulators MC Nation, our chapter brings that same spirit to Brevard County — backing our brother and sister chapters and living our motto every day: <em>My Brothers Keepers</em>.</p>
              <p style={{marginTop:'1rem'}}>Community is the heart of what we do: mentoring young people, keeping kids in school, and showing up for the neighborhoods we ride through — school supply drives, toy drives, and more.</p>
            </div>
            <img src="/assets/members-2025.jpg" alt="Members" style={{width: '100%', borderRadius: '8px'}} />
          </div>
        </section>

        <section style={{marginBottom: '60px'}}>
          <h2 style={{fontSize: '36px', color: '#7b2fbf', marginBottom: '30px'}}>What's Happening</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px'}}>
            <div style={{background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '12px', fontWeight: '700', color: '#d42b1e', textTransform: 'uppercase', marginBottom: '8px'}}>Every Sunday</div>
              <h3 style={{fontSize: '18px', color: '#7b2fbf', marginBottom: '8px'}}>Sunday Bike Night</h3>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '12px'}}>Roy's Grill &amp; Lounge</div>
              <p>Good food, cold drinks, good vibes. $10 admission.</p>
            </div>
            <div style={{background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '12px', fontWeight: '700', color: '#d42b1e', textTransform: 'uppercase', marginBottom: '8px'}}>2nd &amp; 4th Wed · 8 PM</div>
              <h3 style={{fontSize: '18px', color: '#7b2fbf', marginBottom: '8px'}}>Click Tight Rydaz MC</h3>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '12px'}}>D'Junction Island Bar, Orlando</div>
              <p>Free entry, food and drinks, live DJ, free parking.</p>
            </div>
            <div style={{background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '12px', fontWeight: '700', color: '#d42b1e', textTransform: 'uppercase', marginBottom: '8px'}}>October</div>
              <h3 style={{fontSize: '18px', color: '#7b2fbf', marginBottom: '8px'}}>Biketoberfest</h3>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '12px'}}>Daytona Beach, FL</div>
              <p>The chapter rides for Biketoberfest every fall.</p>
            </div>
          </div>
          <a href="/events" style={{display: 'inline-block', padding: '12px 24px', background: '#7b2fbf', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '600'}}>Full Events Page</a>
        </section>

        <section style={{marginBottom: '60px'}}>
          <h2 style={{fontSize: '36px', color: '#7b2fbf', marginBottom: '30px'}}>The Patch</h2>
          <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '1.6'}}>Every piece of the Regulators patch tells you who we are: a rider laid low over the tank because riding is the heart of it all, a checkered flag because we ride to win, a blade because we carry a soldier's discipline, and open hands beneath it all because each of us is our brother's keeper. Purple — the color of royalty.</p>
        </section>

        <section>
          <h2 style={{fontSize: '36px', color: '#7b2fbf', marginBottom: '30px'}}>Ride With Us</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'}}>
            <img src="/assets/chapter-ride.jpg" alt="Bikes" style={{width: '100%', borderRadius: '8px'}} />
            <div>
              <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '1.6', marginBottom: '1rem'}}>Interested in the Regulators MC Palm Bay Chapter?</p>
              <p style={{marginTop:'1rem'}}>We don't recruit — becoming a Regulator starts with your own interest. The basics: you ride your own motorcycle, you're licensed and insured, and you carry yourself with good character — in and out of a cut.</p>
              <a href="/contact" style={{display: 'inline-block', padding: '12px 24px', background: '#7b2fbf', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '600', marginTop: '20px'}}>Get In Touch</a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{background: '#2a1145', color: 'white', padding: '40px 20px', textAlign: 'center'}}>
        <div style={{fontSize: '18px', marginBottom: '10px'}}>My Brothers Keepers</div>
        <div>Regulators MC — Palm Bay Chapter — Palm Bay, Florida</div>
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0'}}>
          <a href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener" style={{color: 'white', textDecoration: 'none'}}>Palm Bay Facebook</a>
          <a href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener" style={{color: 'white', textDecoration: 'none'}}>Regulators MC Nation</a>
        </div>
        <div style={{fontSize: '12px', opacity: '0.8'}}>© 2026 Regulators MC Palm Bay Chapter. All rights reserved.</div>
      </footer>
    </div>
  );
}
