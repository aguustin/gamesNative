import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LikedGames = () => {

    const addToCart = () => {

    }

    return(
        <>
        <View style={styles.likedGameContainer}>
            <Image style={styles.likedGameImg} source={require('../../assets/portadaGOW.jpg')}></Image>
            <Text style={styles.titleGame}>God of war: Ragnarok</Text>
            <View style={styles.likedGameInfo}>
              <View style={styles.likedPriceDiscount}>
                <Text style={styles.textPrimaryColor}>Price: 54$</Text>
                <Text style={[styles.discount]}>-20%</Text>
              </View>
              <View style={styles.addCartStyle}>
                <TouchableOpacity onPress={() => addToCart()}><Image source={require('../../assets/add.png')}></Image></TouchableOpacity>
                <Image source={require('../../assets/footer/cartActive.png')}></Image>
              </View>
            </View>
        </View>
      </>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default LikedGames;
