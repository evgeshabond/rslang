import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './SavannaGame.module.css';
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';
import FallingWord from './FallingWord';
import { currentPlayWords, isWordFalled, isWordMove, stepCounter, wordPosition } from '../../actions/savanna-game-actions';


const RenderWordCard: React.FC = () => {

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
  const roundCounter = useSelector((state: RootStateType) =>
    state.savannaGameState.stepCounter);
  const position = useSelector((state: RootStateType) =>
    state.savannaGameState.wordPosition);
  const startPosition = useSelector((state: RootStateType) =>
    state.savannaGameState.startWordPosition);


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
    let timer: ReturnType<typeof setTimeout>;
    if (isAnswer) {

      timer = setTimeout(() => {
        playGame();
      }
        , 3000);
    }
    return () => clearTimeout(timer);

  }, [isAnswer])

  const playGame = () => {

    dispatch(wordPosition(startPosition));
    dispatch(isWordMove(true));
    dispatch(isWordFalled(false));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 4);
    dispatch(currentPlayWords(currentPlayList))
    dispatch(stepCounter(roundCounter + 1));

  }

  // useEffect(() => {
  //   if (Object.keys(userAnswer).length === 0 && !isAnswer) {
  //     return
  //   }
  //   if (!isDontknow && userAnswer.word === rightWord.word) {
  //     dispatch(listRightWords(rightWord));
  //   }
  //   else {
  //     dispatch(setWrongWords(rightWord))
  //   }
  // }, [roundCounter, isResults])

  const checkUserAnswer = (word: CurrentWordListType) => {
    console.log('check', position);
    if (Object.keys(userAnswer).length === 0) {
      dispatch(wordUserAnswer(word));
    }
    dispatch(isAnswerSelected(true));
    dispatch(isWordMove(false));
  }

  return (
    <div className={styles.falling__word__container} >
      <FallingWord />

      <div className={styles.word__list}>
        {currentWords.map((word: CurrentWordListType, index: number) => (
          <WordItem buttonClick={() => { checkUserAnswer(word); }}
            key={word.id} word={word} />
        ))}
      </div>

    </div>

  )
}

export default RenderWordCard;