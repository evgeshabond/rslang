import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './FallingWord.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';


const FallingWord: React.FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, []);

  const isPlaying = useSelector((state: RootStateType) =>
    state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) =>
    state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) =>
    state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) =>
    state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) =>
    state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) =>
    state.savannaGameState.currentPlayWords);

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  useEffect(() => {
    if (currentWords.length === 0) {
      return;
    }
    const random = currentWords[getRandomInt(0, currentWords.length - 1)];
    dispatch(wordRight(random));

  }, [currentWords])


  const checkUserAnswer = (word: string) => {
    if (userAnswer.length === 0) {
      dispatch(wordUserAnswer(word));
    }
    dispatch(isAnswerSelected(true));
  }

  return (
    <div className={styles.falling__word}>
      {rightWord.word}
    </div>
  )
}

export default FallingWord;