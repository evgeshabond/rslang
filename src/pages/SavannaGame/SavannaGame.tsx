import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordsList } from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import successSound from '../../assets/sounds/src_music_correct.mp3';
import wrongSound from '../../assets/sounds/src_music_wrong.wav';
import RenderWordCard from './RenderWordCard';
import CatSavanna from '../../assets/images/CAT_gif_0.05.gif';
import StartScreen from './StartScreen';
import SettingsBtn from './SettingsBtn';
import LevelInfo from './LevelInfo';
import LifeInfo from './LifeInfo';
import { wordRight } from '../../actions/savanna-game-actions';

const SavannaGame: React.FC = () => {
  const isPlaying = useSelector(
    (state: RootStateType) => state.savannaGameState.savannaGameStart
  );
  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const userAnswer = useSelector(
    (state: RootStateType) => state.savannaGameState.wordUserAnswer
  );
  const rightWord = useSelector(
    (state: RootStateType) => state.savannaGameState.wordRight
  );
  const isAnswer = useSelector(
    (state: RootStateType) => state.savannaGameState.isAnswerSelected
  );
  const currentWords = useSelector(
    (state: RootStateType) => state.savannaGameState.currentPlayWords
  );
  const stepCounter = useSelector(
    (state: RootStateType) => state.savannaGameState.stepCounter
  );

  const [play] = useSound(`${mainPath.langUrl}${rightWord.audio}`, {
    interrupt: true,
  });
  const [playSuccessAnswer] = useSound(successSound);
  const [playWrongAnswer] = useSound(wrongSound);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchWordsList({ page: 0, group: 0 }))
  // }, [])

  useEffect(() => {
    console.log('sound1');
    console.log(rightWord.word);
    console.log(userAnswer.word);
    if (!isAnswer) {
      return;
    }
    if (userAnswer.word === rightWord.word) {
      console.log('sound');
      playSuccessAnswer();
    }
    playWrongAnswer();
  }, [isAnswer]);

  return isPlaying ? (
    <div className={styles.game__content}>
      <SettingsBtn />
      <div className={styles.game__field}>
        <LevelInfo />
        {currentWords.length === 0 ? <Spinner /> : <RenderWordCard />}
        <LifeInfo />
      </div>
      <img className={styles.cat__image} src={CatSavanna} alt="loading..." />
    </div>
  ) : (
    <StartScreen />
  );
};

export default SavannaGame;
