import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop All | Eden Empire Ventures",
  description: "Browse our complete collection of home security products.",
};

export default function ShopPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Shop All</h1>
        <p>Find your feel-good setup. Little devices. A lot more peace of mind.</p>
      </section>

      <section className="content-section">
        <div className="category-grid">
          <Link href="/cameras" className="category-card">
            <h2>Cameras</h2>
            <p>Indoor and outdoor cameras with smart detection and crystal-clear video.</p>
            <span className="category-arrow">→</span>
          </Link>
          <Link href="/door-security" className="category-card">
            <h2>Door Security</h2>
            <p>Video doorbells and smart keypads for secure entry.</p>
            <span className="category-arrow">→</span>
          </Link>
          <Link href="/alarms-sensors" className="category-card">
            <h2>Alarms & Sensors</h2>
            <p>Contact sensors and motion detectors for complete protection.</p>
            <span className="category-arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="content-section">
        <h2>Featured Products</h2>
        <p>Our most popular security essentials, loved by thousands of customers.</p>
        <div className="featured-products">
          <div className="product-preview">
            <h3>Aura 360 Indoor Camera</h3>
            <p>2K clarity with 360° pan-and-tilt view</p>
            <span className="price">₦99,330</span>
          </div>
          <div className="product-preview">
            <h3>Lookout Video Doorbell</h3>
            <p>Head-to-toe 2K video with 160° view</p>
            <span className="price">₦114,730</span>
          </div>
          <div className="product-preview">
            <h3>Beacon Floodlight Cam</h3>
            <p>2K outdoor video with 2,000-lumen lights</p>
            <span className="price">₦191,730</span>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <p>Need help choosing the right setup?</p>
        <Link href="/" className="button button-dark">Browse Full Catalog</Link>
      </section>
    </main>
  );
}
