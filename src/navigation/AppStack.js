import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import LoadingScreen from '../screens/Onboarding/LoadingScreen';
// import LoginScreen from '../screens/Onboarding/LoginScreen';
// import RegisterScreen from '../screens/Onboarding/RegisterScreen';
// import GuideScreen from '../screens/Onboarding/GuideScreen';
import LoginScreen from '../screens/Onboarding/Login/Login'; //Login 1st Page
import RegisterScreen from '../screens/Onboarding/Login/CreateAccount'; //Login 2nd Page
import GuideScreen from '../screens/Onboarding/GuideScreen'; // Unchanged
import SetupProfile from '../screens/Onboarding/Login/SetupProfile'; // Login 3rd Page
import FollowScreen from '../screens/Onboarding/Login/FollowScreen'; // Login 4th Page
import SongScreen from '../screens/Music/SongsScreen';
import RunningScreen from '../screens/Running/RunningScreen';
import EndScreen from '../screens/RunEnd/EndScreen';
import HistoryView from '../screens/Exercise/components/HistoryView';
import RequestScreen from '../screens/Social/RequestScreen';
import SearchScreen from '../screens/Social/SearchScreen';
import UserProfileScreen from '../screens/Social/UserProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import ForgotPasswordScreen from '../screens/Onboarding/ForgotPasswordScreen';
import GoalSettingScreen from '../screens/Exercise/GoalSettingScreen';

//arron
import AlphaEditMeScreen from '../screensAlpha/AlphaMe/AlphaEditMeScreen';
// Omkar
import RunScreenAlpha from '../screensAlpha/AlphaExercise/RunScreenAlpha';
import AlphaEndScreen from '../screensAlpha/AlphaExercise/AlphaEndScreen';
import AlphaSpaceRace from '../screensAlpha/AlphaExercise/AlphaSpaceRace';
import AlphaTimeRace from '../screensAlpha/AlphaExercise/AlphaTimeRace';
//WeiJian
import AlphaUserProfileScreen from '../screensAlpha/AlphaSocials/UserProfileScreen';

//Barnabas
import LobbyOrganiserScreen from '../screensAlpha/AlphaExercise/LobbyOrganiserScreen';
import LobbyOrganiserScreen2 from '../screensAlpha/AlphaExercise/LobbyOrganiserScreen2';
import LobbyParticipantScreen from '../screensAlpha/AlphaExercise/LobbyParticipantScreen';

//Disable warnings
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const {width, height} = Dimensions.get("window")

const Stack = createStackNavigator();

/**
 * This is a functional component containing the Stacks of our App.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="LoadingScreen"
        >
            <Stack.Screen
                key="LoadingScreen"
                name="LoadingScreen"
                component={LoadingScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="LoginScreen"
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="RegisterScreen"
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="GuideScreen"
                name="GuideScreen"
                component={GuideScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="SetupProfile"
                name="SetupProfile"
                component={SetupProfile}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="FollowScreen"
                name="FollowScreen"
                component={FollowScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="AppTab"
                name="AppTab"
                component={AppTab}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="SongScreen"
                name="SongScreen"
                component={SongScreen}
                options={{
                    title: "Playlist Song",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.08
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="RunningScreen"
                name="RunningScreen"
                component={RunningScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="EndScreen"
                name="EndScreen"
                component={EndScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="HistoryView"
                name="HistoryView"
                component={HistoryView}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="RequestScreen"
                name="RequestScreen"
                component={RequestScreen}
                options={{
                    title: "Friend Requests",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="SearchScreen"
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: "Search Users ",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="UserProfileScreen"
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{
                    title: "User Profile ",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="ChangePasswordScreen"
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="ForgotPasswordScreen"
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="EditProfileScreen"
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="GoalSettingScreen"
                name="GoalSettingScreen"
                component={GoalSettingScreen}
                options={{
                    title: "Edit Goals",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            {/*Arron's Edit*/}
            <Stack.Screen
                key="AlphaEditMeScreen"
                name="AlphaEditMeScreen"
                component={AlphaEditMeScreen}
            />

            {/* Added by Omkar */}
            <Stack.Screen
                key="RunScreenAlpha"
                name="RunScreenAlpha"
                component={RunScreenAlpha}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="AlphaEndScreen"
                name="AlphaEndScreen"
                component={AlphaEndScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="AlphaSpaceRace"
                name="AlphaSpaceRace"
                component={AlphaSpaceRace}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="AlphaTimeRace"
                name="AlphaTimeRace"
                component={AlphaTimeRace}
                options={{headerShown: false}}
            />
            {/* Added by WeiJian */}
            <Stack.Screen
                key="AlphaUserProfileScreen"
                name="AlphaUserProfileScreen"
                component={AlphaUserProfileScreen}
                options={{
                    title: "User Profile ",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            {/* Added by Barnabas */}
            <Stack.Screen
                key="LobbyOrganiserScreen"
                name="LobbyOrganiserScreen"
                component={LobbyOrganiserScreen}
                options={{
                    title: "Time Racing Lobby",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="LobbyOrganiserScreen2"
                name="LobbyOrganiserScreen2"
                component={LobbyOrganiserScreen2}
                options={{
                    title: "Time Racing Lobby 2",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="LobbyParticipantScreen"
                name="LobbyParticipantScreen"
                component={LobbyParticipantScreen}
                options={{
                    title: "Time Racing Lobby Participant",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
        </Stack.Navigator>
    );
};

export default AppStack;
