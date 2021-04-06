import {
  CLEAR_ALL_STATISTIC,
  GAME_STAT_UPDATE,
  STATISTIC_LOAD_ERROR,
  TODAY_AUDIOCALL_STATISTIC,
  TODAY_CONSTRUCTORS_STATISTIC,
  TODAY_SAVANNA_STATISTIC,
  TODAY_SPRINT_STATISTIC,
  CLEAR_TODAY_STATISTIC,
} from '../actions/statistic-action';
import {
  AllGameStatisticType,
  TodayGameStatisticType,
} from './statistic-state-types';

export type StatisticStateType = {
  userId: string;
  learnedWords: number;
  optional: { gameStatistic: AllGameStatisticType };
  gameToday: {
    savanna: TodayGameStatisticType;
    sprint: TodayGameStatisticType;
    audiocall: TodayGameStatisticType;
    constructors: TodayGameStatisticType;
  };
  gameTotal: {};
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
  gameToday: {},
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
    case TODAY_SAVANNA_STATISTIC:
      console.log(action.payload);
      return {
        ...state,
        gameToday: { ...state.gameToday, savanna: action.payload },
      };
    case TODAY_SPRINT_STATISTIC:
      return {
        ...state,
        gameToday: { ...state.gameToday, sprint: action.payload },
      };
    case TODAY_AUDIOCALL_STATISTIC:
      return {
        ...state,
        gameToday: { ...state.gameToday, audiocall: action.payload },
      };
    case TODAY_CONSTRUCTORS_STATISTIC:
      return {
        ...state,
        gameToday: { ...state.gameToday, constructors: action.payload },
      };
    case CLEAR_TODAY_STATISTIC:
      return {
        ...state,
        gameToday: {},
      };
    case CLEAR_ALL_STATISTIC:
      return initialState;
    default:
      return state;
  }
};
