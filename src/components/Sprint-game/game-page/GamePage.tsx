import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  setFullScreenStatus,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameCurrentPoints,
  sprintGameRandomArray,
  sprintGameSetLearntWords,
  sprintGameSetNotLearntWords,
  sprintGameShuffledArray,
  sprintGameStatusChange,
  sprintGameTotalPoints,
} from '../../../actions/sprint-game-action';
import {
  CurrentWordListType
} from '../../../actions/word-actions';
import closeIcon from '../../../assets/images/close.svg';
import correctImage from '../../../assets/images/correct.svg';
import inCorrectImage from '../../../assets/images/incorrect.svg';
import banner from '../../../assets/images/sprint-top.png';
import { ReactComponent as Timer2 } from '../../../assets/images/timer2.svg';
import correctSound from '../../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../../assets/sounds/src_music_wrong.wav';
import { RootStateType } from '../../../reducer/root-reducer';
import Balls from '../balls/Balls';
import CheckPoints from '../check-points/CheckPoints';
import { Timer } from '../timer/Timer';
import styles from './game-page.module.css';

const GamePage: React.FC = () => {
  const dispatch = useDispatch();
  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  const gameStatus = useSelector(
    (state: RootStateType) => state.sprintGameState
  );

  const {
    shuffledArray,
    currentPoints,
    ballsCounter,
    totalPoints,
    randomArray,
    checkpoints,
    isFullScreen,
  } = gameStatus;
  const [wordCounter, setWordCounter] = useState(0);
  const [wordToGuess, setWordToGuess] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(true);
  
  

  const [playCorrectSound] = useSound(correctSound, {
    interrupt: true,
  });

  const [playWrongSound] = useSound(wrongSound, { interrupt: true });
  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);

  useEffect(() => {
    if (shuffledArray) {
      if (wordCounter < shuffledArray.length) {
        getRandomNumber(2) === 0
          ? setWordToGuess(shuffledArray[wordCounter].wordTranslate)
          : setWordToGuess(
              shuffledArray[randomArray[wordCounter]].wordTranslate
            );
      }
    }
  }, [wordCounter]);

  const changeGameStats = () => {
    dispatch(sprintGameSetLearntWords(shuffledArray[wordCounter]));
    changeCurrentPoints();
    setCorrectAnswer(true);
    playCorrectSound();
    dispatch(sprintGameTotalPoints(totalPoints + currentPoints));
    dispatch(sprintGameCheckPoints(checkpoints < 3 ? checkpoints + 1 : 1));
    // checkTheEndOfTheGame();
    if (checkpoints === 2) {
      dispatch(sprintGameBallsCounter(ballsCounter + 1));
      if (ballsCounter === 4) {
        dispatch(sprintGameBallsCounter(ballsCounter));
      }
    }
  };

  const checkTheEndOfTheGame = () => {
    if (wordCounter === shuffledArray.length - 1) {
      dispatch(sprintGameStatusChange('finish'));
    }
  };
  const handle = useFullScreenHandle();

  const fullScreenExitHandler = () => {
    dispatch(setFullScreenStatus(false));
    handle.exit();
  };

  const fullScreenEnterHandler = () => {
    dispatch(setFullScreenStatus(true));
    handle.enter();
  };
  const cleanCurrentGameStats = () => {
    dispatch(sprintGameSetNotLearntWords(shuffledArray[wordCounter]));
    // checkTheEndOfTheGame();
    setCorrectAnswer(false);
    playWrongSound();
    dispatch(sprintGameCheckPoints(0));
  };

  const checkTheWordRight = () => {
    if (shuffledArray[wordCounter].wordTranslate === wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    checkTheEndOfTheGame();
    setWordCounter(wordCounter + 1);
  };

  const checkTheWordWrong = () => {
    if (shuffledArray[wordCounter].wordTranslate !== wordToGuess) {
      changeGameStats();
    } else {
      cleanCurrentGameStats();
    }
    checkTheEndOfTheGame();
    setWordCounter(wordCounter + 1);
  };

  const changeCurrentPoints = () => {
    if (ballsCounter === 0) {
      dispatch(sprintGameCurrentPoints(50));
    } else if (ballsCounter === 1) {
      dispatch(sprintGameCurrentPoints(60));
    } else if (ballsCounter === 2) {
      dispatch(sprintGameCurrentPoints(70));
    } else if (ballsCounter === 3) {
      dispatch(sprintGameCurrentPoints(80));
    } else if (ballsCounter === 4) {
      dispatch(sprintGameCurrentPoints(100));
    }
  };
  return (
    <FullScreen
      handle={handle}
      className={`${styles['full-screen-game']} ${styles.game__wrapper} ${styles.play}`}
    >
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
            <span className={styles['point-number']}>
              {currentPoints > 0 ? currentPoints : currentPoints}
            </span>
            очков за слово
          </div>
        </div>

        <div className={styles.check__points}>
          <CheckPoints />
          <Balls />
        </div>
        <div className={styles.guess__word}>
          <div className={styles.the__word}>
            {shuffledArray ? shuffledArray[wordCounter].word : null}
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
        {isFullScreen ? (
          <button
            className={styles['full-screen__button']}
            type="button"
            onClick={() => fullScreenExitHandler()}
          >
            <FullscreenExitIcon
              className={styles['full-screen__icon']}
              width="24px"
              height="24px"
            />
          </button>
        ) : (
          <button
            className={styles['full-screen__button']}
            type="button"
            onClick={() => fullScreenEnterHandler()}
          >
            <FullscreenIcon
              className={styles['full-screen__icon']}
              width="24px"
              height="24px"
            />
          </button>
        )}
        <button
          type="button"
          className={styles.close__button}
          onClick={() => dispatch(sprintGameStatusChange('start'))}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
    </FullScreen>
  );
};

export default GamePage;
