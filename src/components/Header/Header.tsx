import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => (
  <header>
    <div className={styles.wrapper}>
      <button
        type="button"
        aria-label="Top-menu"
        className={styles['menu-btn']}
      >
        <div className={styles['menu-btn__inner']} />
      </button>
    </div>
  </header>
);
