import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alarms & Sensors | Eden Empire Ventures",
  description: "Contact sensors and motion detectors for complete home protection.",
};

export default function AlarmsSensorsPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Alarms & Sensors</h1>
        <p>Get instant alerts when doors or windows open with our smart sensors.</p>
      </section>

      <section className="content-section">
        <div className="product-list">
          <div className="product-item">
            <h2>EntrySense Sensor Set</h2>
            <p className="price">₦60,830</p>
            <p>A simple hello when a door or window opens. EntrySense brings a little extra awareness to the places you care about most.</p>
            <ul className="product-features">
              <li>Get an instant open/close notification</li>
              <li>Slim, tool-free peel-and-stick install</li>
              <li>Up to 2 years of battery life</li>
              <li>Pair with Eden chime for audible alerts</li>
            </ul>
            <Link href="/" className="button button-dark">View Details</Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>Why Choose Our Sensors?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Easy Installation</h3>
            <p>No tools required. Just peel, stick, and you're protected.</p>
          </div>
          <div className="benefit-item">
            <h3>Long Battery Life</h3>
            <p>Up to 2 years of battery life means fewer worries.</p>
          </div>
          <div className="benefit-item">
            <h3>Instant Alerts</h3>
            <p>Get notified the moment something opens or moves.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Link href="/shop" className="button button-dark">Back to Shop</Link>
      </section>
    </main>
  );
}
