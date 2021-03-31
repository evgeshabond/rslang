import { Dispatch } from 'redux';
import {
  AllGameStatisticType,
  GameStatistic,
} from '../reducer/statistic-state-types';
import StatisticService from '../services/statistic-service';

export const GAME_STAT_UPDATE = 'GAME_STAT_UPDATE';
export const CLEAR_ALL_STATISTIC = 'CLEAR_ALL_STATISTIC';
export const STATISTIC_LOAD_ERROR = 'STATISTIC_LOAD_ERROR';

export type GameStatActionType = {
  type: string;
  payload: AllGameStatisticType | string;
};

export const gameStatUpdate = (value: AllGameStatisticType) => ({
  type: GAME_STAT_UPDATE,
  payload: value,
});

export const clearAllStatistic = () => ({
  type: CLEAR_ALL_STATISTIC,
});

export const statisticError = (value: string) => ({
  type: STATISTIC_LOAD_ERROR,
  payload: value,
});

const services = new StatisticService();

export const getStatistics = (params: { userId: string; token: string }) => (
  dispatch: Dispatch<GameStatActionType>
) => {
  services
    .getStatistic(params)
    .then((data) => {
      if (data.error) {
        dispatch(
          statisticError('ваша сессия истекла пожалуйста авторизуйтесь заново')
        );
      } else {
        dispatch(gameStatUpdate(data.optional.gameStatistic));
      }
    })
    .catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    });
};

export const setStatistics = (params: {
  userId: string;
  token: string;
  gameType: string;
  body: GameStatistic;
}) => (dispatch: Dispatch<GameStatActionType>) => {
  services
    .setStatistic(params)
    .then((data) => {
      console.log(data);
      if (data.error) {
        dispatch(
          statisticError('ваша сессия истекла пожалуйста авторизуйтесь заново')
        );
      } else {
        dispatch(gameStatUpdate(data.optional.gameStatistic));
      }
    })
    .catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    });
};
