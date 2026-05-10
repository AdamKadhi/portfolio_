import { useRef } from 'react';
import { Divider, useInViewport } from './utils.jsx';
import styles from './Projects.module.css';

/* ─────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────── */
const projects = [
  {
    index: 1,
    title: 'Web Development',
    description:
      'From landing pages to full-scale platforms — I build fast, responsive, and visually sharp web apps with clean code, great performance, and a user experience that actually converts.',
    device: 'laptop',
    screenSrc: '/screen1.mp4',
    alternate: false,
  },
  {
    index: 2,
    title: 'Mobile Development',
    description:
      'iOS and Android apps that feel truly native. Smooth animations, real-time features, offline support — built cross-platform without cutting corners on performance or polish.',
    device: 'phone',
    phone1Src: '/screen2.png',
    phone2Src: '/screen3.png',
    alternate: true,
  },
  {
    index: 3,
    title: 'Full-Stack Solutions',
    description:
      'Frontend, backend, database, deployment — I handle the full picture. One developer, one vision, no gaps. APIs, auth, CI/CD, and a seamless UI, all shipped as a complete product.',
    device: 'laptop',
    screenSrc: '/screen4.mp4',
    alternate: false,
  },
];

/* ─────────────────────────────────────────────────────
   LAPTOP MOCKUP  (pure CSS 3D)
   Lid opens via CSS transition on rotateX.
   Mouse hover adds subtle tilt via CSS variables.
───────────────────────────────────────────────────── */
function LaptopMockup({ screenSrc, visible }) {
  const sceneRef = useRef();
  const groupRef = useRef();

  function onMouseMove(e) {
    const r = sceneRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left)  / r.width  - 0.5) * 12;
    const y = ((e.clientY - r.top)   / r.height - 0.5) * 8;
    groupRef.current.style.setProperty('--tx', `${y}deg`);
    groupRef.current.style.setProperty('--ty', `${x}deg`);
  }
  function onMouseLeave() {
    groupRef.current.style.setProperty('--tx', '0deg');
    groupRef.current.style.setProperty('--ty', '0deg');
  }

  const isVideo = screenSrc && screenSrc.endsWith('.mp4');

  return (
    <div
      className={styles.laptopScene}
      ref={sceneRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.laptopGroup} ref={groupRef}>

        {/* LID */}
        <div className={styles.lid} data-open={visible}>
          <div className={styles.lidFront}>
            <div className={styles.laptopScreen}>
              {screenSrc && isVideo && (
                <video src={screenSrc} autoPlay loop muted playsInline className={styles.screenMedia} />
              )}
              {screenSrc && !isVideo && (
                <img src={screenSrc} alt="" className={styles.screenMedia} />
              )}
            </div>
            <div className={styles.camera} />
          </div>
          <div className={styles.lidBack} />
        </div>

        {/* BASE */}
        <div className={styles.laptopBase}>
          <div className={styles.keyboard}>
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className={styles.key} />
            ))}
          </div>
          <div className={styles.trackpad} />
          <div className={styles.baseEdge} />
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   PHONE MOCKUP  (pure CSS 3D)
   Two phones spring up from y+80px when visible.
───────────────────────────────────────────────────── */
const PHONES = [
  { x: '-72px', y: '56px',  r: '-8deg',  delay: '0s',    src: null },
  { x:  '72px', y: '-56px', r:  '8deg',  delay: '0.15s', src: null },
];

function PhoneMockup({ phone1Src, phone2Src, visible }) {
  const phones = [
    { ...PHONES[0], src: phone1Src },
    { ...PHONES[1], src: phone2Src },
  ];

  return (
    <div className={styles.phoneGroup}>
      {phones.map(({ x, y, r, delay, src }, i) => {
        const isVideo = src && src.endsWith('.mp4');
        return (
          <div
            key={i}
            className={styles.phoneWrap}
            data-visible={visible}
            style={{ '--px': x, '--py': y, '--pr': r, '--pd': delay }}
          >
            <div className={styles.phone}>
              <div className={styles.notch} />
              <div className={styles.phoneScreen}>
                {src && isVideo && (
                  <video src={src} autoPlay loop muted playsInline className={styles.screenMedia} />
                )}
                {src && !isVideo && (
                  <img src={src} alt="" className={styles.screenMedia} />
                )}
              </div>
              <div className={styles.homeBar} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   PROJECT SECTION
───────────────────────────────────────────────────── */
function ProjectSection({ index, title, description, device, screenSrc, phone1Src, phone2Src, alternate }) {
  const sectionRef = useRef();
  const visible    = useInViewport(sectionRef, { threshold: 0.15 });
  const indexText  = index < 10 ? `0${index}` : `${index}`;

  const details = (
    <div className={styles.details}>
      <div className={styles.index} aria-hidden>
        <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} collapseDelay={1000} />
        <span className={styles.indexNumber} data-visible={visible}>{indexText}</span>
      </div>
      <h2 className={styles.title} data-visible={visible}>{title}</h2>
      <p  className={styles.description} data-visible={visible}>{description}</p>
    </div>
  );

  const preview = (
    <div className={styles.preview}>
      {device === 'laptop' && <LaptopMockup screenSrc={screenSrc} visible={visible} />}
      {device === 'phone'  && <PhoneMockup  phone1Src={phone1Src} phone2Src={phone2Src} visible={visible} />}
      <svg
        className={styles.katakana}
        data-visible={visible}
        data-device={device}
        viewBox="0 0 751 136"
        aria-hidden
      >
        <use href="/katakana.svg#katakana-project" />
      </svg>
    </div>
  );

  return (
    <section
      className={styles.section}
      data-alternate={alternate}
      data-first={index === 1}
      ref={sectionRef}
      id={`project-${index}`}
    >
      <div className={styles.content}>
        {alternate ? <>{preview}{details}</> : <>{details}{preview}</>}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <>
      {projects.map(p => (
        <ProjectSection key={p.index} {...p} />
      ))}
    </>
  );
}
