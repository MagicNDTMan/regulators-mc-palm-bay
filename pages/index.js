import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Regulators MC — Palm Bay, FL</title>
        <meta name="description" content="Regulators Motorcycle Club, Palm Bay Chapter — Palm Bay, Florida. My Brothers Keepers." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/centerpiece.jpg" />
      </Head>

      <header className={styles.header}>
        <div className={styles.navBar}>
          <Link href="/">
            <a className={styles.navBrand}>
              <img src="/assets/centerpiece.jpg" alt="Regulators MC logo" />
              <span>Regulators MC<small>Palm Bay, FL</small></span>
            </a>
          </Link>
          <nav>
            <ul>
              <li><Link href="/"><a className={styles.active}>Home</a></Link></li>
              <li><Link href="/events"><a>Events</a></Link></li>
              <li><Link href="/gallery"><a>Gallery</a></Link></li>
              <li><Link href="/contact"><a>Contact</a></Link></li>
              <li><Link href="/login"><a>Members</a></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles.hero}>
        <img className={styles.heroPatch} src="/assets/palm-bay-patch.webp" alt="Regulators MC Palm Bay, FL patch — My Brothers Keepers" />
        <h1>Regulators MC</h1>
        <div className={styles.chapter}>Palm Bay, FL</div>
        <div className={styles.motto}>My Brothers Keepers</div>
        <Link href="/events"><a className={styles.btn}>See What's Happening</a></Link>
        <a className={`${styles.btn} ${styles.btnOutline}`} href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener">Follow Us on Facebook</a>
      </div>

      <main>
        <section>
          <h2>Who We Are</h2>
          <div className={styles.infoSplit}>
            <div>
              <p className={styles.lead}>The Regulators Motorcycle Club, Palm Bay Chapter, rides Florida's Space Coast and beyond. We are a brotherhood built on respect, loyalty, and the open road.</p>
              <p style={{marginTop:'1rem'}}>Founded out of the Regulators MC Nation, our chapter brings that same spirit to Brevard County — backing our brother and sister chapters and living our motto every day: <em>My Brothers Keepers</em>.</p>
              <p style={{marginTop:'1rem'}}>Community is the heart of what we do: mentoring young people, keeping kids in school, and showing up for the neighborhoods we ride through — school supply drives, toy drives, and more.</p>
              <div className={styles.socialLinks}>
                <a className={`${styles.btn} ${styles.btnOutline}`} href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener">Regulators MC Nation</a>
              </div>
            </div>
            <img src="/assets/members-2025.jpg" alt="Regulators MC Palm Bay members" />
          </div>
        </section>

        <section>
          <h2>What's Happening</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.date}>Every Sunday</div>
              <h3>Sunday Bike Night</h3>
              <div className={styles.place}>Roy's Grill &amp; Lounge</div>
              <p>Good food, cold drinks, good vibes. $10 admission includes your choice of a beer or a house shot.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.date}>2nd &amp; 4th Wednesdays · 8 PM</div>
              <h3>Bike Night — Click Tight Rydaz MC</h3>
              <div className={styles.place}>D'Junction Island Bar, Orlando, FL</div>
              <p>Free entry, food and drinks, live DJ, free parking. Support your local clubs.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.date}>October · Daytona Beach</div>
              <h3>Biketoberfest</h3>
              <div className={styles.place}>Daytona Beach, FL</div>
              <p>The chapter rides up for Biketoberfest every fall. Check with the chapter for this year's plans.</p>
            </div>
          </div>
          <Link href="/events"><a className={styles.btn}>Full Events Page</a></Link>
        </section>

        <section>
          <h2>The Patch</h2>
          <p className={styles.lead}>Every piece of the Regulators patch tells you who we are: a rider laid low over the tank because riding is the heart of it all, a checkered flag because we ride to win, a blade because we carry a soldier's discipline, and open hands beneath it all because each of us is our brother's keeper. And it's all set in purple — the color of royalty.</p>
        </section>

        <section>
          <h2>Ride With Us</h2>
          <div className={styles.infoSplit}>
            <img src="/assets/chapter-ride.jpg" alt="Regulators MC bikes lined up" />
            <div>
              <p className={styles.lead}>Interested in the Regulators MC Palm Bay Chapter?</p>
              <p style={{marginTop:'1rem'}}>We don't recruit — becoming a Regulator starts with your own interest, and it starts in person. The basics: you ride your own motorcycle, you're licensed and insured, and you carry yourself with good character — in and out of a cut. If that's you, come out to a public event, meet the members, and get to know us.</p>
              <Link href="/contact"><a className={styles.btn}>Get In Touch</a></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.motto}>"My Brothers Keepers"</div>
        <div>Regulators MC — Palm Bay Chapter — Palm Bay, Florida</div>
        <div className={styles.socialLinks} style={{justifyContent:'center'}}>
          <a href="https://www.facebook.com/p/Regulators-MC-Palm-Bay-61567190639496/" target="_blank" rel="noopener">Palm Bay Facebook</a>
          <a href="https://www.facebook.com/regulators.mc.nation/" target="_blank" rel="noopener">Regulators MC Nation</a>
        </div>
        <div className={styles.fine}>© 2026 Regulators MC Palm Bay Chapter. All colors, patches, and logos are property of the Regulators MC.</div>
      </footer>
    </>
  );
}
