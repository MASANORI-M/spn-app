import React from 'react';

const ImagePreview = (props) => {
    return (
        <div className='media-thumb' ocClick={() => props.delete(props.id)}>
            <img src={props.path} alt="プレビュー画像" />
        </div>
    );
};

export default ImagePreview;