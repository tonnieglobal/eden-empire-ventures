"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Category = "All gear" | "Cameras" | "Door security" | "Alarms & sensors";
type Product = {
  id: string;
  name: string;
  shortName: string;
  category: Exclude<Category, "All gear">;
  price: number;
  rating: string;
  reviews: number;
  badge?: string;
  description: string;
  image?: string;
  art?: "sensor" | "keypad";
  features: string[];
  box: string[];
  specs: [string, string][];
};
type CartItem = { id: string; quantity: number };

const products: Product[] = [
  {
    id: "aura-360",
    name: "Aura 360 Indoor Camera",
    shortName: "Aura 360",
    category: "Cameras",
    price: 99330,
    rating: "4.9",
    reviews: 218,
    badge: "Bestseller",
    description: "A wider view of what matters. Aura quietly watches every corner, then sends the right alert at the right time.",
    image: "/images/product-indoor-camera.svg",
    features: ["2K clarity with a 360° pan-and-tilt view", "Smart person, pet & sound detection", "Two-way audio and privacy mode", "Night vision up to 30 ft"],
    box: ["Aura 360 indoor camera", "USB-C power cable & adapter", "Wall mounting kit", "Quick-start guide"],
    specs: [["Resolution", "2K QHD"], ["Field of view", "360° horizontal"], ["Connectivity", "2.4 GHz Wi-Fi"], ["Storage", "MicroSD or secure cloud"], ["Power", "USB-C, 5V / 2A"]],
  },
  {
    id: "lookout-doorbell",
    name: "Lookout Video Doorbell",
    shortName: "Lookout Doorbell",
    category: "Door security",
    price: 114730,
    rating: "4.8",
    reviews: 164,
    badge: "Easy install",
    description: "Know who’s at the door, even when you’re not home. Clear head-to-toe video makes every arrival feel a little more familiar.",
    image: "/images/product-video-doorbell.svg",
    features: ["Head-to-toe 2K video with a 160° view", "Instant visitor & package alerts", "Two-way talk with noise cancellation", "Works wire-free or with existing wiring"],
    box: ["Lookout video doorbell", "Rechargeable battery pack", "Angled mounting plate & screws", "USB-C charging cable", "Doorbell chime"],
    specs: [["Resolution", "2K HDR"], ["Field of view", "160° vertical"], ["Battery", "Rechargeable, up to 6 months"], ["Connectivity", "2.4 GHz Wi-Fi"], ["Weather rating", "IP65"]],
  },
  {
    id: "beacon-floodlight",
    name: "Beacon Floodlight Cam",
    shortName: "Beacon Floodlight",
    category: "Cameras",
    price: 191730,
    rating: "4.9",
    reviews: 96,
    badge: "New",
    description: "A bright idea for the dark corners. Beacon pairs a powerful motion light with crisp outdoor video and a voice you can hear from anywhere.",
    image: "/images/product-floodlight-camera.svg",
    features: ["2K outdoor video with 130° wide view", "2,000-lumen motion-activated lights", "Custom motion zones & instant alerts", "Weatherproof design with live two-way talk"],
    box: ["Beacon floodlight camera", "Adjustable mounting bracket", "Installation hardware", "Weatherproof cable covers", "Setup guide"],
    specs: [["Resolution", "2K QHD"], ["Brightness", "2,000 lumens"], ["Field of view", "130° diagonal"], ["Weather rating", "IP66"], ["Power", "Hardwired, 100–240V"]],
  },
  {
    id: "entry-sensor-kit",
    name: "EntrySense Sensor Set",
    shortName: "EntrySense Set",
    category: "Alarms & sensors",
    price: 60830,
    rating: "4.7",
    reviews: 83,
    description: "A simple hello when a door or window opens. EntrySense brings a little extra awareness to the places you care about most.",
    art: "sensor",
    features: ["Get an instant open/close notification", "Slim, tool-free peel-and-stick install", "Up to 2 years of battery life", "Pair with Eden chime for audible alerts"],
    box: ["2 × EntrySense contact sensors", "2 × pre-installed batteries", "Adhesive mounting strips", "Quick-start guide"],
    specs: [["In the set", "2 contact sensors"], ["Battery life", "Up to 2 years"], ["Connectivity", "Eden SecureLink"], ["Installation", "Tool-free adhesive"], ["Dimensions", "1.9 × 0.7 × 0.5 in"]],
  },
  {
    id: "halo-keypad",
    name: "Halo Home Keypad",
    shortName: "Halo Keypad",
    category: "Door security",
    price: 76230,
    rating: "4.8",
    reviews: 71,
    description: "A more thoughtful way to come and go. Set a personal entry code for everyone who belongs, and change it whenever you need to.",
    art: "keypad",
    features: ["Personal PIN codes for up to 20 people", "One-touch home, away & night modes", "Backlit, tactile buttons for easy entry", "Tamper alerts and a long-life battery"],
    box: ["Halo keypad", "2 × AA batteries", "Mounting plate & hardware", "Quick-start guide"],
    specs: [["Access codes", "Up to 20 unique PINs"], ["Modes", "Home, away & night"], ["Connectivity", "Eden SecureLink"], ["Battery life", "Up to 18 months"], ["Installation", "Wall mount or tabletop"]],
  },
  {
    id: "haven-outdoor",
    name: "Haven Outdoor Camera",
    shortName: "Haven Outdoor",
    category: "Cameras",
    price: 145530,
    rating: "4.8",
    reviews: 142,
    description: "Meet the camera made for the great outdoors. Haven keeps watch through changing weather, from the front walk to the back gate.",
    image: "/images/hero-security-camera.svg",
    features: ["Sharp 2K video, day or night", "Intelligent person & vehicle detection", "Live view with two-way audio", "No-hassle magnetic mount and weatherproof body"],
    box: ["Haven outdoor camera", "Magnetic wall mount & screws", "USB-C power cable", "Indoor power adapter", "Setup guide"],
    specs: [["Resolution", "2K QHD"], ["Field of view", "130° diagonal"], ["Night vision", "Color spotlight + IR"], ["Weather rating", "IP65"], ["Power", "USB-C, 5V / 2A"]],
  },
];

