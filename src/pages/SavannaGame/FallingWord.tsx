import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import {
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './FallingWord.module.css';

import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';
import { isWordFalled, isWordMove, savannaGameStart, wordPosition } from '../../actions/savanna-game-actions';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';


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
  const stepCounter = useSelector((state: RootStateType) =>
    state.savannaGameState.stepCounter);


  const isMove = useSelector((state: RootStateType) =>
    state.savannaGameState.isWordMove);

  const position = useSelector((state: RootStateType) =>
    state.savannaGameState.wordPosition);

  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  const refBtn = useRef<HTMLDivElement>();
  let timer: ReturnType<typeof setInterval>;
  // useEffect(() => {
  //   let timer: ReturnType<typeof setTimeout>;
  //   if (refBtn.current) {
  //     if (isMove && !isAnswer) {
  //       timer = setInterval(() => {
  //         dispatch(wordPosition(position + 25));
  //       }
  //         , 100);

  //       refBtn.current.style.transform = `translateY(${position}px)`
  //       if (position > 323 || isAnswer) {
  //         dispatch(isWordMove(false));
  //         clearInterval(timer);
  //       }
  //     }
  //   }

  //   return () => clearInterval(timer);

  // }, [])


  useEffect(() => {
    if (position > 323 || isAnswer) {
      console.log('clear', timer)
      dispatch(isWordMove(false));
      clearInterval(timer);
    }
  }, [position])

  const moveWord = () => {

    if (refBtn.current) {
      if (isMove && !isAnswer) {
        timer = setInterval(() => {

          dispatch(wordPosition(25));
        }
          , 100);

        refBtn.current.style.transform = `translateY(${position}px)`

      }
    }

    // return () => clearInterval(timer);
  }

  // const moveDown = () => {
  //   console.log('movedown', position)
  //   // console.log(e.target.offsetTop);
  //   // console.log(e.target.clientHeight);
  //   // const offsetTop = e.target;

  //   for (let i = 0; i < 90; i += 6) {
  //     console.log('p', position)
  //     dispatch(wordPosition(position + i))
  //   }
  // }

  const showAnswer = () => {
    playWrongAnswer();
    dispatch(isWordFalled(true));
    dispatch(isWordMove(false));
    dispatch(wordUserAnswer(rightWord));
    dispatch(isAnswerSelected(true))
  }



  return (

    <div aria-hidden='true' onClick={moveWord} ref={refBtn as React.RefObject<HTMLDivElement>} className={`${styles.falling__word}
     ${(isAnswer && userAnswer.word === rightWord.word) ? styles.word__stop : ''}
     ${(isAnswer && userAnswer.word !== rightWord.word) ? styles.word__stop__wrong : ''}`}
      style={{ transform: `translateY(${position}px)` }}>
      {rightWord.word}
    </div>
  )
}

export default FallingWord;