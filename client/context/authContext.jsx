import { createContext, useEffect, useState } from 'react';
import { changeNLRequest, changePasswordRequest, changeProfileRequest, changeUsernameRequest, loginRequest, signInRequest } from '../src/api/authRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState('');
    const [userData, setUserData] = useState([]);
    let a;
    useEffect(() => {
        (async () => {
            const jsonSession = await AsyncStorage.getItem('user');
            await setSession(JSON.parse(jsonSession));
        })()
    }, [])
    
    const signInContext = async (formData) => {
        await signInRequest(formData);
    }

    const loginContext = async (formData) => {
        const res = await loginRequest(formData);
        await AsyncStorage.setItem('user', res.data);
        setSession(res.data);
    }

    const changeProfileContext = async (changeForm) => {
        console.log("diform: ", changeForm);
        const res = await changeProfileRequest(changeForm);
        //setUserData(res.data);
    }

    const changeNLContext = async (userId, formData) => {
        const res = await changeNLRequest(userId, formData);
        //setUserData(res.data);
    }

    const changeUsernameContext = async (userId, formData) => {
        const res = await changeUsernameRequest(userId, formData);
        //setUserData(res.data);
    }

    const changePasswordContext = async (userId, formData) => {
        const res = await changePasswordRequest(userId, formData);
        //setUserData(res.data);
    }

    return(
        <AuthContext.Provider value={{
        session, 
        setSession, 
        userData, 
        setUserData, 
        signInContext, 
        loginContext, 
        changeProfileContext,
        changeNLContext,
        changeUsernameContext,
        changePasswordContext }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;