const categories: Category[] = ["All gear", "Cameras", "Door security", "Alarms & sensors"];
const storageKey = "eden-store-bag-v1";
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567").replace(/\D/g, "");
const money = (value: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);

function Icon({ name, size = 20 }: { name: "bag" | "search" | "arrow" | "close" | "plus" | "minus" | "heart" | "check" | "whatsapp" | "shield" | "star" | "menu"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, ReactNode> = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.3 4.3" /></>,
    arrow: <><path d="M4.5 12h15" /><path d="m13 5.5 6.5 6.5-6.5 6.5" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    heart: <path d="M20.8 8.9c0 4.1-8.8 10.1-8.8 10.1S3.2 13 3.2 8.9a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />,
    check: <path d="m5 12.5 4.3 4.3L19.5 6.7" />,
    whatsapp: <><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" /><path d="M8.4 8.3c.2-.5.5-.5.8-.5h.5l.7 1.7c.1.2 0 .4-.2.6l-.5.6c.7 1.3 1.6 2.1 2.9 2.8l.6-.7c.2-.2.4-.3.7-.2l1.6.8c.2.1.3.2.3.5 0 .7-.5 1.3-1 1.5-.5.2-1.1.4-3.2-.5-2.5-1-4.1-3.6-4.2-3.8-.1-.2-1-1.4-1-2.6s.6-1.8 1-2.1Z" /></>,
    shield: <><path d="M12 3 20 6v5c0 5.1-3.3 8.4-8 10-4.7-1.6-8-4.9-8-10V6l8-3Z" /><path d="m8.7 12 2.1 2.1 4.6-4.7" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function ProductArt({ kind }: { kind: "sensor" | "keypad" }) {
  if (kind === "sensor") {
    return (
      <svg className="product-art-svg sensor-art" viewBox="0 0 440 340" role="img" aria-label="Two slim white door and window sensors">
        <ellipse cx="214" cy="282" rx="150" ry="17" fill="#b9b5a9" opacity=".18" />
        <g transform="rotate(-7 168 169)">
          <rect x="104" y="65" width="112" height="206" rx="31" fill="#fff" stroke="#e4e1d8" strokeWidth="3" />
          <rect x="132" y="92" width="57" height="151" rx="23" fill="#f2f0e8" />
          <circle cx="160" cy="169" r="7" fill="#c1ed5b" />
          <path d="M132 116h57" stroke="#e1ded5" strokeWidth="2" />
        </g>
        <g transform="rotate(7 267 167)">
          <rect x="251" y="91" width="73" height="177" rx="25" fill="#d9d6cc" stroke="#cecabf" strokeWidth="3" />
          <rect x="269" y="111" width="36" height="136" rx="17" fill="#ebe9e0" />
          <path d="M278 130h18" stroke="#d2cfc6" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    );
  }
  return (
    <svg className="product-art-svg keypad-art" viewBox="0 0 440 340" role="img" aria-label="Modern dark home security keypad">
      <ellipse cx="220" cy="285" rx="118" ry="17" fill="#9d9b94" opacity=".19" />
      <rect x="145" y="40" width="150" height="238" rx="30" fill="#252824" />
      <rect x="153" y="48" width="134" height="222" rx="24" fill="#333732" />
      <rect x="177" y="70" width="86" height="32" rx="9" fill="#c5ec67" />
      <circle cx="190" cy="86" r="3" fill="#333732" /><circle cx="205" cy="86" r="3" fill="#333732" /><circle cx="220" cy="86" r="3" fill="#333732" /><circle cx="235" cy="86" r="3" fill="#333732" /><circle cx="250" cy="86" r="3" fill="#333732" />
      {[[184,132],[220,132],[256,132],[184,168],[220,168],[256,168],[184,204],[220,204],[256,204]].map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r="12" fill="#454a44" /><circle cx={x} cy={y} r="3" fill="#dedfd8" opacity=".82" /></g>)}
      <path d="M190 240h60" stroke="#9ba096" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ProductPicture({ product, priority = false }: { product: Product; priority?: boolean }) {
  const isSvg = product.image?.endsWith('.svg');
  return (
    <div className={`product-picture ${product.art ? `art-${product.art}` : ""}`}>
      {product.image ? (
        isSvg ? (
          <img src={product.image} alt={product.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 680px) 90vw, (max-width: 1050px) 44vw, 30vw" priority={priority} className="product-image" />
        )
      ) : product.art ? <ProductArt kind={product.art} /> : null}
      <span className="image-mark" aria-hidden="true">V.</span>
    </div>
  );
}

function productWhatsAppUrl(product: Product) {
  const details = [
    `Hello Eden! I'm interested in the ${product.name}.`,
    `Price: ${money(product.price)} · Product code: ${product.id.toUpperCase()}`,
    "",
    "Key functions:",
    ...product.features.map((feature) => `• ${feature}`),
    "",
    `What's included: ${product.box.join(", ")}.`,
    "",
    "Could you please confirm availability and delivery options?",
  ].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`;
}

function orderWhatsAppUrl(items: { product: Product; quantity: number }[], total: number) {
  const lines = items.map(({ product, quantity }) => `• ${product.name} × ${quantity} — ${money(product.price * quantity)}`);
  const text = ["Hello Eden! I'd like to place an order:", "", ...lines, "", `Order total: ${money(total)}`, "", "Please confirm availability and delivery options."].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function HomePage() {
  const [category, setCategory] = useState<Category>("All gear");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [cartReady, setCartReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setCart(JSON.parse(saved) as CartItem[]);
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // The bag still works for this visit when browser storage is unavailable.
    }
  }, [cart, cartReady]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!selectedProduct && !cartOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedProduct, cartOpen]);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = category === "All gear" || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.description} ${product.category} ${product.features.join(" ")}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    if (sortOrder === "price-low") return [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, searchQuery, sortOrder]);

  const cartDetails = cart.map((item) => ({ product: products.find((product) => product.id === item.id)!, quantity: item.quantity })).filter((item) => item.product);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartDetails.reduce((total, item) => total + item.product.price * item.quantity, 0);

  function addToBag(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { id: product.id, quantity: 1 }];
    });
    setToast(`${product.shortName} added to your bag`);
  }

  function changeQuantity(productId: string, amount: number) {
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  function toggleFavorite(productId: string) {
    setFavorites((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }

  function startWhatsApp(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> A little peace of mind, on us. <span>Complimentary shipping on orders over ₦115,000</span></div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Eden home">
          <img src="/images/logo.png" alt="Eden" className="wordmark-image" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-active" href="/">Shop all</a>
          <a href="/why-eden">Why Eden</a>
          <a href="/our-promise">Our promise</a>
        </nav>
        <div className="header-actions">
          <label className="header-search" aria-label="Search products">
            <Icon name="search" size={18} />
            <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Search gear" />
            <kbd>⌘ K</kbd>
          </label>
          <button className="mobile-search-button icon-button" aria-label="Search" onClick={() => { setMobileSearchOpen((open) => !open); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}><Icon name="search" /></button>
          <button className="bag-button" aria-label={`Open shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}><Icon name="bag" size={19} /><span>Bag</span><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>

      {mobileSearchOpen && <div className="mobile-search"><Icon name="search" size={19} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="What are you looking for?" aria-label="Search products" /><button className="icon-button" onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} aria-label="Close search"><Icon name="close" size={18} /></button></div>}

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> FEEL GOOD ABOUT HOME</div>
          <h1>Protection,<br />on your <em>terms.</em></h1>
          <p className="hero-description">Thoughtful security that fits right into your life. Get the good kind of peace of mind, without the complicated bits.</p>
          <div className="hero-actions"><a className="button button-dark" href="#shop">Find your setup <Icon name="arrow" size={18} /></a><a className="text-link" href="#why-eden">Meet Eden <span>↘</span></a></div>
          <div className="hero-reassurance"><span className="reassurance-icon"><Icon name="check" size={14} /></span> No contracts. No nonsense. Just home.</div>
        </div>
        <div className="hero-visual">
          <img src="/images/hero-security-camera.svg" alt="A Eden outdoor camera looking after a calm, modern home" className="hero-image" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 51%' }} />
          <div className="hero-image-wash" />
          <div className="hero-note"><span className="hero-note-icon"><Icon name="shield" size={17} /></span><span><strong>Home, in good hands.</strong><small>Security that feels like you.</small></span></div>
          <div className="hero-image-caption"><span className="caption-dot" /> YOUR HOME. YOUR CALL.</div>
          <div className="hero-sticker"><span>MADE FOR</span><strong>real life</strong><span>AND EVERYTHING IN IT</span></div>
        </div>
        <div className="hero-index"><span>01</span><i /> THOUGHTFUL PROTECTION, EVERY DAY</div>
      </section>

      <section className="value-strip" aria-label="Eden benefits">
        <div className="value-item"><span className="value-number">01</span><span><strong>Easy by design</strong><small>Up and running in minutes</small></span></div>
        <div className="value-item"><span className="value-number">02</span><span><strong>Your home, your data</strong><small>Privacy comes as standard</small></span></div>
        <div className="value-item"><span className="value-number">03</span><span><strong>Here when you need us</strong><small>Real humans, real help</small></span></div>
        <div className="value-tag"><span className="value-tag-mark">V.</span> GOOD GEAR. GOOD FEELING.</div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading shop-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> THE Eden EDIT</div><h2>Find your <em>feel-good</em> setup.</h2><p>Little devices. A lot more peace of mind.</p></div>
          <div className="shop-heading-aside"><span className="mini-leaf" aria-hidden="true">✳</span><span>Good security<br />starts with you.</span></div>
        </div>

        <div className="shop-controls">
          <div className="category-tabs" role="tablist" aria-label="Filter products by category">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={`category-tab ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}>{item}{item === "All gear" && <span className="category-count">06</span>}</button>)}</div>
          <label className="sort-control"><span>Sort:</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><span className="select-caret">⌄</span></label>
        </div>
        {searchQuery && <div className="search-result-note">Showing results for <strong>“{searchQuery}”</strong><button onClick={() => setSearchQuery("")}>Clear search</button></div>}

        {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card" key={product.id}>
          <div className="card-visual-wrap" onClick={() => setSelectedProduct(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedProduct(product); }} role="button" tabIndex={0} aria-label={`View details for ${product.name}`}>
            <ProductPicture product={product} priority={index < 3} />
            {product.badge && <span className={`product-badge ${product.badge === "Bestseller" ? "badge-dark" : ""}`}>{product.badge}</span>}
            <button className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id); }} aria-label={favorites.includes(product.id) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}><Icon name="heart" size={18} /></button>
            <span className="quick-view-label">QUICK LOOK <Icon name="arrow" size={14} /></span>
          </div>
          <div className="product-info">
            <div className="product-meta"><span>{product.category}</span><span className="product-rating"><Icon name="star" size={13} /> {product.rating} <span className="rating-count">({product.reviews})</span></span></div>
            <button className="product-title-button" onClick={() => setSelectedProduct(product)}><h3>{product.name}</h3><span className="product-price">{money(product.price)}</span></button>
            <p className="product-description">{product.description}</p>
            <div className="product-card-actions"><button className="details-button" onClick={() => setSelectedProduct(product)}>Explore details <Icon name="arrow" size={15} /></button><button className="whatsapp-mini" onClick={() => startWhatsApp(productWhatsAppUrl(product))} aria-label={`Buy ${product.name} on WhatsApp`}><Icon name="whatsapp" size={18} /><span>Buy now</span></button></div>
          </div>
        </article>)}</div> : <div className="no-results"><span className="no-results-mark">⌕</span><h3>No gear found just yet.</h3><p>Try a different search or explore all of our home essentials.</p><button className="button button-dark" onClick={() => { setCategory("All gear"); setSearchQuery(""); }}>See all gear <Icon name="arrow" size={17} /></button></div>}

        <div className="shop-footnote"><span><Icon name="shield" size={16} /> Every Eden device is covered by our 2-year promise.</span><a href="#our-promise">The Eden difference <Icon name="arrow" size={14} /></a></div>
      </section>

      <section className="manifesto" id="why-eden">
        <div className="manifesto-left"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> A DIFFERENT KIND OF SECURITY</div><h2>Because feeling<br />safe should feel <em>simple.</em></h2><p>We make the thoughtful little things that help you feel at home. Easy to set up, kind to your privacy, and here for everyday life — not just the worst-case scenario.</p><a href="#our-promise" className="manifesto-link">A little more about us <Icon name="arrow" size={16} /></a><div className="manifesto-orbit" aria-hidden="true"><span>V.</span><i /><b /></div></div>
        <div className="manifesto-right"><div className="manifesto-stat"><span className="manifesto-stat-no">01 / EASY</span><h3>Up before your<br />coffee&apos;s cold.</h3><p>Thoughtful setup guides, a friendly app, and less than 10 minutes to feel right at home.</p><span className="stat-scribble">↗</span></div><div className="manifesto-stat"><span className="manifesto-stat-no">02 / PRIVATE</span><h3>Your home stays<br />your business.</h3><p>We only capture what matters. Your recordings belong to you, full stop.</p><span className="stat-scribble">↗</span></div><div className="manifesto-stat"><span className="manifesto-stat-no">03 / HUMAN</span><h3>A real person.<br />A real answer.</h3><p>Good support is part of a good product. We&apos;re right here if you need us.</p><span className="stat-scribble">↗</span></div></div>
      </section>

      <section className="promise-section" id="our-promise">
        <div className="promise-top"><div className="eyebrow"><span className="eyebrow-line" /> NO FINE PRINT ENERGY</div><h2>Little things.<br /><em>Big peace of mind.</em></h2></div>
        <div className="promise-grid"><div className="promise-card"><span className="promise-icon"><Icon name="shield" size={22} /></span><span className="promise-number">01</span><h3>The 2-year promise.</h3><p>If anything goes wrong, we&apos;ll make it right. No awkward forms. No runaround.</p></div><div className="promise-card"><span className="promise-icon"><Icon name="arrow" size={22} /></span><span className="promise-number">02</span><h3>30 days to feel it out.</h3><p>Try it at home. If it&apos;s not for you, send it back for a full refund.</p></div><div className="promise-card"><span className="promise-icon"><Icon name="check" size={22} /></span><span className="promise-number">03</span><h3>Made for the long run.</h3><p>Durable, considered products made for real homes and many tomorrows.</p></div></div>
      </section>

      <section className="newsletter" aria-label="Eden newsletter"><div className="newsletter-stamp">E.<span>NOTE</span></div><div className="newsletter-copy"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> THE OCCASIONAL GOOD THING</span><h2>Notes from<br /><em>the home front.</em></h2><p>New arrivals, helpful tips, and some things that make us smile. Never noise.</p></div><a className="newsletter-button" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Eden! I'd love to hear more about your products and home security tips.")}`} target="_blank" rel="noreferrer">Say hello on WhatsApp <Icon name="arrow" size={17} /></a><span className="newsletter-sparkle" aria-hidden="true">✳</span></section>

      <footer className="site-footer"><div className="footer-main"><a className="wordmark footer-wordmark" href="/"><img src="/images/logo.png" alt="Eden" className="wordmark-image" /></a><p>Good gear for feeling at home.<br />Made for real life, wherever that finds you.</p><span className="footer-footnote">FEEL AT HOME, WHEREVER YOU ARE.</span></div><div className="footer-links"><div><span className="footer-title">TAKE A LOOK</span><a href="/">Shop all</a><a href="/cameras">Cameras</a><a href="/door-security">Door security</a><a href="/alarms-sensors">Alarms & sensors</a></div><div><span className="footer-title">THE Eden WAY</span><a href="/why-eden">Why Eden</a><a href="/our-promise">Our promise</a><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Eden! I have a question about your products.")}`} target="_blank" rel="noreferrer">Get in touch</a></div><div className="footer-help"><span className="footer-title">HERE TO HELP</span><p>Questions? We&apos;re happy to help you find the right fit.</p><a className="footer-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Eden! I need a little help choosing the right home security setup.")}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} /> Chat with us</a></div></div><div className="footer-bottom"><span>© 2025 Eden Empire Ventures. A little more at ease.</span><div><span>Made with care, for home.</span><a href="/">Back to top ↑</a></div></div></footer>

      {selectedProduct && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-name"><button className="modal-close icon-button" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><Icon name="close" size={21} /></button><div className="modal-visual"><ProductPicture product={selectedProduct} /><span className="modal-image-caption"><Icon name="shield" size={15} /> DESIGNED FOR EVERYDAY PEACE OF MIND</span></div><div className="modal-content"><div className="eyebrow"><span className="eyebrow-line" /> {selectedProduct.category.toUpperCase()}</div><div className="modal-title-row"><h2 id="modal-product-name">{selectedProduct.name}</h2><span className="modal-price">{money(selectedProduct.price)}</span></div><div className="modal-rating"><Icon name="star" size={15} /> {selectedProduct.rating} <span>({selectedProduct.reviews} considered reviews)</span></div><p className="modal-description">{selectedProduct.description}</p><div className="modal-action-row"><button className="button button-lime" onClick={() => { addToBag(selectedProduct); setCartOpen(true); }}><Icon name="bag" size={18} /> Add to bag — {money(selectedProduct.price)}</button><button className="button button-whatsapp" onClick={() => startWhatsApp(productWhatsAppUrl(selectedProduct))}><Icon name="whatsapp" size={19} /> Buy now on WhatsApp</button></div><div className="modal-details-grid"><div className="modal-detail-block"><h3>Made to do more</h3><ul>{selectedProduct.features.map((feature) => <li key={feature}><span className="list-check"><Icon name="check" size={12} /></span>{feature}</li>)}</ul></div><div className="modal-detail-block"><h3>In the box</h3><ul>{selectedProduct.box.map((item) => <li key={item}><span className="list-dot" />{item}</li>)}</ul></div></div><div className="specifications"><h3>The good details</h3><dl>{selectedProduct.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div><div className="modal-footnote"><Icon name="shield" size={17} /> Backed by our 2-year promise & a 30-day try-at-home return window.</div></div></section></div>}

      {cartOpen && <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-header"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR Eden EDIT</div><h2 id="cart-title">Your bag<span> ({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><Icon name="close" size={21} /></button></div>{cartDetails.length ? <><div className="cart-items">{cartDetails.map(({ product, quantity }) => <div className="cart-item" key={product.id}><div className="cart-item-picture"><ProductPicture product={product} /></div><div className="cart-item-info"><span className="cart-item-category">{product.category}</span><h3>{product.name}</h3><span className="cart-item-price">{money(product.price)}</span><div className="quantity-control"><button onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}><Icon name="minus" size={14} /></button><span>{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}><Icon name="plus" size={14} /></button></div></div><button className="remove-item" onClick={() => setCart((current) => current.filter((item) => item.id !== product.id))} aria-label={`Remove ${product.name} from bag`}><Icon name="close" size={16} /></button></div>)}</div><div className="drawer-bottom"><div className="shipping-note"><Icon name="check" size={15} /> {cartTotal >= 115000 ? "Complimentary shipping is on us." : `Add ${money(115000 - cartTotal)} for complimentary shipping.`}</div><div className="subtotal-row"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><span className="tax-note">Taxes and delivery confirmed with our team.</span><button className="button button-whatsapp cart-checkout" onClick={() => startWhatsApp(orderWhatsAppUrl(cartDetails, cartTotal))}><Icon name="whatsapp" size={19} /> Checkout on WhatsApp <Icon name="arrow" size={17} /></button><p className="secure-note"><Icon name="shield" size={14} /> Your order details are sent straight to our team.</p></div></> : <div className="empty-bag"><span className="empty-bag-icon"><Icon name="bag" size={29} /></span><h3>Your bag feels a little light.</h3><p>Let&apos;s find a few good things to make home feel more like home.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the shop <Icon name="arrow" size={17} /></button></div>}</aside></div>}

      {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={14} /></span>{toast}<button onClick={() => setCartOpen(true)}>View bag</button></div>}
    </main>
  );
}
