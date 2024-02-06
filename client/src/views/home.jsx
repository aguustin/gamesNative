
import React, { useEffect, useContext } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import LayoutsContext from '../../context/layoutsContext';
import { getAllGames, getUserDataRequest } from '../api/gamesRequest';
import GameContext from '../../context/gamesContext';
import AuthContext from '../../context/authContext';
import SearchGames from './searchGames';

export const Home = () => {
  const {userData, session, setUserData} = useContext(AuthContext);
  const { gameInfo, setGameInfo, setSearch } = useContext(LayoutsContext);
  const { allGames, setAllGames, setSearchingGames, gameDetailState, gameDetailsContext, getGamesByCategoriesContext, addGameToLikedGamesContext, addToCartContext } = useContext(GameContext);
  const [showReq, setShowReq] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [lastGame, setLastGame] = useState(20);
  const [firstGame, setFirstGame] = useState(0);
  const [pageCount, setPageCount] = useState([1, 2, 3]);
  const [pageFlag, setPageFlag] = useState(false);
  
  useEffect(() => {
    const res = async () => {
      const response = await getAllGames();
      setAllGames(response);
      setSearchingGames(response);
      //getSessionContext();
      const res = await getUserDataRequest("65b844cbf0717a7345825c1d");
      setUserData(res.data);
  } 
  res();
 }, []);

 console.log("userData: ", userData);

 const firstPage = async () => {
    setPageCount([1, 2, 3]);
    setLastGame(20);
    setFirstGame(0);
 }

 const lastPage = async () => {
    setPageCount([18, 19, 20]);
    setLastGame(allGames.length);
    await setFirstGame(allGames.length - 20);
 }

 const goBack = () => {
  const updatePages = pageCount.map(pageCount => pageCount - 1);
  if(updatePages[0] <= 1){
    setPageCount([1, 2, 3]);
  }else{
    setPageCount(updatePages);
  }
  if(pageFlag === true){
    setPageFlag(false);
    setFirstGame(firstGame - 20);
    setLastGame(lastGame - 20);
  }else{
    setFirstGame(20 * updatePages[0] - 20);
    setLastGame(20 * updatePages[0]);
 }
 }

 const goNext = () => {
  const updatePages = pageCount.map(pageCount => pageCount + 1);
  if(updatePages[2] >= 20){
    setPageCount([18, 19, 20]);
  }else{
    setPageCount(updatePages);
  }
  if(pageFlag === false){
    console.log("eereraer");
    setPageFlag(true);
    setFirstGame(firstGame + 20);
    setLastGame(lastGame + 20);
  }else{
    setFirstGame(20 * updatePages[0]);
    setLastGame(20 * updatePages[0] + 20);
  }
 }


 const goToPage = (c) => {
   
   setPageCount([c, c + 1, c + 2]);
   setFirstGame(c * 20 - 20);
   setLastGame(c * 20);

   if(lastGame >= allGames.length || pageCount >= 20){
      setFirstGame(allGames.length - 20);
      setLastGame(allGames.length);
      setPageCount([18, 19, 20]);
    }
  }
  
  console.log("first: ", firstGame, " ", "last: ", lastGame);
  const gameCategory = async (category) => {
      await getGamesByCategoriesContext(category);
  }

  const gameInfoFunc = (gameId) => {
    gameDetailsContext(gameId);
    setGameInfo(true);
    setSearch('');
  }

  const addGameToLikedGames = (gameId, title, thumbnail, release_date, gamePrice, gameDiscount) => {
    
    const favoriteGameData = {
      id : "65b844cbf0717a7345825c1d",/*userData[0]?._id*/
      gameId: gameId,
      title: title,
      thumbnail: thumbnail,
      releaseDate: release_date,
      gamePrice: gamePrice,
      gameDiscount: gameDiscount
    }
    addGameToLikedGamesContext(favoriteGameData);
  }

  const addGameToCart = ( gameId, title, thumbnail, release_date, gamePrice, gameDiscount) => {
    console.log(gameId);
    const cartGameData = {
      sessionId: "65b844cbf0717a7345825c1d" /*userData[0]?._id*/,
      gameId: gameId,
      title: title,
      thumbnail: thumbnail,
      releaseDate: release_date,
      gamePrice: gamePrice,
      gameDiscount: gameDiscount
    }
    addToCartContext(cartGameData);
  }

  return (
    <View>
    <SearchGames/>
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
         <View style={styles.screenshotsView}>
          {details.screenshots.map((screens) => <View key={screens.id}>
          <Image style={styles.screenshots} loadingIndicatorSource={require('../../assets/loaders/loaderA.gif')} source={{uri: screens.image}}></Image>
            </View>)}
         </View>
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
              <TouchableOpacity onPress={() => addGameToLikedGames(details.id, details.title, details.thumbnail, details.release_date, gamePrice, gameDiscount)}><Image source={require('../../assets/gameInfoIcons/like.png')}></Image></TouchableOpacity>
              <TouchableHighlight onPress={() => addGameToCart(details.id, details.title, details.thumbnail, details.release_date, gamePrice, gameDiscount)}>
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
          {allGames.slice(firstGame, lastGame).map((games) => <TouchableHighlight key={games.id} onPress={() => gameInfoFunc(games.id)}>
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
        <View style={styles.pagesView}>
          <TouchableHighlight onPress={() => firstPage()}><Image source={require('../../assets/double-back-arrow.png')} /></TouchableHighlight>
          <TouchableHighlight onPress={() => goBack()}><Image source={require('../../assets/back-arrow.png')}></Image></TouchableHighlight>
          {pageCount.map((c, i) => <TouchableHighlight key={i} onPress={() => goToPage(c)}><Text style={[styles.textPrimaryColor, styles.pageFontSize]}>{c}</Text></TouchableHighlight>)}
          <TouchableHighlight onPress={() => goNext()}><Image source={require('../../assets/arrow-next.png')}></Image></TouchableHighlight>
          <TouchableHighlight onPress={() => lastPage()}><Image source={require('../../assets/double-next-arrow.png')} /></TouchableHighlight>
        </View>
      </View>
    }
    </View>
  ) 
}

const styles = StyleSheet.create({
    pageFontSize:{
      fontSize:24
    },
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
      width:405,
      margin:'auto',
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
    },
    screenshotsView:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      height:130,
      marginTop: 5,
      backgroundColor:'#131313'
    },
    screenshots:{
      width:125,
      height:130,
      margin:5
    },
    pagesView:{
      flex: 1, 
      alignSelf:'center',
      flexDirection:'row',
      width:300,
      height:70,
      alignItems:'center',
      justifyContent:'space-between',
    }
});
