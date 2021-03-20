import { Dispatch } from 'react';
import LangService from '../services/lang-service';

export const WORD_LIST_LOADED = 'WORD_LIST_LOADED';
export const WORD_LIST_LOADING = 'WORD_LIST_LOADING';
export const WORD_LIST_ERROR = 'WORD_LIST_ERROR';

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
  payload: CurrentWordListType;
};

export type WordListRequestAType = {
  type: string;
};

export type WordListFetchErrAType = {
  type: string;
  payload: unknown;
};

export const wordListLoaded = (newList: CurrentWordListType) => ({
  type: WORD_LIST_LOADED,
  payload: newList,
});

export const wordListRequested = () => ({
  type: WORD_LIST_LOADING,
});

export const wordListFetchErr = (err: unknown) => ({
  type: WORD_LIST_ERROR,
  payload: err,
});

export type WordsActions =
  | WordListLoadedAType
  | WordListRequestAType
  | WordListFetchErrAType
  | typeof fetchWordsList;

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

export { fetchWordsList };
