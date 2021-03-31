import { serverUrl, serverUrlLocal } from '../utils/constants';
import { GameStatistic } from '../reducer/statistic-state-types';

export default class StatisticService {
  getStatistic = async (params: { userId: string; token: string }) => {
    const res = await fetch(`${serverUrl}users/${params.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    return data;
  };

  setStatistic = async (params: {
    userId: string;
    token: string;
    gameType: string;
    body: GameStatistic;
  }) => {
    const body = {
      optional: {
        gameStatistic: {
          [params.gameType]: {
            total: [params.body],
          },
        },
      },
    };
    const res = await fetch(
      `${serverUrl}users/${params.userId}/statistics/gameadd/${params.gameType}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 401) {
      return {
        error: {
          errors: [{ message: 'Пользователь не найден' }],
        },
      };
    }
    const data = await res.json();
    return data;
  };
}
