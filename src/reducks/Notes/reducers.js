import * as Actions from './actions';
import initialState from '../store/initialState';

export const NotesReducer = (state = initialState.notes, action) => {
    switch(action.type) {
        case Actions.DELETE_NOTE:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.FETCH_NOTES:
            return {
                ...state,
                list: [...action.payload]
            };
        default:
            return state
    }
}