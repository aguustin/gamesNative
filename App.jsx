import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
//import { Home } from './src/views/home';
import { Footer } from './src/views/footer';
import {LayoutsContextProvider}from './context/layoutsContext';
import { GameContextProvider } from './context/gamesContext';
import { ViewsContainer } from './src/views/viewsContainer';
import { AuthContextProvider } from './context/authContext';

export default function App() {
  return (
    <View style={styles.container}>
    <AuthContextProvider>
      <LayoutsContextProvider>
      <GameContextProvider>
        <TextInput style={styles.input} placeholder='Buscar producto'></TextInput>
        <StatusBar style="auto" />
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
  input:{
    marginTop:50,
    width:'90%',
    height:60,
    fontSize:20,
    paddingLeft:10,
    backgroundColor:'white',
    borderRadius: 15,
    fontWeight:'700',
  },
  footerMargin:{
    marginBottom:65
  }

});
