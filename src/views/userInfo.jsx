import { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableHighlight } from "react-native"
import LayoutsContext from "../../context/layoutsContext";
import AuthContext from "../../context/authContext";

export const UserInfo = () => {

    const {userExist, setUserExist, registerUser, setRegisterUser} = useContext(LayoutsContext);
    const {signInContext, loginContext} = useContext(AuthContext);
  
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

    return(
        <View style={styles.userInfoContainer}>
        {userExist === false && registerUser === false ?
            <>
            <View style={styles.userProfile}>
                <View>
                    <Image style={[styles.userProfileImg, styles.mLeft]} source={require('../../assets/userInfoIcons/userIcon.jpg')}></Image>
                </View>
                <View>
                    <Text style={[styles.welcome, styles.mLeft]}>BIENVENIDO</Text>
                    <Text style={[styles.nameUser, styles.mLeft]}>Luis Salvador Enrique Sosa</Text>
                    <Text style={[styles.alias, styles.mLeft]}>LuigiSal254</Text>
                </View>
            </View>
            <View style={styles.userProfileRows}>
                <Text style={[styles.fontStyleUser, styles.mLeft]}>Mi cuenta</Text>
            </View>
            <View style={[styles.userProfileRows]}>
                <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/happiness.png')}/>
                <View>
                    <Text style={[styles.fontStyleUser, styles.mLeft]}>Change name and lastname</Text>
                    <Text style={[styles.secondFontUser, styles.mLeft]}>Change the name of your acount</Text>
                </View>
            </View>
            <View style={[styles.userProfileRows]}>
                <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/arroba.png')}/>
                <View>
                    <Text style={[styles.fontStyleUser, styles.mLeft]}>Change email</Text>
                    <Text style={[styles.secondFontUser, styles.mLeft]}>Change the email of your acount</Text>
                </View>
            </View>
            <View style={[styles.userProfileRows]}>
                <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/driver-license.png')}/>
                <View>
                    <Text style={[styles.fontStyleUser, styles.mLeft]}>Change the username</Text>
                    <Text style={[styles.secondFontUser, styles.mLeft]}>Change the username of your acount</Text>
                </View>
            </View>
            <View style={[styles.userProfileRows]}>
                <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/key.png')}/>
                <View>
                    <Text style={[styles.fontStyleUser, styles.mLeft]}>Change password</Text>
                    <Text style={[styles.secondFontUser, styles.mLeft]}>Change the password of your count</Text>
                </View>
            </View>
            <View style={[styles.userProfileRows]}>
                <Image style={styles.mLeft} source={require('../../assets/userInfoIcons/shopping.png')}/>
                <View>
                    <Text style={[styles.fontStyleUser, styles.mLeft]}>Check the games</Text>
                    <Text style={[styles.secondFontUser, styles.mLeft]}>Check the games in your acount</Text>
                </View>
            </View>
            </>
        :
        <>
            {userExist ? <View style={styles.userForm}>
            <Text style={[styles.textPrimaryColor, styles.formTitle]}>Login</Text>
            <TextInput
            style={styles.textsInputs}
                placeholder="Mail"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholderTextColor="#ffffff">
            </TextInput>
            <TextInput
            style={styles.textsInputs}
            placeholder="Password"
            value={formData.password}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholderTextColor="#ffffff">
            </TextInput>
            <TouchableHighlight style={styles.enter} onPress={() => handleLogin()}><Text style={styles.enterText}>Enter</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => registerForm()}><Text style={styles.textThirdColorMtop}>Don't have an account? Sign in here</Text></TouchableHighlight>
        </View>
        :
        <View style={styles.userForm}>
            <Text style={[styles.textPrimaryColor, styles.formTitle]}>Sign in</Text>
            <TextInput
            style={styles.textsInputs}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholderTextColor="#ffffff">
            </TextInput>
            <TextInput
            style={styles.textsInputs}
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholderTextColor="#ffffff">
            </TextInput>
            <TextInput
            style={styles.textsInputs}
            placeholder="Password"
            value={formData.password}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholderTextColor="#ffffff">
            </TextInput>
            <TextInput
            style={styles.textsInputs}
            placeholder="Repeat password"
            value={formData.repeatPassword}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange('repeatPassword', text)}
            placeholderTextColor="#ffffff">
            </TextInput>
            <TouchableHighlight style={styles.enter} onPress={() => handleSignIn()}><Text style={styles.enterText}>Sign in</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => signInForm()} ><Text style={styles.textThirdColorMtop}>You have an account? Login</Text></TouchableHighlight>
        </View>
        }
        </>
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
    secondFontUser:{
        fontSize:17,
        color:'#f4b638'
    },
    mLeft:{
        marginLeft:15
    },
    userForm:{
        flex:1,
        marginTop:20,
        paddingVertical:10,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
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