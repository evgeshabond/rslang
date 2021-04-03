import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
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
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import { CloseButton } from '../../components/button-icons/close-button/close-button';
import { AudioOnButton } from '../../components/button-icons/audiOn-button/audioOn-button';
import { QuestionButton } from '../../components/button-icons/question-button/question-button';
import { RefreshButton } from '../../components/button-icons/refresh-button.tsx/refresh-button';
import ControlledSelect from '../../components/ControlledSelect/ControlledSelect';
import { removeTagsFromString } from '../../utils/removeTagsFromString';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import { shuffle } from '../../utils/shuffle';
import RenderWordCard from './RenderWordCard';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import StartScreen from "./StartScreen";
// import RenderWordCard from './RenderWordCard';


const AudioGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) => state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.audioGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.audioGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.audioGameState.currentPlayWords);

  const [countStep, setCountStep] = useState(0);

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, { interrupt: true });
  const [playExample] = useSound((`${mainPath.langUrl}${rightWord.audioExample}`));
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

  useEffect(() => {
    if (isPlaying) {
      playSoundWord();
    }
  }, [play])

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

  const playingBtn = () => (isAnswer ? (
    <div>
      {(countStep === 10) ? (<div>
        Показать результат
      </div>) :
        (<button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
          playGame()
        }} />)
      }    </div>


  ) : (
    <button onClick={() => { dispatch(isAnswerSelected(true)); }} type='button' className={styles.playing__btn}>
      Не знаю
    </button >
  )
  )

  return isPlaying ? (
    <div className={styles.game__content}>
      <div className={styles.btn__container}>
        <QuestionButton buttonClick={() => console.log('info')} />
        {/* <RefreshButton buttonClick={() => playGame()} /> */}
        <CloseButton buttonClick={() => { dispatch(audioGameStart(false)); dispatch(isAnswerSelected(false)); }} />
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
        <AudioOnButton buttonClick={() => playSoundWord()} />
      )}

      {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
      { console.log('render userAnswer', userAnswer)}
      {playingBtn()}
      <CatAudio className={styles.cat__image} />
    </div>
  ) : (
    <StartScreen />
    // <div className={styles.game__wrapper}>
    //   <div className={styles.game__startSreen}>
    //     <ControlledSelect />
    //     <div className={styles.game__title}>Аудиовызов</div>
    //     <div className={styles.game__decription}>Тренировка улучшает восприятие английской речи на слух.
    //     Выберите из предложенных вариантов ответа правильный перевод слова,
    // которое услышите</div>
    //     < PlayButton buttonClick={() => { dispatch(audioGameStart(true)); playGame(); }} />
    //   </div>
    //   <CatAudio className={styles.cat__image} />
    // </div>
  )
};

export default AudioGame;


