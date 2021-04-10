import React from 'react';
import styles from './about-us.module.css';

export const AboutUs: React.FC = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>О команде.</h2>
    <p className={styles.text}>
      Роман: “Мне 31, я живу в Украине и моя цель стать - FRONT END
      разработчиком. До курса React, я закончил - RS School JS FRONT END. После
      прохождения курса JS было проще оценить и понять плюсы реакта. Очень
      понравилась работа в команде. За время обучения узнал много нового, хотя
      еще очень многому и предстоит научиться”.
    </p>
  </div>
);
