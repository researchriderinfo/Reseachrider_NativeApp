import { Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const InstructorSlider = ({ id }) => {
  
useEffect(() => {
  async function prepare() {
    // Prevent the splash screen from hiding
    await SplashScreen.preventAutoHideAsync();

   const [fontsLoaded] = useFonts({
      Nunito_700Bold,
    });

    if (!fontsLoaded) {
       return null; 
    }
    await SplashScreen.hideAsync();
  }
  
  prepare();
}, []);

  // const [isLoaded, setIsLoaded] = useState(true);
  const [instructors, setInstructors] = useState([]);

  const getInstructorSlider = async () => {
    try {
      const response = await fetch(
        `https://researchrider.xyz/course/${id}/teachers/`
      );
      const realData = await response.json();
      setInstructors(realData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstructorSlider();
  }, []);

  // render the students cards
  const showUserData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          {item.profile_pic ? (
            <Image style={styles.imgStyle} source={{ uri: item.profile_pic }} />
          ) : (
            <Image
              style={styles.imgStyle}
              source={require("../../../assets/user.png")}
            />
          )}
        </View>

        <View style={styles.mainContain}>
          {item.first_name && (
            <Text style={styles.myName}> {item.first_name} </Text>
          )}

          {item.profession && (
            <Text style={styles.myName}> {item.profession} </Text>
          )}

          {item.academic_discipline && (
            <Text style={styles.myName}>{item.academic_discipline}</Text>
          )}
          <Text style={styles.myName}>
            {item.organization ? `${item.organization.slice(0, 20)}...` : ""}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.mainHeader}>Course Instructors</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={instructors}
        renderItem={showUserData}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 0.5,
    marginBottom: 10,
  },

  mainHeader: {
    fontSize: 18,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    // paddingLeft: 20,
    paddingVertical: 20,
  },
  imgContainer: {
    padding: 10,
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 100,
  },
  mainContain: {
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  myName: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
    alignSelf: "center",
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default InstructorSlider;
