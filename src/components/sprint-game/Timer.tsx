import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { sprintGameStatusChange } from '../../actions/sprint-game-action';
import styles from './sprint-game.module.css';
import tick from '../../assets/sounds/clock.wav';

type Props = {
  initialTimer: number;
  nextPage: string;
  timerFontSize: string;
};

export const Timer: React.FC<Props> = ({
  initialTimer,
  nextPage,
  timerFontSize,
}) => {
  const [startTimer, setStartTimer] = useState(initialTimer);
  const dispatch = useDispatch();
  const [soundOn, setSoundOn] = useState(false);
  const [tickTimer] = useSound(tick, { interrupt: true });

  useEffect(() => {
    if (startTimer > 0) {
      setTimeout(() => {
        setStartTimer(startTimer - 1);
        if (soundOn === true) {
          tickTimer();
        }
      }, 1000);
    } else {
      dispatch(sprintGameStatusChange(nextPage));
    }
    return () =>{
      clearTimeout();
    }
  }, [startTimer]);

  return (
    <div
      className={styles.timer}
      style={{ fontSize: timerFontSize, zIndex: 10 }}
    >
      {startTimer}
    </div>
  );
};
