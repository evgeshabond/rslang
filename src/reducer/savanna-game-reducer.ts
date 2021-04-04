import {
  SAVANNA_GAME_STATUS,
  SavannaGameActionType,
  WORD_USER_ANSWER,
  WORD_RIGHT,
  IS_ANSWER_SELECTED,
  CURRENT_PLAY_WORDS,
  STEP_COUNTER
} from '../actions/savanna-game-actions';

import { CurrentWordListType } from '../actions/word-actions';

export type SavannaGameState = {
  savannaGameStart: boolean;
  wordUserAnswer:string;
  wordRight: CurrentWordListType;
  isAnswerSelected: boolean;
  currentPlayWords: Array<CurrentWordListType>;
  stepCounter: number
};

const initialState: SavannaGameState = {
  stepCounter:0,
  savannaGameStart: false,
  isAnswerSelected: false,
  wordUserAnswer: '',
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

