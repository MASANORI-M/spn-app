import React, {useCallback} from 'react';
import { IconButton, makeStyles } from "@material-ui/core";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { storage } from "../../firebase/index";

import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
});

const ImageArea = (props) => {
    const classes = useStyles();

    const deleteImage = useCallback(async(id) => {
        const delImg = window.confirm('画像を削除しますか？');
        if(!delImg) {
            return false;
        } else {
            const newImg = props.images.filter(image => image.id !== id);
            props.setImages(newImg);
            return storage.ref('images').child(id).delete();
        }
    }, [props.images]);

    const uploadImage = useCallback((event) => {
        const file = event.target.files[0];
        let blob = new Blob([file], {type: "image/jpeg"});

        const lang = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const num = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(num))).map((n) => lang[n%lang.length]).join('');

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id:fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]));
            });
        });
    }, [props.setImages]);

    return (
        <div>
            <div className='grid-list-images'>
                {props.images.length > 0 && (
                    props.images
                        .map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
                )}
            </div>
            <div className='text-right'>
                <span>画像登録</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            type="file" className='display-none' id="image"
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    );
};

export default ImageArea;