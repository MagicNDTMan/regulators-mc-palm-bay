import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Regulators MC — Palm Bay, FL</title>
        <meta name="description" content="Regulators Motorcycle Club, Palm Bay Chapter — Palm Bay, Florida. My Brothers Keepers." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Barlow:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <div className="nav-bar">
          <a href="/" className="nav-brand">
            <img src="/assets/centerpiece.jpg" alt="Regulators MC logo" />
            <span>Regulators MC<small>Palm Bay, FL</small></span>
          </a>
          <nav>
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/login">Members</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="hero">
        <img className="hero-patch" src="/assets/palm-bay-patch.webp" alt="Regulators MC Palm Bay, FL patch — My Brothers Keepers" />
        <h1>Regulators MC</h1>
        <div className="chapter">Palm Bay, FL</div>
        <div className="motto">My Brothers Keepers</div>
        <a className="btn" href="/events">See What's Happening</a>
        <a className="btn btn-outline" href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener">Follow Us on Facebook</a>
      </div>

      <main>
        <section>
          <h2>Who We Are</h2>
          <div className="info-split">
            <div>
              <p className="lead">The Regulators Motorcycle Club, Palm Bay Chapter, rides Florida's Space Coast and beyond. We are a brotherhood built on respect, loyalty, and the open road.</p>
              <p style={{marginTop:'1rem'}}>Founded out of the Regulators MC Nation, our chapter brings that same spirit to Brevard County — backing our brother and sister chapters and living our motto every day: <em>My Brothers Keepers</em>.</p>
              <p style={{marginTop:'1rem'}}>Community is the heart of what we do: mentoring young people, keeping kids in school, and showing up for the neighborhoods we ride through — school supply drives, toy drives, and more.</p>
              <div className="social-links">
                <a className="btn btn-outline" href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener">Regulators MC Nation</a>
              </div>
            </div>
            <img src="/assets/members-2025.jpg" alt="Regulators MC Palm Bay members" />
          </div>
        </section>

        <section>
          <h2>What's Happening</h2>
          <div className="card-grid">
            <div className="card">
              <div className="date">Every Sunday</div>
              <h3>Sunday Bike Night</h3>
              <div className="place">Roy's Grill &amp; Lounge</div>
              <p>Good food, cold drinks, good vibes. $10 admission includes your choice of a beer or a house shot.</p>
            </div>
            <div className="card">
              <div className="date">2nd &amp; 4th Wednesdays · 8 PM</div>
              <h3>Bike Night — Click Tight Rydaz MC</h3>
              <div className="place">D'Junction Island Bar, Orlando, FL</div>
              <p>Free entry, food and drinks, live DJ, free parking. Support your local clubs.</p>
            </div>
            <div className="card">
              <div className="date">October · Daytona Beach</div>
              <h3>Biketoberfest</h3>
              <div className="place">Daytona Beach, FL</div>
              <p>The chapter rides up for Biketoberfest every fall. Check with the chapter for this year's plans.</p>
            </div>
          </div>
          <a className="btn" href="/events">Full Events Page</a>
        </section>

        <section>
          <h2>The Patch</h2>
          <p className="lead">Every piece of the Regulators patch tells you who we are: a rider laid low over the tank because riding is the heart of it all, a checkered flag because we ride to win, a blade because we carry a soldier's discipline, and open hands beneath it all because each of us is our brother's keeper. And it's all set in purple — the color of royalty.</p>
        </section>

        <section>
          <h2>Ride With Us</h2>
          <div className="info-split">
            <img src="/assets/chapter-ride.jpg" alt="Regulators MC bikes lined up" />
            <div>
              <p className="lead">Interested in the Regulators MC Palm Bay Chapter?</p>
              <p style={{marginTop:'1rem'}}>We don't recruit — becoming a Regulator starts with your own interest, and it starts in person. The basics: you ride your own motorcycle, you're licensed and insured, and you carry yourself with good character — in and out of a cut. If that's you, come out to a public event, meet the members, and get to know us.</p>
              <a className="btn" href="/contact">Get In Touch</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="motto">"My Brothers Keepers"</div>
        <div>Regulators MC — Palm Bay Chapter — Palm Bay, Florida</div>
        <div className="social-links" style={{justifyContent:'center'}}>
          <a href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener">Palm Bay Facebook</a>
          <a href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener">Regulators MC Nation</a>
        </div>
        <div className="fine">© 2026 Regulators MC Palm Bay Chapter. All colors, patches, and logos are property of the Regulators MC.</div>
      </footer>
    </>
  );
}
