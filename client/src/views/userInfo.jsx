import { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableHighlight } from "react-native"
import LayoutsContext from "../../context/layoutsContext";
import AuthContext from "../../context/authContext";
import { ChangeNameLNLayout, ChangePasswordLayout, ChangeProfileLayout, ChangeUsernameLayout, SeeObtainedGamesLayout } from "./changeInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserInfo = () => {

    const {
        userExist,
        setUserExist,
        registerUser,
        setRegisterUser,
        openChangeProfile, 
        setOpenChangeProfile,
        openChangeNL,
        setOpenChangeNL,
        openChangeUsername,
        setOpenChangeUsername,
        openChangePassword,
        setOpenChangePassword,
        openSeeOG,
        setOpenSeeOG} = useContext(LayoutsContext);
    const {session, signInContext, loginContext} = useContext(AuthContext);

    const Logout = async () => {
      console.log('Logout')
      await AsyncStorage.removeItem('user');
      setSession(null);
    }
    
    const [formData, setFormData] = useState({
          email:'',
          username: '',
          password: '',
          repeatPassword:''
        });
      
        const handleInputChange = (fieldName, value) => {
          setFormData({ ...formData, [fieldName]: value });
        };
      
        const handleSignIn = () => {
            signInContext(formData);
        };

        const handleLogin = () => {
            loginContext(formData);
        };

        const registerForm = () => {
            setUserExist(false);
            setRegisterUser(true);
        }

        const signInForm = () => {
            setUserExist(true);
            setRegisterUser(false);
        }

        const changeProfileLayout = () => {
            setOpenChangeUsername(false);
            setOpenChangePassword(false);
            setOpenSeeOG(false);
            setOpenChangeNL(false);
            setOpenChangeProfile(true);
        }

        const changeNameLNLayout = () => {
            setOpenChangeProfile(false);
            setOpenChangeUsername(false);
            setOpenChangePassword(false);
            setOpenSeeOG(false);
            setOpenChangeNL(true);
        }

        const changeUsernameLayout = () => {
            setOpenChangeProfile(false);
            setOpenChangePassword(false);
            setOpenSeeOG(false);
            setOpenChangeNL(false);
            setOpenChangeUsername(true);
        } 

        const changePasswordLayout = () => {
            setOpenChangeProfile(false);
            setOpenSeeOG(false);
            setOpenChangeNL(false);
            setOpenChangeUsername(false);
            setOpenChangePassword(true);
        } 

        const seeObtainedGamesLayout = () => {
            setOpenChangeProfile(false);
            setOpenChangeNL(false);
            setOpenChangeUsername(false);
            setOpenChangePassword(false);
            setOpenSeeOG(true);
        }  
        console.log(session[0])
        return (
            <>
              <View style={styles.userInfoContainer}>
                {/*userExist === false && registerUser === false ? (*/}
                  {openChangeProfile && <ChangeProfileLayout />}
         
                  {!session ? ( <View style={styles.userInfoContainer}>
                      {openChangeNL && <ChangeNameLNLayout />}
                      {openChangeUsername && <ChangeUsernameLayout />}
                      {openChangePassword && <ChangePasswordLayout />}
                      {openSeeOG && <SeeObtainedGamesLayout />}
                      <>
                        <View style={styles.userProfile}>
                          <View>
                            <TouchableHighlight onPress={() => changeProfileLayout()}>
                              <Image
                                style={[styles.userProfileImg, styles.mLeft]}
                                source={require('../../assets/userInfoIcons/userIcon.jpg')}
                              />
                            </TouchableHighlight>
                          </View>
                          <View>
                            <Text style={[styles.welcome, styles.mLeft]}>BIENVENIDO</Text>
                            <Text style={[styles.nameUser, styles.mLeft]}>
                              Luis Salvador Enrique Sosa
                            </Text>
                            <Text style={[styles.alias, styles.mLeft]}>LuigiSal254</Text>
                          </View>
                        </View>
                        <View style={styles.userProfileRows}>
                          <Text style={[styles.fontStyleUser, styles.mLeft]}>Mi cuenta</Text>
                          <TouchableHighlight style={styles.logoutButton} onPress={() => Logout()}><Text style={styles.logoutText}>Logout</Text></TouchableHighlight>
                        </View>
                        <View style={[styles.userProfileRows]}>
                          <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/happiness.png')} />
                          <TouchableHighlight onPress={() => changeNameLNLayout()}>
                            <View>
                              <Text style={[styles.fontStyleUser, styles.mLeft]}>
                                Change name and lastname
                              </Text>
                              <Text style={[styles.secondFontUser, styles.mLeft]}>
                                Change the name of your account
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
          
                        <View style={[styles.userProfileRows]}>
                          <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/driver-license.png')} />
                          <TouchableHighlight onPress={() => changeUsernameLayout()}>
                            <View>
                              <Text style={[styles.fontStyleUser, styles.mLeft]}>Change the username</Text>
                              <Text style={[styles.secondFontUser, styles.mLeft]}>
                                Change the username of your account
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                        <View style={[styles.userProfileRows]}>
                          <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/key.png')} />
                          <TouchableHighlight onPress={() => changePasswordLayout()}>
                            <View>
                              <Text style={[styles.fontStyleUser, styles.mLeft]}>Change password</Text>
                              <Text style={[styles.secondFontUser, styles.mLeft]}>
                                Change the password of your account
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                        <View style={[styles.userProfileRows]}>
                          <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/shopping.png')} />
                          <TouchableHighlight onPress={() => seeObtainedGamesLayout()}>
                            <View>
                              <Text style={[styles.fontStyleUser, styles.mLeft]}>Check the games</Text>
                              <Text style={[styles.secondFontUser, styles.mLeft]}>
                                Check the games in your account
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </>
                    </View>
                ) : (
                  <>
                    {userExist ? (
                      <View style={styles.userForm}>
                        <Text style={[styles.textPrimaryColor, styles.formTitle]}>Login</Text>
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Mail"
                          value={formData.email}
                          onChangeText={(text) => handleInputChange('email', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Password"
                          value={formData.password}
                          secureTextEntry={true}
                          onChangeText={(text) => handleInputChange('password', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TouchableHighlight style={styles.enter} onPress={() => handleLogin()}>
                          <Text style={styles.enterText}>Enter</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => registerForm()}>
                          <Text style={styles.textThirdColorMtop}>Don't have an account? Sign in here</Text>
                        </TouchableHighlight>
                      </View>
                    ) : (
                      <View style={styles.userForm}>
                        <Text style={[styles.textPrimaryColor, styles.formTitle]}>Sign in</Text>
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Email"
                          value={formData.email}
                          onChangeText={(text) => handleInputChange('email', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Username"
                          value={formData.username}
                          onChangeText={(text) => handleInputChange('username', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Password"
                          value={formData.password}
                          secureTextEntry={true}
                          onChangeText={(text) => handleInputChange('password', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TextInput
                          style={styles.textsInputs}
                          placeholder="Repeat password"
                          value={formData.repeatPassword}
                          secureTextEntry={true}
                          onChangeText={(text) => handleInputChange('repeatPassword', text)}
                          placeholderTextColor="#ffffff"
                        />
                        <TouchableHighlight style={styles.enter} onPress={() => handleSignIn()}>
                          <Text style={styles.enterText}>Sign in</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => signInForm()}>
                          <Text style={styles.textThirdColorMtop}>You have an account? Login</Text>
                        </TouchableHighlight>
                      </View>
                    )}
                  </>
                )}
              </View>
            </>
          );
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
    textThirdColorMtop:{
        marginTop:20,
        color:'#f4b638'
    },
    userInfoContainer:{
        backgroundColor:'#131313',
    },
    userProfile:{
        flexDirection:'row',
        alignItems:'center',
        height:100,
        borderBottomWidth:2,
        borderBottomColor:'#f4b638'
    },
    userProfileImg:{
        width:60,
        height:60,
        objectFit:'cover',
        borderRadius:30,
    },
    welcome:{
        fontSize:18,
        color:'#ffffff'
    },
    nameUser:{
        fontSize:17,
        color:'#e3e3e3'        
    },
    alias:{
        fontSize:16,
        fontStyle:'italic',
        color:'#e3e3e3'    
    },
    userProfileRows:{
        height:70,
        width:600,
        flexDirection:'row',
        alignItems:'center',
        textAlign:'left',
        backgroundColor:'#131313',
        borderBottomWidth:1,
        borderBottomColor:'#303030'
    },
    fontStyleUser:{
        fontSize:20,
        color:'#ffffff'
    },
    logoutButton:{
      position:'absolute',
      right:200,
      paddingVertical:5,
      paddingHorizontal:8,
      backgroundColor:'#f4b638',
      color:'#000000'
    },
    logoutText:{
      fontSize:18,
      fontWeight:'bold'
    },
    secondFontUser:{
        fontSize:17,
        color:'#f4b638'
    },
    mLeft:{
        marginLeft:15
    },
    userForm:{
        flex:1,
        paddingVertical:10,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:80
    },
    formTitle:{
        fontSize:27
    },
    textsInputs:{
        width:350,
        marginTop:20,
        fontSize:20,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderWidth:1,
        color:'#ffffff',
        borderBottomColor:"#f4b638"
    },
    enter:{
        width:100,
        marginTop:30,
        backgroundColor:"#f4b638"
    },
    enterText:{
        textAlign:'center',
        fontSize:26,   
    }
})