import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';

import PlaylistSelectionTempo from '../PlaylistSelectionTempo';
import GoalSetting from '../GoalSetting';

const {width, height} = Dimensions.get("window")

const TempoRun = () => {
    const navigation = useNavigation();

    const [selectToggle, setSelectToggle] = useState(false)
    const [settingToggle, setSettingToggle] = useState(false)

    const [status, setStatus] = useState(0);

    /* [Check GPS Service Enabled? + Prompt] */
    const seviceCheck = async() => {
        const check = await Location.hasServicesEnabledAsync()
        // console.log(check)
        if (check) {
            setStatus(1);
        } else {
            try {
                const pos = await Location.getCurrentPositionAsync();
                if (pos) {
                    setStatus(1);
                }
            } catch(error) {
                console.log(error);
                Alert.alert(
                    "GPS Location Service",
                    "Run function requires GPS Location Service enabled. Please enable GPS Location Service and try again.",
                    [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
                )
                setStatus(0);
            }
        }
    }

    /* [Status Control] */
    useEffect(() => {
        if (status === 1) {
            console.log("GPS Enabled")
            setSelectToggle(true);
        }
        if (status === 6) {
            console.log("Checking GPS Service")
            seviceCheck();
        }
    },[status])

    return (
        <View style={styles.componentContainer}>

            {/* Text */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Tempo Run</Text>
                
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Sync up music to help you achieve your target.</Text>
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={() => setStatus(6)}>
                <View>
                    <Image 
                        source={require('../../../assets/icons/ExercisePlay.png')}
                        resizeMode= 'contain'
                        style={styles.startIcon}
                    />
                </View>
            </TouchableOpacity>

            {/* Target */}
            <View style={styles.targetContainer}>
                <View style={styles.goalTextContainer}>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Distance</Text>
                        <Text style={styles.goalText}>42.24 km</Text>
                    </View>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Time</Text>
                        <Text style={styles.goalText}>24 hr 56 min</Text>
                    </View>
                    
                </View>

                {/* Goal Button */}
                <TouchableOpacity onPress={() => {setSettingToggle(true)}}>
                    <View style={styles.goalButton}>
                        <Text style={styles.buttonText}>Edit Goal</Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/* Playlist Selection Popup */}
            <PlaylistSelectionTempo
                selectToggle={selectToggle}
                setSelectToggle={setSelectToggle}
                mode={"Tempo"}
            />

            {/* Goal Setting Popup */}
            <GoalSetting
                settingToggle={settingToggle}
                setSettingToggle={setSettingToggle}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width * 0.95,
        height: height * 0.25,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },  
    titleContainer:{
        width: width * 0.65,
        height: height * 0.08,
        justifyContent:'center',
        paddingLeft: width * 0.7 * 0.1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#42474D',
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    descriptionContainer:{
        width: width * 0.63,
        height: height * 0.06,
        paddingLeft: width * 0.7 * 0.05,
        paddingTop: height * 0.08 * 0.1,
        // backgroundColor: 'yellow',
    },
    descriptionText:{
        fontSize: 12,
        color: '#BABBBF',
    },
    startButton:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        position: 'absolute',
        right: ((width * 0.95) - (width * 0.65) - (height * 0.1)) * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42474D',
    },
    startIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        transform: [{translateX: width * 0.01}],
        tintColor: '#7289DA',
    },
    targetContainer:{
        height: height * 0.07,
        width: width * 0.65,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    goalTextContainer:{
        width: width * 0.65 * 0.65,
        paddingRight: width * 0.65 * 0.05,
        paddingLeft: width * 0.7 * 0.05,
        // backgroundColor: 'pink',
    },
    goalText:{
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FFFFFF'
    },
    goalValue:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goalButton:{
        width: width * 0.65 * 0.3,
        height: height * 0.07 * 0.6,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#42474D',
    },
    buttonText:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#BABBBF',
    },
})

export default TempoRun;