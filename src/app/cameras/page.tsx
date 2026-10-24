import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cameras | Eden Empire Ventures",
  description: "Indoor and outdoor security cameras with smart detection.",
};

export default function CamerasPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Cameras</h1>
        <p>See everything that matters with our smart indoor and outdoor cameras.</p>
      </section>

      <section className="content-section">
        <div className="product-list">
          <div className="product-item">
            <h2>Aura 360 Indoor Camera</h2>
            <p className="badge">Bestseller</p>
            <p className="price">₦99,330</p>
            <p>A wider view of what matters. Aura quietly watches every corner, then sends the right alert at the right time.</p>
            <ul className="product-features">
              <li>2K clarity with a 360° pan-and-tilt view</li>
              <li>Smart person, pet & sound detection</li>
              <li>Two-way audio and privacy mode</li>
              <li>Night vision up to 30 ft</li>
            </ul>
            <Link href="/" className="button button-dark">View Details</Link>
          </div>

          <div className="product-item">
            <h2>Beacon Floodlight Cam</h2>
            <p className="badge">New</p>
            <p className="price">₦191,730</p>
            <p>A bright idea for the dark corners. Beacon pairs a powerful motion light with crisp outdoor video.</p>
            <ul className="product-features">
              <li>2K outdoor video with 130° wide view</li>
              <li>2,000-lumen motion-activated lights</li>
              <li>Custom motion zones & instant alerts</li>
              <li>Weatherproof design with live two-way talk</li>
            </ul>
            <Link href="/" className="button button-dark">View Details</Link>
          </div>

          <div className="product-item">
            <h2>Haven Outdoor Camera</h2>
            <p className="price">₦145,530</p>
            <p>Meet the camera made for the great outdoors. Haven keeps watch through changing weather.</p>
            <ul className="product-features">
              <li>Sharp 2K video, day or night</li>
              <li>Intelligent person & vehicle detection</li>
              <li>Live view with two-way audio</li>
              <li>No-hassle magnetic mount and weatherproof body</li>
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
