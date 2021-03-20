import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => (
  <footer>
    <div className={styles.wrapper__circle} />
    <div className={styles.wrapper}>
      <button
        type="button"
        aria-label="Bottom-menu"
        className={styles['menu-btn']}
      >
        <div className={styles['menu-btn__inner']} />
      </button>
    </div>
  </footer>
);
