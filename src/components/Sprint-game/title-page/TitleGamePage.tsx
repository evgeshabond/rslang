import React from 'react';
import { ReactComponent as Cat2 } from '../../../assets/images/cat2.svg';

import styles from './title-game-page.module.css';
import playIcon from '../../../assets/images/play-big.svg';

type Props = {
  gameTitle: string;
  gameDescription: string;

  buttonClick: () => void;
};

export const TitleGamePage: React.FC<Props> = ({
  gameTitle,
  gameDescription,
  buttonClick,
}) => (
  <div className={styles.game__wrapper}>
    <h2>{gameTitle}</h2>
    <p>{gameDescription}</p>
    <div className={styles.cat__img1}>
      <Cat2 />
    </div>

    <button type="button" onClick={buttonClick} className={styles['play-button']}>
      {' '}
      <img src={playIcon} alt="play" />
    </button>
  </div>
);
