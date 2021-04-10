import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, listRightWords, listWrongWords } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';


const RenderWordCard: React.FC = () => {

  const dispatch = useDispatch();
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
  const isDontknow = useSelector((state: RootStateType) =>
    state.audioGameState.isPressDontknow);

  const rightWords = useSelector((state: RootStateType) =>
    state.audioGameState.listRightWords);

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


  useEffect(() => {
    if (Object.keys(userAnswer).length === 0 && !isAnswer) {
      return
    }
    if (!isDontknow && userAnswer.word === rightWord.word) {
      dispatch(listRightWords(rightWord));
    }
    else {
      dispatch(listWrongWords(rightWord))
    }
  }, [userAnswer.word])

  const checkUserAnswer = (word: CurrentWordListType) => {
    if (!isAnswer) {
      dispatch(wordUserAnswer(word));
    }
    dispatch(isAnswerSelected(true));
  }

  return (
    <div className={styles.word__list}>
      {currentWords.map((word: CurrentWordListType, index: number) => (

        <WordItem buttonClick={() => { checkUserAnswer(word); }}
          key={word.id} word={word} />
      ))}
    </div>
  )
}

export default RenderWordCard;