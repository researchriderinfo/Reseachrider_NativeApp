import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AsStudent = ({ navigation}) =>{
    const [course, setCourse] = useState([]);
    const isSmallScreen = Dimensions.get("window").width < 600; 
    const numColumns = isSmallScreen ? 2 : 3;


    const fetchMyCourses = async () => {
        try {
        const auth_token = await AsyncStorage.getItem('auth_token');
        const id = await AsyncStorage.getItem('id');

        if (!auth_token || !id) {
            console.log('User data or auth token is missing in AsyncStorage.');
            return;
        }

        const response = await fetch(`https://researchrider.xyz/course/enrollment/all/`, {
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
        setCourse(data);
        } catch (error) {
        console.log('Error reading data from AsyncStorage:', error);
        }
     };

    useEffect(() => {
        fetchMyCourses();
    }, []);

  

  const showAllCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CourseDetails", {
          courseId: item.course,
        })
      }
    >
      <View style={styles.contentBox}>
        <Image style={styles.imgStyle} source={{ uri: item.course_cover_pic }} />
         <View style={styles.bioDataContainer}>
          <Text style={styles.bioData}> {`${item.course_name.slice(0, 21)} ...`}</Text>
        
          {item.is_paid ? <Text style={styles.paid}>PAID</Text> :   <Text style={styles.unpaid}> NOT PAID</Text> }
        </View>
      </View>
  
    </TouchableOpacity>
  );

    return(
        <View style={styles.container}>
            <FlatList
            data={course}
            numColumns={numColumns}
            renderItem={showAllCourse}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  contentBox:{
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
   
  },
  card: {
    flex: 1,
    margin: wp("1.5%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    height: hp("20%"),
    // marginBottom: 20
  },
 imgStyle: {
    width: 180,
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  bioDataContainer: {
    paddingVertical: 10,
  },
  bioData: {
    fontSize: 14,
    fontWeight: "bold",
  },
  paid: {
    color: "green",
    fontWeight: "bold",
    paddingLeft: 5
  },
  unpaid: {
    color: "red",
    fontWeight: "bold",
  },
  button:{
    backgroundColor: "green",
    width: 165,
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    fontSize: 14,
    borderRadius: 100, 
  }, 
  approveBtn:{
    backgroundColor: "red",
    width: 165,
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    fontSize: 14,
    borderRadius: 100, 
  },
  btnText:{
    color: "#fff", 
    fontSize: 14, 
    ontWeight: "bold", 
    textTransform: 'uppercase'
  }
})

export default AsStudent;