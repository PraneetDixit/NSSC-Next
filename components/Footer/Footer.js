import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
    <div id={styles.preFooter}>
      <div id={styles.mario}></div>
    </div>
    <footer className={styles.footer}>
        <div id={styles.footerLogo} className="pricedown">NSSC</div>
        <div id={styles.footerText}>
          <div id={styles.copy}>
          © 2025 NSSC. All rights reserved.
          </div>
          <div id={styles.credits}>Developed and maintained by <a href='https://praneetdixit.netlify.app' target='_blank' rel="noopener noreferrer">Praneet Dixit</a></div>
          </div>
    </footer>
    </>
  )
}
