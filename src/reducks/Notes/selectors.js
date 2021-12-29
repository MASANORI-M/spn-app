import { createSelector } from "reselect";

const notesSelector = (state) => state.notes;

export const getNotes = createSelector(
    [notesSelector],
    state => state.list
);