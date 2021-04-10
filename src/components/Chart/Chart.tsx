import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalStatistics } from '../../actions/statistic-action';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './chart.module.css';

export const ChartComponent: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const totalStatistic = useSelector(
    (state: RootStateType) => state.statisticState.totalStatistic
  );

  useEffect(() => {
    const param = {
      userId: user.userId,
      token: user.token,
    };

    dispatch(getTotalStatistics(param));
  }, []);

  const dates = totalStatistic.map((stats) =>
    ((stats.date as unknown) as string).slice(0, 10)
  );

  const totalWordCount = totalStatistic.map((stats) => stats.totalWordCount);

  const wordsCount = totalStatistic.map((stats) => stats.wordsCount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Количество слов за всё время',
        data: totalWordCount,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Количество слов за сегодня',
        data: wordsCount,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chart__wrapper}>
      <div className={styles.chart}>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className={styles.stats}>
        <h3>Stats:</h3>
        <p>
          Many stats, many-many stats, many-many stats, many-many stats,
          many-many stats, many-many stats, many-many stats, many-many stats,
          many-many stats, and one more stat.
        </p>
      </div>
    </div>
  );
};
