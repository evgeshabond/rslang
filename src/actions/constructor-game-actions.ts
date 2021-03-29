import { CurrentWordListType } from './word-actions';

const CONSTRUCTOR_GAME_PLAY_STATUS = 'CONSTRUCTOR_GAME_PLAY_STATUS';
const CONSTRUCTOR_SHUFFLED_LIST = 'CONSTRUCTOR_GAME_SHUFFLED_LIST';
const CONSTRUCTOR_ROUND_STATUS = 'CONSTRUCTOR_ROUND_STATUS';
const UPDATE_CHARS_POSITION = 'UPDATE_CHARS_POSITION';
const UPDATE_ROUND_COUNT = 'UPDATE_ROUND_COUNT';

const setRoundCount = (value: number) => ({
  type: UPDATE_ROUND_COUNT,
  payload: value,
});

const updateCharsPosition = (value: [string, string][]) => ({
  type: UPDATE_CHARS_POSITION,
  payload: value,
});

const setRoundEnd = (value: boolean) => ({
  type: CONSTRUCTOR_ROUND_STATUS,
  payload: value,
});

const constructorGameStart = (value: boolean) => ({
  type: CONSTRUCTOR_GAME_PLAY_STATUS,
  payload: value,
});

const setShuffledWordList = (value: Array<CurrentWordListType>) => ({
  type: CONSTRUCTOR_SHUFFLED_LIST,
  payload: value,
});

export type ConstructorGameActionType = {
  type: string;
  payload: boolean | Array<CurrentWordListType> | [string, string][] | number;
};

export {
  constructorGameStart,
  setShuffledWordList,
  setRoundEnd,
  updateCharsPosition,
  setRoundCount,
  CONSTRUCTOR_GAME_PLAY_STATUS,
  CONSTRUCTOR_SHUFFLED_LIST,
  CONSTRUCTOR_ROUND_STATUS,
  UPDATE_CHARS_POSITION,
  UPDATE_ROUND_COUNT,
};
