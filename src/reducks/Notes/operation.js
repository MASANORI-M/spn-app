import {db, FirebaseTimestamp} from "../../firebase";
import { push } from "connected-react-router";

import { deleteNoteAction, fetchNotesAction } from "./actions";

const notesRef = db.collection('notes');

export const deleteNote = (id) => {
    return async(dispatch, getSate) => {
        notesRef.doc(id).delete()
            .then(() => {
                const prevNotes = getSate().notes.list;
                const nextNotes = prevNotes.filter(note => note.id !== id);
                dispatch(deleteNoteAction(nextNotes));
            })
    }
}

export const fetchNotes = (important, category) => {
    return async(dispatch) => {
        let query = notesRef.orderBy('updated_at', 'desc');
        query = (important !== "") ? query.where('important', '==', important) : query;
        query = (category !== "") ? query.where('category', '==', category) : query;

        query.get()
            .then(snapshots => {
                const noteList = [];
                snapshots.forEach(snapshot => {
                    const note = snapshot.data();
                    noteList.push(note);
                })
                dispatch(fetchNotesAction(noteList));
            })
    }
}

export const saveNote = (id, mainNote, title, complete, important, category, urls, images) => {
    return async(dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            mainNote: mainNote,
            title: title,
            complete: complete,
            important: important,
            category: category,
            urls: urls,
            images: images,
            updated_at: timestamp
        }

        if(id === "") {
            const ref = notesRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }

        return notesRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'));
            }).catch((error) => {
                throw new Error(error);
            })
    }
}