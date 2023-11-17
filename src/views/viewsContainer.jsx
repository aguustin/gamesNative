import { useContext, useEffect } from "react"
import { Home } from "./home"
import { UserInfo } from "./userInfo";
import LayoutsContext from "../../context/layoutsContext";
import { View } from "react-native";
import GamesOnCart from "./gamesOnCart";
import LikedGames from "./likedGames";


export const ViewsContainer = () => {

    const {changeHomeImg,
        setChangeHomeImg,
        changeHearthImg,
        changeCartImg,
        changeUserImg} = useContext(LayoutsContext);
        
        useEffect(() => {

            if(changeHomeImg === false && changeHearthImg  === false && changeCartImg  === false && changeUserImg === false){
                setChangeHomeImg(true);
            }
        })

    return(
        <View>
            {changeHomeImg  && <Home/>}
            {changeUserImg && <UserInfo/>}
            {changeCartImg && <GamesOnCart/>}
            {changeHearthImg && <LikedGames/>}
        </View>
    )
}
