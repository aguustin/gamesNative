import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import GameContext from "../../context/gamesContext";
import AuthContext from "../../context/authContext";

const GamesOnCart = () => {
    const {userData} = useContext(AuthContext);
    const {deleteFavGameContext, purchaseAllContext} = useContext(GameContext);
    const [openPurchase, setOpenPurchase] = useState(false);
    const [purchaseFlag, setPurchaseFlag] = useState(false);
    const [totalOnCart, setTotalOnCart] = useState([]);

    const [purchaseData, setPurchaseData] = useState({
        cardNumber:'',
        securityNumber:'',
    })

    const handlePurchase = (fieldName, value) => {
        const sanitizedText = value.replace(/[^0-9]/g, '');
        setPurchaseData({...purchaseData, [fieldName]: sanitizedText})
    }

    const deleteOnCart = (sessionId, gameId) => {
        deleteFavGameContext(sessionId, gameId);
    };

    const purchaseAllGames = () => {
        setOpenPurchase(true);
        setPurchaseFlag(true);
    }

    const purchaseGames = () => {
        const purchaseObj = {
            userId:"65b844cbf0717a7345825c1d" /*userData[0]._id*/,
            cardNumber:purchaseData.cardNumber,
            securityNumber:purchaseData.securityNumber,
            purchaseFlag: purchaseFlag,
            totalPurchase: totalPurchase
        }
        purchaseAllContext(purchaseObj);
    }
    let p = 0;
    const tt = userData.map((onCart) => onCart.games.map((game) => game.onCartorFavorite.map((t) => t.favorite === false && (p += t.total))))
    
    const innermostKey = Object.keys(tt)[0];
    const doubleNestedObject = tt[innermostKey];
    const innerKey = Object.keys(doubleNestedObject)[0];
    const finalObject = doubleNestedObject[innerKey];
    const a = (finalObject.map(key => Math.round(key)));
    const totalPurchase = Math.max(...a);
   
    return(
        <View>
          <View style={styles.sectionTitle}>
            <Text style={styles.favoriteTitleSection}>Your cart</Text>
            <Image style={styles.sectionImage} source={require('../../assets/purchaseCart.png')}></Image>
        </View>
            {userData.map((onCartGames) =>
            onCartGames.games.map((onCart) => 
            onCart.onCartorFavorite.map((cart) =>
            cart.favorite === false && 
            <View key={cart?._id}>
                <View style={styles.productView}>
                    <Image style={styles.productImgView} source={{uri: cart?.thumbnail}}></Image>
                    <View>
                        <Text style={{color:'#ffffff', fontSize:20, marginLeft:10}}>{cart?.title}</Text>
                        <View style={styles.yearPriceInfo}>
                            <Text style={{color:'#ffffff', fontSize:18, marginTop:20, marginLeft:10,}}>Year: <Text style={{color:'#017511'}}>{cart?.releaseDate}</Text></Text>
                            <Text style={{color:'#ffffff', fontSize:18, marginTop:20, marginLeft:10,}}>Price: <Text style={{color:'#017511'}}>${cart?.total}</Text></Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={() => deleteOnCart("65b844cbf0717a7345825c1d", cart._id)}><Image style={styles.x} source={require('../../assets/gameInfoIcons/x.png')}></Image></TouchableHighlight>
                </View>
            </View>)))}
            {totalPurchase > 0 && <View style={styles.totalPurchaseView}><Text style={styles.totalPurchase}>Your total on cart is: ${totalPurchase}</Text></View>}
            <View style={styles.confirmContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => purchaseAllGames()}><Text style={{fontWeight:800, fontSize:17}}>CONFIRM ORDER</Text></TouchableOpacity>
            </View>
            {openPurchase && 
            <>
            <View style={styles.blackBackground}></View>
            <View style={styles.purchaseView}>
                <TouchableHighlight style={styles.closePurchaseForm} onPress={() => setOpenPurchase(false)}><Image source={require('../../assets/remove.png')}></Image></TouchableHighlight>
                <Text style={styles.purchaseTitle}>Confirm purchase</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.purchaseInput}
                    placeholder="Card number (add a random number)"
                    value={purchaseData.cardNumber}
                    onChangeText={(text) => handlePurchase('cardNumber', text)}
                    maxLength={16}
                    placeholderTextColor="#ffffff">
                </TextInput>
                <TextInput
                    keyboardType="numeric"
                    style={styles.purchaseInput}
                    placeholder="Security number (add a random security number)"
                    value={purchaseData.securityNumber}
                    onChangeText={(text) => handlePurchase('securityNumber', text)}
                    maxLength={3}
                    placeholderTextColor="#ffffff">
                </TextInput>
                <View style={styles.confirmContainer}>
                    <TouchableHighlight style={styles.confirmButton} onPress={() => purchaseGames()}><Text style={{fontWeight:800, fontSize:17}}>PURCHASE</Text></TouchableHighlight>
                </View>
            </View>
            </>}
        </View>
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
    productView:{
        position:'relative',
        flexDirection:'row',
        marginTop:5,
        width:400,
        height:100,
        paddingVertical:10,
        paddingHorizontal:10,
        borderBottomWidth:2,
        borderBottomColor:'#303030',
        textAlign:'left',
        alignItems:'center'
    },
    productImgView:{
        width:80,
        height:80,
    },
    yearPriceInfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    x:{
        position:'absolute',
        top:-40
    },
    confirmContainer:{
        flexDirection:'row',
        position:'fixed',
        bottom:0,
        height:100,
        alignItems:'center',
        justifyContent:'center'
    },
    totalPurchaseView:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        marginTop:22
    },
    totalPurchase:{
        color:'#ffffff',
        fontSize:18
    },
    buyButton:{
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        bottom: 12,
        right:5,
        backgroundColor:'#f4b638',
        padding:2,
        width:50
    },
    confirmButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:'70%',
        borderRadius:12,
        backgroundColor:'#f4b638',
        fontWeight:600
    },
    closePurchaseForm:{
        position: 'absolute',
        right:10,
        top:10
    },
    blackBackground:{ //arreglar el fondo con opacity
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: '#ffffff',
        opacity:5,
        zIndex:2
    },
    purchaseView:{
        position:'fixed',
        top:'-40%',
        flex:1,
        width:'100%',
        padding:20,
        alignSelf:'center',
        backgroundColor:'#202020',
        borderRadius:10,
        zIndex: 3
    },
    purchaseTitle:{
        textAlign:'center',
        marginTop:10,
        fontSize:27,
        color:'#ffffff'
    },
    purchaseInput:{
        marginTop:15,
        fontSize:18,
        borderBottomWidth: 1,
        borderBottomColor:'#f4b638',
        color:'#ffffff'
    }
})

export default GamesOnCart;