import {
  UserAggregatedWordActionForReducer,
  USER_AGGREGATED_WORD,
  USER_AGGREGATED_WORD_ERROR,
  USER_AGGREGATED_WORD_LOADED,
  USER_AGGREGATED_WORD_LOADING,
} from '../actions/aggregated-word-action';

export type AggregatedWordsStateType = typeof initialState;

const initialState = {
  userAggregatedWords: {
    paginatedResults: [],
    totalCount: [],
  },
  loading: false,
  errMsg: '',
  aggregatedWord: [],
};

const aggregatedWordsReducer = (
  state = initialState,
  action: UserAggregatedWordActionForReducer
) => {
  switch (action.type) {
    case USER_AGGREGATED_WORD_LOADED:
      return {
        ...state,
        userAggregatedWords: action.payload,
        loading: false,
        errMsg: '',
      };
    case USER_AGGREGATED_WORD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_AGGREGATED_WORD_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case USER_AGGREGATED_WORD:
      return {
        ...state,
        aggregatedWord: action.payload,
      };
    default:
      return state;
  }
};

export { aggregatedWordsReducer };
