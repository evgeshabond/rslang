import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './AudioGame.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords, isPressDontknow, stepCounter, isShowResults } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';


const NextBtn: React.FC = () => {
  const dispatch = useDispatch();

  // const isShowResult = useSelector((state: RootStateType) =>
  //   state.audioGameState.isShowResults);
  const wordList = useSelector((state: RootStateType) =>
    state.wordState.currentWordList);
  const rightWord = useSelector((state: RootStateType) =>
    state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.audioGameState.isAnswerSelected);
  const roundCounter = useSelector((state: RootStateType) =>
    state.audioGameState.stepCounter);
  const [playWrongAnswer] = useSound(wrongSound);

  const playGame = () => {
    if (wordList === undefined) {
      return;
    }
    dispatch(isAnswerSelected(false));
    dispatch(isPressDontknow(false));
    const currentPlayList = shuffle(wordList)
      .filter((item: Object, index: number) => index < 5);
    dispatch(currentPlayWords(currentPlayList));
    dispatch(stepCounter(roundCounter + 1));
  }

  const dontKnowANswer = () => {
    playWrongAnswer();
    dispatch(isPressDontknow(true));
    dispatch(wordUserAnswer(rightWord));
    dispatch(isAnswerSelected(true))
  }

  const showResults = () => {
    dispatch(isShowResults(true));
    dispatch(audioGameStart(false))
  }

  return isAnswer ? (
    <div>
      {(roundCounter === 9) ? (
        <button type="button" onClick={() => showResults()} className={styles.playing__btn}>
          Показать результат
        </button>
      ) :
        (<button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
          playGame()
        }} />)
      }
    </div>
  ) : (
    <button onClick={() => { dontKnowANswer() }} type='button' className={styles.playing__btn}>
      Не знаю
    </button >
  )

}

export default NextBtn;