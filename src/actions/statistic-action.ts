import { Dispatch } from 'redux';
import {
  AllGameStatisticType,
  GameStatistic,
  TodayGameStatisticType,
} from '../reducer/statistic-state-types';
import StatisticService from '../services/statistic-service';
import { gameType } from '../utils/constants';

export const GAME_STAT_UPDATE = 'GAME_STAT_UPDATE';
export const CLEAR_ALL_STATISTIC = 'CLEAR_ALL_STATISTIC';
export const STATISTIC_LOAD_ERROR = 'STATISTIC_LOAD_ERROR';
export const TODAY_SAVANNA_STATISTIC = 'TODAY_SAVANNA_STATISTIC';
export const TODAY_SPRINT_STATISTIC = 'TODAY_SPRINT_STATISTIC';
export const TODAY_AUDIOCALL_STATISTIC = 'TODAY_AUDIOCALL_STATISTIC';
export const TODAY_CONSTRUCTORS_STATISTIC = 'TODAY_CONSTRUCTORS_STATISTIC';
export const CLEAR_TODAY_STATISTIC = 'CLEAR_TODAY_STATISTIC';

export type GameStatActionType = {
  type: string;
  payload: AllGameStatisticType | string | TodayGameStatisticType;
};

export const gameStatUpdate = (value: AllGameStatisticType) => ({
  type: GAME_STAT_UPDATE,
  payload: value,
});

export const getTodayStatisticSavanna = (value: TodayGameStatisticType) => ({
  type: TODAY_SAVANNA_STATISTIC,
  payload: value,
});

export const getTodayStatisticSprint = (value: TodayGameStatisticType) => ({
  type: TODAY_SPRINT_STATISTIC,
  payload: value,
});

export const getTodayStatisticAudiocall = (value: TodayGameStatisticType) => ({
  type: TODAY_AUDIOCALL_STATISTIC,
  payload: value,
});

export const getTodayStatisticConstructors = (
  value: TodayGameStatisticType
) => ({
  type: TODAY_CONSTRUCTORS_STATISTIC,
  payload: value,
});

export const clearAllStatistic = () => ({
  type: CLEAR_ALL_STATISTIC,
});

export const statisticError = (value: string) => ({
  type: STATISTIC_LOAD_ERROR,
  payload: value,
});

export const clearTodayStatistic = () => ({
  type: CLEAR_TODAY_STATISTIC,
  payload: '',
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

export const setStatistics = (
  params: {
    userId: string;
    token: string;
  },
  body: GameStatistic
) => (dispatch: Dispatch<GameStatActionType>) => {
  services
    .setStatistic(params, body)
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

export const getTodayStatistic = (params: {
  userId: string;
  token: string;
}) => (dispatch: Dispatch<GameStatActionType>) => {
  Promise.all([
    services.getTodayStatistic(params, gameType.savanna).catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    }),
    services.getTodayStatistic(params, gameType.sprint).catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    }),
    services.getTodayStatistic(params, gameType.audiocall).catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    }),
    services.getTodayStatistic(params, gameType.constructors).catch((err) => {
      console.error('fetch err action user', err);
      dispatch(statisticError('проблема с доступом к серверу'));
    }),
  ]).then((values) => {
    console.log(values);
    dispatch(clearTodayStatistic());
    if (values[0] === undefined || values[0].error) {
      return;
    }
    values.forEach((data: Array<TodayGameStatisticType>) => {
      dispatch(statisticError(''));
      if (data.length === 0) {
        return;
      }
      switch (data[0].gameType[0]) {
        case gameType.savanna:
          dispatch(getTodayStatisticSavanna(data[0]));
          break;
        case gameType.sprint:
          dispatch(getTodayStatisticSprint(data[0]));
          break;
        case gameType.audiocall:
          dispatch(getTodayStatisticAudiocall(data[0]));
          break;
        case gameType.constructors:
          dispatch(getTodayStatisticConstructors(data[0]));
          break;
        default:
          break;
      }
    });
  });
};
