import React from 'react';
import styles from './sprint-game.module.css';

const FirstTable: React.FC = () => (
  <div className={styles.first__table}>
    <div className={styles.game__title}>
      {/* <h2>СПРИНТ</h2> и тут тоже оидн компнент для двух игр только название другое */}
      <p className={styles.subtitle}>
       {/* text={text} один компонент для двух игр */}
      </p>
      {/* <button type='button'>PLAY</button> здесь аналогично */}
    </div>
  </div>
);

export default FirstTable;
