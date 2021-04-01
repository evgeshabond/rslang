import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import {
  sprintGameShuffledArray,
  sprintGameStatusChange,
  sprintGameTotalPoints,
} from '../../actions/sprint-game-action';
import { RefreshButton } from '../button-icons/refresh-button.tsx/refresh-button';
import { QuestionButton } from '../button-icons/question-button/question-button';
import { CloseButton } from '../button-icons/close-button/close-button';
import { LevelIcon } from '../button-icons/level-icons/level-icons';
import { Timer } from './Timer';
import { TitleGamePage } from '../title-game-page/TitleGamePage';
import { ReactComponent as Cat } from '../../assets/images/cat2.svg';
import { ReactComponent as Timer1 } from '../../assets/images/timer1.svg';
import { ReactComponent as Timer2 } from '../../assets/images/timer2.svg';
import banner from '../../assets/images/sprint-top.png';

const SprintGame: React.FC = () => {
  const dispatch = useDispatch();

  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );
  const {
    gameTitle,
    gameDescription,
    gameStatus,
    totalPoints,
    shuffledArray,
  } = gameStatuses;

  console.log(wordList);
  const [wordCounter, setWordCounter] = useState(0);

  // const copyMainArray = wordList.slice().sort(() => Math.random() - 0.5);
  // console.log(copyMainArray, 'copy');

  // console.log(shuffledArray, 'shuffled');
  
  useEffect(() => {
    dispatch(sprintGameShuffledArray(wordList));

  }, [wordList]);

console.log(shuffledArray, 'list')

// let translationArray = shuffledArray.map((elem) => elem.wordTranslate);
// console.log(translationArray, 'translation')

  // const translationArray = wordList
  //   .map((elem) => elem.wordTranslate)
  //   .sort(() => Math.random() - 0.5); // массив с переводом

  // console.log(translationArray, 'translation');
  // console.log(wordList, 'wordlist');


  const renderTimerPage = () => (
    <div className={`${styles.game__wrapper} ${styles.timer__page}`}>
      <div className={styles.firstWatch__wrapper}>
        <Timer initialTimer={5} nextPage="play" timerFontSize="6.4rem" />
        <Timer1 className={styles.first__timer} />
      </div>
      <p>Приготовьтесь!</p>
      <Cat className={styles.cat__img} />
    </div>
  );

  // const checkTheWordRight = () => {
  //   if (
  //     shuffledArray[wordCounter].wordTranslate === translationArray[wordCounter]
  //   ) {
  //     dispatch(sprintGameTotalPoints(totalPoints+50));
  //   }
  //   setWordCounter(+1);
  // };

  // const checkTheWordWrong = () => {
  //   if (
  //     shuffledArray[wordCounter].wordTranslate !== translationArray[wordCounter]
  //   ) {
  //     dispatch(sprintGameTotalPoints(totalPoints+50));
  //   }
  //   setWordCounter(+1);
  // };

  const renderGamePage = () => (
    <div className={`${styles.game__wrapper} ${styles.play}`}>
      <div className={styles.sidebar}>
        <div className={styles.watch__wrapper}>
          <Timer
            initialTimer={60000}
            nextPage="finish"
            timerFontSize="1.8rem"
          />
          <Timer2 className={styles.timer2} />
        </div>
        <LevelIcon
          buttonClick={() => console.log('level')}
          type={0}
          number={1}
        />
      </div>
      <div
        className={styles.game__field}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.total__points} style={{ color: 'white' }}>
          Всего {totalPoints} очков
        </div>
        <div className={styles.current__points}>очков за слово</div>
        <div className={styles.check__points}>circles</div>
        <div className={styles.balls}> total 4 balls</div>
        <div className={styles.guess__word}>
          <div className={styles.the__word}>
            {/* {shuffledArray[wordCounter].word}{' '} */}
          </div>{' '}
          -
          {/* <div className={styles.translation}>
            {translationArray[wordCounter]}{' '}
          </div> */}
        </div>

        <div className={styles.guess_not}> check</div>
        <div className={styles.button__toguess}>
          <button
            type="button"
            className={styles.green__button}
            // onClick={checkTheWordRight}
          >
            Верно
          </button>
          <button
            type="button"
            className={styles.red__button}
            // onClick={checkTheWordWrong}
          >
            Неверно
          </button>
        </div>
      </div>

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

export default SprintGame;
