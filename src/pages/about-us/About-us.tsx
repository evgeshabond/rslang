import React from 'react';
import styles from './about-us.module.css';
import roman from '../../assets/images/Roman.jpg';

export const AboutUs: React.FC = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>О команде.</h2>
    <div className={styles.inner}>
      <div className={styles.person}>
        <img
          className={styles.image}
          src={roman}
          width="100px"
          height="100px"
          alt="Roman"
        />
        <div className={styles.text__wrapper}>
          <h3 className={styles.name}>Роман:</h3>
          <p className={styles.text}>
            Разработка мини-игры "Конструктор", страниц "Cтартовой" и "О
            Команде". Подключение "Графика", "Выбор уровня", "FullScreen".
          </p>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Rrroman"
          >
            https://github.com/Rrroman
          </a>
        </div>
      </div>
    </div>
  </div>
);
