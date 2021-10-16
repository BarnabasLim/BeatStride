import React from 'react';
import { StyleSheet,  Text,  View, Dimensions, Alert,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
//import * as Firestore from '../../../api/firestore';

/**
 * This is a History Item component.
 * This component is used to render the statistics of past records in HistoryTab.
 * 
 * @author NTU CZ2006 Team Alpha
 */

const {width, height} = Dimensions.get("window")

const WorkoutParkItem = (props) => {
    const parkData=props.parkData;
    const name=parkData.name;
    const distance=parkData.distance.toFixed(1);
    const photoref=parkData.photos[0].photo_reference;
    const url  = 'https://maps.googleapis.com/maps/api/place/photo?'
    const maxwidth = `maxwidth=400`;
    const photorefField = `&photo_reference=${photoref}`;
    const key = `&key=AIzaSyADjrNgTK8R1JckFVwOmIRhJvPCO-hZjRQ`;
    const parkSearchUrl = url + maxwidth + photorefField +  key;
    console.log(parkSearchUrl)

    const setScrollToPage=props.setScrollToPage;

    const typeList=props.typeList;
    const setTypeListIdx=props.setTypeListIdx;

    const setNavToCoord=props.setNavToCoord;

    

    return (
            <TouchableOpacity 
                onPress={() => {setScrollToPage(0);
                    //console.log("In History Park Item"+props.parkData.geometry.location.lat );
                    setNavToCoord({latitude:parkData.geometry.location.lat,longitude:parkData.geometry.location.lng});     
                    setTypeListIdx(typeList.findIndex((item)=>{return item.name ==='SPACE';}))      
                }}
                // onLongPress={removeHistory}
            >   
                <View style={styles.itemContainer}>
                    
                    <Image 
                        source={{uri:parkSearchUrl}}
                        resizeMode= 'contain'
                        style={styles.startIcon}
                    />
                    <View style={{height:height * 0.05 ,width:width*0.475,padding:2}}>
                        <Text style={{fontSize:(name.length>20)?11:15,color:'white',fontWeight: 'bold',textAlign: 'center', }}>{name}</Text>  
                    </View>
                    <View style={{height:height * 0.05 }}> 
                        <Text style={{color:'white', fontWeight: 'bold', textAlign: 'center'}}>{distance+"m"}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.475,
        height: height * 0.25,
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'space-between',
        backgroundColor: 'black',
        margin:5,
        overflow:'hidden',
        borderRadius:10,
        //marginLeft:5,
    },  

    startIcon:{
        height: height * 0.15,
        width: width * 0.475,
        //height: height * 0.065,
        //aspectRatio: 1,
        //backgroundColor:'grey',
        resizeMode:'cover',
        //transform: [{translateY: width * 0.01}],
        //tintColor: '#7289D9',
        borderTopLeftRadius:10,
    },
})

export default WorkoutParkItem;
