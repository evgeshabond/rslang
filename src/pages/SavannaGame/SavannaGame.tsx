import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from "../../components/Spinner/Spinner";
import { WordItem } from "../../components/word-item/word-item-game";
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from "../../components/button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import { CloseButton } from "../../components/button-icons/close-button/close-button";
import { AudioOnButton } from "../../components/button-icons/audiOn-button/audioOn-button";
import { QuestionButton } from "../../components/button-icons/question-button/question-button";
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import { shuffle } from '../../utils/shuffle';
import RenderWordCard from './RenderWordCard';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import StartScreen from "./StartScreen";
import WordInfo from './WordInfo';
import NextBtn from './NextBtn';
import { LevelIcon } from "../../components/button-icons/level-icons/level-icons";

const AudioGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) => state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.audioGameState.currentPlayWords);
  const stepCounter = useSelector((state: RootStateType) => state.audioGameState.stepCounter);

  const [countStep, setCountStep] = useState(0);

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, [])

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  // next round
  const playGame = () => {
    dispatch(wordUserAnswer(''));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 5);
    dispatch(currentPlayWords(currentPlayList))
    console.log('current', currentWords)
    setCountStep(CountStep => countStep + 1);
  }

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
    if (isAnswer) {
      if (userAnswer === rightWord.word) {
        playSuccessAnswer();
      }
      else {
        playWrongAnswer()
      }
    }
  }, [userAnswer])

  return isPlaying ? (
    <div className={styles.game__content}>
      {/* <LevelIcon number={4} type={0} buttonClick={() => console.log('info')} /> */}
      <div className={styles.btn__container}>
        <div className={styles.hint} data-title="Выберите перевод услышанного слова">
          <QuestionButton buttonClick={() => console.log('info')} />
        </div>
        <div>
          FS
      </div>
        <CloseButton buttonClick={() => {
          dispatch(audioGameStart(false));
          dispatch(isAnswerSelected(false));
        }} />
      </div>
      {isAnswer ? (
        <WordInfo />
      ) : (
        <AudioOnButton buttonClick={() => playSoundWord()} />
      )}
      {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
      <NextBtn />
      <CatAudio className={styles.cat__image} />
    </div>
  ) : (
    <StartScreen />
  )
};

export default AudioGame;


