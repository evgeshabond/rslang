import React from 'react';
import { Link } from 'react-router-dom';
import styles from './main-page.module.css';
import buttonStyles from '../../components/button-main/button-main.module.css';
import { mainPath } from '../../utils/constants';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import AudioGame from '../../components/AudioGame/AudioGame';

const MainPage: React.FC = () => {
  console.log('main');
  return (

    <div className={styles['main-wrapper']}>
      {/* <div className={styles['main-header']}>
        Самый быстрый способ
        <br /> выучить английский язык
      </div>
      <div className={styles['main-text']}>
        Какой? Естественный подход к изучению реального языка. Заходите и
        попробуйте!
      </div>
      <div className={styles['main-button-container']}>
        <Link to={mainPath.auth} className={buttonStyles['main-button']}>
          Приступить
        </Link>
        <Link to="/" className={buttonStyles['main-button']}>
          Узнать больше
        </Link>
      </div>
        <MainCat /> */}
      {/* <AudioGame /> */}
    </div>
  );
};

export { MainPage };
