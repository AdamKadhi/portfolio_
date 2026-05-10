import styles from './Navbar.module.css';

const links = [
  { id: 'github',   href: 'https://github.com/AdamKadhi',                        label: 'GitHub'    },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/adam-kadhi-1b9b4b2b4/',   label: 'LinkedIn'  },
  { id: 'facebook', href: 'https://www.facebook.com/adam.kadhi.10',              label: 'Facebook'  },
  { id: 'whatsapp', href: 'https://wa.me/21625180326',                           label: 'WhatsApp'  },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.logo} aria-label="Home">
        <span className={styles.monogram}>AK</span>
      </a>
      <div className={styles.nav}>
        <div className={styles.icons}>
          {links.map(({ id, href, label }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={styles.iconLink}
            >
              <svg width="24" height="24" aria-hidden>
                <use href={`/icons.svg#${id}`} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
