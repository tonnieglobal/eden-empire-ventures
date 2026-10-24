import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Door Security | Eden Empire Ventures",
  description: "Video doorbells and smart keypads for secure home entry.",
};

export default function DoorSecurityPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Door Security</h1>
        <p>Know who's at the door and control access with smart door security solutions.</p>
      </section>

      <section className="content-section">
        <div className="product-list">
          <div className="product-item">
            <h2>Lookout Video Doorbell</h2>
            <p className="badge">Easy install</p>
            <p className="price">₦114,730</p>
            <p>Know who's at the door, even when you're not home. Clear head-to-toe video makes every arrival feel a little more familiar.</p>
            <ul className="product-features">
              <li>Head-to-toe 2K video with a 160° view</li>
              <li>Instant visitor & package alerts</li>
              <li>Two-way talk with noise cancellation</li>
              <li>Works wire-free or with existing wiring</li>
            </ul>
            <Link href="/" className="button button-dark">View Details</Link>
          </div>

          <div className="product-item">
            <h2>Halo Home Keypad</h2>
            <p className="price">₦76,230</p>
            <p>A more thoughtful way to come and go. Set a personal entry code for everyone who belongs.</p>
            <ul className="product-features">
              <li>Personal PIN codes for up to 20 people</li>
              <li>One-touch home, away & night modes</li>
              <li>Backlit, tactile buttons for easy entry</li>
              <li>Tamper alerts and a long-life battery</li>
            </ul>
            <Link href="/" className="button button-dark">View Details</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Link href="/shop" className="button button-dark">Back to Shop</Link>
      </section>
    </main>
  );
}
