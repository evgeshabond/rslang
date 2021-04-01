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
import { audioGameStart } from '../../actions/audioGame-actions';
import { CloseButton } from '../../components/button-icons/close-button/close-button';
import { AudioOnButton } from '../../components/button-icons/audiOn-button/audioOn-button';
import { QuestionButton } from '../../components/button-icons/question-button/question-button';
import { RefreshButton } from '../../components/button-icons/refresh-button.tsx/refresh-button';
import ControlledSelect from '../../components/ControlledSelect/ControlledSelect';


const AudioGame: React.FC = () => {
  const isPlaying = useSelector((state: RootStateType) => state.audioGameState.audioGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);

  const [countStep, setCountStep] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const [currentPlayWords, setcurrentPlayWords] = useState<Array<CurrentWordListType>>(
    [] as Array<CurrentWordListType>);
  const [audioList, setAudioList] = useState<CurrentWordListType>(
    {} as CurrentWordListType
  );
  const ref = useRef();
  const [play] = useSound(`${mainPath.langUrl}${audioList.audio}`, { interrupt: true });
  const [playExample] = useSound((`${mainPath.langUrl}${audioList.audioExample}`))

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, [])

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  const shuffle = (arr: Array<CurrentWordListType>) => {
    // console.log('shuffle');
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
    setIsCorrectAnswer(false)
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 5);
    setcurrentPlayWords(currentPlayList);

  }

  useEffect(() => {
    if (currentPlayWords.length === 0) {
      return;
    }
    const random = currentPlayWords[getRandomInt(0, currentPlayWords.length - 1)];
    setAudioList(prevAudioList => random);


  }, [currentPlayWords])

  useEffect(() => {
    playSoundWord();
  }, [play])

  useEffect(() =>
    () => {
      setcurrentPlayWords([]);
      setAudioList({} as CurrentWordListType);

    }, [])


  const playSoundWord = () => {
    if (Object.keys(audioList).length > 0) {
      play()
    }
  }


  const checkUserAnswer = (word: string) => {
    if (audioList.word === word) {
      setIsCorrectAnswer(true)
    }
  }



  const renderWordCard = () => (
    <div className={styles.word__list}>

      {
        currentPlayWords.map((word: CurrentWordListType, index: number) => (
          <WordItem buttonClick={() => checkUserAnswer(word.word)} key={word.id} word={word} />
        ))
      }
    </div>

  )


  const playingBtn = () => (isCorrectAnswer ? (
    <button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
      setCountStep(CountStep => countStep + 1);
      console.log(countStep);
      playGame()
    }} />

  ) : (

    <button type='button' className={styles.playing__btn}>
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
      {isCorrectAnswer ? (
        <div className={styles.word__info}>
          <div className={styles.word__image}>
            <img
              className={styles.word__image}
              src={`${mainPath.langUrl}${audioList.image}`}
              alt={audioList.word}
            />
          </div>
          <div className={styles.word__sound}>
            <AudioOnButton buttonClick={() => playSoundWord()} />
            <span>{audioList.word} {audioList.transcription}</span>
          </div>
          <div className={styles.word__context}>
            <AudioOnButton buttonClick={() => playExample()} />
            <span>{audioList.textExample} </span>
          </div>
        </div>
      ) : (
        <AudioOnButton buttonClick={() => playSoundWord()} />
      )}

      {currentPlayWords.length === 0 ? <Spinner /> : renderWordCard()}

      {/* {console.log('renderComp')} */}
      {console.log('audio', audioList)}
      {console.log('words', currentPlayWords)}

      {playingBtn()}
    </div>
  ) : (
    <div className={styles.game__wrapper}>
      <div className={styles.game__startSreen}>
        <ControlledSelect />
        <div className={styles.game__title}>Аудиовызов</div>
        <div className={styles.game__decription}>Тренировка улучшает восприятие английской речи на слух.
        Выберите из предложенных вариантов ответа правильный перевод слова,
    которое услышите</div>
        < PlayButton buttonClick={() => { dispatch(audioGameStart(true)); playGame(); }} />
      </div>
    </div>
  )
};

export default AudioGame;


