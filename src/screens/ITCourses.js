import { Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ITCourses = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const [isLoaded, setIsLoaded] = useState(true);
  const [myData, setMyData] = useState([]);

  const getUserData = async () => {
    try {
      const response = await fetch("https://researchrider.xyz/course/all/");
      const realData = await response.json();
      const freelancing = realData.filter(
        (item) => item.category_name === "Computer Science & Engineering"
      );
      setMyData(freelancing);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // render the students cards
  const showUserData = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("CourseDetails", {
            courseId: item.id,
          })
        }
      >
        <View style={styles.imgContainer}>
          <Image style={styles.imgStyle} source={{ uri: item.cover_pic }} />
        </View>

        <View>
          <View style={styles.bioDataContainer}>
            <Text style={styles.bioData}>
              {`${item.name.slice(0,16)} ...`}
            </Text>
          </View>
          <Text style={styles.feeStyles}> &#2547; {item.enrollment_fee}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Skills & IT Courses</Text>
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
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  card: {
    width: 150,
    height: 180,
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
    paddingVertical: 10,
  },
  bioData: {
    fontSize: 14,
    fontWeight: "bold",
  },
  mainHeader: {
    fontSize: 16,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    paddingLeft: 15,
    paddingVertical: 10,
    textTransform: "uppercase",
  },
  imgContainer: {
    padding: 0,
  },
  imgStyle: {
    width: "100%",
    height: 100,
    borderRadius: 4,
  },
  feeStyles: {
    color: "green",
    fontWeight: "bold",
  },
});

export default ITCourses;
