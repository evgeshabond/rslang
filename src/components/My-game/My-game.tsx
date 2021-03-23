import React, { useRef } from 'react';
import { connect } from 'react-redux';
import classes from './My-game.module.css';
import { ReactComponent as Play } from '../../assets/images/video-player-mini.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/my-game-actions';
import { MyGameStartState } from '../../reducer/my-game-reducer';

type MapDispatchToProps = {
  myGameStart: (value: boolean) => actions.MyGameStartActionType;
};

type Props = MapDispatchToProps & MyGameStartState;

const MyGame: React.FC<Props> = ({ myGameStart, myGameIsStarted }) => {
  console.log(myGameIsStarted);

  return myGameIsStarted ? (
    <div className={classes['my-game']}>
      <p>Playing</p>
    </div>
  ) : (
    <div className={classes['my-game']}>
      <h2 className={classes.title}>cвоя игра</h2>
      <p className={classes.text}>
        Это тренировка для повторения заученных слов из вашего словаря.
      </p>
      <p className={classes.text}>
        Выберите соответствует ли перевод предложенному слову.
      </p>
      <button
        type="button"
        className={classes['play-button']}
        onClick={() => myGameStart(true)}
      >
        <Play className={classes.play} />
      </button>
      <CatSleeping className={classes.cat_sleeping} />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => state.myGameState;

export default connect(mapStateToProps, actions)(MyGame);
