import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryButton, TextInput } from '../components/Uiparts';
import { signUp } from '../reducks/users/operation';

const SignUp = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(""),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] =useState("");
    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value);
    }, [setConfirmPassword]);

    return (
        <div className='section-container'>
            <h2 className='text-headline text-center'>Register for Account</h2>
            <div className='module-spacer-medium' />
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername} 
            />
            <TextInput
                fullWidth={true} label={"E-mail"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail} 
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword} 
            />
            <TextInput
                fullWidth={true} label={"パスワード(確認用)"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword} 
            />
            <div className='module-spacer-medium' />
            <div className='center'>
                <PrimaryButton
                    label={"REGISTER"}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
                <div className='module-spacer-medium' />
                <p 
                    className='section-rink'
                    onClick={() => dispatch(push('/signin'))}
                >
                    すでにアカウントをお持ちの方
                </p>
            </div>
        </div>
    );
};

export default SignUp;