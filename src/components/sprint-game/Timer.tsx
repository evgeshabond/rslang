import zIndex from '@material-ui/core/styles/zIndex';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sprintGameStatusChange } from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';

type Props = {
  initialTimer: number;
  nextPage: string;
  timerFontSize: string;
};

export const Timer: React.FC<Props> = ({ initialTimer, nextPage, timerFontSize }) => {
  const [startTimer, setStartTimer] = useState(initialTimer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (startTimer > 0) {
      setTimeout(() => setStartTimer(startTimer - 1), 1000);
    } else {
      dispatch(sprintGameStatusChange(nextPage));
    }
  }, [startTimer]);

  return <div className={styles.timer} style={{fontSize: timerFontSize, zIndex:10}}>{startTimer}</div>;
};
