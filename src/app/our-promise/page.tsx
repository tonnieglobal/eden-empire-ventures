import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Promise | Eden Empire Ventures",
  description: "Our commitment to quality, support, and your peace of mind.",
};

export default function OurPromisePage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Our Promise</h1>
        <p>Little things. Big peace of mind. No fine print, just good products that work.</p>
      </section>

      <section className="content-section">
        <div className="promise-grid">
          <div className="promise-card">
            <h2>The 2-Year Promise</h2>
            <p>If anything goes wrong, we'll make it right. No awkward forms. No runaround. Just reach out and we'll take care of it.</p>
          </div>
          <div className="promise-card">
            <h2>30 Days to Feel It Out</h2>
            <p>Try it at home. If it's not for you, send it back for a full refund. No questions asked, no restocking fees.</p>
          </div>
          <div className="promise-card">
            <h2>Made for the Long Run</h2>
            <p>Durable, considered products made for real homes and many tomorrows. We don't do planned obsolescence.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>What We Stand For</h2>
        <div className="values-list">
          <div className="value-item">
            <h3>Privacy First</h3>
            <p>Your data is yours. We never sell it, and we protect it like it's our own.</p>
          </div>
          <div className="value-item">
            <h3>Quality Always</h3>
            <p>We test everything thoroughly. If it's not good enough for our homes, it's not good enough for yours.</p>
          </div>
          <div className="value-item">
            <h3>Support That Cares</h3>
            <p>Real people who actually want to help. No bots, no scripts, just humans solving problems.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Experience Our Promise</h2>
        <Link href="/shop" className="button button-dark">Shop with Confidence</Link>
      </section>
    </main>
  );
}
