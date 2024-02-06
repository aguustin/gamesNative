import { createContext, useEffect, useState } from 'react';
import { loginRequest, signInRequest } from '../src/api/authRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState([]);
    const [userData, setUserData] = useState([]);
    let a;
    /*useEffect(() => {
        (async () => {
        await setSession(AsyncStorage.getItem('user'));
        await setSession(JSON.stringify(session).replace(/[\\"]/g,""));
        console.log("asdasdad");
        console.log("asdasdad");
    })()
    }, [])*/
    
    console.log("session: ", session);
    const signInContext = async (formData) => {
        await signInRequest(formData);
    }

    const loginContext = async (formData) => {
        const res = await loginRequest(formData);
        AsyncStorage.setItem('user', res.data);
        setSession(res.data);
    }
    return(
        <AuthContext.Provider value={{session, setSession, userData, setUserData, signInContext, loginContext}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;