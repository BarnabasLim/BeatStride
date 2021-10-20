import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


/**
 * This is a functional component representing the page indicator display under
 * private profile info.
 * 
 * @author NTU CZ2006 Team Alpha
 */
export default PageIndicator = ({ scrollX }) => {
    const data = [{},{},{},{}]
    
    return (
        <View style={{flexDirection: 'row'}}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * (width * 0.95), i * (width * 0.95), (i + 1)* (width * 0.95)];//prev dot, curr dot, next dot
                
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [(height * 0.015), (height * 0.015 * 2), (height * 0.015)],
                    extrapolate: 'clamp', //Can try comment out this line
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp', //Can try comment out this line
                });

                return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()}/>
            })}     
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: height * 0.015,
        borderRadius: height,
        backgroundColor: '#BABBBF',
        marginHorizontal: width * 0.02,
    },
});
