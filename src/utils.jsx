import { useState, useEffect, useRef } from 'react';

/* ── KATAKANA DECODER TEXT ───────────────────────────── */
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export function DecoderText({ text, start, delay = 0 }) {
  const [output, setOutput] = useState(() =>
    text.split('').map(c => c === ' ' ? ' ' : KATAKANA[Math.floor(Math.random() * KATAKANA.length)])
  );
  const rafRef   = useRef();
  const timerRef = useRef();

  useEffect(() => {
    if (!start) return;
    timerRef.current = setTimeout(() => {
      const startTime = performance.now();
      const duration  = 1400;
      function tick() {
        const progress      = Math.min((performance.now() - startTime) / duration, 1);
        const eased         = 1 - Math.pow(1 - progress, 3);
        const revealedCount = Math.floor(eased * text.length);
        setOutput(text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealedCount) return char;
          return KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        }));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [start, text, delay]);

  return (
    <span aria-label={text} role="presentation">
      {output.map((char, i) => <span key={i}>{char}</span>)}
    </span>
  );
}

/* ── INTERSECTION OBSERVER HOOK ──────────────────────── */
export function useInViewport(ref, { threshold = 0, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  return inView;
}

/* ── DIVIDER ─────────────────────────────────────────── */
import styles from './Divider.module.css';

export function Divider({ collapsed = false, collapseDelay = 0, notchWidth = '90px', notchHeight = '10px' }) {
  const delay    = typeof collapseDelay === 'number' ? `${collapseDelay}ms` : collapseDelay;
  const notchDly = typeof collapseDelay === 'number' ? `${collapseDelay + 160}ms` : collapseDelay;
  return (
    <div className={styles.divider} style={{ '--notchWidth': notchWidth, '--notchHeight': notchHeight }}>
      <div className={styles.line}  data-collapsed={collapsed} style={{ '--collapseDelay': delay }} />
      <div className={styles.notch} data-collapsed={collapsed} style={{ '--collapseDelay': notchDly }} />
    </div>
  );
}
