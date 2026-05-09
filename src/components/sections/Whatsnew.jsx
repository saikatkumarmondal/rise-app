import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import oneImg from "../../assets/one.jpg";
import twoImg from "../../assets/two.jpg";
import threeImg from "../../assets/three.jpg";

const articles = [
  {
    id: 1,
    image: oneImg,
    author: "Ray Saddiq",
    readTime: "3 mins",
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    tag: null,
  },
  {
    id: 2,
    image: twoImg,
    author: "Ray Saddiq",
    readTime: "2 mins",
    title: "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    tag: null,
  },
  {
    id: 3,
    image: threeImg,
    author: "Carrie Rose",
    readTime: "2 mins",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    tag: "News",
  },
];

/* ─── Green circle cursor with left arrow ─── */
const GreenCursor = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* drop shadow */}
    <circle cx="34" cy="34" r="28" fill="rgba(0,0,0,0.18)" />
    {/* green circle */}
    <circle cx="32" cy="32" r="28" fill="#22c55e" />
    {/* inner subtle ring */}
    <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    {/* left-pointing arrow */}
    <path
      d="M36 22 L24 32 L36 42"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M24 32 H42"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ─── Clock icon ─── */
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─── Top-right arrow for button ─── */
const CornerArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

/* ─── Avatar initials ─── */
const Avatar = ({ name }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const bg = name === "Ray Saddiq" ? "#2563eb" : name === "Carrie Rose" ? "#7c3aed" : "#374151";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: "50%", background: bg,
      color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5,
    }}>
      {initials}
    </span>
  );
};

/* ════════════════════════════
   Single Article Card
════════════════════════════ */
function ArticleCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const wrapRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg = { stiffness: 280, damping: 24, mass: 0.5 };
  const cx = useSpring(rawX, cfg);
  const cy = useSpring(rawY, cfg);

  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - 32); // 32 = half of 64px cursor
    rawY.set(e.clientY - rect.top - 32);
  };

  return (
    <motion.article
      className="flex flex-col"
      style={{ cursor: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Image wrapper ── */}
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        style={{ cursor: "none" }}
        className="relative w-full rounded-2xl overflow-hidden mb-[14px]"
        // inline style for aspect ratio — Tailwind JIT may not pick up aspect-[4/3] always
        // Using style to be safe
      >
        {/* Force 4:3 ratio */}
        <div style={{ paddingBottom: "75%", position: "relative" }}>

          {/* actual photo */}
          <motion.img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* BLUR + DIM overlay — backdrop-filter blur */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
              WebkitBackdropFilter: hovered ? "blur(6px)" : "blur(0px)",
              background: hovered ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
              transition: "backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, background 0.4s ease",
            }}
          />

          {/* Framer Motion handles opacity for the overlay separately */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
          />

          {/* Green circle cursor — tracks mouse */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="cursor"
                className="absolute top-0 left-0 pointer-events-none z-30"
                style={{
                  x: cx,
                  y: cy,
                  filter: "drop-shadow(0 4px 12px rgba(34,197,94,0.5))",
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
              >
                <GreenCursor />
              </motion.div>
            )}
          </AnimatePresence>

          {/* News tag */}
          {article.tag && (
            <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-900">
              {article.tag}
            </span>
          )}
        </div>
      </div>

      {/* ── Meta chips ── */}
      <div className="flex items-center gap-2 mb-[10px]">
        <span className="flex items-center gap-[5px] bg-white border border-[#e0dedd] rounded-full px-[11px] py-[4px] pl-[7px] text-[12.5px] font-medium text-gray-700 whitespace-nowrap">
          <Avatar name={article.author} />
          {article.author}
        </span>
        <span className="flex items-center gap-[5px] bg-white border border-[#e0dedd] rounded-full px-[11px] py-[4px] pl-[7px] text-[12.5px] font-medium text-gray-700 whitespace-nowrap">
          <ClockIcon />
          {article.readTime}
        </span>
      </div>

      {/* ── Title ── */}
      <motion.p
        className="m-0 font-extrabold leading-snug tracking-tight"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(15px, 1.5vw, 19px)",
        }}
        animate={{ color: hovered ? "#16a34a" : "#111111" }}
        transition={{ duration: 0.25 }}
      >
        {article.title}
      </motion.p>
    </motion.article>
  );
}

/* ════════════════════════════
   Main Section
════════════════════════════ */
export default function WhatsNew() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap"
      />

      <section
        className="bg-[#EEECEA] w-full"
        style={{
          padding: "56px 48px 72px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-7 flex-wrap gap-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2
            className="flex items-center gap-3 m-0 font-extrabold leading-none text-gray-900"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 5vw, 64px)",
              letterSpacing: "-1.5px",
            }}
          >
            What's
            <img
              src={twoImg}
              alt="thumb"
              className="rounded-[10px] object-cover inline-block"
              style={{
                width: "clamp(44px, 5vw, 60px)",
                height: "clamp(44px, 5vw, 60px)",
                position: "relative",
                top: "-2px",
              }}
            />
            New
          </h2>

          <a
            href="#"
            className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-900 no-underline transition-all hover:bg-gray-50 hover:shadow-md"
          >
            Explore More Thoughts <CornerArrow />
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-[#d5d2cf] mb-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        />

        {/* Grid — 3 col lg, 2 col md, 1 col sm */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}