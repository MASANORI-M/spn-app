import { signInAction } from "./actions";
import { push } from "connected-react-router";
import {auth, db, FirebaseTimestamp} from "../../firebase/index";

/*ログイン状態の維持*/ 
export const listenAuthState = () => {
    return async(dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user) {
                const uid = user.uid;

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data();

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }));
                    })
            } else {
                dispatch(push('/signin'));
            }
        })
    }
}

/*パスワードのリセット*/
export const resetPassword = (email) => {
    return async(dispatch) => {
        if(email === "") {
            alert('必須項目を入力してください。');
            return false;
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("入力されたパスワード宛てにリセット用メールを送りました。");
                    dispatch(push('/signin'));
                }).catch(() => {
                    alert("パスワードのリセットに失敗しました。");
                })
        }
    }
}

/*ログイン*/
export const signIn = (email, password) => {
    return async(dispatch) => {
        if(email === "" || password === "") {
            alert("必須項目を入力してください。");
            return false;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;

                if(user) {
                    const uid = user.uid;

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data();

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push('/'));
                        })
                }
            })
    }
}

/*ログアウト*/
export const signOut = () => {
    return async(dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signInAction());
                dispatch('/signin');
            })
    }
}

/*アカウント登録*/
export const signUp = (username, email, password, confirmPassword) => {
    return async(dispatch) => {
        // バリデーション：空
        if(username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("必須項目を入力してください。");
            return false;
        }

        // バリデーション：パスワード一致
        if(password !== confirmPassword) {
            alert("パスワードが不一致です。");
            return false;
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;

                if(user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userData)
                        .then(() => {
                            dispatch(push('/'));
                        })
                }
            });
    }
}