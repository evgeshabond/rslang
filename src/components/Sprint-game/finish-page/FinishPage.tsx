import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sprintGameListOfCorrectWords, sprintGameListOfIncorrectWords } from '../../../actions/sprint-game-action';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './finish-page.module.css';

const FinishPage: React.FC = () => {
  const dispatch = useDispatch();
  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );
  const { totalPoints, listOfCorrectWords, listOfIncorrectWords, shuffledArray } = gameStatuses;

  useEffect(() =>{
    dispatch(sprintGameListOfIncorrectWords(''));
    dispatch(sprintGameListOfCorrectWords(''));
  }, [])

 

  return (
    <div className={styles['finish-game-wrapper']}>
      <h3>Результаты</h3>
      <div className={styles['result-wrapper']}>
       <p> Вы набрали <span className={styles['points-number']}> {totalPoints} </span>очков!</p>
       <p> Это ваш лучший результат! </p>
       <p>Он на <span className={styles['points-procents']}>100%</span>
        лучше предыдущего!</p>
      </div>
      <div className={styles['details-wrapper']}>
        <div className={styles['correct-not-correct']}>
          <div className={styles.correct}>Правильно: {listOfCorrectWords.length} </div>
          <div className={styles.incorrect}>Неправильно: {listOfIncorrectWords.length} </div>
        </div>
        <div className={styles['words-wrapper']}>
          <div className={styles['correct-word-details']}>{}</div>
          <div className={styles['incorrect-word-details']}>1</div>
        </div>
        </div>
        <div className={styles['result-buttons']}>
          <button type="button" className={styles['word-list']}>
            К списку слов
          </button>
          <button type="button" className={styles.repeat}>
            Повторить
          </button>
        
      </div>
    </div>
  );
};
export default FinishPage;
