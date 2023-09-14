import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const MyGroup = ({navigation, userID}) =>{
 const [myGroups, setGroups] = useState([]);
 const isSmallScreen = Dimensions.get("window").width < 600; 
 const numColumns = isSmallScreen ? 2 : 2;
   
 
  const fetchMyCourses = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/group/${id}/my-groups`, {
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
      setGroups(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);


const showMyGroup = ({ item }) => {
    
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("GroupProfile", {
          groupID: item.id,
        })
      }
    >
     
        <Image source={{ uri: item.profile_pic }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>
            {item.about.length > 100 ? item.about.slice(0, 100) + "..." : item.about}
          </Text>
        </View>
    
    </TouchableOpacity>
  );
};

return(
   <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={myGroups}
        numColumns={numColumns}
        renderItem={showMyGroup}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
    )
}


const styles = StyleSheet.create({

  container: {
    // backgroundColor: 'white',
    margin: wp("2%"),
  },
  image: {
    width: "auto",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 5,
    height: hp("26.5%"),
    width: "48%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },

});

export default MyGroup;