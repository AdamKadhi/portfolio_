import { useState, useEffect, useRef } from 'react';
import { DecoderText } from './utils.jsx';
import styles from './Intro.module.css';
import bgVideo from '../public/bggg.mp4';
/* ── CONFIG ──────────────────────────────────────────── */
const NAME        = 'Adam Kadhi';
const ROLE        = 'Developer';
const DISCIPLINES = ['Web', 'Mobile', 'Designer'];

/* ── INTERVAL HOOK ───────────────────────────────────── */
function useInterval(fn, ms) {
  const cb = useRef(fn);
  useEffect(() => { cb.current = fn; });
  useEffect(() => {
    const id = setInterval(() => cb.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

/* ── ACTIVE DISCIPLINE WORD ──────────────────────────── */
// Mounts fresh on each new `key` → CSS animation always starts from scratch.
// Internally transitions entering → entered after 3000ms (same as original).
function ActiveWord({ text }) {
  const [status, setStatus] = useState('entering');
  useEffect(() => {
    const t = setTimeout(() => setStatus('entered'), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <span
      className={styles.word}
      data-plus="true"
      data-status={status}
      style={{ '--delay': '0.6s' }}
      aria-hidden
    >
      {text}
    </span>
  );
}

/* ── INTRO ───────────────────────────────────────────── */
export default function Intro() {
  const [visible,     setVisible]     = useState(false);
  const [roleStatus,  setRoleStatus]  = useState('entering');
  const [discIndex,   setDiscIndex]   = useState(0);
  const [cycleCount,  setCycleCount]  = useState(0);
  const [exitingDisc, setExitingDisc] = useState(null);
  const exitTimer = useRef();

  useEffect(() => {
    // Name fades in right away; Developer word needs full 3000ms in 'entering'
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setRoleStatus('entered'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useInterval(() => {
    // Send current discipline to exiting, remove it after 2000ms
    setExitingDisc(DISCIPLINES[discIndex]);
    clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExitingDisc(null), 2000);

    setDiscIndex(i => (i + 1) % DISCIPLINES.length);
    setCycleCount(c => c + 1);
  }, 5000);

  return (
    <section className={styles.intro}>
      <video className={styles.bgVideo} src={bgVideo} autoPlay loop muted playsInline />
      <div className={styles.bgOverlay} />

      <header className={styles.text}>
        <p className={styles.name} data-visible={visible}>
          <DecoderText text={NAME} start={visible} delay={500} />
        </p>

        <h1 className={styles.title} aria-label={`${ROLE} + ${DISCIPLINES.join(', ')}`}>
          {/* Row 1 — Developer + horizontal line */}
          <span className={styles.row}>
            <span className={styles.word} data-status={roleStatus} style={{ '--delay': '0.2s' }}>
              {ROLE}
            </span>
            <span className={styles.line} data-status={roleStatus} />
          </span>

          {/* Row 2 — cycling discipline */}
          <span className={styles.row}>
            {/* Exiting discipline fades out absolutely */}
            {exitingDisc && (
              <span className={styles.word} data-plus="true" data-status="exiting" aria-hidden>
                {exitingDisc}
              </span>
            )}
            {/* Fresh remount each cycle forces CSS animation to replay */}
            <ActiveWord
              key={`${DISCIPLINES[discIndex]}-${cycleCount}`}
              text={DISCIPLINES[discIndex]}
            />
          </span>
        </h1>
      </header>
    </section>
  );
}
