export const DELETE_NOTE = "DELETE_NOTE";
export const deleteNoteAction = (notes) => {
    return {
        type: "DELETE_NOTE",
        payload: notes
    }
}

export const FETCH_NOTES = "FETCH_NOTES";
export const fetchNotesAction = (notes) => {
    return {
        type: "FETCH_NOTES",
        payload: notes
    }
}