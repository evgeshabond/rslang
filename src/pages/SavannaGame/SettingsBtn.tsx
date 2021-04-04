import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../reducer/root-reducer';
import Spinner from "../../components/Spinner/Spinner";
import { WordItem } from "../../components/word-item/word-item-game";
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from "../../components/button-icons/playBig-button/playBig-button";
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import { CloseButton } from "../../components/button-icons/close-button/close-button";
import { AudioOnButton } from "../../components/button-icons/audiOn-button/audioOn-button";
import { QuestionButton } from "../../components/button-icons/question-button/question-button";
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import { shuffle } from '../../utils/shuffle';
import RenderWordCard from './RenderWordCard';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';
import StartScreen from "./StartScreen";
import WordInfo from './WordInfo';
import NextBtn from './NextBtn';
import { LevelIcon } from "../../components/button-icons/level-icons/level-icons";
import { savannaGameStart } from '../../actions/savanna-game-actions';
import { PauseButton } from '../../components/button-icons/pause-button/pause-button';

const SettingsBtn: React.FC = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootStateType) => state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.savannaGameState.currentPlayWords);
  const stepCounter = useSelector((state: RootStateType) => state.savannaGameState.stepCounter);


  return (
    <div className={styles.btn__container}>
      <AudioOnButton buttonClick={() => console.log('info')} />
      <PauseButton buttonClick={() => console.log('info')} />
      <div className={styles.hint} data-title="Выберите перевод падающего слова">
        <QuestionButton buttonClick={() => console.log('info')} />
      </div>
      <div>
        FS
      </div>
      <CloseButton buttonClick={() => {
        dispatch(savannaGameStart(false));
        dispatch(isAnswerSelected(false));
      }} />
    </div>

  )

}
export default SettingsBtn;