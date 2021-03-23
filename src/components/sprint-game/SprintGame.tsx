import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { SprintGameStateType } from '../../reducer/sprint-game-reducer';
import { SprintGameStatusChangeActionType } from '../../actions/sprint-game-action';
import { WordStateType } from '../../reducer/word-reducer';
import cat from '../../assets/images/happy.svg';
import play from '../../assets/images/video-player 1.svg';

type MapDispatchToProps = {
  sprintGameStatusChange: (value: string) => SprintGameStatusChangeActionType;
};

type Props = SprintGameStateType & MapDispatchToProps & WordStateType;

const SprintGame: React.FC<Props> = ({
  currentWordList,
  gameStatus,
  sprintGameStatusChange,
}) => {
  // const [gamePage, setGamePage] = useState(null);
  useEffect(() => {
    console.log(currentWordList);
  }, [currentWordList]);

  const renderGame = () => {
    if (gameStatus === 'start') {
      return (
        <div className={styles.start__game}>
          <h2>СПРИНТ </h2>
          <p>Это тренировка для повторения заученных слов из вашего словаря.</p>
          <p> Выберите соответствует ли перевод предложенному слову.</p>
          <img src={cat} alt="Happy cat" className={styles.cat__img} />
          <button type="button" className={styles.play__button}>
            <img src={play} alt="play button" />
          </button>
        </div>
      );
    }
    return null;
  };

  return <div className={styles.sprint__game}>{renderGame()}</div>;
};

const mapStateToProps = (state: RootStateType) => ({
  ...state.sprintGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(SprintGame);
