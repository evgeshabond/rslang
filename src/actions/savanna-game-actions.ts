import { CurrentWordListType } from './word-actions';

const SAVANNA_GAME_STATUS = ' SAVANNA_GAME_STATUS';
const WORD_USER_ANSWER='WORD_USER_ANSWER';
const WORD_RIGHT=' WORD_RIGHT';
const IS_ANSWER_SELECTED='IS_ANSWER_SELECTED';
const CURRENT_PLAY_WORDS='CURRENT_PLAY_WORDS';
const STEP_COUNTER='STEP_COUNTER';
const IS_FULL_SCREEN='IS_FULL_SCREEN';
const IS_PRESS_DONTKNOW='IS_PRESS_DONTKNOW';
const IS_SHOW_RESULTS= 'IS_SHOW_RESULTS';
const LIST_WRONG_WORDS='LIST_WRONG_WORDS';
const LIST_RIGHT_WORDS='LIST_RIGHT_WORDS';
const CLEAR_WORDS='CLEAR_WORDS';
const IS_WORD_MOVE='IS_WORD_MOVE';
const WORD_POSITION='WORD_POSITION';
const IS_WORD_FALLED='IS_WORD_FALLED';

const wordPosition= (value: number) => ({
  type: WORD_POSITION,
  payload: value,
});

const isWordFalled= (value: boolean) => ({
  type: IS_WORD_FALLED,
  payload: value,
});

const isWordMove= (value: boolean) => ({
  type: IS_WORD_MOVE,
  payload: value,
});


const clearWords = () => ({
  type: CLEAR_WORDS,
});

const listWrongWords= (value: CurrentWordListType) => ({
  type: LIST_WRONG_WORDS,
  payload: value,
});

const listRightWords= (value: CurrentWordListType) => ({
  type: LIST_RIGHT_WORDS,
  payload: value,
});

const isShowResults= (value: boolean) => ({
  type:IS_SHOW_RESULTS,
  payload: value,
});

const isPressDontknow= (value: boolean) => ({
  type:IS_PRESS_DONTKNOW,
  payload: value,
});

const isFullScreen= (value: boolean) => ({
  type:IS_FULL_SCREEN,
  payload: value,
})

const stepCounter= (value: number) => ({
  type: STEP_COUNTER,
  payload: value,
});


const wordRight = (value: CurrentWordListType) => ({
  type: WORD_RIGHT,
  payload: value,
});

const savannaGameStart = (value: boolean) => ({
  type: SAVANNA_GAME_STATUS,
  payload: value
})

const wordUserAnswer=(value: CurrentWordListType)=>({
  type: WORD_USER_ANSWER,
  payload:value
})

const isAnswerSelected = (value: boolean) => ({
  type: IS_ANSWER_SELECTED,
  payload: value
})

const currentPlayWords = (value: Array<CurrentWordListType>) => ({
  type: CURRENT_PLAY_WORDS,
  payload: value
})



export type SavannaGameActionType = {
  type: string;
  payload:
  | number
  | boolean
  | string
  | CurrentWordListType
  | Array<CurrentWordListType>
};


export { 
  savannaGameStart, SAVANNA_GAME_STATUS,
  wordUserAnswer, WORD_USER_ANSWER,
  wordRight, WORD_RIGHT,
  isAnswerSelected, IS_ANSWER_SELECTED,
  currentPlayWords, CURRENT_PLAY_WORDS,
  stepCounter, STEP_COUNTER,  
  isFullScreen, IS_FULL_SCREEN,
  isPressDontknow, IS_PRESS_DONTKNOW,
  isShowResults,IS_SHOW_RESULTS,
  listWrongWords, LIST_WRONG_WORDS,
  listRightWords, LIST_RIGHT_WORDS,  
  clearWords, CLEAR_WORDS,
  isWordMove, IS_WORD_MOVE,
  wordPosition,WORD_POSITION,
  isWordFalled, IS_WORD_FALLED
 }