import React from 'react';
import styles from './sprint-game.module.css';

const FirstTable: React.FC = () => (
  <div className={styles.first__table}>
    <div className={styles.game__title}>
      <h2>СПРИНТ</h2>
      <p className={styles.subtitle}>
        Это тренировка для повторения заученных слов из вашего словаря. выберите
        соответствует ли перевод предложенному слову.
      </p>
      <button type='button'>PLAY</button>
    </div>
  </div>
);

export default FirstTable;
