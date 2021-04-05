import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sprintGameListOfCorrectWords,
  sprintGameListOfIncorrectWords,
} from '../../../actions/sprint-game-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { mainPath } from '../../../utils/constants';
import styles from './finish-page.module.css';
import { ReactComponent as AudioSvg } from '../../../assets/images/audioOn.svg';

const FinishPage: React.FC = () => {
  const dispatch = useDispatch();
  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );
  const { totalPoints, learntWords, notLearntWords } = gameStatuses;

  useEffect(() => {
    dispatch(sprintGameListOfIncorrectWords(''));
    dispatch(sprintGameListOfCorrectWords(''));
  }, []);

  const soundHandler = (soundPath: string) => {
    const sound = new Audio(`${mainPath.langUrl}${soundPath}`);

    if (sound.volume) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const renderCorrectWordsList = () => (
    <ul className={styles['correct-words-list']}>
      {learntWords.map((wordObject) => (
        <li key={wordObject.id} className={styles['words-wrapper']}>
          <button
            type="button"
            onClick={() => soundHandler(wordObject.audio)}
            className={styles['correct-word-sound']}
          >
            <AudioSvg />
          </button>
          <span className={styles['main-word']}>
            {wordObject.word}-
            <span className={styles.translation}>
              {wordObject.wordTranslate}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  const renderIncorrectWordList = () => (
    <ul className={styles['incorrect-words-list']}>
      {notLearntWords.map((wordObject) => (
        <li className={styles['words-wrapper']} key={wordObject.id}>
          <button
            type="button"
            onClick={() => soundHandler(wordObject.audio)}
            className={styles['incorrect-word-sound']}
          >
            <AudioSvg style={{ fill: 'red' }} />
          </button>
          <span className={styles['main-word']}>
            {wordObject.word}-
            <span className={styles.translation}>
              {wordObject.wordTranslate}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles['finish-game-wrapper']}>
      <h3>Результаты</h3>
      <div className={styles['result-wrapper']}>
        <p>
          {' '}
          Вы набрали{' '}
          <span className={styles['points-number']}> {totalPoints} </span>очков!
        </p>
      </div>

      <div className={styles['details-wrapper']}>
        <div className={styles.correct}>Правильно: {learntWords.length} </div>

        <div className={styles['correct-word-details']}>
          {renderCorrectWordsList()}
        </div>
        <div className={styles['words-separator']}> </div>

        <div className={styles.incorrect}>
          Неправильно: {notLearntWords.length}
        </div>

        <div
          className={`${styles['incorrect-word-details']} ${styles['details-wrapper']}`}
        >
          {renderIncorrectWordList()}
        </div>
      </div>

      <div className={styles['result-buttons']}>
        <button type="button" className={styles['word-list']}>
          Назад
        </button>
        <button type="button" className={styles.repeat}>
          Повторить
        </button>
      </div>
    </div>
  );
};
export default FinishPage;
