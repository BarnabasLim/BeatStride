import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableWithoutFeedback, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Firestore from '../../../api/firestore';

const {width, height} = Dimensions.get("window")

const RequestItem = (props) => {
    const navigation = useNavigation();
    const item = props.item;
    const uid = item.uid;

    const [displayName, setDisplayName] = useState('');
    const [displayPicture, setDisplayPicture] = useState(require('../../../assets/icons/defaultprofile.png'));
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // console.log(uid)
        Firestore.db_getOtherDataSnapshot(
            uid,
            (userData) => {
                setUserData(userData)
                setDisplayName(userData.displayName)
                // console.log(userData)
            },
            (error) => {console.log(error)},
        );
        Firestore.storage_retrieveOtherProfilePic(uid, setDisplayPicture, () => console.log(uid + ' User has no profile picture (REQUEST ITEM)'));
    }, [])

    return (
        <TouchableWithoutFeedback onPress={() => {navigation.navigate("UserProfile", {userData: userData})}}>
            <View style={styles.componentContainer}>

                {/* profile image */}
                <View>
                    <Image style={styles.pictureContainer} source={displayPicture} />
                </View>

                {/* Data Container */}
                <View style={styles.dataContainer}>

                    {/* Display name */}
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>{displayName}</Text>
                    </View>

                    {/* User id */}
                    <View style={styles.idContainer}>
                        <Text style={styles.idText} numberOfLines={1}>{uid}</Text>
                    </View>
                    
                </View>

                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.buttonComponent1} 
                        onPress={() => {Firestore.db_acceptFriend(uid)}}
                    >
                        <Text style={styles.buttonText1}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.buttonComponent2} 
                        onPress={() => {Firestore.db_withdrawRejectRequest(uid)}}
                    >
                        <Text style={styles.buttonText2}>Reject</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        // backgroundColor: 'purple',
        // borderColor: '#FFFFFF',
        // borderWidth: 1,
    },
    pictureContainer:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        marginLeft: width * 0.03,
        //backgroundColor: 'pink',
    },
    dataContainer:{
        height: height * 0.1,
        width: width * 0.9 - (height * 0.1),
        marginLeft: width * 0.03,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    nameContainer:{
        height: height * 0.04,
        width: width * 0.6 - (height * 0.08),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // backgroundColor: 'green',
    },
    nameText:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    idContainer:{
        height: height * 0.04,
        width: width * 0.6 - (height * 0.08),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
    },
    idText:{
        fontSize: 10,
        color: '#BABBBF',
    },
    buttonContainer:{
        height: height * 0.1,
        width: width * 0.34 - height * 0.02,
        position: 'absolute',
        top: height * 0.025,
        right: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'orange',
    },
    buttonComponent1:{
        height: height * 0.035,
        width: (width * 0.34 - height * 0.02) * 0.9,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: '#7289DA',
        backgroundColor: '#7289DA',
    },
    buttonText1:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        includeFontPadding: false,
    },
    buttonComponent2:{
        height: height * 0.035,
        width: (width * 0.34 - height * 0.02) * 0.9,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#7289DA',
    },
    buttonText2:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        includeFontPadding: false,
    },
})

export default RequestItem;