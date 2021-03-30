import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import styles from './ConstructorGame.module.css';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { ReactComponent as ExitButton } from '../../assets/images/exit-button-mini.svg';
import { ReactComponent as AudioOn } from '../../assets/images/audioOn.svg';
import { RootStateType } from '../../reducer/root-reducer';
import { mainPath } from '../../utils/constants';
import {
  constructorGameStart,
  setRoundEnd,
  setRoundCount,
  updateCharsPosition,
  setWordObj,
  setLearnCount,
} from '../../actions/constructor-game-actions';
import { shuffle } from '../../utils/shuffle';
import { StartScreen } from './Start-screen/Start-screen';
import { DragEndDrop } from './DragEndDrop/DragEndDrop';

type WordObjectType = { [key: string]: string };

const ConstructorGame: React.FC = () => {
  const dispatch = useDispatch();

  const shuffledWordList = useSelector(
    (state: RootStateType) => state.constructorGameState.shuffledWordList
  );

  const wordObj = useSelector(
    (state: RootStateType) => state.constructorGameState.wordObj
  );

  const isRoundEnd = useSelector(
    (state: RootStateType) => state.constructorGameState.constructorRoundStatus
  );

  const learned = useSelector(
    (state: RootStateType) => state.constructorGameState.learned
  );

  const roundCount = useSelector(
    (state: RootStateType) => state.constructorGameState.roundCount
  );

  const chars = useSelector(
    (state: RootStateType) => state.constructorGameState.chars
  );

  useEffect(() => {
    dispatch(setWordObj(shuffledWordList[roundCount]));
  }, [shuffledWordList, roundCount]);

  const [wordSound] = useSound(
    `${mainPath.langUrl}${wordObj === undefined ? '' : wordObj.audio}`,
    {
      interrupt: true,
    }
  );

  const constructorGameIsStarted = useSelector(
    (state: RootStateType) =>
      state.constructorGameState.constructorGameIsStarted
  );

  useEffect(() => {
    if (wordObj === undefined) {
      return;
    }
    if (wordObj.word === undefined) {
      return;
    }
    const wordArray = wordObj.word.split('');

    const shuffledWordArray = shuffle(wordArray);

    const wordObject: WordObjectType = {};
    shuffledWordArray.forEach((char, index) => {
      wordObject[index.toString()] = char;
    });

    const charArray = Object.entries(wordObject);

    dispatch(updateCharsPosition(charArray));

    if (isRoundEnd) {
      const startWordObject: WordObjectType = {};
      wordArray.forEach((char, index) => {
        startWordObject[index.toString()] = char;
      });

      const resultArray = Object.entries(startWordObject);
      dispatch(updateCharsPosition(resultArray));
    }
  }, [wordObj, isRoundEnd]);

  useEffect(() => {
    if (chars === undefined || wordObj === undefined) {
      return;
    }
    const currentChars = chars.map((char) => char[1]).join('');

    if (wordObj.word === currentChars) {
      dispatch(setRoundEnd(true));
      wordSound();
    }
  }, [wordObj, chars]);

  useEffect(() => {
    if (chars === undefined) {
      return;
    }

    const currentChars = chars.map((char) => char[1]).join('');
    if (wordObj.word === currentChars && isRoundEnd) {
      dispatch(setLearnCount(learned + 1));
    }
  }, [isRoundEnd]);

  const nextRoundHandler = () => {
    if (roundCount === 10) {
      dispatch(constructorGameStart(false));
      dispatch(setLearnCount(0));
    }

    dispatch(setRoundCount(roundCount + 1));
    dispatch(setRoundEnd(false));
  };

  const endGameHandler = () => {
    dispatch(constructorGameStart(false));
  };

  const removeTagsFromString = (originalString: string) =>
    originalString.replace(/(<([^>]+)>)/gi, '');

  const removeTagsAndContextWord = (originalString: string) =>
    originalString.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '...');

  return constructorGameIsStarted ? (
    <div className={styles['my-game']}>
      <div className={styles.word__container}>
        <div className={styles.word__empty} />
        <div className={styles.word__inner}>
          <p className={`${styles.text} ${styles.word}`}>
            {wordObj.wordTranslate}
          </p>
          {isRoundEnd ? (
            <p className={styles.word__transcription}>
              {wordObj.transcription}
            </p>
          ) : (
            <p className={styles.description}>Собери слово из букв.</p>
          )}
        </div>
        <div className={styles.counter}>{`${roundCount}/10`}</div>
      </div>
      <button
        type="button"
        className={styles['audio-button']}
        onClick={() => (isRoundEnd ? wordSound() : null)}
      >
        <AudioOn />
      </button>
      <button
        type="button"
        className={styles['exit-button']}
        onClick={endGameHandler}
      >
        <ExitButton />
      </button>
      <DragEndDrop />
      <img
        className={styles.picture}
        src={`${mainPath.langUrl}${wordObj.image}`}
        alt={wordObj.word}
      />
      {isRoundEnd ? (
        <>
          <p className={styles.description}>Пример</p>
          <p className={styles.word__transcription}>{`${
            wordObj.textExample ? removeTagsFromString(wordObj.textExample) : ''
          }`}</p>
          <button
            className={styles['btn-next']}
            type="button"
            onClick={() => nextRoundHandler()}
          >
            {roundCount === 10 ? `Выйти` : `Далее`}
          </button>
        </>
      ) : (
        <>
          <p className={styles.description}>Контекст</p>
          <p className={styles.word__transcription}>
            {`${
              wordObj.textMeaning
                ? removeTagsAndContextWord(wordObj.textMeaning)
                : ''
            }`}
          </p>
          <button
            className={styles['btn-next']}
            type="button"
            onClick={() => dispatch(setRoundEnd(true))}
          >
            Не знаю
          </button>
        </>
      )}
      <CatSleeping className={styles.cat_sleeping} />
    </div>
  ) : (
    <StartScreen />
  );
};

export default ConstructorGame;
