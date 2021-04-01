import { Dispatch } from 'react';
import LangService from '../services/lang-service';

export const WORD_LIST_LOADED = 'WORD_LIST_LOADED';
export const WORD_LIST_LOADING = 'WORD_LIST_LOADING';
export const WORD_LIST_ERROR = 'WORD_LIST_ERROR';
export const WORD_LOADED = 'WORD_LOADED';

export type CurrentWordListType = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type WordListLoadedAType = {
  type: string;
  payload: Array<CurrentWordListType>;
};

export type WordListRequestAType = {
  type: string;
  payload: '';
};

export type WordListFetchErrAType = {
  type: string;
  payload: unknown;
};

export type CuurentWordLoadeAType = {
  type: string;
  payload: CurrentWordListType;
};

export const wordListLoaded = (newList: Array<CurrentWordListType>) => ({
  type: WORD_LIST_LOADED,
  payload: newList,
});

export const wordListRequested = () => ({
  type: WORD_LIST_LOADING,
  payload: '',
});

export const wordListFetchErr = (err: unknown) => ({
  type: WORD_LIST_ERROR,
  payload: err,
});

export const currentWordLoaded = (value: CurrentWordListType) => ({
  type: WORD_LOADED,
  payload: value,
});

export type WordActionForReducer =
  | WordListLoadedAType
  | WordListRequestAType
  | WordListFetchErrAType
  | WordListFetchErrAType;

export type WordsActions = WordActionForReducer | typeof fetchWordsList;

const wordService = new LangService();

const fetchWordsList = (params: { page: number; group: number }) => (
  dispatch: Dispatch<WordsActions>
) => {
  dispatch(wordListRequested());
  wordService
    .getWordList(params)
    .then((data) => dispatch(wordListLoaded(data)))
    .catch((err) => dispatch(wordListFetchErr(err)));
};

const getCurrentWords = (wordId: string) => (
  dispatch: Dispatch<WordsActions>
) => {
  dispatch(wordListRequested());
  wordService
    .getWord(wordId)
    .then((data) => dispatch(currentWordLoaded(data)))
    .catch((err) => dispatch(wordListFetchErr(err)));
};

export { fetchWordsList, getCurrentWords };
