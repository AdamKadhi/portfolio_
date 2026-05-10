import { useState, useRef } from 'react';
import { DecoderText, Divider, useInViewport } from './utils.jsx';
import styles from './Profile.module.css';

/* ── PROFILE IMAGE with reveal sweep + placeholder ───── */
function ProfileImage() {
  const [loaded,           setLoaded]           = useState(false);
  const [showPlaceholder,  setShowPlaceholder]  = useState(true);
  const ref    = useRef();
  const inView = useInViewport(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className={styles.imageReveal} data-visible={inView}>
      {/* Accent sweep overlay lives on ::before via CSS */}

      {/* img wrapper fades in after the sweep */}
      <div className={styles.imgWrap} data-visible={inView}>
        {showPlaceholder && (
          <img
            aria-hidden
            className={styles.placeholder}
            data-loaded={loaded}
            src="/profile-placeholder.jpg"
            alt=""
            onTransitionEnd={() => loaded && setShowPlaceholder(false)}
          />
        )}
        <img
          className={styles.img}
          data-loaded={loaded}
          onLoad={() => { setLoaded(true); }}
          src="/profile.jpg"
          srcSet="/profile.jpg 480w, /profile-large.jpg 960w"
          sizes="(max-width: 696px) 100vw, 480px"
          alt="Adam Kadhi"
          decoding="async"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ── PROFILE SECTION ─────────────────────────────────── */
export default function Profile() {
  const sectionRef = useRef();
  const [focused,  setFocused] = useState(false);
  const inView   = useInViewport(sectionRef, { threshold: 0.15 });
  const visible  = inView || focused;

  return (
    <section
      className={styles.profile}
      id="about"
      ref={sectionRef}
      tabIndex={-1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={styles.content}>

        {/* ── LEFT COLUMN ─────────────────────────── */}
        <div className={styles.column}>
          <h2 className={styles.title} data-visible={visible}>
            <DecoderText text="Hi there" start={visible} delay={500} />
          </h2>

          <p className={styles.description} data-visible={visible}>
            I'm Adam, a full-stack web &amp; mobile developer. I build performant, accessible
            applications with modern JavaScript, React, and Node.js. If you're interested in the
            tools and software.
          </p>

          <p className={styles.description} data-visible={visible} style={{ '--desc-delay': '0.6s' }}>
            I'm available for freelance work — whether it's building a web app from scratch,
            crafting a mobile experience, or bringing your design to life. Feel free to drop me
            a line.
          </p>

          <a className={styles.button} data-visible={visible} href="#contact">
            <svg width="20" height="20" fill="currentColor" aria-hidden>
              <use href="/icons.svg#send" />
            </svg>
            Send me a message
          </a>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────── */}
        <div className={styles.column}>
          <div className={styles.tag} aria-hidden>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!visible}
              collapseDelay={1000}
            />
            <span className={styles.tagText} data-visible={visible}>About me</span>
          </div>

          <div className={styles.imageWrap}>
            <ProfileImage />
            <svg
              className={styles.svg}
              data-visible={visible}
              viewBox="0 0 136 766"
              aria-hidden
            >
              <use href="/katakana.svg#katakana-profile" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
