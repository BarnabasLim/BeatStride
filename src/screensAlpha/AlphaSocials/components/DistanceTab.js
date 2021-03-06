import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';

import * as Firestore from '../../../api/firestore';
import DistanceItem from './DistanceItem';
import { IconButton } from "react-native-paper";
import HistoryItem from './HistoryItem';
import HistoryViewMap from './Alpha_HistoryViewMap';


const { width, height } = Dimensions.get("window")



export default function DistancePage({ type }) {

    const [friendList, setFriendList] = useState([]);
    const [displayPicture, setDisplayPicture] = useState({ uri: "" });
    const [history, setHistory] = useState([])
    const [empty, setEmpty] = useState(true);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalRuns, setTotalRuns] = useState(0);
    const [friendData, setFriendData] = useState([]);
    const [uid, setuid] = useState("");
    const [pressuid, setPressuid] = useState("");
    const [position, setPosition] = useState(0);
    const [myPosition, setMyPosition] = useState(0);
    console.log("Type in distancePage " + type)
    console.log(uid)

    useEffect(() => {
        Firestore.db_friendsList(
            (userList) => {
                setFriendList(userList)
                console.log(userList)
            },
            (error) => { console.log(error) },
        )

        Firestore.storage_retrieveProfilePic(setDisplayPicture, () => setDisplayPicture({ uri: "" }));


        Firestore.db_getUserDataSnapshot(
            (userData) => {
                setTotalDistance(userData.totalDistance)
                setTotalRuns(userData.runCount)
                setuid(userData.uid)
                setPosition(0)
            },
            (error) => { console.log(error) },
        )



    }, [])

    useEffect(()=> {
        if (uid != "")
        {
            Firestore.db_userhistoryView( uid,
                (historyList) => { 
                    historyList.map((item)=>{item.userId = uid})
                    setHistory(historyList.reverse()) },
                (error) => { console.log('history view fail') }
            )
        }
    }, [uid])

    useEffect(() => {
        var uidList = [];

        for (var i = 0; i < friendList.length; i++) {
            uidList[i] = friendList[i].uid;
        }
        uidList[friendList.length] = uid;

        console.log("uidList = " + uidList);
        console.log(friendList)

        Firestore.db_queryFriendsData(uidList,
            (userList) => {
                setFriendData(userList)
                console.log(userList)
            },
            (error) => { console.log(error) })
    }, [friendList])

    useEffect(() => {
        console.log("What type in useEffect "+ type);
        console.log("Friend Data length " + friendData.length);
        if (friendData.length != 0) {
            if (type == 1) {
                console.log("friendData = " + friendData.sort((a, b) => (a.longestDistance < b.longestDistance) ? 1 : -1));
                for (var i = 0; i < friendData.length; i++) {
                    console.log("friend_displayName = " + friendData[i].displayName);
                    console.log("friend_longestDistance = " + friendData[i].longestDistance);
                    friendData[i].position = i+1;
                    console.log("friend_position = " + friendData[i].position);
                    if(friendData[i].uid == uid)
                    {
                        setMyPosition(friendData[i].position);
                    }

                }
            } else if (type == 2) {
                console.log("friendData = " + friendData.sort((a, b) => (a.fastestPace > b.fastestPace) ? 1 : -1));
                for (var i = 0; i < friendData.length; i++) {
                    console.log("friend_displayName = " + friendData[i].displayName);
                    console.log("friend_fastestPace = " + friendData[i].fastestPace);
                    friendData[i].position = i+1;
                    console.log("friend_position = " + friendData[i].position);
                    if(friendData[i].uid == uid)
                    {
                        setMyPosition(friendData[i].position);
                    }

                }

            }  else if (type == 3) {
                console.log("friendData = " + friendData.sort((a, b) => (a.runCount < b.runCount) ? 1 : -1));
                for (var i = 0; i < friendData.length; i++) {
                    console.log("friend_displayName = " + friendData[i].displayName);
                    console.log("friend_runCount = " + friendData[i].runCount);
                    friendData[i].position = i+1;
                    console.log("friend_position = " + friendData[i].position);
                    if(friendData[i].uid == uid)
                    {
                        setMyPosition(friendData[i].position);
                    }

                }
               
            }
            else {
                console.log("Nothing to display");
            }
        }
            console.log(friendData);

        }, [friendData, type])

    useEffect(() => {
        if (pressuid != "")
        {
            Firestore.db_userhistoryView( pressuid,
                (historyList) => { 
                    historyList.map((item)=>{item.userId = pressuid})
                    setHistory(historyList.reverse()) },
                (error) => { console.log('history view fail') }
            )
        }
    },[pressuid, type])
    

    return (
        <View style={styles.container}>
            <View style={styles.friendlist}>
                <View style={styles.myProfile}>
                <TouchableOpacity onPress={() => {setPressuid(uid)}}> 
                    <View > 
                        <View> 
                            { (displayPicture.uri != "") && 
                                  <Image style={styles.profilePicContainer} source={displayPicture} />
                            } 
                        </View> 
                        <View style={{...styles.notifyDot, backgroundColor: "blue",borderRadius:height}}> 
                            <Text  style={styles.nameText}>{myPosition}</Text>
                        </View> 
                        </View> 
                </TouchableOpacity> 
                </View>
                <View style={{ width: width - height * 0.1, height: height * 0.145, flexDirection: 'row' }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.list2}
                        data={friendData.filter((userData) => {return !(uid === userData.uid)})}
                        extraData={friendData}
                        keyExtractor={item => item.uid}
                        renderItem={({ item }) => <DistanceItem item={item}
                            pressuid={pressuid}
                            setPressuid={(uid) => { setPressuid(uid) }}
                            position = {item.position}
                        />}
                        ListEmptyComponent={
                            <View style={styles.emptyList}>
                            </View>
                        }
                    />
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.listContent}
                    numColumns={1}
                    data={history}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View>
                            <HistoryItem
                                distance={item.distance}
                                positions={item.positions}
                                steps={item.steps}
                                duration={item.duration}
                                time={item.time}
                                day={item.day}
                                date={item.date}
                                mode={item.mode}
                                id={item.id}
                                selfuid={uid}
                                userId = {item.userId}
                            />
                            <HistoryViewMap
                                positions={item.positions}
                            />
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyList}>
                            <IconButton icon="run" style={{ margin: 0 }} color={'#72767D'} size={height * 0.045} />
                            <Text style={styles.emptyText}>No Run History</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
    },
    friendlist: {
        height: height * 0.12,
        width: width,
        flexDirection: "row",
    },
    profilePicContainer: {
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: width,
        backgroundColor: '#4F535C',
        alignItems: 'center',
    },
    myProfile: {
        width: width * 0.2,
        backgroundColor: '#282B30',
    },
    content: {
        backgroundColor: "#282B30",
        height: height * 0.58,
        width: width,
    },
    list2: {
        width: width * 0.75,
        height: height * 0.145,
        //backgroundColor: 'red',
        backgroundColor: '#282B30'
    },
    emptyList: {
        width: width,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyText: {
        fontSize: 14,
        color: '#72767D'
    },
    listContent: {
        alignItems: 'center',
        paddingVertical: height * 0.01,
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
    nameText:{ 
        fontWeight: 'bold', 
        fontSize: 12, 
        color: '#FFFFFF', 
        textAlign:'center', 
 
    }, 
})