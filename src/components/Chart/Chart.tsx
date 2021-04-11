import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalStatistics } from '../../actions/statistic-action';
import { RootStateType } from '../../reducer/root-reducer';
import { GameChart } from '../game-chart/Game-chart';
import styles from './chart.module.css';

export const ChartComponent: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const totalStatistic = useSelector(
    (state: RootStateType) => state.statisticState.totalStatistic
  );
  const todayStatistic = useSelector(
    (state: RootStateType) => state.statisticState.gameToday
  );

  const { savanna, sprint, audiocall, constructors } = todayStatistic;
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
            title: {
              display: true,
              text: 'Изученно всего',
              fontColor: 'rgba(114, 56, 153, 1)',
              fontSize: 24,
            },
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
      <h3 className={styles['header-text']}>Изученно сегодня</h3>
      <div className={styles.stats}>
        <div className={styles['game-charts-container']}>
          <GameChart
            game="Саванна"
            learnedWordCount={savanna ? savanna.learnedWordCount : 0}
            combo={savanna ? savanna.maxCombo : 0}
            correctAvg={savanna ? savanna.correctAvg : 0}
          />
          <GameChart
            game="Спринт"
            learnedWordCount={sprint ? sprint.learnedWordCount : 0}
            combo={sprint ? sprint.maxCombo : 0}
            correctAvg={sprint ? sprint.correctAvg : 0}
          />
          <GameChart
            game="Аудио-вызов"
            learnedWordCount={audiocall ? audiocall.learnedWordCount : 0}
            combo={audiocall ? audiocall.maxCombo : 0}
            correctAvg={audiocall ? audiocall.correctAvg : 0}
          />
          <GameChart
            game="Конструктор"
            learnedWordCount={constructors ? constructors.learnedWordCount : 0}
            combo={constructors ? constructors.maxCombo : 0}
            correctAvg={constructors ? constructors.correctAvg : 0}
          />
        </div>
      </div>
    </div>
  );
};
