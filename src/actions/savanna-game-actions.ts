import { CurrentWordListType } from './word-actions';

const SAVANNA_GAME_STATUS = ' SAVANNA_GAME_STATUS';
const WORD_USER_ANSWER='WORD_USER_ANSWER';
const WORD_RIGHT=' WORD_RIGHT';
const IS_ANSWER_SELECTED='IS_ANSWER_SELECTED';
const CURRENT_PLAY_WORDS='CURRENT_PLAY_WORDS';
const STEP_COUNTER='STEP_COUNTER'


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

const wordUserAnswer=(value: string)=>({
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
  stepCounter, STEP_COUNTER
 }