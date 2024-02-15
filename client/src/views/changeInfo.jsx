import { useContext, useState } from "react";
import { View, Image, Text, TextInput, StyleSheet, TouchableHighlight } from "react-native";
import AuthContext from "../../context/authContext";

export const ChangeNameLNLayout = () => {

    const {userData, changeNLContext} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name:'',
        lastname:'',
    })

    handleInputChange = (fieldName, value) => {
        setFormData({...formData, [fieldName]: value });
    }

    
    const changeProfile = (formData) => {
        changeProfileContext (formData);
    }
    
    const changeNL = () => {
        changeNLContext(userData[0]._id, formData);
    }

    return(
        <View style={styles.changeSection}>
            <View style={styles.changeForm}>
                <View style={styles.changeFormGroup}>
                    <Text style={styles.changeText}>Name</Text>
                    <TextInput
                        style={styles.textsInputs}
                        placeholder="Change name"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        placeholderTextColor="#ffffff">
                    </TextInput>
                </View>
                <View style={styles.changeFormGroup}>
                    <Text style={styles.changeText}>Lastname</Text>
                    <TextInput
                        style={styles.textsInputs}
                        placeholder="Change lastname"
                        value={formData.lastname}
                        onChangeText={(text) => handleInputChange('lastname', text)}
                        placeholderTextColor="#ffffff">
                    </TextInput>
                </View>
                <TouchableHighlight style={styles.changeButton} onPress={() => changeNL()}><Text style={styles.changeButtonText}>Change</Text></TouchableHighlight>
            </View>
        </View>
    )
}

export const ChangeUsernameLayout = () => {

    const {userData, changeUsernameContext} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username:'',
    })

    handleInputChange = (fieldName, value) => {
        setFormData({...formData, [fieldName]: value });
    }
    
    const changeUsername = () => {
        changeUsernameContext(userData[0]._id, formData);
    }

    return(
        <View style={styles.changeSection}>
            <View style={styles.changeFormUserName}>
                <View style={styles.changeFormGroup}>
                <Text style={styles.changeText}>New username</Text>
                    <TextInput
                        style={styles.textsInputs}
                        placeholder="Change Username"
                        value={formData.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                        placeholderTextColor="#ffffff">
                    </TextInput>
                </View>
                <TouchableHighlight style={styles.changeButton} onPress={() => changeUsername()}><Text style={styles.changeButtonText}>Change</Text></TouchableHighlight>
            </View>
    </View>
    )
}

export const ChangePasswordLayout = () => {

    const {userData, changePasswordContext} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:'',
    })

    const handleInputChange = (fieldName, value) => {
        setFormData({...formData, [fieldName]: value });
    }

    const changePassword = () => {
        changePasswordContext(userData[0]._id, formData);
    }

    return(
        <>
          <View style={styles.changeSection}>
            <View style={styles.changeForm}>
                <View style={styles.changeFormGroup}>
                    <Text style={styles.changeText}>Old password</Text>
                        <TextInput
                            style={styles.textsInputs}
                            placeholder="*****"
                            value={formData.oldPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => handleInputChange('oldPassword', text)}
                            placeholderTextColor="#ffffff">
                        </TextInput>
                    </View>
                    <View>
                    <Text style={styles.changeText}>New password</Text>
                        <TextInput
                            style={styles.textsInputs}
                            placeholder="*****"
                            value={formData.newPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => handleInputChange('newPassword', text)}
                            placeholderTextColor="#ffffff">
                        </TextInput>
                    </View>
                    <View>
                    <Text style={styles.changeText}>Confirm new password</Text>
                        <TextInput
                            style={styles.textsInputs}
                            placeholder="*****"
                            value={formData.confirmNewPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => handleInputChange('confirmNewPassword', text)}
                            placeholderTextColor="#ffffff">
                        </TextInput>
                    </View>
                    <TouchableHighlight style={[styles.changeButton, styles.posPass]} onPress={() => changePassword()}><Text style={styles.changeButtonText}>Change</Text></TouchableHighlight>
                </View>
            </View>
        </>
    )
}

export const SeeObtainedGamesLayout = () => {

    const [formData, setFormData] = useState({})

    return(
        <>
            <View>
            <View>
                <Text>Obtained Games</Text>
                <Image source={require('../../assets/userInfoIcons/shopping.png')}></Image>
            </View>
                <View>
                    <Image></Image>
                    <Text></Text>
                    <Text></Text>
                    <TouchableHighlight><Text>Change</Text></TouchableHighlight>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    changeSection:{
        position:'absolute',
        flex:1,
        width:'69%',
        height:'100%',
        top:0,
        left:0,
        rigth:0,
        bottom:0,
        backgroundColor:'#131313',
        zIndex: 6
    },
    changeForm:{
        paddingHorizontal:10,
        flexDirection:'column',
        minHeight:250,
        justifyContent:'center',
        marginTop:80,
    },
    changeFormUserName:{
        paddingHorizontal:10,
        flexDirection:'column',
        minHeight:150,
        justifyContent:'center',
        marginTop:80,
    },
    changeFormGroup:{
        position:'relative',
        flex:1,
        width:'100%',
        backgroundColor:'#131313'
    },
    changeText:{
        position:'absolute',
        top:0,
        left:0,
        fontSize:22,
        color:'#ffffff',
        marginBottom:10
    },
    textsInputs:{
        width:390,
        marginTop:40,
        fontSize:18,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderWidth:1,
        color:'#ffffff',
        borderBottomColor:"#f4b638"
    },
    changeButton:{
        flexDirection:'row',
        width:150,
        borderRadius:5,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent:'center',
        height:50,
        color:'black',
        backgroundColor:'#f4b638',
    },
    changeButtonText:{
        fontSize:25
    },
    posPass:{
        position:'relative',
        top:20
    }

})