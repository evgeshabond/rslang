import {
  AUDIO_GAME_STATUS,
  AudioGameStartActionType,
  WORD_USER_ANSWER,
  WORD_RIGHT,
  IS_ANSWER_SELECTED,
  CURRENT_PLAY_WORDS,
  STEP_COUNTER,
  IS_FULL_SCREEN,
  IS_PRESS_DONTKNOW,
  IS_SHOW_RESULTS,
  LIST_WRONG_WORDS,
  LIST_RIGHT_WORDS,
  CLEAR_WORDS,
} from '../actions/audioGame-actions';

import { CurrentWordListType } from '../actions/word-actions';

export type AudioGameState = {
  listWrongWords:Array<CurrentWordListType>;
  listRightWords:Array<CurrentWordListType>;
  isShowResults:boolean;
  isPressDontknow: boolean;
  audioGameStart: boolean;
  isFullScreen: boolean;
  wordUserAnswer:CurrentWordListType;
  wordRight: CurrentWordListType;
  isAnswerSelected: boolean;
  currentPlayWords: Array<CurrentWordListType>;
  stepCounter: number
};

const initialState: AudioGameState = {
  listWrongWords:[],
  listRightWords:[],
  isShowResults:false,
  isPressDontknow: false,
  stepCounter:0,
  isFullScreen: false,
  audioGameStart: false,
  isAnswerSelected: false,
  currentPlayWords: [],
  wordUserAnswer: {
    id: '0',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    wordTranslate: '',
    textMeaningTranslate: '',
    textExampleTranslate: '',
  },
  wordRight: {
    id: '0',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    wordTranslate: '',
    textMeaningTranslate: '',
    textExampleTranslate: '',
  }
};

const audioGameReducer = (state = initialState,
   action: AudioGameStartActionType) => {
  switch (action.type) {
    case CLEAR_WORDS:
      return {
        ...state,
        listRightWords: [],
        listWrongWords: [],
        
      };
    case LIST_RIGHT_WORDS:
      return {
        ...state,
        listRightWords: [...state.listRightWords, action.payload],
      };     
    case LIST_WRONG_WORDS:
      return {
        ...state,
        listWrongWords: [...state.listWrongWords, action.payload],
      };     
    case IS_SHOW_RESULTS:
      return { ...state, isShowResults: action.payload };
    case STEP_COUNTER:
      return { ...state, stepCounter: action.payload };
    case AUDIO_GAME_STATUS:
      return { ...state, audioGameStart: action.payload };
    case IS_FULL_SCREEN:
      return { ...state, isFullScreen: action.payload };
    case IS_PRESS_DONTKNOW:
      return { ...state, isPressDontknow: action.payload };
    case WORD_USER_ANSWER:
      return { ...state, wordUserAnswer: action.payload };
    case WORD_RIGHT:
      return { ...state, wordRight: action.payload };
    case IS_ANSWER_SELECTED:
      return { ...state,  isAnswerSelected: action.payload };
    case CURRENT_PLAY_WORDS:
      return { ...state,  currentPlayWords: action.payload };
    default:
      return state;
  }
};


export { audioGameReducer }

