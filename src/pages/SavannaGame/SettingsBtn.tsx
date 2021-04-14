import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../reducer/root-reducer';
import styles from './SavannaGame.module.css';
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import { CloseButton } from "../../components/button-icons/close-button/close-button";
import { QuestionButton } from "../../components/button-icons/question-button/question-button";
import { clearWords, isWordMove, savannaGameStart, startWordPosition, wordPosition } from '../../actions/savanna-game-actions';
import { AudioOnSizeButton } from '../../components/button-icons/audiOn-button/audioOn-Size';

const SettingsBtn: React.FC = () => {
  const dispatch = useDispatch();
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

  const getClose = () => {
    dispatch(savannaGameStart(false));
    dispatch(isAnswerSelected(false));
    dispatch(startWordPosition(0));
    dispatch(isWordMove(false));
    dispatch(clearWords());
  }


  return (
    <div className={styles.btn__container}>
      <AudioOnSizeButton size={30} buttonClick={() => console.log('info')} />
      <div className={styles.hint} data-title="Выберите перевод падающего слова">
        <QuestionButton buttonClick={() => console.log('info')} />
      </div>
      <div>
        FS
      </div>
      <CloseButton buttonClick={() => getClose()} />
    </div>

  )

}
export default SettingsBtn;