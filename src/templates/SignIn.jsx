import React, {useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryButton, TextInput } from '../components/Uiparts';
import { signIn } from '../reducks/users/operation';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("");
    
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    return (
        <div className='section-container'>
            <h2 className='text-headline text-center'>Sign In</h2>
            <div className='module-spacer-medium' />
            <TextInput
                fullWidth={true} label={"E-mail"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail} 
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword} 
            />
            <div className='module-spacer-medium' />
            <div className='center'>
                <PrimaryButton
                    label={"SIGN IN"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className='module-spacer-medium' />
                <p 
                    className='section-rink' 
                    onClick={() => dispatch(push('/signup'))}
                >
                    アカウントをお持ちでない方
                </p>
                <p 
                    className='section-rink'
                    onClick={() => dispatch(push('/signin/reset'))}
                >
                    パスワードを忘れた場合
                </p>
            </div>
        </div>
    );
};

export default SignIn;