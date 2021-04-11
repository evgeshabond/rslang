import React from 'react';
import { Link } from 'react-router-dom';
import { mainPath } from '../../utils/constants';
import styles from './start-page.module.css';
import { ReactComponent as Paw } from '../../assets/images/pawprint.svg';
import { ReactComponent as Base } from '../../assets/images/base.svg';
import { ReactComponent as MiniGames } from '../../assets/images/mini-games.svg';
import { ReactComponent as Darts } from '../../assets/images/darts.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings-icon.svg';
import { ReactComponent as Steps } from '../../assets/images/steps.svg';

export const StartPage: React.FC = () => (
  <div className={styles.start}>
    <div className={styles.start__wrapper}>
      <h1 className={styles.title}>
        Учите новые слова легко с приложением Smart Cat!
      </h1>
      <Link className={styles.paw} to={mainPath.dashboardPage}>
        <Paw className={styles.paw__icon} width={30} height={30} />
      </Link>
      <h2 className={styles['sub-title']}>Начать</h2>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <Base />
          <span className={styles.list__text}>
            Большая база слов 3600 разбитых по уровням
          </span>
        </li>
        <li className={styles.list__item}>
          <MiniGames />
          <span className={styles.list__text}>
            Запоминай слова играя в мини-игры
          </span>
        </li>
        <li className={styles.list__item}>
          <Darts />
          <span className={styles.list__text}>
            Определи свой уровень знания языка
          </span>
        </li>
        <li className={styles.list__item}>
          <SettingsIcon />
          <span className={styles.list__text}>Настрой приложение для себя</span>
        </li>
        <li className={styles.list__item}>
          <Steps />
          <span className={styles.list__text}>Отслеживай свои прогресс</span>
        </li>
      </ul>
      <h2 className={styles['sub-title']}>
        Ознакомься с возможностями приложения подробнее
      </h2>
      <div className={styles.video}>Video...</div>
    </div>
  </div>
);
