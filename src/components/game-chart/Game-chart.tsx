import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './game-chart.module.css';

type Props = {
  game: string;
  learnedWordCount?: number;
  combo: number;
  correctAvg: number;
};
export const GameChart: React.FC<Props> = ({
  game,
  learnedWordCount,
  combo,
  correctAvg,
}) => {
  const data = {
    labels: ['Неправильно %', 'Правильно %'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [100 - correctAvg, correctAvg],
        backgroundColor: ['#F945D1', '#45F9A3'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Pie
        data={data}
        legend={{
          position: 'top',
          display: false,
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: game,
          },
        }}
      />
      <h4 className={styles.text}>Макс. серия правильных слов: {combo}</h4>
      <h4 className={styles.text}>Cлов изученно: {learnedWordCount}</h4>
    </div>
  );
};
