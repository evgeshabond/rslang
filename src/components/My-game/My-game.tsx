import React from 'react';
import classes from './My-game.module.css';
import { ReactComponent as Play } from '../../assets/images/video-player-mini.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';

export const MyGame: React.FC = () => (
  <div className={classes['my-game']}>
    <h2 className={classes.title}>cвоя игра</h2>
    <p className={classes.text}>
      Это тренировка для повторения заученных слов из вашего словаря.
    </p>
    <p className={classes.text}>
      Выберите соответствует ли перевод предложенному слову.
    </p>
    <button type="button" className={classes['play-button']}>
      <Play className={classes.play} />
    </button>
    <CatSleeping className={classes.cat_sleeping} />
  </div>
);
