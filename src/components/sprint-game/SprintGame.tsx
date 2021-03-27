import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as actions from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { SprintGameStatusChangeActionType } from '../../actions/sprint-game-action';
import { RefreshButton } from '../button-icons/refresh-button.tsx/refresh-button';
import { QuestionButton } from '../button-icons/question-button/question-button';
import { CloseButton } from '../button-icons/close-button/close-button';
import { LevelIcon } from '../button-icons/level-icons/level-icons';
import { Timer } from './Timer';
import { TitleGamePage } from '../title-game-page/TitleGamePage';
import {ReactComponent as Cat } from '../../assets/images/cat2.svg';

type Props = {
  currentWordList: {};
  gameStatus: string;
  gameTitle: string;
  gameDescription: string;
  sprintGameStatusChange: (value: string) => SprintGameStatusChangeActionType;
};
const SprintGame: React.FC<Props> = ({
  currentWordList,
  gameStatus,
  gameTitle,
  gameDescription,
  sprintGameStatusChange,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentWordList);
  }, [currentWordList]);

  const renderTimerPage = () => (
    <div className={styles.game__wrapper}>
      <Timer initialTimer={5} nextPage="play" />
      <p>Приготовьтесь!</p>
      <Cat className={styles.cat__img}/>
    </div>
  );

  const renderGamePage = () => (
    <div className={`${styles.game__wrapper} ${styles.play}`}>
      <div className={styles.sidebar}>
        <Timer initialTimer={600} nextPage="finish" />
        <LevelIcon
          buttonClick={() => console.log('level')}
          type={0}
          number={1}
        />
      </div>
      <div className={styles.game__field}>cards</div>
      <div className={styles.side__buttons}>
        <RefreshButton buttonClick={() => console.log('click')} />
        <QuestionButton buttonClick={() => console.log('click')} />
        <CloseButton buttonClick={() => console.log('click')} />
      </div>
    </div>
  );

  const renderFinishPage = () => <h1>finish</h1>;
  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? (
        <TitleGamePage
          gameTitle={gameTitle}
          gameDescription={gameDescription}
          catNumber={2}
          buttonClick={() => dispatch(sprintGameStatusChange('timer'))}
        />
      ) : null}
      {gameStatus === 'timer' ? <div>{renderTimerPage()}</div> : null}
      {gameStatus === 'play' ? <div>{renderGamePage()}</div> : null}
      {gameStatus === 'finish' ? <div>{renderFinishPage()}</div> : null}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  ...state.sprintGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(SprintGame);
