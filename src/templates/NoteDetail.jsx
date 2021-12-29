import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import HTMLReactParser from "html-react-parser";

import { ImageSwiper } from '../components/Notes';

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px suto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        }
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    important: {
        fontSize: 36
    }
}));

const NoteDetail = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const id = path.split('/note/')[1];

    const [note, setNote] = useState(null);

    useEffect(() => {
        db.collection('notes').doc(id).get()
            .then(doc => {
                const data = doc.data();
                setNote(data);
            })
    }, []);

    const returnCode = (text) => {
        if(text === "") {
            return text;
        } else {
            return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
        }
    };

    // const addNote = useCallback(() => {

    // })

    return (
        <section className='section-wrapin'>  
            {note && (
                <div className='grid-row'>
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={note.images} />
                    </div>
                    <div className={classes.detail}>
                        <h2 className='text-headline'>{note.title}</h2>
                        <div className="module-spacer-small" />
                        <p>{returnCode(note.mainNote)}</p>
                        <div className="module-spacer-small" />

                        <div className="module-spacer-small" />
                        <p>{note.urls}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default NoteDetail;