import React, { useEffect, useState, useCallback } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './AudioGame.module.css';
import { mainPath } from '../../utils/constants';
import { audioGameStart, isAnswerSelected, currentPlayWords, isFullScreen, isPressDontknow } from '../../actions/audioGame-actions';
import { CloseButton } from '../../components/button-icons/close-button/close-button';
import { QuestionButton } from '../../components/button-icons/question-button/question-button';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import RenderWordCard from './RenderWordCard';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import StartScreen from "./StartScreen";
import WordInfo from './WordInfo';
import NextBtn from './NextBtn';
import { LevelIcon } from '../../components/button-icons/level-icons/level-icons';
import { ReactComponent as AudioOnSizeButton } from '../../assets/images/audioOn.svg';


const AudioGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) =>
    state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) =>
    state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) =>
    state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) =>
    state.audioGameState.currentPlayWords);
  const stepCounter = useSelector((state: RootStateType) =>
    state.audioGameState.stepCounter);
  const fullScreen = useSelector((state: RootStateType) =>
    state.audioGameState.isFullScreen);
  const isDontknow = useSelector((state: RootStateType) =>
    state.audioGameState.isPressDontknow);

  const [countStep, setCountStep] = useState(0);
  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);
  const handle = useFullScreenHandle();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, [])

  useEffect(() =>
    () => {
      setCountStep(0);
      dispatch(currentPlayWords([]));
    }, [])

  useEffect(() => {
    if (countStep === 10) (
      <div className={styles.game__content}>
        Результат
      </div>
    )
  }, [countStep])


  useEffect(() => {
    if (isPlaying) {
      playSoundWord();
    }
    console.log('ef Sound/', play)
  }, [play])

  const playSoundWord = () => {
    if (Object.keys(rightWord).length > 0) {
      play()
    }
  }

  useEffect(() => {
    if (!isAnswer) {
      return
    }
    if (userAnswer === rightWord.word && !isDontknow) {
      playSuccessAnswer();
    }
    playWrongAnswer()
  }, [userAnswer])


  function fullScreenEnterHandler() {
    dispatch(isFullScreen(true))
    handle.enter();
  }
  function fullScreenExitHandler() {
    dispatch(isFullScreen(false))
    handle.exit();
  }

  return isPlaying ? (
    <FullScreen handle={handle} className={styles.fullScreen__container} >
      <div className={fullScreen ? styles.game__content__fullScreen : styles.game__content}>
        <div className={styles.btn__container}>
          <div className={styles.hint} data-title="Выберите перевод услышанного слова">
            <QuestionButton buttonClick={() => console.log('info')} />
          </div>
          {fullScreen ? (
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

          <CloseButton buttonClick={() => {
            dispatch(audioGameStart(false));
            dispatch(isAnswerSelected(false));
            fullScreenExitHandler();
          }} />
        </div>
        {isAnswer ? (
          <WordInfo />
        ) : (
          <AudioOnSizeButton width='60px' height='60px' className={styles.audio__btn}
            onClick={() => playSoundWord()} />
        )}
        {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
        <NextBtn />
        <CatAudio className={styles.cat__image} />
      </div>
    </FullScreen >
  ) : (
    <StartScreen />

  )
};

export default AudioGame;