import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducer/root-reducer';

import styles from './check-points.module.css';
import check from '../../assets/images/checkpoint.svg';

const CheckPoints: React.FC = () => {
  const checkpoints = useSelector(
    (state: RootStateType) => state.sprintGameState.checkpoints
  );
  const checkArray = [
    { id: '1', src: check },
    { id: '2', src: check },
    { id: '3', src: check },
  ];

  console.log(checkpoints, 'check');
  return (
    <ul className={styles.check__points}>
      {checkArray.slice(0, checkpoints).map(({ id, src }) => (
        <li key={id} className={styles.check}>
          <img src={src} alt="check" />
        </li>
      ))}
    </ul>
  );
};

export default CheckPoints;
