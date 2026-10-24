import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Eden | Eden Empire Ventures",
  description: "Learn why Eden Empire Ventures is the right choice for your home security needs.",
};

export default function WhyEdenPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Why Eden</h1>
        <p>Security that feels like you. Thoughtful, simple, and always there when you need it.</p>
      </section>

      <section className="content-section">
        <div className="feature-grid">
          <div className="feature-card">
            <h2>Easy by Design</h2>
            <p>Up and running in minutes. No complicated setups, no confusing apps. Just security that works.</p>
          </div>
          <div className="feature-card">
            <h2>Your Home, Your Data</h2>
            <p>Privacy comes as standard. We only capture what matters, and your recordings belong to you.</p>
          </div>
          <div className="feature-card">
            <h2>Here When You Need Us</h2>
            <p>Real humans, real help. Good support is part of a good product, and we're right here if you need us.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>Our Approach</h2>
        <p>We believe security shouldn't feel like a burden. It should feel like peace of mind. That's why we design products that blend into your life, not complicate it.</p>
        <ul className="benefit-list">
          <li>No contracts, ever</li>
          <li>No hidden fees</li>
          <li>30-day money-back guarantee</li>
          <li>2-year warranty on all products</li>
          <li>Free shipping on orders over ₦115,000</li>
        </ul>
      </section>

      <section className="cta-section">
        <h2>Ready to Feel More Secure?</h2>
        <Link href="/shop" className="button button-dark">Shop All Products</Link>
      </section>
    </main>
  );
}
