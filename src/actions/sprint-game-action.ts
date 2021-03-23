export const SPRINT_GAME_STATUS_CHANGE = 'SPRINT_GAME_STATUS_CHANGE';


export type SprintGameStatusChangeActionType = {type: string, payload: string};

export const sprintGameStatusChange = (value: string ) =>({
    type: 'SPRINT_GAME_STATUS_CHANGE',
    payload: value

});
