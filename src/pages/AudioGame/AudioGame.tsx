import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import {
  CurrentWordListType,
  fetchWordsList,
  wordListLoaded,
  wordListRequested,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordStateType } from '../../reducer/word-reducer';
import Spinner from '../../components/Spinner/Spinner';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './AudioGame.module.css';
import WordList from '../../components/word-list/words-list';
// import *as actions from '../../actions/audioGame-actions';
import { AudioGameState } from '../../reducer/audio-game-reducer';
import { mainPath } from '../../utils/constants';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import { audioGameStart } from '../../actions/audioGame-actions';
import { CloseButton } from '../../components/button-icons/close-button/close-button';






const AudioGame: React.FC = () => {
  const audioStart = useSelector((state: RootStateType) => state.audioGameState);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const wordLoading = useSelector((state: RootStateType) => state.wordState.loading);

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

  const currentPlayList = shuffle(wordList).filter((item: Object, index: number) => index < 5);
  console.log(currentPlayList);

  const renderWordCard = () => (
    <div className={styles.word__list}>
      {
        currentPlayList.map((word: CurrentWordListType, index: number) => (
          <WordItem key={word.id} word={word} />
        ))
      }
    </div>

  )
  const isPlaying = audioStart.audioGameStart;

  // console.log(audioStart.audioGameStart);
  // console.log(wordLoading);
  // console.log(wordList);
  // console.log('audio', currentPlayList[1].audio);

  // const [playGame] = useSound(currentPlayList[1].audio);



  const audio = new Audio();
  console.log(mainPath.serverUrl);
  audio.src = mainPath.serverUrl + currentPlayList[1].audio;
  console.log('audio', currentPlayList[1].audio);

  const playSound = () => {
    if (audio) {
      audio.pause();
    }
    audio.load();
    playAudio()
  }


  const playAudio = () => {
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
        })
    }
  }

  return isPlaying ? (
    <div className={styles.game__content}>
      <CloseButton buttonClick={() => dispatch(audioGameStart(false))} />
      <div className={styles.sound__btn} />
      {wordLoading ? <Spinner /> : renderWordCard()}
      {/* {playSound()} */}
      {/* {renderWordCard()} */}
      <div className={styles.playing__btn}>
        Не знаю
      </div>
      < PlayButton buttonClick={() => playSound()} />
    </div>
  ) : (
    <div className={styles.game__wrapper}>
      <div className={styles.game__startSreen}>
        <div className={styles.game__title}>Аудиовызов</div>
        <div className={styles.game__decription}>Тренировка улучшает восприятие английской речи на слух.
        Выберите из предложенных вариантов ответа правильный перевод слова,
    которое услышите</div>
        < PlayButton buttonClick={() => dispatch(audioGameStart(true))} />
      </div>
    </div>
  )
};

export default AudioGame;


