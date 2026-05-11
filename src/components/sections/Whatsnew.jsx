import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import oneImg from "../../assets/one.jpg";
import twoImg from "../../assets/two.jpg";
import threeImg from "../../assets/three.jpg";

/* ─── data ─── */
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

/* ─── Green Cursor ─── */
const GreenCursor = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="34" cy="34" r="28" fill="rgba(0,0,0,0.18)" />
    <circle cx="32" cy="32" r="28" fill="#22c55e" />
    <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.2)" />
    <path d="M36 22 L24 32 L36 42" stroke="white" strokeWidth="3.5" />
    <path d="M24 32 H42" stroke="white" strokeWidth="3.5" />
  </svg>
);

/* ─── Clock ─── */
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─── Arrow ─── */
const CornerArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Avatar ─── */
const Avatar = ({ name }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const bg = name === "Ray Saddiq" ? "#2563eb" : name === "Carrie Rose" ? "#7c3aed" : "#374151";
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full text-white text-[10px] font-bold"
      style={{ background: bg }}>
      {initials}
    </span>
  );
};

/* ─── Explore Button ─── */
function ExploreButton() {
  const btnRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const textTop = textTopRef.current;
    const textBottom = textBottomRef.current;
    const arrow = arrowRef.current;
    if (!btn || !textTop || !textBottom || !arrow) return;

    gsap.set(textBottom, { y: "120%", opacity: 0 });
    gsap.set(textTop, { y: "0%", opacity: 1 });

    const tl = gsap.timeline({ paused: true });

    tl.to(btn, { borderRadius: "8px", duration: 0.35, ease: "power2.out" }, 0)
      .to(textTop, { y: "-120%", opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
      .to(textBottom, { y: "0%", opacity: 1, duration: 0.35, ease: "power2.out" }, 0.1)
      .to(arrow, { x: 3, y: -3, duration: 0.3, ease: "power2.out" }, 0);

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  return (
    <a
      ref={btnRef}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "#fff",
        borderRadius: "999px",
        padding: "14px 32px",
        cursor: "pointer",
        textDecoration: "none",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        border: "none",
        outline: "none",
        flexShrink: 0,
      }}
    >
      <span style={{ position: "relative", overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
        <span
          ref={textTopRef}
          style={{
            display: "block",
            fontWeight: 800,
            fontSize: "clamp(14px, 1.6vw, 17px)",
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Explore More Thoughts
        </span>
        <span
          ref={textBottomRef}
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            fontWeight: 800,
            fontSize: "clamp(14px, 1.6vw, 17px)",
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Explore More Thoughts
        </span>
      </span>
      <span
        ref={arrowRef}
        style={{ display: "inline-flex", alignItems: "center", color: "#0d0d0d" }}
      >
        <CornerArrow />
      </span>
    </a>
  );
}

/* ═════════════════════ Card ═════════════════════ */
function ArticleCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const wrapRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cx = useSpring(rawX, { stiffness: 280, damping: 24 });
  const cy = useSpring(rawY, { stiffness: 280, damping: 24 });

  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - 32);
    rawY.set(e.clientY - rect.top - 32);
  };

  return (
    <motion.article
      className="flex flex-col w-full"
      style={{ cursor: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      {/* IMAGE */}
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4"
      >
        <div className="relative pb-[75%]">
          <motion.img
            src={article.image}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
              background: hovered ? "rgba(0,0,0,0.35)" : "transparent",
            }}
          />
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute top-0 left-0 pointer-events-none z-30 hidden sm:block"
                style={{ x: cx, y: cy }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <GreenCursor />
              </motion.div>
            )}
          </AnimatePresence>
          {article.tag && (
            <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold">
              {article.tag}
            </span>
          )}
        </div>
      </div>

      {/* META */}
      <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
        <span className="flex items-center gap-2 bg-white rounded-full px-3 py-1 text-[11px] sm:text-[12.5px]">
          <Avatar name={article.author} />
          {article.author}
        </span>
        <span className="flex items-center gap-2 bg-white rounded-full px-3 py-1 text-[11px] sm:text-[12.5px]">
          <ClockIcon />
          {article.readTime}
        </span>
      </div>

      {/* TITLE */}
      <motion.p
        className="font-extrabold leading-snug text-[14px] sm:text-[16px] md:text-[18px]"
        animate={{ color: hovered ? "#16a34a" : "#111" }}
      >
        {article.title}
      </motion.p>
    </motion.article>
  );
}

/* ═════════════════════ Section ═════════════════════ */
export default function WhatsNew() {
  return (
    <section className="bg-[#EEECEA] w-full px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-14 md:py-16 lg:py-[72px]">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="flex items-center gap-2 sm:gap-3 font-extrabold text-[28px] sm:text-[40px] md:text-[56px] leading-none">
          What's
          <img src={twoImg} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
          New
        </h2>

        <ExploreButton />
      </div>

      {/* DIVIDER */}
      <div className="border-t mb-6 sm:mb-8" />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </section>
  );
}