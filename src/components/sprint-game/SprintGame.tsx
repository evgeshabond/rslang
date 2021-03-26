import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import { SprintGameStateType } from '../../reducer/sprint-game-reducer';
import { SprintGameStatusChangeActionType } from '../../actions/sprint-game-action';
import { WordStateType } from '../../reducer/word-reducer';
import { ReactComponent as Cat } from '../../assets/images/happy.svg';
import { RefreshButton } from '../button-icons/refresh-button.tsx/refresh-button';
import { QuestionButton } from '../button-icons/question-button/question-button';
import { CloseButton } from '../button-icons/close-button/close-button';
import { PlayButton } from '../button-icons/playBig-button/playBig-button';
import { LevelIcon } from '../button-icons/level-icons/level-icons';
import { Timer } from './Timer';
import { RenderStartGamePage } from '../title-game-page/TitleGamePage';

type MapDispatchToProps = {
  sprintGameStatusChange: (value: string) => SprintGameStatusChangeActionType;
};

type Props = SprintGameStateType & MapDispatchToProps & WordStateType;

const SprintGame: React.FC<Props> = ({
  currentWordList,
  gameStatus,

  sprintGameStatusChange,
}) => {
  // const [startTimer, setStartTimer] = useState(5);

  useEffect(() => {
    console.log(currentWordList);
  }, [currentWordList]);

// const renderStartGamePage = () =>(

// )

//   const renderStartGamePage = () => (
//     <div className={styles.game__wrapper}>
//       <h2>СПРИНТ </h2>
//       <p>Это тренировка для повторения заученных слов из вашего словаря.</p>
//       <p> Выберите соответствует ли перевод предложенному слову.</p>
//       <Cat className={styles.cat__img} />

//       <PlayButton buttonClick={() => sprintGameStatusChange('timer')} />
//     </div>
//   );

  const renderTimerPage = () => (
    <div className={styles.game__wrapper}>
      <Timer initialTimer={5} nextPage="play" />
      <p>Приготовьтесь!</p>
    </div>
  );

  const renderGamePage = () => (
    <div className={`${styles.game__wrapper} ${styles.play}`}>
      <div className={styles.sidebar}>
        <Timer initialTimer={60} nextPage="finish" />
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


  const renderFinishPage=()=> <h1>finish</h1>;
  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? <RenderStartGamePage gameTitle="СПРИНТ" gameDescription="Это тренировка для повторения заученных слов из вашего словаря.
     Выберите соответствует ли перевод предложенному слову." catNumber={2} buttonClick={() => sprintGameStatusChange('timer')}/> : null}
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
