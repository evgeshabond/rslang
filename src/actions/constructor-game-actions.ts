import { CurrentWordListType } from './word-actions';

const CONSTRUCTOR_GAME_RESULT_STATUS = 'CONSTRUCTOR_GAME_RESULT_STATUS';
const CONSTRUCTOR_GAME_PLAY_STATUS = 'CONSTRUCTOR_GAME_PLAY_STATUS';
const CONSTRUCTOR_SHUFFLED_LIST = 'CONSTRUCTOR_GAME_SHUFFLED_LIST';
const CONSTRUCTOR_ROUND_STATUS = 'CONSTRUCTOR_ROUND_STATUS';
const UPDATE_CHARS_POSITION = 'UPDATE_CHARS_POSITION';
const UPDATE_LEARNED_COUNT = 'UPDATE_LEARNED_COUNT';
const ADD_NOT_LEARNED_WORD = 'ADD_NOT_LEARNED_WORD';
const UPDATE_COMBO_COUNTER = 'UPDATE_COMBO_COUNTER';
const UPDATE_ROUND_COUNT = 'UPDATE_ROUND_COUNT';
const ADD_LEARNED_WORD = 'ADD_LEARNED_WORD';
const UPDATE_WORD_OBJ = 'UPDATE_WORD_OBJ';
const CLEAR_WORDS = 'CLEAR_WORDS';
const RESET_COMBO = 'RESET_COMBO';
const UPDATE_COMBO_ARRAY = 'UPDATE_COMBO_ARRAY';
const UPDATE_FULLSCREEN_STATUS = 'UPDATE_FULLSCREEN_STATUS';

const setFullScreenStatus = (value: boolean) => ({
  type: UPDATE_FULLSCREEN_STATUS,
  payload: value,
});

const setComboArray = (value: number) => ({
  type: UPDATE_COMBO_ARRAY,
  payload: value,
});

const resetCombo = () => ({
  type: RESET_COMBO,
});

const setComboCounter = (value: number) => ({
  type: UPDATE_COMBO_COUNTER,
  payload: value,
});

const clearWords = () => ({
  type: CLEAR_WORDS,
});

const addLearnedWord = (value: CurrentWordListType) => ({
  type: ADD_LEARNED_WORD,
  payload: value,
});

const addNotLearnedWord = (value: CurrentWordListType) => ({
  type: ADD_NOT_LEARNED_WORD,
  payload: value,
});

const setResultPageState = (value: boolean) => ({
  type: CONSTRUCTOR_GAME_RESULT_STATUS,
  payload: value,
});

const setLearnCount = (value: number) => ({
  type: UPDATE_LEARNED_COUNT,
  payload: value,
});

const setWordObj = (value: CurrentWordListType) => ({
  type: UPDATE_WORD_OBJ,
  payload: value,
});

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
  payload:
    | boolean
    | Array<CurrentWordListType>
    | [string, string][]
    | number
    | CurrentWordListType
    | Array<string>
    | string;
};

export {
  constructorGameStart,
  setShuffledWordList,
  updateCharsPosition,
  setResultPageState,
  addNotLearnedWord,
  setComboCounter,
  addLearnedWord,
  setLearnCount,
  setRoundCount,
  setRoundEnd,
  setWordObj,
  clearWords,
  resetCombo,
  setComboArray,
  setFullScreenStatus,
  CONSTRUCTOR_GAME_RESULT_STATUS,
  CONSTRUCTOR_GAME_PLAY_STATUS,
  CONSTRUCTOR_SHUFFLED_LIST,
  CONSTRUCTOR_ROUND_STATUS,
  UPDATE_CHARS_POSITION,
  ADD_NOT_LEARNED_WORD,
  UPDATE_LEARNED_COUNT,
  UPDATE_COMBO_COUNTER,
  UPDATE_ROUND_COUNT,
  ADD_LEARNED_WORD,
  UPDATE_WORD_OBJ,
  CLEAR_WORDS,
  RESET_COMBO,
  UPDATE_COMBO_ARRAY,
  UPDATE_FULLSCREEN_STATUS,
};
