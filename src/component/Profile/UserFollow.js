import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const UserFollow = ({groupID, navigation}) =>{
    const [following, setFollowing] = useState([]);
    const [noFollowing, setNofollowing] = useState([]);

    const isSmallScreen = Dimensions.get("window").width < 600; 
    const numColumns = isSmallScreen ? 2 : 3;


    useEffect(() => {
         const fetchFollow = async () => {
        try {
        const auth_token = await AsyncStorage.getItem('auth_token');
 
        if (!auth_token) {
            console.log('User data or auth token is missing in AsyncStorage.');
            return;
        }

        const response = await fetch(`https://researchrider.xyz/api/follow/list/`, {
            method: 'GET',
            headers: {
            Authorization: `Token ${auth_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Error fetching course data:', response.status);
            return;
        }

        const data = await response.json();
        if (data.length === 0) {
            setNofollowing("No Following Available");
            } else {
            setFollowing(data[0].followings);
            }
        } catch (error) {
        console.log('Error reading data from AsyncStorage:', error);
        }
     };
        fetchFollow();
    }, []);



    const showFollow = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("userProfile", {
          userID: item.id,
        })
      }
    >
      {item.profile_pic ?  
        <Image style={styles.imgStyle} source={{ uri: item.profile_pic }} />  :  
        <Image style={styles.iconStyle} source={require("../../../assets/user.png")}/>}
            <Text>{item.first_name.length > 20 ? item.first_name.slice(0, 20) + "..." : item.first_name}</Text>
            {item.organization &&  <Text style={styles.bioData}> {item.organization.length > 20 ? item.organization.slice(0, 20) + "..." : item.organization}</Text>}
            <Text style={styles.bioData}> {item.profession}</Text>
     
  
    </TouchableOpacity>
  );

    
    return(
        <View  style={styles.container}>
            <FlatList
            data={following}
            numColumns={numColumns}
            renderItem={showFollow}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
    card: {
    // flex: 1,
    margin: wp("1.5%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    height: hp("20%"),
    width: "47%",
    borderWidth: 0.5,
    borderColor: "#e5e7eb", 
  },
  imgStyle: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 100,
  },
  iconStyle:{
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 100,
  },
  bioData:{
     color: "gray"
  },
})
export default UserFollow