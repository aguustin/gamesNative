import { StyleSheet, View, Image, Text, TextInput, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import GameContext from '../../context/gamesContext';
import LayoutsContext from '../../context/layoutsContext';

const SearchGames = () => {
  
    const {searchingGames, gameDetailsContext} = useContext(GameContext);
    const {search, setSearch, setGameInfo } = useContext(LayoutsContext);
    
    const handleSearch = (text) => {
        setSearch(text);
        searchingGames.filter((games) => {
            return search.toLowerCase() === ''
             ? games : 
             games.title.toLowerCase().includes(search)}) // seguir acaaaaaaaaaaaaaaaa
    }

    const gameInfoFunc = (gameId) => {
        gameDetailsContext(gameId);
        setGameInfo(true);
        setSearch('');
      }

    return(
        <>
            <TextInput style={styles.input}  
            value={search}
            onChangeText={(text) => handleSearch(text)}  
            placeholder='Buscar producto'></TextInput>
            <StatusBar style="auto" />
                <ScrollView style={styles.scroll}>
                    <View style={styles.searchedGames}>
                            {searchingGames.filter((s) => {
                            return search.toLowerCase() === ''
                            ? '' : 
                            s.title.toLowerCase().includes(search)})
                            .map((se) => (
                            <View key={se._id}>
                                <TouchableOpacity style={styles.filteredGames} onPress={() => gameInfoFunc(se.id)}>
                                    <Image style={styles.filteredImages} source={{uri: se.thumbnail}}></Image>
                                    <View>
                                        <Text style={styles.titleGame}>{se.title}</Text>
                                        <Text style={styles.filteredProps}>Genre: {se.genre}</Text>
                                        <Text style={styles.filteredProps}>publisher: {se.publisher}</Text>
                                        <Text style={styles.filteredProps}>platform: {se.platform}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>))}
                    </View>
                </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    input:{
        marginTop:50,
        width:'100%',
        height:60,
        fontSize:20,
        paddingLeft:10,
        backgroundColor:'white',
        borderRadius: 15,
        fontWeight:'700',
    },
    scroll:{
        position:'absolute',
        flex:1,
        alignSelf:'center',
        marginTop:120,
        zIndex:5,
        height:360
    },
    searchedGames:{
        flex:1,
        width:'100%',
        marginTop:1,
        backgroundColor: '#131313',
        borderColor:'#f4b638',
    },
    titleGame:{
        fontSize:20,
        marginLeft:10,
        color:'#ffffff'
    },
    filteredGames:{
        flexDirection:'row',
        alignItems:'center',
        width:400,
        height:120,
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'#131313',
        borderWidth:1,
        borderColor:'#323232',
    },
    filteredImages:{
        width:100,
        height:90,
        borderRadius:5,
    },
    filteredProps:{
        marginLeft:10,
        color: '#989898',
        fontSize:15
    }
})

export default SearchGames;