import {
  SAVANNA_GAME_STATUS,
  SavannaGameActionType,
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
  IS_WORD_MOVE,
  WORD_POSITION,
} from '../actions/savanna-game-actions';

import { CurrentWordListType } from '../actions/word-actions';

export type SavannaGameState = {
  wordPosition: number;
  isWordMove: boolean;
  listWrongWords:Array<CurrentWordListType>;
  listRightWords:Array<CurrentWordListType>;
  isShowResults:boolean;
  isPressDontknow: boolean;  
  isFullScreen: boolean;
  savannaGameStart: boolean;
  wordUserAnswer:CurrentWordListType;
  wordRight: CurrentWordListType;
  isAnswerSelected: boolean;
  currentPlayWords: Array<CurrentWordListType>;
  stepCounter: number
};

const initialState: SavannaGameState = {
  wordPosition: 0,
  isWordMove:false,
  listWrongWords:[],
  listRightWords:[],
  isShowResults:false,
  isPressDontknow: false,
  stepCounter:0,
  isFullScreen: false,  
  savannaGameStart: false,
  isAnswerSelected: false,
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
  currentPlayWords: [],
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

const savannaGameReducer = (state = initialState, action: SavannaGameActionType) => {
  switch (action.type) {
    case CLEAR_WORDS:
      return {
        ...state,
        listRightWords: [],
        listWrongWords: [],
        
      };
    case WORD_POSITION:
        return { ...state, wordPosition: action.payload };
    case IS_WORD_MOVE:
        return { ...state, isWordMove: action.payload };
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
    case IS_FULL_SCREEN:
      return { ...state, isFullScreen: action.payload };
    case IS_PRESS_DONTKNOW:
      return { ...state, isPressDontknow: action.payload };
    case STEP_COUNTER:
      return { ...state, stepCounter: action.payload };
    case SAVANNA_GAME_STATUS:
      return { ...state, savannaGameStart: action.payload };
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


export { savannaGameReducer }

