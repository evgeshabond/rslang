import React from 'react';
import styles from './sprint-game.module.css';
import FirstTable from './FIrstTable';

const SprintGame: React.FC = () => (
  <div className={styles.sprint__game}>
    <FirstTable />
  </div>
);

export default SprintGame;
