import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sprintGameListOfCorrectWords,
  sprintGameListOfIncorrectWords,
} from '../../../actions/sprint-game-action';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './finish-page.module.css';

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

  const renderCorrectWordsList = () => (
    <ul>
      {learntWords.map((elem) => (
        <li key={elem.id}>
          {' '}
          <button type="button" onClick={() => console.log('play')}>
            p
          </button>
          <span>
            {elem.word}-<span>{elem.wordTranslate}</span>
          </span>
        </li>
      ))}
    </ul>
  );

  const renderIncorrectWordList = () => (
    <ul>
      {notLearntWords.map((elem) => (
        <li key={elem.id}>
          {' '}
          <button type="button" onClick={() => console.log('play')}>
            p
          </button>
          <span>
            {elem.word}-<span>{elem.wordTranslate}</span>
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
        <div className={styles['correct-not-correct']}>
          <div className={styles.correct}>Правильно: {learntWords.length} </div>
         
        </div>
        <div className={styles['words-wrapper']}>
          <div className={styles['correct-word-details']}>
            {renderCorrectWordsList()}
          </div>
          <div className={styles.incorrect}>
            Неправильно: {notLearntWords.length}{' '}
          </div>
          <div className={`${styles['incorrect-word-details']} ${styles['details-wrapper']}`}>
            {renderIncorrectWordList()}
          </div>
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
