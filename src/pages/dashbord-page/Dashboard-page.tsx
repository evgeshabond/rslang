import React from 'react';
import { DashboardDictionary } from '../../components/dashboard-components/dictonary-block/Dashboard-dictonary';
import DashboardProfile from '../../components/dashboard-components/dashboar-profile/dashboard-profile';
import styles from './dashboard-page.module.css';
import { DashboardGame } from '../../components/dashboard-components/dashboard-game/Dashboard-game';

const DashboardPage: React.FC = () => {
  console.log('dashboard');
  return (
    <div className={styles.container}>
      <div className={styles['block-wrapper']}>
        <DashboardDictionary />
      </div>
      <div className={styles['block-wrapper']}>
        <DashboardProfile />
      </div>
      <div className={styles['block-wrapper']}>
        <DashboardGame />
      </div>
    </div>
  );
};

export { DashboardPage };
