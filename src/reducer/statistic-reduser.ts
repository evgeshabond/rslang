import {
  CLEAR_ALL_STATISTIC,
  GAME_STAT_UPDATE,
  STATISTIC_LOAD_ERROR,
} from '../actions/statistic-action';
import { AllGameStatisticType } from './statistic-state-types';

export type StatisticStateType = {
  userId: string;
  learnedWords: number;
  optional: { gameStatistic: AllGameStatisticType };
  errorMsg: string;
};

const initialState = {
  userId: '',
  learnedWords: 0,
  optional: {
    gameStatistic: {
      savanna: {
        total: [],
      },
      sprint: {
        total: [],
      },
      audiocall: {
        total: [],
      },
      constructors: {
        total: [],
      },
    },
  },
  errorMsg: '',
};

export const statisticReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case GAME_STAT_UPDATE:
      return {
        ...state,
        optional: {
          gameStatistic: action.payload,
        },
      };
    case STATISTIC_LOAD_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
      };
    case CLEAR_ALL_STATISTIC:
      return initialState;
    default:
      return state;
  }
};
