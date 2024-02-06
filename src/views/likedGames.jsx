import { useContext, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GameContext from '../../context/gamesContext';
import AuthContext from '../../context/authContext';

const LikedGames = () => {
    const {userData} = useContext(AuthContext);
    const {addToCartContext, deleteFavGameContext} = useContext(GameContext);
    const [a, setA] = useState(true);

    const deleteFavGame = (sessionId, gameId) => {
        deleteFavGameContext(sessionId, gameId);
    }

    const addToCart = (sessionId, gameId) => {
        addToCartContext(sessionId, gameId);
    }
    return(
        <>
        <View style={styles.sectionTitle}>
            <Text style={styles.favoriteTitleSection}>Favorites</Text>
            <Image style={styles.sectionImage} source={require('../../assets/favoritegame.png')}></Image>
        </View>
        {userData.map((favGames) =>
        favGames.games.map((fav) =>
        fav.onCartorFavorite.map((f) => 
        f.favorite === true &&
        <View key={f._id} style={styles.likedGameContainer}>
        <TouchableOpacity style={styles.delete} onPress={() => deleteFavGame("65b844cbf0717a7345825c1d",f._id)}><Image source={require('../../assets/remove.png')}></Image></TouchableOpacity>
            <Image style={styles.likedGameImg} source={{uri: f.thumbnail}}></Image>
            <Text style={styles.titleGame}>{f.title}</Text>
            <View style={styles.likedGameInfo}>
              <View style={styles.likedPriceDiscount}>
                <Text style={styles.textPrimaryColor}>Price: {f.price}$</Text>
                <Text style={[styles.discount]}>-{f.discount}%</Text>
                <Text style={[styles.textPrimaryColor]}>{f.total}$</Text>
              </View>
              <View style={styles.addCartStyle}>
                <TouchableOpacity onPress={() => addToCart("65b844cbf0717a7345825c1d", f._id)}><Image source={require('../../assets/add.png')}></Image></TouchableOpacity>
                <Image source={require('../../assets/footer/cartActive.png')}></Image>
              </View>
            </View>
        </View>)))} 
        {a === false ? '' : <View style={styles.noGamesContainer}>
            <Image source={require('../../assets/noLikedGames.png')}></Image>
            <Text style={styles.noGamesText}>You have no favorite games</Text>
        </View>}
      </>
        
    )
}

const styles = StyleSheet.create({
    sectionTitle:{
        height:60,
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'left',
        marginTop:20,
        backgroundColor:'#000000'
    },
    favoriteTitleSection:{
        marginLeft:8,
        fontSize:32,
        color:'#ffffff'
    },
    sectionImage:{
        marginLeft:10,
        width:40,
        height:40
    },
    textPrimaryColor:{
        color:'#ffffff',
        fontSize:20,
    },
    textThirdColor:{
        color:'#f4b638',
        fontSize:20
    },
    likedGameContainer:{
        marginTop:20,
        width:400,
        paddingBottom:10,
        borderBottomWidth:2,
        borderBottomColor:'#303030',
    },
    delete:{
        position: 'absolute',
        right:5,
        top:2,
        zIndex: 2
    },
    likedGameImg:{
        width: 400, // This makes the image occupy 100% of its parent container's width
        height: 100, // This makes the image occupy 100% of its parent container's height
        objectFit:'cover',
        borderRadius:5
    },
    titleGame:{
        textAlign:'center',
        fontSize:26,
        marginTop:5,
        marginBottom:5,
        color:'#ffffff'
    },
    likedGameInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft:50,
        paddingRight:20
    },
    likedPriceDiscount:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:160
    },
    discount:{
        paddingHorizontal:8,
        borderRadius:6,
        fontSize:20,
        backgroundColor:'#f4b638'
    },
    addCartStyle:{
        width:100,
        height:50,
        flexDirection:'row',
        alignItems:'center',
    },
    noGamesContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },
    noGamesText:{
        textAlign:'center',
        fontSize:25,
        color:'#4A4A4A'
    }
})

export default LikedGames;
