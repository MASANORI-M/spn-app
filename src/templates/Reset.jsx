import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryButton, TextInput } from '../components/Uiparts';
import { resetPassword } from '../reducks/users/operation';

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    return (
        <div className='section-container'>
            <h2 className='text-headline text-center'>Password Reset</h2>
            <div className='module-spacer-medium' />
            <TextInput
                fullWidth={true} label={"E-mail"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail} 
            />
            <div className='module-spacer-medium' />
            <div className='center'>
                <PrimaryButton
                    label={"SIGN IN"}
                    onClick={() => dispatch(resetPassword(email))}
                />
                <div className='module-spacer-medium' />
                <p 
                    className='section-rink'
                    onClick={() => dispatch(push('/signin'))}
                >
                    Sign Inに戻る
                </p>
            </div>
        </div>
    );
};

export default Reset;