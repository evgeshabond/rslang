import { CurrentWordListType } from "./word-actions";

export const SPRINT_GAME_STATUS_CHANGE = 'SPRINT_GAME_STATUS_CHANGE';
export const SPRINT_GAME_TOTAL_POINTS = 'SPRINT_GAME_TOTAL_POINTS'; 
export const SPRINT_GAME_SHUFFLED_ARRAY = 'SPRINT_GAME_SHUFFLED_ARRAY';

export type SprintGameStatusChangeActionType = {type: string, payload: string};
export type SprintGameTotalPointsActionType = {type: string, payload: number};
export type SprintGameShuffledArrayType = {type: string, payload: CurrentWordListType[]};

export const sprintGameStatusChange = (value: string ) =>({
    type: 'SPRINT_GAME_STATUS_CHANGE',
    payload: value

});

export const sprintGameTotalPoints = (value: number) =>({
    type: 'SPRINT_GAME_TOTAL_POINTS',
    payload: value
});

export const sprintGameShuffledArray = (value: CurrentWordListType[]) =>({
        type: 'SPRINT_GAME_SHUFFLED_ARRAY',
        payload: value
});
