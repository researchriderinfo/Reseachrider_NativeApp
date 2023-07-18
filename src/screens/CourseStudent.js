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
      console.log({ realData });
      setMyData(realData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getCourseStudent();
  }, []);

  // render the students cards
  const showUserData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgStyle}
            source={{ uri: item.student_profile_pic }}
          />
        </View>

        <View>
          <View style={styles.mainContain}>
            <Text style={styles.myName}> {item.student_first_name} </Text>
            <Text style={styles.myName}> {item.student_profession} </Text>
            <Text style={styles.myName}>
              {item.student_academic_discipline}
            </Text>
            <Text style={styles.myName}>{item.student_organization}</Text>
          </View>
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
  mainContainer: {
    width: "100%",
    minHeight: "100%",
    paddingVertical: 50,
    backgroundColor: "#ebedee",
    elevation: 8,
  },
  card: {
    width: 250,
    // height: 350,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  bioDataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#353535",
    paddingVertical: 10,
  },
  idNumber: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.5)",
    paddingRight: 10,
  },
  bioData: {
    fontSize: 30,
    color: "#fff",
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    paddingLeft: 20,
    paddingVertical: 10,
    textTransform: "uppercase",
  },
  imgContainer: {
    padding: 10,
  },
  imgStyle: {
    width: 120,
    height: 120,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 100,
  },
  mainContain: {
    padding: 10,
    // backgroundColor: "#353535",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 20,
  },
  myName: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
    alignSelf: "flex-start",
    textTransform: "capitalize",
  },
});

export default CourseStudent;
