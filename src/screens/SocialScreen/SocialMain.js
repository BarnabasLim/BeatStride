import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import Individual from './Individual/IndividualComponent';
import Community from './Community/CommunityComponent';
import Events from './Events/EventsComponent';

const {width, height} = Dimensions.get("window")

const SocialMain = ({navigation}) => {
    const [component, setComponent] = useState("Individual")

    return(
        <Screen>
            {/* Header */}
            <Text style={textStyle.header}>Social</Text>

            {/* Content */}
            <View style={{
                alignItems:'center', 
                // backgroundColor:'blue'
            }}>

                {/* Component Navigation */}
                <View style={{
                    flexDirection: 'row', 
                    // backgroundColor:'pink', 
                    justifyContent:'space-around',
                    width: width - 120,
                    paddingTop: 5,
                }}
                >
                    <TouchableOpacity onPress={() => setComponent("Individual")}>
                        <Text style={textStyle.subHeader}>Ranking</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => setComponent("Community")}>
                        <Text style={textStyle.subHeader}>Community</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => setComponent("Events")}>
                        <Text style={textStyle.subHeader}>Events</Text>
                    </TouchableOpacity>
                </View>
                {/* Navigation Indicator */}
                <View style={{
                    flexDirection: 'row', 
                    // backgroundColor:'pink', 
                    justifyContent:'space-around',
                    width: width - 120,
                    paddingBottom: 5,
                }}
                >
                    <View style={{
                        width: 55,
                        height: 3,
                        backgroundColor: (component == "Individual") ? color.primary : 'transparent',
                        borderRadius: height,
                    }}/>

                    {/* <View style={{
                        width: 0.22 * width,
                        height:0.005 * height,
                        backgroundColor: (component == "Community") ? color.primary : 'transparent',
                        borderRadius: 0.005 * height,
                    }}/> */}

                    <View style={{
                        width: 45,
                        height: 3,
                        backgroundColor: (component == "Events") ? color.primary : 'transparent',
                        borderRadius: height,
                    }}/>
                    
                </View>

                {/* Component */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    width: 0.95 *  width,
                    height: 0.72 * height,
                    borderRadius: 15,
                    elevation: 5,
                }}>
                    {/* {(component == "Individual") ? <Individual/> : ((component == "Community") ? <Community/> : ((component == "Events") ? <Events/> : <></>) )} */}
                    {(component == "Individual") ? <Individual/> : <Events/>}
                </View>
            </View>
        
        </Screen>
    );
};

export default SocialMain;