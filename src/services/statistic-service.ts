import moment from 'moment';
import { serverUrlLocal, serverUrl } from '../utils/constants';
import { GameStatistic } from '../reducer/statistic-state-types';

export default class StatisticService {
  getStatistic = async (params: { userId: string; token: string }) => {
    const res = await fetch(
      `${serverUrlLocal}users/${params.userId}/statistics`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  };

  setStatistic = async (
    params: {
      userId: string;
      token: string;
    },
    body: GameStatistic
  ) => {
    const bodyFetch = {
      optional: {
        gameStatistic: {
          [body.gameType]: {
            total: [body],
          },
        },
      },
    };
    const res = await fetch(
      `${serverUrlLocal}users/${params.userId}/statistics/gameadd/${body.gameType}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyFetch),
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

  getTodayStatistic = async (
    params: {
      userId: string;
      token: string;
    },
    gameType: string
  ) => {
    const today = moment().startOf('day');
    const res = await fetch(
      `${serverUrlLocal}users/${params.userId}/statistics/gamedata/${today}/gameType/${gameType}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
