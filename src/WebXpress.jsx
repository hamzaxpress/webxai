import { useState, useEffect, useRef } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #050B14; --bg-card: #0A1628; --bg-secondary: #0F1A2E;
    --accent: #2563EB; --accent-glow: rgba(37,99,235,0.12); --accent-secondary: #60A5FA;
    --green: #22c55e; --green-glow: rgba(34,197,94,0.12);
    --border: rgba(255,255,255,0.07);
    --text-primary: #FFFFFF; --text-secondary: rgba(255,255,255,0.65); --text-tertiary: rgba(255,255,255,0.35);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-primary); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  .font-display { font-family: 'Outfit', sans-serif; }
  .gradient-text { background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-text-green { background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-wash { background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.15) 0%, transparent 70%), var(--bg); }
  .hero-wash-green { background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,197,94,0.12) 0%, transparent 70%), var(--bg); }
  .section-alt { background: var(--bg-secondary); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; }
  .card-hover { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; transition: all 0.25s ease; cursor: pointer; }
  .card-hover:hover { border-color: rgba(37,99,235,0.4); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,0.12); }
  .card-hover-green:hover { border-color: rgba(34,197,94,0.4) !important; box-shadow: 0 8px 32px rgba(34,197,94,0.12) !important; }
  .btn-primary { display: inline-flex; align-items: center; gap: 6px; background: var(--accent); color: white; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; transition: all 0.2s ease; white-space: nowrap; }
  .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(37,99,235,0.4); }
  .btn-primary-green { background: #22c55e !important; }
  .btn-primary-green:hover { background: #16a34a !important; box-shadow: 0 4px 20px rgba(34,197,94,0.4) !important; }
  .btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: white; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; text-decoration: none; transition: all 0.2s ease; white-space: nowrap; }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }
  .btn-ghost { display: inline-flex; align-items: center; gap: 4px; background: transparent; color: var(--accent-secondary); font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; padding: 0; border: none; cursor: pointer; text-decoration: none; transition: gap 0.2s ease; }
  .btn-ghost:hover { gap: 8px; }
  .btn-ghost-green { color: #4ade80 !important; }
  .badge { display: inline-flex; align-items: center; background: var(--accent-glow); color: var(--accent-secondary); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(37,99,235,0.25); }
  .badge-green { background: var(--green-glow) !important; color: #4ade80 !important; border-color: rgba(34,197,94,0.25) !important; }
  .nav-link { font-size: 14px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; cursor: pointer; display: flex; align-items: center; gap: 4px; position: relative; }
  .nav-link:hover { color: var(--text-primary); }
  .section-padding { padding: 80px 0; }
  .page-fade { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .stat-number { font-family: 'Outfit',sans-serif; font-size: 2.2rem; font-weight: 700; color: var(--accent); }
  .testimonial-quote { font-style: italic; color: var(--text-secondary); line-height: 1.7; }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .form-input { width: 100%; background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-family: 'DM Sans',sans-serif; font-size: 14px; padding: 12px 16px; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--accent); }
  .form-input::placeholder { color: var(--text-tertiary); }
  .form-select { width: 100%; background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-family: 'DM Sans',sans-serif; font-size: 14px; padding: 12px 16px; outline: none; cursor: pointer; }
  .form-select option { background: #0A1628; }
  .dropdown-menu { position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); background: #0D1B2E; border: 1px solid var(--border); border-radius: 12px; padding: 8px; min-width: 200px; z-index: 200; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .dropdown-item { display: block; padding: 10px 14px; font-size: 14px; color: var(--text-secondary); border-radius: 8px; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .dropdown-item:hover { background: var(--accent-glow); color: var(--text-primary); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  @media (max-width: 900px) { .hide-mobile { display: none !important; } }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "AI & Innovation", page: "ai" },
  {
    label: "Platform", page: "platform",
    dropdown: [
      { label: "Overview", page: "platform" },
      { label: "TMS", page: "tms" },
      { label: "WMS", page: "wms" },
      { label: "Visibility & Control Tower", page: "visibility" },
      { label: "GreenXpress", page: "greenxpress" },
    ]
  },
  {
    label: "Solutions", page: "solutions",
    dropdown: [
      { label: "Retail & Fashion", page: "solutions" },
      { label: "FMCG & Manufacturing", page: "solutions" },
      { label: "Healthcare & Pharma", page: "solutions" },
      { label: "Automotive", page: "solutions" },
      { label: "3PL & Logistics", page: "solutions" },
    ]
  },
  { label: "Customers", page: "customers" },
  { label: "About", page: "about" },
];

const STATS = [
  { number: "50+", label: "Enterprises Transforming with AI" },
  { number: "500,000+", label: "Decisions AI-Assisted Daily" },
  { number: "5+", label: "Countries, One Platform" },
  { number: "4", label: "Integrated AI-Powered Products" },
];

const CUSTOMERS = ["Patanjali Parivahan", "DTDC", "Khimji Ramdas", "Hyundai Glovis", "TCNS", "Thermo Fisher"];

const PRODUCTS = [
  { icon: "🚛", title: "Transport Management", tagline: "Every transport decision — faster, cheaper, smarter.", desc: "Every transport decision — which vehicle, which route, which vendor, what price — can be made faster, cheaper, and smarter with AI. One system handles FTL, LTL, Air, Container, Tanker, and Cold Chain.", link: "tms" },
  { icon: "🏭", title: "Warehouse Management", tagline: "Your warehouse makes thousands of decisions a day. AI makes every one better.", desc: "Where to put stock, what to pick first, when to replenish, which order to prioritize — your warehouse generates thousands of micro-decisions daily. AI handles the decisions. Your team handles the exceptions.", link: "wms" },
  { icon: "👁️", title: "Visibility & Control Tower", tagline: "You can't optimize what you can't see.", desc: "Most logistics operations run on fragmented data — a GPS feed here, an LSP update there, a phone call when something goes wrong. WebXpress connects your entire logistics ecosystem into one live, intelligent nervous system.", link: "visibility" },
  { icon: "🌿", title: "GreenXpress", tagline: "Sustainability isn't a checkbox. It's becoming a business requirement.", desc: "Your customers, regulators, and investors will demand carbon data at the shipment level. GreenXpress gives you that data today — before it's mandatory — and shows you exactly where to cut emissions without cutting capacity.", link: "greenxpress" },
];

const AI_AGENTS = [
  { num: 1, title: "Agentic AI for Control Tower", desc: "Operations teams spend hours manually monitoring shipments, reacting to problems after they escalate." },
  { num: 2, title: "Delayed Delivery Action Agent", desc: "Delayed deliveries get flagged but nobody follows up systematically. Customers complain before you even know there's a problem." },
  { num: 3, title: "POD Audit Agent", desc: "Manual POD verification is slow, error-prone, and creates billing bottlenecks." },
  { num: 4, title: "Trip Expense Monitoring Agent", desc: "Trip expenses are submitted after the fact with little visibility into whether charges are reasonable." },
  { num: 5, title: "AI Workflow Agents", desc: "Repetitive operational workflows consume skilled employees who should be focused on exceptions." },
  { num: 6, title: "Logistics Loss Finder", desc: "Revenue leakage from billing errors, weight discrepancies, and rate mismatches goes undetected for months." },
  { num: 7, title: "Sales Development AI Agent", desc: "Sales teams spend more time on data entry and follow-ups than on actual selling." },
  { num: 8, title: "Predictive ETA Engine", desc: "ETAs are guesses based on distance. Customers and operations teams can't plan around unreliable estimates." },
  { num: 9, title: "Route Optimization", desc: "Route planning relies on dispatcher experience. Suboptimal routes waste fuel, time, and capacity." },
];

const TESTIMONIALS = [
  { initials: "Ho", name: "Head of Operations", company: "Patanjali Parivahan", quote: "WebXpress has digitized our end-to-end operations across 1000+ fleet and 36,000+ monthly trips. The platform expanded our vendor footprint significantly and reduced operational costs substantially." },
  { initials: "KP", name: "Krishnakant Pandey, Head of Logistics CPG", company: "Khimji Ramdas", quote: "We deployed WebXpress with tight SAP integration across our Oman operations. Automated load planning, online vehicle deployment, and geolocation-based delivery tracking for 5000+ customers." },
  { initials: "OL", name: "Operations Leadership", company: "DTDC Express", quote: "WebXpress gives us the operational depth and configurability we need at scale. From docket management to last-mile tracking, the platform handles our network complexity without compromise." },
  { initials: "LM", name: "Logistics Management", company: "Hyundai Glovis India", quote: "Managing automotive logistics demands precision at every stage — inbound, inter-plant, and outbound. WebXpress delivers the visibility and control we need across our entire supply chain." },
];

const SOLUTIONS = [
  { title: "Retail & Fashion", desc: "Omnichannel fulfillment, store-to-home delivery, and AI-driven returns management for modern retail.", icon: "🛍️" },
  { title: "FMCG & Manufacturing", desc: "Primary and secondary distribution optimization with AI-powered demand prediction across distributor networks.", icon: "🏗️" },
  { title: "Healthcare & Pharma", desc: "Cold chain integrity, compliance automation, and disruption prevention for life-critical shipments.", icon: "💊" },
  { title: "Automotive", desc: "Inbound, inter-plant, and outbound coordination with JIT delivery and RFID yard management.", icon: "🚗" },
  { title: "3PL & Logistics", desc: "Multi-client operations, automated billing reconciliation, and fleet optimization across shared assets.", icon: "📦" },
];

// Platform layers now include navigation pages
const PLATFORM_LAYERS = [
  { layer: "L4", label: "Intelligence", title: "AI & Analytics", desc: "9 AI agents, predictive analytics, and decision intelligence across every workflow.", color: "var(--accent)", page: "ai" },
  { layer: "L3", label: "Visibility", title: "Control Tower & Tracking", desc: "Real-time multi-modal visibility, predictive ETAs, and proactive exception management.", color: "var(--accent)", page: "visibility" },
  { layer: "L2", label: "Execution", title: "TMS + WMS", desc: "End-to-end transport management and warehouse management on a single platform.", color: "var(--accent)", page: "tms" },
  { layer: "L1", label: "Sustainability", title: "GreenXpress", desc: "Carbon measurement, reduction intelligence, and sustainability reporting.", color: "var(--green)", page: "greenxpress" },
];

const TMS_PIPELINE = ["Indent", "Dispatch", "In Transit", "Delivery", "Billing", "Settlement"];
const TMS_PIPELINE_DESC = ["Order creation & vehicle allocation", "Loading, documentation & departure", "GPS tracking & exception management", "POD capture & confirmation", "Auto-rating & invoice generation", "Reconciliation & payment"];

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (item) => {
    if (item.dropdown) {
      setOpenDropdown(openDropdown === item.label ? null : item.label);
    } else {
      setPage(item.page);
      setOpenDropdown(null);
    }
  };

  const handleDropdownClick = (page) => {
    setPage(page);
    setOpenDropdown(null);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(5,11,20,0.96)" : "rgba(5,11,20,0.7)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
      transition: "all 0.3s ease",
    }}>
      <nav ref={navRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div onClick={() => { setPage("home"); setOpenDropdown(null); }} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-display" style={{ fontWeight: 700, fontSize: 14, color: "white" }}>W</span>
          </div>
          <span className="font-display" style={{ fontWeight: 700, fontSize: 18 }}>WebXpress</span>
        </div>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <div key={item.label} style={{ position: "relative" }}>
              <div
                className="nav-link"
                style={{ padding: "8px 14px", borderRadius: 8, transition: "all 0.2s", background: openDropdown === item.label ? "rgba(37,99,235,0.1)" : "transparent" }}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                {item.dropdown && (
                  <svg style={{ width: 14, height: 14, opacity: 0.5, transition: "transform 0.2s", transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.label && (
                <div className="dropdown-menu">
                  {item.dropdown.map(d => (
                    <div key={d.label} className="dropdown-item" onClick={() => handleDropdownClick(d.page)}>
                      {d.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn-primary hide-mobile" onClick={() => { setPage("demo"); setOpenDropdown(null); }}>
          Request Demo →
        </button>
      </nav>
    </header>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#050B14", borderTop: "1px solid var(--border)", padding: "80px 0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-display" style={{ fontWeight: 700, fontSize: 14, color: "white" }}>W</span>
              </div>
              <span className="font-display" style={{ fontWeight: 700, fontSize: 18 }}>WebXpress</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>
              AI-powered logistics intelligence platform serving 50+ enterprises across 5+ countries.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "in", label: "LinkedIn" }, { icon: "▶", label: "YouTube" },
                { icon: "✉", label: "Email" }, { icon: "💬", label: "WhatsApp" }
              ].map(s => (
                <div key={s.label} title={s.label} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {[
            { head: "Platform", items: [{ label: "TMS", page: "tms" }, { label: "WMS", page: "wms" }, { label: "Visibility & Control Tower", page: "visibility" }, { label: "GreenXpress", page: "greenxpress" }] },
            { head: "Solutions", items: [{ label: "Retail", page: "solutions" }, { label: "FMCG", page: "solutions" }, { label: "Healthcare", page: "solutions" }, { label: "Automotive", page: "solutions" }, { label: "3PL", page: "solutions" }] },
            { head: "Company", items: [{ label: "About", page: "about" }, { label: "Customers", page: "customers" }, { label: "Contact", page: "demo" }] },
            { head: "Connect", items: [{ label: "business@webxpress.in", page: null }, { label: "+91 7045697036", page: null }, { label: "LinkedIn", page: null }, { label: "YouTube", page: null }] },
          ].map(col => (
            <div key={col.head}>
              <h4 className="font-display" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>{col.head}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map(item => (
                  <li key={item.label}>
                    <span
                      onClick={() => item.page && setPage(item.page)}
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: item.page ? "pointer" : "default", transition: "color 0.2s" }}
                      onMouseEnter={e => { if (item.page) e.target.style.color = "rgba(255,255,255,0.85)"; }}
                      onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.5)"; }}
                    >{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 ECFY Consulting. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>WebXpress — AI-Driven Logistics Transformation</p>
        </div>
      </div>
    </footer>
  );
}

// ─── CTA BANNER ────────────────────────────────────────────────────────────────
function CTABanner({ setPage, titleNode, sub, green }) {
  return (
    <div className="section-padding">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="card" style={{ padding: "64px 40px", textAlign: "center", background: "var(--bg-secondary)" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}>{titleNode}</h2>
          {sub && <p style={{ marginTop: 12, color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, margin: "12px auto 0" }}>{sub}</p>}
          <div style={{ marginTop: 28 }}>
            <button className={`btn-primary${green ? " btn-primary-green" : ""}`} style={{ fontSize: 16, padding: "14px 32px" }} onClick={() => setPage("demo")}>
              Request a Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [testIdx, setTestIdx] = useState(0);
  const pairs = [[0, 1], [2, 3]];

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>AI-Powered Logistics Platform</span>
              <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
                WebXpress — <span className="gradient-text">AI-Driven Logistics Transformation</span>
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: 17, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
                AI will fundamentally change how shipments move, fleets operate, warehouses run, and supply chains predict. The question is whether your operations are ready.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ fontSize: 15, padding: "12px 24px" }} onClick={() => setPage("demo")}>Request a Demo →</button>
                <button className="btn-secondary" style={{ fontSize: 15, padding: "12px 24px" }} onClick={() => setPage("platform")}>Explore the Platform</button>
              </div>
            </div>
            {/* Dashboard mockup */}
            <div>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
                <div style={{ background: "#111827", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#EF4444", "#F59E0B", "#22c55e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
                  </div>
                  <div style={{ flex: 1, background: "#1F2937", borderRadius: 6, padding: "4px 12px", textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>app.webxpress.ai</div>
                </div>
                <div style={{ background: "#0A1628", padding: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
                    {[{ n: "847", l: "Active Trips", c: "#60A5FA" }, { n: "1,243", l: "In Transit", c: "#34D399" }, { n: "3,891", l: "Delivered Today", c: "#FBBF24" }, { n: "12", l: "Alerts", c: "#F87171" }].map(s => (
                      <div key={s.l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 8px", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: s.c }}>{s.n}</div>
                        <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", height: 100, marginBottom: 8, overflow: "hidden" }}>
                    <svg width="100%" height="100%" viewBox="0 0 360 100">
                      <line x1="60" y1="35" x2="280" y2="25" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                      <line x1="100" y1="70" x2="220" y2="45" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                      <line x1="40" y1="52" x2="300" y2="78" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                      {[[60, 35, "Mumbai"], [280, 25, "Delhi"], [100, 70, "Chennai"], [220, 45, "Bangalore"]].map(([x, y, t]) => (
                        <g key={t}><circle cx={x} cy={y} r="4" fill="#2563EB" /><text x={x} y={y + 14} fill="#6B7280" fontSize="7" textAnchor="middle">{t}</text></g>
                      ))}
                    </svg>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "6px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Docket", "Origin", "Dest", "Status"].map(h => <span key={h} style={{ fontSize: 9, color: "#6B7280" }}>{h}</span>)}
                    </div>
                    {[["WX-78432", "Mumbai", "Delhi", "In Transit", "#22c55e"], ["WX-78431", "Chennai", "Bangalore", "Loading", "#3B82F6"], ["WX-78429", "Pune", "Hyderabad", "Delivered", "#10B981"], ["WX-78428", "Kolkata", "Jaipur", "Delayed", "#F59E0B"]].map(([d, o, dest, st, c]) => (
                      <div key={d} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "5px 12px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <span style={{ fontSize: 9, color: "#60A5FA", fontFamily: "monospace" }}>{d}</span>
                        <span style={{ fontSize: 9, color: "#D1D5DB" }}>{o}</span>
                        <span style={{ fontSize: 9, color: "#D1D5DB" }}>{dest}</span>
                        <span style={{ fontSize: 9, background: `${c}20`, color: c, borderRadius: 10, padding: "1px 6px", textAlign: "center" }}>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 48 }}>
            {STATS.map(s => (
              <div key={s.label} className="card" style={{ padding: "20px", textAlign: "center" }}>
                <div className="stat-number">{s.number}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section style={{ padding: "40px 0", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: 24 }}>Trusted by forward-thinking enterprises</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {CUSTOMERS.map(c => (
              <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>{c.slice(0, 2).toUpperCase()}</span>
                </div>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>9 AI Agents Live</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: 16 }}>
            AI Isn&apos;t Coming to Logistics. <span className="gradient-text">It&apos;s Already Here.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.7 }}>
            WebXpress has built 9 autonomous AI agents that work inside your logistics operations — auditing PODs, catching billing errors, predicting delays, following up with vendors. This isn&apos;t a roadmap. It&apos;s live.
          </p>
          <button className="btn-primary" onClick={() => setPage("ai")}>See AI Capabilities →</button>
        </div>
      </section>

      {/* Inflection Point */}
      <section className="section-padding section-alt">
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 32 }}>
            The Logistics Industry Is at an <span className="gradient-text">Inflection Point</span>
          </h2>
          <div className="card" style={{ padding: "40px 48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.8 }}>
              <p>AI is not an incremental improvement to logistics. It is a fundamental shift in how every business activity gets done — from how you price a shipment to how you plan a route to how you detect fraud in vendor billing.</p>
              <p>Even in a physical industry where trucks need roads and warehouses need hands, AI transforms everything around the physical act: prediction, planning, routing, pricing, risk detection, compliance, carbon measurement, and decision-making.</p>
              <p>Within 5 years, logistics companies that haven&apos;t adopted AI won&apos;t be competing on efficiency. They&apos;ll be struggling to compete at all.</p>
              <p className="font-display" style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: 20, textAlign: "center", marginTop: 8 }}>The question is: are you ready?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
            Four Products. <span className="gradient-text">One Platform.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {PRODUCTS.map(p => (
              <div key={p.title} className="card-hover" style={{ padding: "32px" }} onClick={() => setPage(p.link)}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "var(--accent-secondary)", fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{p.tagline}</p>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                <span className="btn-ghost">Explore {p.title} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>What Our Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            {pairs[testIdx].map(i => {
              const t = TESTIMONIALS[i];
              return (
                <div key={i} className="card" style={{ padding: "28px 32px", display: "flex", flexDirection: "column" }}>
                  <p className="testimonial-quote" style={{ flex: 1, marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="font-display" style={{ fontWeight: 700, fontSize: 12, color: "var(--accent)" }}>{t.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{t.company}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {pairs.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)} style={{ width: i === testIdx ? 28 : 8, height: 8, borderRadius: 4, background: i === testIdx ? "var(--accent)" : "var(--border)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>The Next 5 Years Will Separate <span className="gradient-text">Leaders from Laggards.</span></>} sub="Every month without AI in your logistics operations is a month your competitors are getting ahead." />
    </div>
  );
}

// ─── AI PAGE ───────────────────────────────────────────────────────────────────
function AIPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>9 AI Agents Live</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 720, marginBottom: 20 }}>
            AI Isn&apos;t Coming to Logistics. <span className="gradient-text">It&apos;s Already Here.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 580, lineHeight: 1.7, marginBottom: 32 }}>
            WebXpress has deployed 9 autonomous AI agents that work inside your logistics operations — auditing, predicting, optimizing, and acting. This isn&apos;t a roadmap. It&apos;s production.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary" onClick={() => setPage("demo")}>Request a Demo →</button>
            <button className="btn-secondary" onClick={() => setPage("platform")}>See Platform</button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 16 }}>
            Why AI in Logistics Is <span className="gradient-text">Different</span>
          </h2>
          <div className="card" style={{ padding: "40px 48px", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 16 }}>
              <p>Generic AI tools don&apos;t work in logistics. They don&apos;t understand consignment lifecycles, freight rating structures, hub-and-spoke networks, or the difference between a delivery exception and a failed attempt.</p>
              <p>WebXpress AI agents are built on top of a logistics-native platform. They understand your domain because they were trained on logistics data, logistics workflows, and logistics outcomes.</p>
              <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>Domain knowledge is the moat. Without it, AI is just noise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            The 9 AI Agents <span className="gradient-text">Powering Your Operations</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {AI_AGENTS.map(a => (
              <div key={a.num} className="card-hover" style={{ padding: "24px 28px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "var(--accent)", marginBottom: 12 }}>{a.num}</div>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Ready to Deploy AI in <span className="gradient-text">Your Operations?</span></>} sub="See how WebXpress AI agents can transform your logistics workflows in weeks, not months." />
    </div>
  );
}

// ─── PLATFORM PAGE ─────────────────────────────────────────────────────────────
function PlatformPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60, textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>Integrated Platform</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 720, margin: "0 auto 20px" }}>
            The WebXpress Integrated <span className="gradient-text">Logistics Intelligence Platform</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Four layers working together — execution, visibility, intelligence, and sustainability — on a single platform built for logistics.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
            Platform <span className="gradient-text">Architecture</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: 40 }}>Each layer builds on the one below it. Click any layer to explore it.</p>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {PLATFORM_LAYERS.map(l => (
              <div
                key={l.layer}
                className="card-hover"
                style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, borderLeft: `3px solid ${l.color}` }}
                onClick={() => setPage(l.page)}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: l.color === "var(--green)" ? "var(--green-glow)" : "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: 16, color: l.color }}>{l.layer}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: l.color }}>{l.label}</span>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, margin: "2px 0 4px" }}>{l.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>{l.desc}</p>
                </div>
                <svg style={{ width: 20, height: 20, color: "var(--text-tertiary)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            Technology <span className="gradient-text">Foundation</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { t: "AI-Native Infrastructure", d: "Built from the ground up with AI at the core, not bolted on as an afterthought." },
              { t: "MCP Connectors", d: "Model Context Protocol connectors that let AI agents interact with any external system natively." },
              { t: "Mobile-First", d: "Full operational capability on mobile — drivers, warehouse staff, and managers all work from their phones." },
              { t: "GPS & IoT Integration", d: "Real-time location, temperature, humidity, and door-open sensors feeding directly into the platform." },
              { t: "Government Connectors", d: "E-way bill, VAHAN, FASTag, and other regulatory integrations built in." },
              { t: "ERP Connectors", d: "Pre-built integrations with SAP, Oracle, Tally, and other enterprise systems." },
            ].map(item => (
              <div key={item.t} className="card-hover" style={{ padding: "24px 28px" }}>
                <h3 className="font-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            Every Logistics <span className="gradient-text">Business Model</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {["Full Truck Load (FTL)", "Less Than Truck Load (LTL)", "Air Freight", "Container Transport", "Tanker Operations", "Cold Chain", "Distribution", "3PL / 4PL"].map(m => (
              <div key={m} className="card" style={{ padding: "16px", textAlign: "center", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>{m}</div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>See the Platform <span className="gradient-text">in Action</span></>} sub="Book a personalized demo and see how WebXpress fits your logistics operations." />
    </div>
  );
}

// ─── TMS PAGE ──────────────────────────────────────────────────────────────────
function TMSPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>Transport Management System</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 720, marginBottom: 20 }}>
            Stop Managing Transport. <span className="gradient-text">Start Orchestrating It.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
            From indent to settlement, WebXpress TMS digitizes every step of your transport operations — replacing spreadsheets, phone calls, and guesswork with a single intelligent system.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary" onClick={() => setPage("demo")}>Request a Demo →</button>
            <button className="btn-secondary" onClick={() => setPage("platform")}>Back to Platform</button>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            The TMS <span className="gradient-text">Pipeline</span>
          </h2>
          <div style={{ display: "flex", gap: 6, alignItems: "stretch", overflowX: "auto", paddingBottom: 8 }}>
            {TMS_PIPELINE.map((stage, i) => (
              <div key={stage} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 100 }}>
                <div className="card" style={{ padding: "16px 12px", textAlign: "center", flex: 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{i + 1}</div>
                  <h4 className="font-display" style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{stage}</h4>
                  <p style={{ fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1.4 }}>{TMS_PIPELINE_DESC[i]}</p>
                </div>
                {i < 5 && <span style={{ color: "var(--text-tertiary)", fontSize: 18, padding: "0 2px", flexShrink: 0 }}>›</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            The <span className="gradient-text">Transformation</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card" style={{ padding: "28px 32px" }}>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 20 }}>Before WebXpress</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Manual indent allocation via phone calls and WhatsApp", "Paper-based freight bills and LR copies", "Rate negotiations tracked in spreadsheets", "No visibility after dispatch", "Trip expenses reconciled weeks later", "POD collection takes 30-45 days"].map(item => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>×</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: "28px 32px" }}>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 20 }}>With WebXpress TMS</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Automated indent creation with smart vehicle matching", "Digital documentation from booking to billing", "Contract-based rate management with auto-application", "Real-time GPS tracking with predictive ETAs", "Live trip expense monitoring with anomaly detection", "Digital POD capture and instant AI-powered audit"].map(item => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>Core <span className="gradient-text">Capabilities</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { t: "Indent & Order Management", d: "Create indents, match vehicles, and allocate loads automatically. Support for FTL, LTL, and multi-stop shipments with intelligent capacity optimization." },
              { t: "Contract & Rate Management", d: "Define rate contracts by lane, vehicle type, weight slab, and customer. Rates auto-apply at billing — no manual lookup, no errors." },
              { t: "Fleet & Vehicle Management", d: "Track your own fleet and market vehicles. Manage documents, fitness certificates, permits, and insurance with automated expiry alerts." },
              { t: "Trip & Expense Management", d: "Monitor every trip from loading to unloading. Track driver advances, fuel, tolls, and other expenses in real time against benchmarks." },
              { t: "Freight Billing & Invoicing", d: "Auto-generate freight bills based on contracted rates. Handle supplementary charges, deductions, and GST compliance automatically." },
              { t: "MIS & Analytics", d: "Real-time dashboards for branch performance, vehicle utilization, lane profitability, and customer analytics. Export to any format." },
            ].map(item => (
              <div key={item.t} className="card-hover" style={{ padding: "24px 28px" }}>
                <h3 className="font-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Ready to Orchestrate Your <span className="gradient-text">Transport Operations?</span></>} sub="See how WebXpress TMS can replace your spreadsheets and phone calls with intelligent automation." />
    </div>
  );
}

// ─── WMS PAGE ──────────────────────────────────────────────────────────────────
function WMSPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>Warehouse Management System</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 720, marginBottom: 20 }}>
            Your Warehouse Is Smarter <span className="gradient-text">Than You Think.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
            WebXpress WMS turns your warehouse from a cost center into a competitive advantage — with real-time inventory, AI-guided operations, and seamless ERP integration.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary" onClick={() => setPage("demo")}>Request a Demo →</button>
            <button className="btn-secondary" onClick={() => setPage("platform")}>Back to Platform</button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>The <span className="gradient-text">Transformation</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card" style={{ padding: "28px 32px" }}>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 20 }}>Before WebXpress</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Paper-based gate entries and manual GRNs", "Inventory counts done monthly with clipboard walks", "Picking errors caught only at dispatch or delivery", "No real-time stock visibility across locations", "Client-wise inventory tracked in separate spreadsheets", "ERP updates done in batch at end of day"].map(item => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--text-tertiary)", flexShrink: 0 }}>×</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: "28px 32px" }}>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 20 }}>With WebXpress WMS</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Digital gate-in with barcode/QR scanning", "Real-time perpetual inventory with location-level accuracy", "AI-guided picking with validation at every step", "Unified stock visibility across all warehouses", "Multi-client inventory with automated billing", "Real-time ERP sync via MCP connectors"].map(item => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>Core <span className="gradient-text">Capabilities</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { t: "Inbound Intelligence", d: "Automate gate entry, quality checks, GRN creation, and put-away with barcode scanning and AI validation. Reduce inbound processing time by 60%." },
              { t: "Inventory Management", d: "Real-time inventory with location-level accuracy. Track by batch, serial number, expiry date, or any custom attribute." },
              { t: "Outbound Orchestration", d: "Wave planning, pick-path optimization, packing validation, and dispatch management. Every outbound shipment is verified before it leaves the dock." },
              { t: "Multi-Client Management", d: "Run multiple clients from the same warehouse with complete inventory, billing, and SLA isolation." },
              { t: "Warehouse Control System", d: "Monitor warehouse productivity in real time — throughput, dock utilization, picker performance, and space utilization." },
              { t: "ERP Integration via MCP", d: "Model Context Protocol connectors sync your WMS with SAP, Oracle, Tally, and other ERPs in real time." },
            ].map(item => (
              <div key={item.t} className="card-hover" style={{ padding: "24px 28px" }}>
                <h3 className="font-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Ready to Unlock Your <span className="gradient-text">Warehouse&apos;s Potential?</span></>} sub="See how WebXpress WMS can bring real-time intelligence to your warehouse operations." />
    </div>
  );
}

// ─── VISIBILITY PAGE ───────────────────────────────────────────────────────────
function VisibilityPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ marginBottom: 20, display: "inline-flex" }}>Visibility & Control Tower</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 720, marginBottom: 20 }}>
            See Everything. <span className="gradient-text">Predict What&apos;s Next.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
            WebXpress Visibility gives you a unified view of every shipment, across every carrier and mode — with AI that predicts problems before they happen.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary" onClick={() => setPage("demo")}>Request a Demo →</button>
            <button className="btn-secondary" onClick={() => setPage("platform")}>Back to Platform</button>
          </div>
        </div>
      </section>

      {/* Live monitor mockup */}
      <section className="section-alt" style={{ padding: "40px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{ background: "#111827", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 6 }}>{["#EF4444", "#F59E0B", "#22c55e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />)}</div>
              <div style={{ flex: 1, background: "#1F2937", borderRadius: 6, padding: "4px 12px", textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>app.webxpress.ai/control-tower</div>
            </div>
            <div style={{ background: "#0A1628", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>Live Monitoring</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div className="live-dot" /><span style={{ fontSize: 11, color: "#22c55e" }}>847 vehicles tracked</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", height: 140 }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 140">
                    {[[40, 30], [110, 55], [185, 38], [70, 95], [235, 75], [155, 115], [25, 65], [260, 28]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="5" fill={i === 4 ? "#EF4444" : i === 2 ? "#F59E0B" : "#10B981"} opacity="0.8" />
                    ))}
                  </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { c: "#EF4444", msg: "Vehicle WX-892 — Route deviation detected", time: "2m ago" },
                    { c: "#F59E0B", msg: "Shipment WX-78431 — ETA delay 45 min", time: "8m ago" },
                    { c: "#3B82F6", msg: "Geofence exit — Truck TN-04-AB-1234", time: "12m ago" },
                    { c: "#22c55e", msg: "Delivery confirmed — WX-78429", time: "15m ago" },
                  ].map(a => (
                    <div key={a.msg} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.c, marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 10, color: "#D1D5DB", lineHeight: 1.4 }}>{a.msg}</div>
                        <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>Core <span className="gradient-text">Capabilities</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { t: "Multi-LSP Visibility", d: "Track shipments across every logistics service provider on a single screen. Regardless of carrier, mode, or geography — one view for everything." },
              { t: "Predictive Control Tower", d: "AI-powered control tower that predicts what's about to happen and recommends actions before problems escalate." },
              { t: "Delay Prediction & Prevention", d: "Machine learning models analyze historical patterns, weather, traffic, and driver behavior to predict delays hours before they occur." },
              { t: "Freight Audit & Reconciliation", d: "Automated audit of every freight bill against contracts, weight slips, and distance calculations. Catch overcharges instantly." },
              { t: "IoT + AI Intelligence", d: "GPS, temperature, humidity, and door sensors feed real-time data into AI models. Get intelligent alerts about shipment conditions." },
              { t: "LSP Performance Scoring", d: "Objective scorecards for every logistics partner based on on-time delivery, damage rates, billing accuracy, and responsiveness." },
            ].map(item => (
              <div key={item.t} className="card-hover" style={{ padding: "24px 28px" }}>
                <h3 className="font-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Ready for Complete <span className="gradient-text">Supply Chain Visibility?</span></>} sub="See how WebXpress can give you predictive visibility across your entire logistics network." />
    </div>
  );
}

// ─── GREENXPRESS PAGE ──────────────────────────────────────────────────────────
function GreenXpressPage({ setPage }) {
  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="hero-wash-green" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge badge-green" style={{ marginBottom: 20, display: "inline-flex" }}>GreenXpress</span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 760, marginBottom: 20 }}>
            Carbon Intelligence <span className="gradient-text-green">for Supply Chains.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 580, lineHeight: 1.7, marginBottom: 32 }}>
            GreenXpress makes sustainability measurable, actionable, and integrated into your daily logistics operations — not a separate report you generate once a year.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary btn-primary-green" onClick={() => setPage("demo")}>Request a Demo →</button>
            <button className="btn-secondary" onClick={() => setPage("platform")}>Back to Platform</button>
          </div>
        </div>
      </section>

      {/* Dashboard mockup */}
      <section style={{ padding: "48px 0", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ background: "#111827", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 6 }}>{["#EF4444", "#F59E0B", "#22c55e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />)}</div>
              <div style={{ flex: 1, background: "#1F2937", borderRadius: 6, padding: "4px 12px", textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>app.webxpress.ai/greenxpress</div>
            </div>
            <div style={{ background: "#0A1628", padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Total Emissions (YTD)</p>
                  <p className="font-display" style={{ fontSize: 36, fontWeight: 700, color: "white" }}>2,847 <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>tCO2e</span></p>
                </div>
                <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#4ade80", fontSize: 13 }}>↓ 12%</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>vs last quarter</span>
                </div>
              </div>
              {/* Chart */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 16, marginBottom: 16, height: 120 }}>
                <svg width="100%" height="100%" viewBox="0 0 600 88">
                  {[0, 1, 2].map(i => <line key={i} x1="0" y1={i * 30 + 14} x2="600" y2={i * 30 + 14} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
                  <polyline points="0,70 80,55 160,60 240,40 320,45 400,30 480,35 560,20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" />
                  <polyline points="0,70 80,55 160,60 240,40 320,45 400,30 480,35 560,20 560,88 0,88" fill="url(#greenGrad)" />
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {["Scope 1", "Scope 2", "Scope 3"].map((s, i) => (
                    <text key={s} x={150 + i * 150} y={85} fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">{s}</text>
                  ))}
                </svg>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[{ v: "0.34 tCO2e", l: "Avg per Trip" }, { v: "+8.2%", l: "Fleet Efficiency" }, { v: "23%", l: "Green Vehicles" }].map(s => (
                  <div key={s.l} style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 10, padding: "14px 16px" }}>
                    <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#4ade80" }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
            Three Steps to <span className="gradient-text-green">Carbon Intelligence</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: 48, maxWidth: 560, margin: "8px auto 48px" }}>
            A practical framework for logistics companies that want to act on sustainability, not just talk about it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { num: 1, title: "Measure", desc: "Automatically calculate carbon emissions across your entire supply chain — by vehicle, route, shipment, and customer. No manual data entry, no consultants." },
              { num: 2, title: "Reduce", desc: "AI identifies the highest-impact opportunities to cut emissions — route optimization, load consolidation, mode shifts, and fleet mix adjustments that save both carbon and cost." },
              { num: 3, title: "Replace", desc: "Plan your transition to cleaner alternatives — EV fleet integration, alternative fuel routing, and green corridor planning with real data on costs and feasibility." },
            ].map(s => (
              <div key={s.num} className="card-hover card-hover-green" style={{ padding: "32px 28px", border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.03)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: 16, color: "#4ade80" }}>{s.num}</span>
                </div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#4ade80", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            Why Sustainability <span className="gradient-text-green">Can&apos;t Wait</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { icon: "📋", title: "Regulatory Pressure", desc: "ESG reporting mandates are tightening globally. Companies without carbon data at the shipment level will face compliance gaps — and penalties." },
              { icon: "🏆", title: "Competitive Advantage", desc: "Customers increasingly prefer suppliers who demonstrate sustainability. Carbon measurement isn't just compliance — it wins business." },
              { icon: "💰", title: "Cost Reduction", desc: "Cutting carbon and cutting costs are the same action. Route optimization, load consolidation, and fleet efficiency improvements save money and emissions simultaneously." },
            ].map(item => (
              <div key={item.title} className="card-hover" style={{ padding: "28px", border: "1px solid rgba(34,197,94,0.1)" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div className="card" style={{ padding: "48px", textAlign: "center", borderColor: "rgba(34,197,94,0.15)" }}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--text-secondary)", fontStyle: "italic", marginBottom: 24 }}>
              &ldquo;Customers increasingly prefer products from companies that demonstrate sustainability. For logistics companies, carbon measurement isn&apos;t just compliance — it&apos;s a competitive advantage that wins business.&rdquo;
            </p>
            <div>
              <p className="font-display" style={{ fontWeight: 700, fontSize: 15 }}>Apurva Mankad</p>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Founder, WebXpress</p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} green titleNode={<>Ready to Make Sustainability <span className="gradient-text-green">Actionable?</span></>} sub="See how GreenXpress can give you carbon intelligence across your entire logistics network." />
    </div>
  );
}

// ─── SOLUTIONS PAGE ────────────────────────────────────────────────────────────
function SolutionsPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60, textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Industry-Specific Solutions. <span className="gradient-text">AI-Powered Results.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Every industry has unique logistics challenges. WebXpress adapts to yours with purpose-built AI capabilities.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <span className="badge" style={{ display: "block", width: "fit-content", margin: "0 auto 20px" }}>Industries</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            Choose Your <span className="gradient-text">Industry</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {SOLUTIONS.map(s => (
              <div key={s.title} className="card-hover" style={{ padding: "32px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                <div style={{ marginTop: 20 }}><span className="btn-ghost">Learn More →</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Not Sure Where to <span className="gradient-text">Start?</span></>} sub="Talk to our solutions team. We'll map your logistics challenges and show you exactly how WebXpress fits your operations." />
    </div>
  );
}

// ─── CUSTOMERS PAGE ────────────────────────────────────────────────────────────
function CustomersPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60, textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            <span className="gradient-text">Partnering with Forward-Thinking Enterprises</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Trusted by enterprises across FMCG, express logistics, trading, automotive, and healthcare.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
            {CUSTOMERS.map(c => (
              <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>{c.slice(0, 2).toUpperCase()}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 16 }}>
            Industries We <span className="gradient-text">Serve</span>
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
            {["FMCG & Consumer Goods", "Express & Courier", "Trading & Distribution", "Automotive", "Healthcare & Pharma"].map(ind => (
              <div key={ind} className="card" style={{ padding: "16px 24px", fontSize: 14, fontWeight: 600 }}>{ind}</div>
            ))}
          </div>

          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            What Our Customers <span className="gradient-text">Say</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.company} className="card" style={{ padding: "28px 32px", display: "flex", flexDirection: "column" }}>
                <p className="testimonial-quote" style={{ flex: 1, marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="font-display" style={{ fontWeight: 700, fontSize: 12, color: "var(--accent)" }}>{t.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Join These <span className="gradient-text">Forward-Thinking Enterprises</span></>} sub="Discover how WebXpress can transform your logistics operations with AI." />
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 60, textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Built for What Logistics <span className="gradient-text">Becomes Next</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            WebXpress exists at the intersection of deep logistics domain expertise and AI.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 32 }}>
            Who We <span className="gradient-text">Are</span>
          </h2>
          <div className="card" style={{ padding: "40px 48px", maxWidth: 820, margin: "0 auto" }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)" }}>
              The logistics industry is at an inflection point. AI is not an incremental improvement — it&apos;s a fundamental shift in how every business activity gets done. WebXpress exists at the intersection of deep logistics domain expertise and AI. Our AI-trained, forward-deployed engineers don&apos;t just understand machine learning — they understand manifests, loading sheets, DRS cycles, hub-and-spoke networks, and why your vendor billing never reconciles. We are headquartered in Mumbai with operations across India, SE Asia, and MENA, serving 50+ enterprise customers.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            What Drives <span className="gradient-text">Us</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { title: "Domain Depth Not Surface Knowledge", desc: "Our engineers understand manifests, loading sheets, hub-and-spoke networks, and why your vendor billing never reconciles — not just algorithms." },
              { title: "Customer Outcomes Not Feature Lists", desc: "Every capability we build answers one question: what does this do for the customer's operations?" },
              { title: "AI with Purpose", desc: "We deploy AI where it creates real operational impact — not as a buzzword, but as a force multiplier for logistics teams." },
            ].map(item => (
              <div key={item.title} className="card-hover" style={{ padding: "28px" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-glow)", marginBottom: 16 }} />
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
            <span className="gradient-text">Leadership</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {[
              { name: "Apurva Mankad", role: "Co-Founder & CEO", bio: "Engineer with Post-Graduation in Management from Mumbai University. Passionate about leveraging AI for measurable productivity gains in logistics. Started in e-commerce at Satyam Infoway and Infosys before founding ECFY Consulting.", quote: "AI will do to logistics what GPS did to navigation — make the old way unthinkable. The companies that move now won't just be more efficient. They'll be playing a different game entirely." },
              { name: "Nehal Mankad", role: "Co-Founder & Director", bio: "Engineer from MS University of Baroda with extensive experience in manufacturing and logistics operations. Brings deep expertise in business planning, operations audit, and process re-engineering.", quote: null },
            ].map(p => (
              <div key={p.name} className="card" style={{ padding: "40px", textAlign: "center" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #F59E0B)", padding: 3, margin: "0 auto 20px" }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="font-display" style={{ fontWeight: 700, fontSize: 22, color: "var(--accent)" }}>{p.name.split(" ").map(w => w[0]).join("")}</span>
                  </div>
                </div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{p.name}</h3>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--accent-secondary)", marginBottom: 16 }}>{p.role}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: p.quote ? 20 : 0 }}>{p.bio}</p>
                {p.quote && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, fontSize: 13, fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    &ldquo;{p.quote}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} titleNode={<>Let&apos;s Build the Future of <span className="gradient-text">Logistics Together</span></>} sub="Discover how WebXpress can transform your operations with AI-powered logistics intelligence." />
    </div>
  );
}

// ─── DEMO PAGE ─────────────────────────────────────────────────────────────────
function DemoPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", website: "", jobTitle: "", companySize: "", industry: "", volume: "", challenges: "", source: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="page-fade" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Demo Requested!</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>Our team will reach out within 24 hours to schedule your personalized demo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade">
      <section className="hero-wash" style={{ paddingTop: 120, paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            Let&apos;s Talk About Where AI Can <span className="gradient-text">Transform Your Operations</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>Tell us about your logistics operation. We&apos;ll show you exactly where AI makes the biggest impact.</p>
        </div>
      </section>

      <section className="section-padding">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 32 }}>
            <form className="card" style={{ padding: "40px" }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Company Name", "company", "text", true], ["Company Website", "website", "url", true], ["Full Name", "name", "text", true], ["Work Email", "email", "email", true], ["Phone / WhatsApp", "phone", "tel", true], ["Job Title", "jobTitle", "text", false]].map(([label, key, type, req]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>
                      {label}{req && <span style={{ color: "#EF4444" }}> *</span>}
                    </label>
                    <input type={type} required={req} className="form-input" placeholder={label} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>Company Size</label>
                  <select className="form-select" value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })}>
                    <option value="">Select size</option>
                    {["1-50", "51-200", "201-500", "500+"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>Industry</label>
                  <select className="form-select" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                    <option value="">Select industry</option>
                    {["Logistics/3PL", "Manufacturing", "Retail", "FMCG", "Healthcare", "Automotive", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 10 }}>Products You&apos;re Interested In</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["TMS", "WMS", "Visibility & Control Tower", "GreenXpress", "AI & Innovation"].map(p => (
                      <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--text-secondary)" }}>
                        <input type="checkbox" style={{ accentColor: "var(--accent)", width: 16, height: 16 }} /> {p}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>Monthly Shipment Volume</label>
                  <select className="form-select" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })}>
                    <option value="">Select volume</option>
                    {["<1000", "1,000 - 10,000", "10,000 - 50,000", "50,000+", "Not sure"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>How Did You Hear About Us?</label>
                  <select className="form-select" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
                    <option value="">Select</option>
                    {["LinkedIn", "Google", "Referral", "Event", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>Current Challenges</label>
                  <textarea rows={4} className="form-input" placeholder="Tell us about your biggest logistics challenges..." value={form.challenges} onChange={e => setForm({ ...form, challenges: e.target.value })} style={{ resize: "vertical" }} />
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px" }}>Request Your Demo →</button>
              </div>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="card" style={{ padding: "28px" }}>
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>What to Expect</h3>
                {["Personalized demo of relevant modules", "AI capability assessment for your operations", "Implementation roadmap and timeline"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: "var(--accent)" }}>✓</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: "28px" }}>
                <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Get in Touch Directly</h3>
                {[{ label: "Email", val: "business@webxpress.in", icon: "✉" }, { label: "Phone", val: "+91 7045697036", icon: "📞" }].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>{c.icon}</div>
                    <div>
                      <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{c.label}</p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--accent-secondary)" }}>{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "ai": return <AIPage setPage={setPage} />;
      case "platform": return <PlatformPage setPage={setPage} />;
      case "tms": return <TMSPage setPage={setPage} />;
      case "wms": return <WMSPage setPage={setPage} />;
      case "visibility": return <VisibilityPage setPage={setPage} />;
      case "greenxpress": return <GreenXpressPage setPage={setPage} />;
      case "solutions": return <SolutionsPage setPage={setPage} />;
      case "customers": return <CustomersPage setPage={setPage} />;
      case "about": return <AboutPage setPage={setPage} />;
      case "demo": return <DemoPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar setPage={setPage} />
        <main style={{ flex: 1 }}>{renderPage()}</main>
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
