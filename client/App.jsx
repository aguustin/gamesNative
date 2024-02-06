
import { StyleSheet, View, ScrollView } from 'react-native';
//import { Home } from './src/views/home';
import { Footer } from './src/views/footer';
import {LayoutsContextProvider}from './context/layoutsContext';
import { GameContextProvider } from './context/gamesContext';
import { ViewsContainer } from './src/views/viewsContainer';
import { AuthContextProvider } from './context/authContext';
import SearchGames from './src/views/searchGames';

export default function App() {
  return (
    <View style={styles.container}>
    <AuthContextProvider>
    <LayoutsContextProvider>
    <GameContextProvider>
        <ScrollView style={styles.footerMargin}>
          <ViewsContainer/>
        </ScrollView>
        <Footer/>
    </GameContextProvider>
    </LayoutsContextProvider>
    </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  textColor:{
    color:'#fff',
  },
  footerMargin:{
    marginBottom:65
  }

});
