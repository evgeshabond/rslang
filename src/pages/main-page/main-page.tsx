import React from 'react';
import { Link } from 'react-router-dom';
import styles from './main-page.module.css';
import buttonStyles from '../../components/button-main/button-main.module.css';
import { mainPath } from '../../utils/constants';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { AudioOnButton } from '../../components/button-icons/audiOn-button/audioOn-button';
import { CloseButton } from '../../components/button-icons/close-button/close-button';
import { HeardIcon } from '../../components/button-icons/heard-icon/heard-icon';
import { LevelIcon } from '../../components/button-icons/level-icons/level-icons';
import { PauseButton } from '../../components/button-icons/pause-button/pause-button';
import { QuestionButton } from '../../components/button-icons/question-button/question-button';
import { RefreshButton } from '../../components/button-icons/refresh-button.tsx/refresh-button';
import { SettingsButton } from '../../components/button-icons/settings-button/settings-button';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';

const MainPage: React.FC = () => {
  console.log('main');
  return (

    <div className={styles['main-wrapper']}>
      <div className={styles['main-header']}>
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
      <div className={styles['main-button-container']}>
        <CloseButton buttonClick={() => console.log('click')} />
        <PauseButton buttonClick={() => console.log('click')} />
        <AudioOnButton buttonClick={() => console.log('click')} />
        <QuestionButton buttonClick={() => console.log('click')} />
        <RefreshButton buttonClick={() => console.log('click')} />
        <SettingsButton buttonClick={() => console.log('click')} />
        <QuestionButton buttonClick={() => console.log('click')} />
        <PlayButton buttonClick={() => console.log('click')} />
        <HeardIcon type={0} buttonClick={() => console.log('click')} />
        <HeardIcon type={1} />
        <LevelIcon
          type={0}
          number={1}
          buttonClick={() => console.log('click')}
        />
        <LevelIcon type={1} number={2} />
      </div>
      <MainCat />
    </div>
  );
};

export { MainPage };
