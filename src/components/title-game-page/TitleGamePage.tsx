import React from 'react';
import { PlayButton } from '../button-icons/playBig-button/playBig-button';

import { ReactComponent as Cat1 } from '../../assets/images/cat1.svg';
import { ReactComponent as Cat2 } from '../../assets/images/cat2.svg';
import { ReactComponent as Cat3 } from '../../assets/images/cat3.svg';
import styles from './title-game-page.module.css';

type Props = {
  gameTitle: string;
  gameDescription: string;
  catNumber: number;
  buttonClick: () => void;
};

export const TitleGamePage: React.FC<Props> = ({
  gameTitle,
  gameDescription,
  buttonClick,
  catNumber,
}) => {
  const renderCat = () => {
    if (catNumber === 1) {
      return <Cat1 className={styles.cat__img} />;
    }
    if (catNumber === 2) {
      return <Cat2 className={styles.cat__img} />;
    }
    if (catNumber === 3) {
      return <Cat3 className={styles.cat__img} />;
    }
    return null;
  };

  return (
    <div className={styles.game__wrapper}>
      <h2>{gameTitle}</h2>
      <p>{gameDescription}</p>
      {renderCat()}
      <PlayButton buttonClick={buttonClick} />
    </div>
  );
};
