import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalStatistics } from '../../actions/statistic-action';
import { RootStateType } from '../../reducer/root-reducer';

export const ChartComponent: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const totalStatistic = useSelector(
    (state: RootStateType) => state.statisticState.totalStatistic
  );

  console.log(totalStatistic);
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
        label: 'Total words',
        data: totalWordCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Today words',
        data: wordsCount,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart__wrapper">
      <Line
        data={data}
        width={300}
        height={150}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};
