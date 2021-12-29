import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { db } from "../firebase/index";

import {PrimaryButton, SelectBox, TextInput} from "../components/Uiparts";
import {ImageArea, UrlArea} from '../components/Notes';
import { saveNote } from '../reducks/Notes/operation';

const NoteEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/note/edit')[1];

    if(id !== "") {
        id = id.split('/')[1];
    }

    const [mainNote, setMainNote] = useState(""),
          [title, setTitle] = useState(""),
          [important, setImportant] = useState(""),
          [complete, setComplete] = useState(""),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [urls, setUrls] = useState([]),
          [images, setImages] = useState([]);
    
    const inputMainNote = useCallback((event) => {
        setMainNote(event.target.value);
    }, [setMainNote]);
    
    const inputTitle = useCallback((event) => {
        setTitle(event.target.value);
    }, [setTitle]);

    const importants = [
        {id: "IHEH", name:"重要度:高 & 緊急度:高"},
        {id: "IHEL", name:"重要度:高 & 緊急度:低"},
        {id: "ILEH", name:"重要度:低 & 緊急度:高"},
        {id: "ILEL", name:"重要度:低 & 緊急度:低"},
    ];

    const completeChange = [
        {id: "new", name:"新規登録済み"},
        {id: "process", name:"処理中"},
        {id: "conf", name:"処理済み・確認中"},
        {id: "comp", name:"完了"},
        {id: "pend", name:"中止・停止"},
    ];

    useEffect(() => {
        if(id !== "") {
            db.collection('notes').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    setMainNote(data.mainNote);
                    setTitle(data.title);
                    setImportant(data.important);
                    setComplete(data.complete);
                    setCategory(data.category);
                    setUrls(data.urls);
                    setImages(data.images);
                })
        }
    }, [id]);

    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push({
                        id: data.id,
                        name: data.name
                    });
                });
                setCategories(list);
            })
    }, []);

    return (
        <section>
            <h2 className='text-headline text-center'>NOTE登録・編集</h2>
            <div className='section-container'>
                <TextInput
                    fullWidth={true} label={"メインNOTE"} multiline={true} required={true}
                    rows={10} value={mainNote} type={"textarea"} onChange={inputMainNote}
                />
                <TextInput
                    fullWidth={true} label={"タイトル"} multiline={false} required={true}
                    rows={1} value={title} type={"text"} onChange={inputTitle}
                />
                <SelectBox
                    label={"実施状況"} required={true} options={completeChange}
                    select={setComplete} value={complete}
                />
                <SelectBox
                    label={"重要 & 緊急度"} required={false} options={importants}
                    select={setImportant} value={important}
                />
                <SelectBox
                    label={"カテゴリー"} required={false} options={categories}
                    select={setCategory} value={category}
                />
                <div className='module-spacer-medium' />
                <UrlArea urls={urls} setUrls={setUrls} />
                <div className='module-spacer-medium' />
                <ImageArea images={images} setImages={setImages} />
                <div className='module-spacer-medium' />
                <div className='center'>
                    <PrimaryButton
                        label={"NOTEを登録"}
                        onClick={() => dispatch(saveNote(id, mainNote, title, complete, important, category, urls, images))}
                    />
                </div>
            </div>
        </section>
    );
};

export default NoteEdit;