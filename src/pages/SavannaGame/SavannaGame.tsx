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
import CatSavanna from "../../assets/images/CAT_gif_0.05.gif";
import StartScreen from "./StartScreen";
import WordInfo from './WordInfo';
import NextBtn from './NextBtn';
import { LevelIcon } from "../../components/button-icons/level-icons/level-icons";
import SettingsBtn from './SettingsBtn';
import LevelInfo from './LevelInfo';
import LifeInfo from './LifeInfo';
import FallingWord from './FallingWord';


const SavannaGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) => state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.savannaGameState.currentPlayWords);
  const stepCounter = useSelector((state: RootStateType) => state.savannaGameState.stepCounter);

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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAnswer) {
      timer = setTimeout(() =>
        playGame()
        , 3000);

    }
    return () => clearTimeout(timer);

  }, [isAnswer])



  const playGame = () => {

    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 4);
    dispatch(currentPlayWords(currentPlayList))
    // dispatch(stepCounter(roundCounter + 1));
    console.log('current', currentWords)

  }

  useEffect(() =>
    () => {

      dispatch(currentPlayWords([]));
    }, [])


  useEffect(() => {
    if (isAnswer) {
      if (userAnswer.word === rightWord.word) {
        playSuccessAnswer();
      }
      else {
        playWrongAnswer()
      }
    }
  }, [userAnswer])

  return isPlaying ? (
    <div className={styles.game__content}>
      <SettingsBtn />
      <div className={styles.game__field}>
        <LevelInfo />
        {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
        <LifeInfo />
      </div>
      <img className={styles.cat__image} src={CatSavanna} alt="loading..." />
    </div>
  ) : (
    <StartScreen />
  )
};

export default SavannaGame;


