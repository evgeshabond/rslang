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
import { audioGameStart, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
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
import { AudioOnSizeButton } from '../../components/button-icons/audiOn-button/audioOn-Size';


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

  const [countStep, setCountStep] = useState(0);

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

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
    if (userAnswer === rightWord.word) {
      playSuccessAnswer();
    }
    playWrongAnswer()
  }, [userAnswer])

  // const handle = useFullScreenHandle();
  // const [fullScreen, setFullScreen] = useState(true);
  // function fullScreenEnterHandler() {
  //   setFullScreen(true);
  //   handle.enter();
  // }
  // function fullScreenExitHandler() {
  //   setFullScreen(false);
  //   handle.exit();
  // }

  return isPlaying ? (
    // <FullScreen handle={handle} >
    <div className={styles.game__content}>
      {/* <LevelIcon number={4} type={0} buttonClick={() => console.log('info')} /> */}
      <div className={styles.btn__container}>

        <div className={styles.hint} data-title="Выберите перевод услышанного слова">
          <QuestionButton buttonClick={() => console.log('info')} />
        </div>

        <CloseButton buttonClick={() => {
          dispatch(audioGameStart(false));
          dispatch(isAnswerSelected(false));
        }} />
      </div>
      {isAnswer ? (
        <WordInfo />
      ) : (
        <AudioOnSizeButton size={50}
          buttonClick={() => playSoundWord()} />
      )}
      {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
      <NextBtn />
      <CatAudio className={styles.cat__image} />
    </div>
    // </FullScreen >
  ) : (
    <StartScreen />

  )
};

export default AudioGame;