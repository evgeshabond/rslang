import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from "../Spinner/Spinner";
import { WordItem } from "../word-item/word-item-game";
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from "../button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected } from '../../actions/audioGame-actions';
import { CloseButton } from "../button-icons/close-button/close-button";
import { AudioOnButton } from "../button-icons/audiOn-button/audioOn-button";
import { QuestionButton } from "../button-icons/question-button/question-button";
import { RefreshButton } from "../button-icons/refresh-button.tsx/refresh-button";
import ControlledSelect from "../ControlledSelect/ControlledSelect";
import { removeTagsFromString } from '../../utils/removeTagsFromString';

const SavannaGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) => state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const wrongWord = useSelector((state: RootStateType) => state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.audioGameState.isAnswerSelected);


  const [countStep, setCountStep] = useState(0);
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  // const [isOpenWord, setIsOpenWord] = useState(false)
  const [userAnswer, setUserAnswer] = useState('');

  const [currentPlayWords, setcurrentPlayWords] = useState<Array<CurrentWordListType>>(
    [] as Array<CurrentWordListType>);

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playExample] = useSound((`${mainPath.langUrl}${rightWord.audioExample}`))

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, [])

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  const shuffle = (arr: Array<CurrentWordListType>) => {
    const result = [];
    if (arr) {
      const elem = arr.slice();
      while (elem.length > 0) {
        const random = getRandomInt(0, elem.length - 1);
        result.push(elem.splice(random, 1)[0]);
      }
    }
    return result;
  }

  const playGame = () => {
    dispatch(wordUserAnswer(''));
    dispatch(isAnswerSelected(false));
    setUserAnswer('');
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 4);
    setcurrentPlayWords(currentPlayList);

  }

  useEffect(() => {
    if (currentPlayWords.length === 0) {
      return;
    }
    const random = currentPlayWords[getRandomInt(0, currentPlayWords.length - 1)];
    dispatch(wordRight(random));
    console.log('right22', rightWord)

  }, [currentPlayWords])

  // useEffect(() => {
  //   playSoundWord();
  // }, [play])

  useEffect(() =>
    () => {
      setcurrentPlayWords([]);
    }, [])


  const playSoundWord = () => {
    if (Object.keys(rightWord).length > 0) {
      play()
    }
  }


  const checkUserAnswer = (word: string) => {
    if (wrongWord === '') {
      dispatch(wordUserAnswer(word));
    }

    dispatch(isAnswerSelected(true));
  }

  const renderWordCard = () => (
    currentPlayWords.map((word: CurrentWordListType, index: number) => (

      <WordItem buttonClick={() => { checkUserAnswer(word.word); setUserAnswer(word.word) }} key={word.id} word={word} />
    ))
  )

  const playingBtn = () => (isAnswer ? (
    <button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
      setCountStep(CountStep => countStep + 1);
      console.log(countStep);
      playGame()
    }} />

  ) : (
    <button onClick={() => dispatch(isAnswerSelected(true))} type='button' className={styles.playing__btn}>
      Не знаю
    </button >

  )
  )


  return isPlaying ? (
    <div className={styles.game__content}>
      <div className={styles.btn__container}>
        <QuestionButton buttonClick={() => console.log('info')} />
        <RefreshButton buttonClick={() => console.log('refresh')} />
        <CloseButton buttonClick={() => dispatch(audioGameStart(false))} />
      </div>
      {isAnswer ? (
        <div className={styles.word__info}>
          <div className={styles.word__image}>
            <img
              className={styles.word__image}
              src={`${mainPath.langUrl}${rightWord.image}`}
              alt={rightWord.word}
            />
          </div>
          <div className={styles.word__sound}>
            <AudioOnButton buttonClick={() => playSoundWord()} />
            <span className={styles.game__text}>{rightWord.word} {rightWord.transcription}</span>
          </div>
          <div className={styles.word__context}>
            <AudioOnButton buttonClick={() => playExample()} />
            <span className={styles.game__text}>{removeTagsFromString(rightWord.textExample)} </span>
          </div>
        </div>
      ) : (
        <span className={styles.game__text}>  {rightWord.word}</span>

      )}

      {currentPlayWords.length === 0 ? <Spinner /> :
        <div className={styles.word__list}>{renderWordCard()}</div>}

      {playingBtn()}
    </div>
  ) : (

    <div className={styles.game__wrapper}>
      <div className={styles.game__startSreen}>
        <ControlledSelect />
        <div className={styles.game__title}>Саванна</div>
        <div className={styles.game__decription}>Тренировка Саванна развивает словарный запас.
        Выберите правильный перевод слова.
    </div>
        < PlayButton buttonClick={() => { dispatch(audioGameStart(true)); playGame(); }} />
      </div>
    </div>
  )
};

export default SavannaGame;


