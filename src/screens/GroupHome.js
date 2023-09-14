import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const GroupHome = ({navigation}) =>{

  const [allGroups, setAllGroups] = useState([]);
  const isSmallScreen = Dimensions.get("window").width < 600; 
  const numColumns = isSmallScreen ? 2 : 2;



 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://researchrider.xyz/group/all-groups/");
        const data = await response.json();
        setAllGroups(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const showAllGroup = ({ item }) => {
    
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("GroupProfile", {
          groupID: item.id,
        })
      }
    >
      <View>
        <Image source={{ uri: item.cover_pic }} style={styles.image} />
        <View style={styles.contentContainer}>
        <View style={styles.profile}>
            <Image
            style={styles.groupLogo}
            source={{ uri: item.profile_pic }}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.name.length > 15 ? item.name.slice(0,15) + "..." : item.name}</Text>
        </View>
          <Text style={styles.description}>
            {item.about.length > 70 ? item.about.slice(0, 70) + "..." : item.about}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

    return(
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={allGroups}
        numColumns={numColumns}
        renderItem={showAllGroup}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
    )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    // marginBottom: 16,
  },
  image: {
    width: "auto",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  contentContainer: {
    padding: 12,
  },
  profile:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContent: {
    flexGrow: 1,
  },
  card: {
// Remove flex: 1
    margin: wp("1%"),
    height: hp("30%"),
    width: "48%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    // marginBottom: 16,
  },

    groupLogo: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 70,
    marginRight: 5
  },


});
export default GroupHome;