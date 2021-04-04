import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './SavannaGame.module.css';
import { PlayButton } from "../../components/button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import ControlledSelect from "../../components/ControlledSelect/ControlledSelect";
import { shuffle } from '../../utils/shuffle';
import { mainPath } from '../../utils/constants';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
// import RenderWordCard from './RenderWordCard';


const StartScreen: React.FC = () => {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state: RootStateType) => state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.audioGameState.currentPlayWords);
  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });

  useEffect(() => {
    playSoundWord();
  }, [play])


  const playSoundWord = () => {
    if ((isPlaying && Object.keys(rightWord).length > 0)) {
      play()
    }
  }

  const playGame = () => {
    dispatch(wordUserAnswer(''));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 5);
    dispatch(currentPlayWords(currentPlayList))
    console.log('current', currentWords)
    // setCountStep(CountStep => countStep + 1);
  }

  return (
    <div className={styles.game__wrapper}>
      <div className={styles.game__startSreen}>
        <ControlledSelect />
        <div className={styles.game__title}>Саванна</div>
        <div className={styles.game__decription}>Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</div>
        < PlayButton buttonClick={() => { dispatch(audioGameStart(true)); playGame(); }} />
      </div>
      <CatAudio className={styles.cat__image} />
    </div>
  )
}
export default StartScreen;