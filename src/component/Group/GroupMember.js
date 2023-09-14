import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const GroupMember = ({groupID, navigation}) =>{
    const [members, setMembers] = useState([]);

    const isSmallScreen = Dimensions.get("window").width < 600; 
    const numColumns = isSmallScreen ? 2 : 3;


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://researchrider.xyz/group/${groupID}/members`
          );
          const data = await response.json();
          setMembers(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [groupID]);



    const showMembers = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
    //   onPress={() =>
    //     navigation.navigate("CourseDetails", {
    //       courseId: item.id,
    //     })
    //   }
    >
      {item.profile_pic ?  
        <Image style={styles.imgStyle} source={{ uri: item.profile_pic }} />  :  
        <Image style={styles.iconStyle} source={require("../../../assets/user.png")}/>}
            <Text style={styles.bioData}>{item.first_name.length > 20 ? item.first_name.slice(0, 20) + "..." : item.first_name}</Text>
            <Text style={styles.bioData}> {item.academic_discipline}</Text>
            <Text style={styles.bioData}> {item.profession}</Text>
     
  
    </TouchableOpacity>
  );

    
    return(
        <View  style={styles.container}>
            <FlatList
            data={members}
            numColumns={numColumns}
            renderItem={showMembers}
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
     width: "30%",
    borderWidth: 0.5,
    borderColor: "#e5e7eb", 
  },
  imgStyle: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 100,
  },
  bioDataContainer:{
    textAlign: 'center',
    padding: 5
  },
  iconStyle:{
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 100,
  }
})
export default GroupMember