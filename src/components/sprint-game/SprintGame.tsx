import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { SprintGameStateType } from '../../reducer/sprint-game-reducer';
import { SprintGameStatusChangeActionType } from '../../actions/sprint-game-action';
import { WordStateType } from '../../reducer/word-reducer';

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
          <p>
            Это тренировка для повторения заученных слов из вашего словаря.
            выберите соответствует ли перевод предложенному слову.
          </p>
          <button type="button" className={styles.play__button}><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M51.2132 8.78672C45.5469 3.12047 38.0133 0 30 0C21.9866 0 14.453 3.12059 8.78672 8.78672C3.12059 14.453 0 21.9867 0 30C0 38.0134 3.12059 45.547 8.78672 51.2133C14.453 56.8794 21.9866 60 30 60C38.0133 60 45.5469 56.8794 51.2132 51.2133C56.8794 45.5469 60 38.0133 60 30C60 21.9867 56.8794 14.4531 51.2132 8.78672ZM46.9789 31.4627L24.3851 46.5251C24.0909 46.7213 23.751 46.8204 23.41 46.8204C23.1255 46.8204 22.8405 46.7515 22.5806 46.6124C22.0091 46.3066 21.6523 45.7109 21.6523 45.0626V14.9375C21.6523 14.2893 22.0091 13.6936 22.5806 13.3877C23.152 13.0819 23.8457 13.1153 24.3851 13.475L46.9789 28.5375C47.468 28.8635 47.7618 29.4124 47.7618 30.0001C47.7616 30.5879 47.468 31.1366 46.9789 31.4627Z" fill="#733999"/>
</svg>
</button>
        </div>
      );
    }
    return null;
  };

  // useEffect(() => {
  //   setGamePage(renderGame());
   
  //   console.log(gameStatus)
  // }, [gameStatus]);

  // const startGame = () => {
  //   console.log('helo');
  //   return <div className={styles.timer}>TIMer</div>;
  // };

  return <div className={styles.sprint__game}>{renderGame()}</div>;
};

const mapStateToProps = (state: RootStateType) => ({
  ...state.sprintGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(SprintGame);
