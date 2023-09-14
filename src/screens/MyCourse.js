import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const MyCoursesComponent = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);

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
      const userCourses = data.filter((d) => d.student === +id);
      setMyCourses(userCourses);
      setLoading(false);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);


  const showMyCourse = ({item}) =>{
    return(
        <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("CourseDetails", {
            courseId: item.course,
          })
        }
      >
          <View>
            <Image style={styles.imgStyle} source={{ uri: item.course_cover_pic }} />
           <View style={styles.bioDataContainer}>
             <Text style={styles.bioData}>
              {`${item.course_name.slice(0, 30)} ...`}
            </Text>
           
             {item.is_paid ? 
               <Text style={styles.paidStatus}>Enrolled</Text> : 
               <Text style={styles.unpaidStatus}>Complete your payment</Text>
            }
           </View>
          </View>
        
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={myCourses}
        renderItem={showMyCourse}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContent: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    margin: 5, 
    justifyContent: "center",
    alignItems: "center",
    height: hp("21%"),
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },

  bioData: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10
  },
  imgStyle: {
    width: "auto",
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  paidStatus: {
    color: "green",
    backgroundColor: '#d2f8d2',
    borderRadius: 50,
    paddingLeft : 10,
    padding: 2
  },
  unpaidStatus:{
    color: "#f75d59",
    backgroundColor: '#ffe8ed',
    borderRadius: 50,
    paddingLeft : 10,
    padding: 2
  },
  bioDataContainer:{
    padding: 3
  }
})

export default MyCoursesComponent;





