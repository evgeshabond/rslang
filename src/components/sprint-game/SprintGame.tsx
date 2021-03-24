import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { SprintGameStateType } from '../../reducer/sprint-game-reducer';
import { SprintGameStatusChangeActionType } from '../../actions/sprint-game-action';
import { WordStateType } from '../../reducer/word-reducer';

import { ReactComponent as PlayButton } from '../../assets/images/play.svg';
import { ReactComponent as Cat } from '../../assets/images/happy.svg';

type MapDispatchToProps = {
  sprintGameStatusChange: (value: string) => SprintGameStatusChangeActionType;
};

type Props = SprintGameStateType & MapDispatchToProps & WordStateType;

const SprintGame: React.FC<Props> = ({
  currentWordList,
  gameStatus,
  sprintGameStatusChange,
}) => {
  const [startTimer, setStartTimer] = useState(5);

  useEffect(() => {
    console.log(currentWordList);
  }, [currentWordList]);

  const renderStartGamePage = () => (
    <div className={styles.game__wrapper}>
      <h2>СПРИНТ </h2>
      <p>Это тренировка для повторения заученных слов из вашего словаря.</p>
      <p> Выберите соответствует ли перевод предложенному слову.</p>
      <Cat className={styles.cat__img} />
      <button
        type="button"
        className={styles.play__button}
        onClick={() => sprintGameStatusChange('timer')}
      >
        <PlayButton />
      </button>
    </div>
  );


  const renderTimerPage = () => (
    <div className={styles.game__wrapper}>
      <div className={styles.timer}> { startTimer >0 &&setTimeout(() => setStartTimer(startTimer - 1), 1000) ? startTimer : sprintGameStatusChange('play')}</div>
      <p>Приготовьтесь!</p>
    </div>
  );

  const renderGamePage = () => <h1>hello</h1>;

  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? <div>{renderStartGamePage()}</div> : null}
      {gameStatus === 'timer' ? <div>{renderTimerPage()}</div> : null}
      {gameStatus === 'play' ? <div>{renderGamePage()}</div> : null}{' '}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  ...state.sprintGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(SprintGame);
