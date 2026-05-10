import { useState, useRef, useId } from 'react';
import emailjs from '@emailjs/browser';
import { DecoderText, Divider, useInViewport } from './utils.jsx';
import styles from './Contact.module.css';

const SERVICE_ID  = 'service_2599sla';
const TEMPLATE_ID = 'template_7xqo197';
const PUBLIC_KEY  = '0dLxM8DPS89_eqr1g';
const EMAIL       = 'contact@kadhiadam.dev';
const MAX_EMAIL   = 512;
const MAX_MSG     = 4096;
const EMAIL_RE    = /(.+)@(.+){2,}\.(.+){2,}/;

/* ── FLOATING LABEL INPUT ────────────────────────────── */
function FloatingInput({ label, type = 'text', autoComplete, value, onChange, maxLength, delay, visible }) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  return (
    <div className={styles.inputWrap} data-visible={visible} style={{ '--delay': delay }}>
      <label
        className={styles.label}
        htmlFor={id}
        data-filled={!!value}
        data-focused={focused}
      >
        {label}
      </label>
      <input
        id={id}
        className={styles.inputField}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
      />
      <div className={styles.underline} data-focused={focused} />
    </div>
  );
}

/* ── AUTO-GROW TEXTAREA ──────────────────────────────── */
function FloatingTextarea({ label, value, onChange, maxLength, delay, visible }) {
  const [focused, setFocused] = useState(false);
  const ref = useRef();
  const id  = useId();

  function handleChange(e) {
    onChange(e);
    const el = ref.current;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  return (
    <div className={`${styles.inputWrap} ${styles.textareaWrap}`} data-visible={visible} style={{ '--delay': delay }}>
      <label
        className={styles.label}
        htmlFor={id}
        data-filled={!!value}
        data-focused={focused}
      >
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        className={`${styles.inputField} ${styles.textarea}`}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        rows={1}
      />
      <div className={styles.underline} data-focused={focused} />
    </div>
  );
}

/* ── CONTACT SECTION ─────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef();
  const visible    = useInViewport(sectionRef, { threshold: 0.1 });

  const [emailVal,  setEmailVal]  = useState('');
  const [msgVal,    setMsgVal]    = useState('');
  const [sending,   setSending]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const [copied,    setCopied]    = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!emailVal || !EMAIL_RE.test(emailVal)) errs.email = 'Please enter a valid email address.';
    if (!msgVal)                               errs.message = 'Please enter a message.';
    if (emailVal.length > MAX_EMAIL)           errs.email = `Email must be shorter than ${MAX_EMAIL} characters.`;
    if (msgVal.length > MAX_MSG)               errs.message = `Message must be shorter than ${MAX_MSG} characters.`;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name:    emailVal,
        email:   emailVal,
        message: msgVal,
        title:   'Portfolio Contact',
        time:    new Date().toLocaleString(),
      }, PUBLIC_KEY);
      setSuccess(true);
    } catch {
      setErrors({ message: 'Failed to send message, please try again.' });
    } finally {
      setSending(false);
    }
  }

  const errorText = errors.email || errors.message;

  return (
    <section className={styles.contact} id="contact" ref={sectionRef}>

      {/* ── FORM layer ─────────────────────────────── */}
      <div className={`${styles.layer} ${success ? styles.out : styles.in}`}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          <h1 className={styles.title} data-visible={visible} style={{ '--delay': '0.1s' }}>
            <DecoderText text="Say hello" start={visible} delay={300} />
          </h1>

          <p className={styles.emailLine} data-visible={visible} style={{ '--delay': '0.2s' }}>
            or reach me at{' '}
            <button type="button" className={styles.emailLink} onClick={copyEmail}>
              {copied ? 'Copied!' : EMAIL}
            </button>
          </p>

          <div className={styles.dividerWrap} data-visible={visible} style={{ '--delay': '0.3s' }}>
            <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} collapseDelay={300} />
          </div>

          <FloatingInput
            label="Your email"
            type="email"
            autoComplete="email"
            value={emailVal}
            onChange={e => setEmailVal(e.target.value)}
            maxLength={MAX_EMAIL}
            delay="0.4s"
            visible={visible}
          />

          <FloatingTextarea
            label="Message"
            value={msgVal}
            onChange={e => setMsgVal(e.target.value)}
            maxLength={MAX_MSG}
            delay="0.5s"
            visible={visible}
          />

          {errorText && (
            <div className={styles.formError}>
              <svg width="24" height="24" fill="currentColor" aria-hidden>
                <use href="/icons.svg#error" />
              </svg>
              {errorText}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            data-visible={visible}
            data-sending={sending}
            disabled={sending}
            style={{ '--delay': '0.6s' }}
          >
            <svg width="24" height="24" fill="currentColor" className={styles.buttonIcon} aria-hidden>
              <use href="/icons.svg#send" />
            </svg>
            <span className={styles.buttonText}>
              {sending ? 'Sending…' : 'Send message'}
            </span>
          </button>

        </form>
      </div>

      {/* ── SUCCESS layer ──────────────────────────── */}
      <div className={`${styles.layer} ${success ? styles.in : styles.hiddenLayer}`} aria-live="polite">
        <div className={styles.complete}>
          <h3 className={styles.completeTitle} data-success={success}>
            Message Sent
          </h3>
          <p className={styles.completeText} data-success={success} style={{ '--delay': '0.2s' }}>
            I'll get back to you within a couple days, sit tight
          </p>
        </div>
      </div>

    </section>
  );
}
