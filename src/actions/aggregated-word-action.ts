import { Dispatch } from 'react';
import AggregateService, {
  AggregateParamsType,
} from '../services/word-aggregate-service';
import { CurrentWordListType } from './word-actions';

export const USER_AGGREGATED_WORD_LOADED = 'USER_AGGREGATED_WORD_LOADED';
export const USER_AGGREGATED_WORD_LOADING = 'USER_AGGREGATED_WORD_LOADING';
export const USER_AGGREGATED_WORD_ERROR = 'USER_AGGREGATED_WORD_ERROR';
export const USER_AGGREGATED_WORD = 'USER_AGGREGATED_WORD';

export type AggregatedWordListResultType = {
  paginatedResults: Array<CurrentWordListType>;
  totalCount: [
    {
      count: number;
    }
  ];
};
export type UserAggregatedWordLoadedAType = {
  type: string;
  payload: AggregatedWordListResultType;
};

export type UserAggregatedWordRequestAType = {
  type: string;
  payload: '';
};

export type UserAggregatedWordFetchErrAType = {
  type: string;
  payload: string;
};

export type UserAggregatedWordAType = {
  type: string;
  payload: unknown;
};

export const userAggregatedWordLoaded = (
  value: AggregatedWordListResultType
) => ({
  type: USER_AGGREGATED_WORD_LOADED,
  payload: value,
});

export const userAggregatedWordRequested = () => ({
  type: USER_AGGREGATED_WORD_LOADING,
  payload: '',
});

export const userAggregatedWordFetchErr = (err: string) => ({
  type: USER_AGGREGATED_WORD_ERROR,
  payload: err,
});

export const userAggregatedWord = (value: any) => ({
  type: USER_AGGREGATED_WORD,
  payload: value,
});

export type UserAggregatedWordActionForReducer =
  | UserAggregatedWordLoadedAType
  | UserAggregatedWordRequestAType
  | UserAggregatedWordFetchErrAType
  | UserAggregatedWordAType;

export type UserAggregatedWordsActions =
  | UserAggregatedWordActionForReducer
  | typeof getAggregatedWord
  | typeof getAggregatedWord;

const service = new AggregateService();

export const getAggregatedWordsList = (
  params: AggregateParamsType,
  filterType: string
) => (dispatch: Dispatch<UserAggregatedWordActionForReducer>) => {
  dispatch(userAggregatedWordRequested());
  service
    .getAggregatedWordsList(params, filterType)
    .then((data) => console.log(data)) // dispatch(userAggregatedWordLoaded(data)))
    .catch((err) => console.log(err)); // dispatch(userAggregatedWordFetchErr(err.message)));
};

export const getAggregatedWord = (params: {
  wordId: string;
  userId: string;
  token: string;
}) => (dispatch: Dispatch<UserAggregatedWordActionForReducer>) => {
  dispatch(userAggregatedWordRequested());
  service
    .getAggregatedWord(params)
    .then((data) => console.log(data)) // dispatch(userAggregatedWord(data)))
    .catch((err) => console.log(err)); // dispatch(userAggregatedWordFetchErr(err.message)));
};
