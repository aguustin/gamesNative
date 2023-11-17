
import React, { useEffect, useContext } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import LayoutsContext from '../../context/layoutsContext';
import { getAllGames } from '../api/gamesRequest';
import GameContext from '../../context/gamesContext';

export const Home = () => {
  
  const { gameInfo, setGameInfo } = useContext(LayoutsContext);
  const { allGames, setAllGames, gameDetailState, gameDetailsContext, getGamesByCategoriesContext, addGameToLikedGamesContext } = useContext(GameContext);
  const [showReq, setShowReq] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

 useEffect(() => {
   const res = async () => {
      const response = await getAllGames();
      setAllGames(response);
  } 
  res();
 }, []);

 const gameCategory = async (category) => {
    await getGamesByCategoriesContext(category);
 }
   //console.log("yo:  ", allGames);
  const gameInfoFunc = (gameId) => {
    gameDetailsContext(gameId);
    setGameInfo(true);
  }

  const addGameToLikedGames = (gameId, title, thumbnail, gamePrice, gameDiscount) => {
    const favoriteGameData = {
      id : "654049c0eb8fabccbd1eb065",
      gameId: gameId,
      title: title,
      thumbnail: thumbnail,
      gamePrice: gamePrice,
      gameDiscount: gameDiscount
    }
    addGameToLikedGamesContext(favoriteGameData);
  }

  const addGameToCart = () => {
    console.log("save game in cart");
  }

  return (
    <View>
    <View style={styles.gamesCategories}>
      <TouchableOpacity onPress={() => gameCategory("shooter")} style={styles.gameCategoriesButtons}><Text style={{color:'white', textAlign:'center'}}>Shooters</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => gameCategory("mmorpg")} style={styles.gameCategoriesButtons}><Text style={{color:'white', textAlign:'center'}}>MMORPG</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => gameCategory("pvp")} style={styles.gameCategoriesButtons}><Text style={{color:'white', textAlign:'center'}}>PVP</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => gameCategory("action")} style={styles.gameCategoriesButtons}><Text style={{color:'white', textAlign:'center'}}>Action</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => gameCategory("sports")} style={styles.gameCategoriesButtons}><Text style={{color:'white', textAlign:'center'}}>Sports</Text></TouchableOpacity>
    </View>













    {
      gameInfo ?
      <>
      
        {gameDetailState.map((details) => <View key={details.id} style={styles.gameInfoContainer}>
          <Image style={styles.gameImagePort} loadingIndicatorSource={require('../../assets/loaders/loaderA.gif')} source={{uri: details.thumbnail}}></Image>
          <Text style={[styles.textPrimaryColor, styles.gameTitlesInfo]}>{details.title}</Text>
          <View style={styles.priceContainerInfo}>
            <Text style={[styles.textSecundaryColor, styles.priceText]}>Price:</Text><Text style={styles.priceNumber}>{gamePrice = Math.floor(Math.random() * 70) + 1}$</Text>
            <Text style={[styles.separeDiscount]}>-{gameDiscount = Math.floor(Math.random() * 90) + 1}%</Text>
          </View>
          <View>
            <View style={[styles.descReqInfo]}>
              <Image source={require('../../assets/gameInfoIcons/book.png')}></Image>
              <Text style={[styles.textThirdColor]}>DESCRIPCION DEL PRODUCTO</Text>
              <TouchableHighlight style={[styles.downArrow]} onPress={() => setShowDesc(!showDesc)}><Image source={showDesc ? require('../../assets/gameInfoIcons/up-arrow.png') : require('../../assets/gameInfoIcons/down-arrow.png')}></Image></TouchableHighlight>
            </View>
            {showDesc && 
            <View>
                <Text style={[styles.textSecundaryColor]}>{details.description}</Text>
                <Text style={[styles.textSecundaryColor]}>Genero: {details.genre}</Text>
                <Text style={[styles.textSecundaryColor]}>Plataforma: {details.platform}</Text>
                <Text style={[styles.textSecundaryColor]}>Publicador: {details.publisher}</Text>
            </View>}
          </View>
          <View>
            <View style={[styles.descReqInfo]}>
              <Image source={require('../../assets/gameInfoIcons/check.png')}></Image>
              <Text style={[styles.textThirdColor]}>REQUISITOS</Text>
            <TouchableHighlight style={[styles.downArrow]} onPress={() => setShowReq(!showReq)}><Image source={showReq ? require('../../assets/gameInfoIcons/up-arrow.png') : require('../../assets/gameInfoIcons/down-arrow.png')}></Image></TouchableHighlight>
            </View>
            {showReq && <View styles={[styles.requisitos]}>
              <Text style={[styles.descReqInfo ,styles.textPrimaryColor]}>REQUISITOS MINIMOS:</Text>
              <Text style={[styles.textSecundaryColor]}>Sistema operativo: {details.minimum_system_requirements.os}</Text>
              <Text style={[styles.textSecundaryColor]}>Procesador: {details.minimum_system_requirements.processor}</Text>
              <Text style={[styles.textSecundaryColor]}>Memoria: {details.minimum_system_requirements.memory}</Text>
              <Text style={[styles.textSecundaryColor]}>Grafica: {details.minimum_system_requirements.graphics}</Text>
              <Text style={[styles.textSecundaryColor]}>Almacenamiento: {details.minimum_system_requirements.storage}</Text>
            </View>}
          </View>
          <View style={styles.likeAddCart}>
              <TouchableOpacity onPress={() => addGameToLikedGames(details.id, details.title, details.thumbnail, gamePrice, gameDiscount)}><Image source={require('../../assets/gameInfoIcons/like.png')}></Image></TouchableOpacity>
              <TouchableHighlight onPress={() => addGameToCart()}>
                <View style={styles.gameToCart}>
                  <Text style={[styles.textPrimaryColor, styles.gameToCartText]}>Add to cart</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>)}
      </>
     : 



















     <View>
      <Image style={styles.portadaImg} source={require('../../assets/portadaGOW.jpg')}></Image>
        <View style={styles.gamesContainer}>
          <Text style={styles.gameCategoryTitle}>Nuevos productos</Text>
          <View style={styles.gamesList}>
          {allGames.slice(0, 20).map((games) => <TouchableHighlight key={games.id} onPress={() => gameInfoFunc(games.id)}>
              <View style={styles.game}>
                <Image style={styles.gameImg} source={{uri: games.thumbnail}} />
                <Text style={[styles.gameTitles]}>{games.title.length < 14 ? games.title : `${games.title.substring(0,12)}...`}</Text>
                <View style={styles.priceContainer}>
                  <Text style={[styles.price, styles.textPrimaryColor]}>{Math.floor(Math.random() * 70) + 1}$</Text>
                  <Text style={[styles.discount]}>{Math.floor(Math.random() * 90) + 1}%</Text>
                </View>
              </View>
            </TouchableHighlight>)}
          </View>
        </View>
      </View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
    textPrimaryColor:{
      color:'#ffffff',
    },
    textSecundaryColor:{
      fontSize:14,
      color:'#707070',
    },
    textThirdColor:{
      marginLeft:10,
      color:'#f4b638',
    },
    gamesCategories:{
      flexDirection:'row',
      alignItems:'center'
    },
    gameCategoriesButtons:{
      flexDirection:'row',
      backgroundColor:'#050505',
      alignItems:'center',
      justifyContent:'center',
      height:40,
      width:'20%',
      marginTop:10
    },
    gameInfoContainer:{
      flex:1,
      width:400,
      backgroundColor:'#131313'
    },
    portadaImg: {
        width:410,
        objectFit:'cover',
        height:200,
        marginTop:10
    },
    gameCategoryTitle:{
      fontSize:25,
      color:'#ffffff',
      marginBottom:10
    },
    gamesContainer:{
      marginTop:20,
    },
    gamesList:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:'center' 
    },
    game:{
      display:'flex',
      alignItems:'center',
      height:180,
      width:200,
      marginTop:10,
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:16,
      borderWidth:2,
      borderColor:'#f4b638',
    },
    gameImg:{
      width:'100%',
      height:'50%',
    },
    gameTitles:{
      marginTop:9,
      fontSize:20,
      fontStyle:'italic',
      color: '#ffffff',
    },
    gameTitlesInfo:{
      fontSize:25,
      textAlign:'center',
      marginTop:5,
      marginBottom:5
    },
    priceContainerInfo:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderColor:'#808080'
    },
    priceText:{
      fontSize:22,
      margin:10
    },
    priceNumber:{
      fontSize:22,
      color:'#017511'
    },
    price:{
      marginLeft:12,
      marginBottom:4
    },
    discount:{
      paddingHorizontal:8,
      borderRadius:6,
      backgroundColor:'#f4b638'
    },
    gameImagePort:{
      width:'100%',
      height:300,
      objectFit:'cover',
      marginTop:15,
      borderRadius:10
    },
    descReqInfo:{
      position: 'relative',
      flexDirection:'row',
      alignItems:'center',
      marginTop:20,
      marginBottom:20  
    },
    downArrow:{
      position:'absolute',
      right:10
    },
    likeAddCart:{
      bottom:0,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingVertical:10,
      paddingHorizontal:8,
      backgroundColor:'#131313',
      zIndex:2
    },
    gameToCart:{
      flexDirection:'row',
      fontSize:20,
      paddingVertical:8,
      alignItems:'center',
      justifyContent:'center',
      width:200,
      borderWidth:1,
      borderColor:'#f4b638',
    },
    gameToCartText:{
      fontSize:20
    },
    likedGameContainer:{
      flex:1,
      height:300,
      width:300,
      backgroundColor: '#ffffff'
    },
    separeDiscount:{
      marginLeft:15,
      fontSize:22,
      color:'#f4b638'
    }
    
});
