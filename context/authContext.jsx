import { createContext, useState } from 'react';
import { loginRequest, signInRequest } from '../src/api/authRequest';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState([]);

    const signInContext = async (formData) => {
        await signInRequest(formData);
    }

    const loginContext = async (formData) => {
        const userExist = await loginRequest(formData);
        if(userExist.length > 0){
            localStorage.setItem('user', JSON.stringify(userExist));
            setUser(JSON.parse(localStorage.getItem('user')));
        }else{
            console.log("user not found");
        }
    }

    return(
        <AuthContext.Provider value={{signInContext, loginContext}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;