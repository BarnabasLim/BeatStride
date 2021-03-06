import React, { useState, useEffect } from 'react'; 
import { StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import * as Firestore from '../../../api/firestore'; 
 
const {width, height} = Dimensions.get("window") 
 
 
/** 
 * This is a functional component representing a friend object. 
 *  
 * @author NTU CZ2006 Team Alpha 
 */ 
const DistanceItem = (props) => { 
    const navigation = useNavigation(); 
    const item = props.item; 
    const uid = item.uid; 
 
    const [displayName, setDisplayName] = useState(''); 
    const [displayPicture, setDisplayPicture] = useState({uri: ""}); 
    const [userData, setUserData] = useState({}); 
    const pressUid = props.pressuid;
    const setPressuid = props.setPressuid;
    const position = props.position;
    
    //console.log(defaultDisplayPicture+" number  ../../../assets/icons/DefaultProfile/pfp"+ num) 
 
    const [empty, setEmpty] = useState(false); 
 
    /** 
     * This is a render effect triggered upon component mount. 
     */ 
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
        Firestore.storage_retrieveOtherProfilePic(uid, setDisplayPicture, () => setDisplayPicture({uri: ""}));
    }, [])

 
    return ( 
        <TouchableOpacity onPress={() => {setPressuid(uid)}}> 
            <View style={styles.componentContainer}> 
                 
                {/* profile image */} 
                <View style={styles.pictureContainer}> 
                    { (displayPicture.uri != "") && 
                        <Image style={{...styles.pictureContainer,borderColor:uid==pressUid?"red" : "black",borderWidth:uid==pressUid ? 2 : 0 }} source={displayPicture} /> 
                    } 
                </View> 
                <View style={{...styles.notifyDot, backgroundColor: empty ? "transparent" : "blue",borderRadius:height}}> 
                    <Text  style={styles.nameText}>{position}</Text>
                </View> 
                 
                {/* Data Container */} 
                <View style={styles.dataContainer}> 
 
                    {/* Display name */} 
                    <View style={styles.nameContainer}> 
                        <Text style={styles.nameText} numberOfLines={1}>{(displayName.length>6)?(displayName.slice(0,6)+"..."):(displayName)}</Text> 
                    </View> 
                     
                </View> 
 
            </View> 
        </TouchableOpacity> 
    ); 
}; 
 
const styles = StyleSheet.create({ 
    componentContainer:{ 
        height: height * 0.145, 
        width: height * 0.12, 
        flexDirection: 'column', 
        alignItems: 'center', 
        // justifyContent: 'space-around', 
        // backgroundColor: 'purple', 
        // borderColor: '#FFFFFF',borderWidth: 1, 
    }, 
    pictureContainer:{ 
        height: height * 0.1, 
        aspectRatio: 1, 
        borderRadius: height, 
        backgroundColor: '#4F535C', 
    }, 
    dataContainer:{ 
        height: height * 0.04, 
        justifyContent: 'center', 
        // backgroundColor: 'red', 
    }, 
    nameContainer:{ 
        height: height * 0.04, 
        width: height * 0.12, 
        //justifyContent: 'center', 
    }, 
    nameText:{ 
        fontWeight: 'bold', 
        fontSize: 12, 
        color: '#FFFFFF', 
        textAlign:'center', 
 
    }, 
    idContainer:{ 
        height: height * 0.04, 
        width: width * 0.7 - (height * 0.08), 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        // backgroundColor: 'blue', 
    }, 
    idText:{ 
        fontSize: 10, 
        color: '#BABBBF', 
    }, 
    notifyDot:{ 
        position: 'absolute', 
        top: width * 0.01, 
        right: width * 0.01, 
        width: width * 0.05, 
        aspectRatio: 1, 
        borderRadius: width, 
        resizeMode:'contain' 
 
    }, 
}) 
 
export default DistanceItem;