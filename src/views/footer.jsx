import { useState, useContext } from "react";
import {StyleSheet, TouchableOpacity, View, Image } from "react-native";
import LayoutsContext from "../../context/layoutsContext";
import GameContext from "../../context/gamesContext";
import { getAllGames } from '../api/gamesRequest';

export const Footer = () => {

    const [count, setCount] = useState(0);

    const { changeHomeImg,
        setChangeHomeImg,
        changeHearthImg,
        setChangeHearthImg,
        changeCartImg,
        setChangeCartImg,
        changeUserImg,
        setChangeUserImg,
        setGameInfo} = useContext(LayoutsContext);

        const { setAllGames} = useContext(GameContext);

    const setAllImagesF = () => {
        setChangeHomeImg(false);
        setChangeHearthImg(false);
        setChangeCartImg(false);
        setChangeUserImg(false);
        setGameInfo(false);
    }

    const activeHomeImg = async () => {
        setAllImagesF();
        setChangeHomeImg(true);
        setCount(count + 1);

        if(count == 1){
            const response =  await getAllGames();
            setAllGames(response);
            setCount(0);
        }
        
    }

    const activeHearthImg = () => {
        setAllImagesF();
        setChangeHearthImg(true);
    }

    const activeCartImg = () => {
        setAllImagesF();
        setChangeCartImg(true);
    }

    const activeUserImg = () => {
        setAllImagesF();
        setChangeUserImg(true);
    }

    return(
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButtons} onPress={() => activeHomeImg()}>
                <Image style={styles.footerImg} source={ changeHomeImg ? require('../../assets/footer/homeActive.png') : require('../../assets/footer/home.png') }></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButtons} onPress={() => activeHearthImg()}>
                <Image style={styles.footerImg} source={ changeHearthImg ? require('../../assets/footer/hearthActive.png') : require('../../assets/footer/hearth.png') }></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButtons} onPress={() => activeCartImg()}>
                <Image style={styles.footerImg} source={ changeCartImg ? require('../../assets/footer/cartActive.png') : require('../../assets/footer/cart.png') }></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButtons} onPress={() => activeUserImg()}>
                <Image style={styles.footerImg} source={ changeUserImg ? require('../../assets/footer/userBActive.png') : require('../../assets/footer/userB.png') }></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    footer:{
        flex:1,
        height:55,
        position:'absolute',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderTopWidth:1,
        borderTopColor:'#ffffff',
        backgroundColor: '#131313',
        bottom:0
    },
    footerButtons:{
        width: '25%',
        flexDirection: 'row',
        justifyContent:'center',
        margin:'auto'
    }
})