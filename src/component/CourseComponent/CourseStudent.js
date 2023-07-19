import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

const CourseStudent = ({ id }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const [isLoaded, setIsLoaded] = useState(true);
  const [myData, setMyData] = useState([]);

  const getCourseStudent = async () => {
    try {
      const response = await fetch(
        `https://researchrider.xyz/course/${id}/enrollment/payment-all`
      );
      const realData = await response.json();
      setMyData(realData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseStudent();
  }, []);

  // render the students cards
  const showUserData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          {item.student_profile_pic ? (
            <Image
              style={styles.imgStyle}
              source={{ uri: item.student_profile_pic }}
            />
          ) : (
            <Image
              style={styles.imgStyle}
              source={require("../../../assets/user.png")}
            />
          )}
        </View>

        <View style={styles.mainContain}>
          {item.student_first_name && (
            <Text style={styles.myName}> {item.student_first_name} </Text>
          )}

          {item.student_profession && (
            <Text style={styles.myName}> {item.student_profession} </Text>
          )}

          {item.student_academic_discipline && (
            <Text style={styles.myName}>
              {item.student_academic_discipline}
            </Text>
          )}
          <Text style={styles.myName}>
            {item.student_organization
              ? `${item.student_organization.slice(0, 20)}...`
              : ""}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.mainHeader}>List of Students</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={myData}
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
    // elevation: 0.1,
  },

  mainHeader: {
    fontSize: 18,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    paddingLeft: 10,
    paddingVertical: 10,
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

export default CourseStudent;
