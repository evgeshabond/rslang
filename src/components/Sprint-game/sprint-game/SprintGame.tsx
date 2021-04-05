import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  clearWords,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameRandomArray,
  sprintGameSetLearntWords,
  sprintGameSetNotLearntWords,
  sprintGameShuffledArray,
  sprintGameStatusChange,
  sprintGameTotalPoints,
} from '../../../actions/sprint-game-action';
import { fetchWordsList } from '../../../actions/word-actions';
import { ReactComponent as Cat } from '../../../assets/images/cat2.svg';
import closeIcon from '../../../assets/images/close.svg';
import correctImage from '../../../assets/images/correct.svg';
import inCorrectImage from '../../../assets/images/incorrect.svg';
import questionIcon from '../../../assets/images/question.svg';
import refreshIcon from '../../../assets/images/refreshing.svg';
import banner from '../../../assets/images/sprint-top.png';
import { ReactComponent as Timer1 } from '../../../assets/images/timer1.svg';
import { ReactComponent as Timer2 } from '../../../assets/images/timer2.svg';
import countDown from '../../../assets/sounds/countDown.wav';
import correctSound from '../../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../../assets/sounds/src_music_wrong.wav';
import { RootStateType } from '../../../reducer/root-reducer';
import Balls from '../balls/Balls';
import CheckPoints from '../check-points/CheckPoints';
import FinishPage from '../finish-page/FinishPage';
import { Timer } from '../timer/Timer';
import { TitleGamePage } from '../title-page/TitleGamePage';
import styles from './sprint-game.module.css';

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
    currentPoints,
    shuffledArray,
    randomArray,
    checkpoints,
    ballsCounter,
  } = gameStatuses;

  const [wordCounter, setWordCounter] = useState(0);
  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);
  const [wordToGuess, setWordToGuess] = useState('');
  const [startCountDown] = useSound(countDown);
  const [correctAnswer, setCorrectAnswer] = useState(true);
  const [playCorrectSound] = useSound(correctSound, {
    interrupt: true,
  });
  const [playWrongSound] = useSound(wrongSound, { interrupt: true });

  useEffect(() => {
    if (wordList.length === 0) {
      dispatch(fetchWordsList({ page: 0, group: 0 }));
    }
    dispatch(sprintGameRandomArray(createRandomArray()));
  }, []);

  useEffect(() => {
    dispatch(sprintGameStatusChange('start'));
    dispatch(clearWords());
    dispatch(sprintGameTotalPoints(0));
    dispatch(sprintGameBallsCounter(0));
    dispatch(sprintGameCheckPoints(0));
  }, []);

  const createRandomArray = () => {
    const array = [];
    for (let i = 0; i < wordList.length; i++) {
      array.push(getRandomNumber(wordList.length));
    }
    return array;
  };

  useEffect(() => {
    dispatch(
      sprintGameShuffledArray(wordList.slice().sort(() => Math.random() - 0.5))
    );
  }, [wordList]);

  const renderTimerPage = () => (
    <div className={`${styles.game__wrapper} ${styles.timer__page}`}>
      <div className={styles.firstWatch__wrapper}>
        <Timer initialTimer={5} nextPage="play" timerFontSize="6.4rem" />
        <Timer1 className={styles.first__timer} />
      </div>
      <p className={styles.prepare}>Приготовьтесь!</p>
      <Cat className={styles.cat__img} />
    </div>
  );

  const changeGameStats = () => {
    dispatch(sprintGameSetLearntWords(shuffledArray[wordCounter]));

    setCorrectAnswer(true);
    playCorrectSound();
    // dispatch(sprintGameListOfCorrectWords(shuffledArray[wordCounter].id));
    dispatch(sprintGameTotalPoints(totalPoints + currentPoints));
    dispatch(sprintGameCheckPoints(checkpoints < 3 ? checkpoints + 1 : 1));
    checkTheEndOfTheGame();
    if (checkpoints === 2) {
      dispatch(sprintGameBallsCounter(ballsCounter + 1));
      if (ballsCounter === 4) {
        dispatch(sprintGameBallsCounter(ballsCounter));
      }
    }
  };

  const cleanCurrentGameStats = () => {
    dispatch(sprintGameSetNotLearntWords(shuffledArray[wordCounter]));
    checkTheEndOfTheGame();

    setCorrectAnswer(false);
    playWrongSound();
    dispatch(sprintGameCheckPoints(0));
    // dispatch(sprintGameBallsCounter(0));
  };

  const checkTheWordRight = () => {
    if (shuffledArray[wordCounter].wordTranslate === wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    setWordCounter(wordCounter + 1);
  };

  const checkTheWordWrong = () => {
    if (shuffledArray[wordCounter].wordTranslate !== wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    setWordCounter(wordCounter + 1);
  };

  useEffect(() => {
    getRandomNumber(2) === 0
      ? setWordToGuess(shuffledArray[wordCounter].wordTranslate)
      : setWordToGuess(shuffledArray[randomArray[wordCounter]].wordTranslate);
  }, [wordCounter]);

  const checkTheEndOfTheGame = () => {
    console.log(wordCounter, 'wordcounter');
    if (wordCounter === 5) {
      dispatch(sprintGameStatusChange('finish'));
      console.log('i was here');
    }
  };

  const renderGamePage = () => (
    <div className={`${styles.game__wrapper} ${styles.play}`}>
      <div className={styles.sidebar}>
        <div className={styles.watch__wrapper}>
          <Timer initialTimer={600} nextPage="finish" timerFontSize="1.8rem" />
          <Timer2 className={styles.timer2} />
        </div>
      </div>
      <div
        className={styles.game__field}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.point}>
          <div className={styles.total__points}>{totalPoints}</div>
          <div className={styles.current__points}>
            {currentPoints > 0 ? currentPoints : currentPoints}очков за слово
          </div>
        </div>

        <div className={styles.check__points}>
          <CheckPoints />
          <Balls />
        </div>
        <div className={styles.guess__word}>
          <div className={styles.the__word}>
            {shuffledArray[wordCounter].word}
          </div>{' '}
          -<div className={styles.translation}>{wordToGuess}</div>
        </div>

        <div className={styles.guess_not}>
          <div className={styles.lines}> </div>
          <img
            src={correctAnswer ? correctImage : inCorrectImage}
            alt="guessed-or-not"
            className={styles.correct__sign}
          />
        </div>
        <div className={styles.button__toguess}>
          <button
            type="button"
            className={styles.green__button}
            onClick={checkTheWordRight}
          >
            Верно
          </button>
          <button
            type="button"
            className={styles.red__button}
            onClick={checkTheWordWrong}
          >
            Неверно
          </button>
        </div>
      </div>

      <div className={styles.side__buttons}>
        <button
          type="button"
          className={styles.refresh__button}
          onClick={() => dispatch(sprintGameStatusChange('play'))}
        >
          <img src={refreshIcon} alt="refresh icon" />
        </button>
        <button
          type="button"
          className={styles.question__button}
          onClick={() => console.log('question?')}
        >
          <img src={questionIcon} alt="question icon" />
        </button>
        <button
          type="button"
          className={styles.close__button}
          onClick={() => dispatch(sprintGameStatusChange('start'))}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? (
        <TitleGamePage
          gameTitle={gameTitle}
          gameDescription={gameDescription}
          // catNumber={2}
          buttonClick={() => dispatch(sprintGameStatusChange('timer'))}
        />
      ) : null}
      {gameStatus === 'timer' ? <div>{renderTimerPage()}</div> : null}
      {gameStatus === 'play' ? <div>{renderGamePage()}</div> : null}
      {gameStatus === 'finish' ? <FinishPage /> : null}
    </div>
  );
};

export default SprintGame;
