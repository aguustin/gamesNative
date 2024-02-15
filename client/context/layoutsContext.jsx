import React, { useState } from "react";

const LayoutsContext = React.createContext();

export const LayoutsContextProvider = ({children}) => {
    const [userExist, setUserExist] = useState(true);
    const [registerUser, setRegisterUser] = useState(false);
    const [changeHomeImg, setChangeHomeImg] = useState(false);
    const [changeHearthImg, setChangeHearthImg] = useState(false);
    const [changeCartImg, setChangeCartImg] = useState(false);
    const [changeUserImg, setChangeUserImg] = useState(false);
    const [gameInfo, setGameInfo] = useState(false);
    const [gameLike, setGameLike] = useState(false);
    const [search, setSearch] = useState('');
    const [openChangeNL, setOpenChangeNL] = useState(false);
    const [openChangeUsername, setOpenChangeUsername] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openSeeOG, setOpenSeeOG] = useState(false);
    return(
        <LayoutsContext.Provider value={{
            userExist,
            setUserExist,
            registerUser, 
            setRegisterUser,
            changeHomeImg,
            setChangeHomeImg,
            changeHearthImg,
            setChangeHearthImg,
            changeCartImg,
            setChangeCartImg,
            changeUserImg,
            setChangeUserImg,
            gameInfo, 
            setGameInfo,
            gameLike,
            setGameLike,
            search, 
            setSearch,
            openChangeNL,
            setOpenChangeNL,
            openChangeUsername,
            setOpenChangeUsername,
            openChangePassword,
            setOpenChangePassword,
            openSeeOG,
            setOpenSeeOG
        }}>{children}</LayoutsContext.Provider>
    )
}

export default LayoutsContext;