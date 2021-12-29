import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from '../reducks/Notes/operation';
import { getNotes } from '../reducks/Notes/selectors';
import { NoteCard } from '../components/Notes';

const NotesList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const notes = getNotes(selector);

    const query = selector.router.location.search;
    const important = /^\?important=/.test(query) ? query.split('?important=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    
    useEffect(() => {
        dispatch(fetchNotes(important, category));
    }, [query]);

    return (
        <section className='section-wrapin'>
            <div className='grid-row'>
                {notes.length > 0 && (
                    notes.map(note => (
                        <NoteCard
                            key={note.id} id={note.id} title={note.title}
                            important={note.important} complete={note.complete}
                            images={note.images} time={note.updated_at}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default NotesList;