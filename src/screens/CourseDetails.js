import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import UserData from "./UserData";

const CourseDetails = ({ navigation, route }) => {
  const [value, setValue] = useState({});
  const windowWidth = useWindowDimensions().width;

  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const id = route.params.courseId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://researchrider.xyz/course/single-course/${id}`
        );
        const data = await response.json();
        setValue(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const maxLength = 50;
  if (!value || !value.group_about) {
    return null;
  }

  const slicedText = value.group_about.slice(0, maxLength);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.courseContainer}>
          <View>
            <Image
              style={styles.cardImage}
              source={{ uri: value.cover_pic }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.mainHeader}>{value.name}</Text>
          <View style={styles.groupContainer}>
            <Image
              style={styles.groupLogo}
              source={{ uri: value.group_profile_pic }}
              resizeMode="contain"
            />
            <View style={styles.groupDescription}>
              <Text style={styles.groupName}>{value.group_name}</Text>
              <Text style={styles.subCourse}>{`${slicedText} ...`}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.groupName}>What will you Learn?</Text>

            <HTML
              source={{ html: value.course_outcome }}
              contentWidth={windowWidth}
              tagsStyles={{
                h1: {
                  fontSize: 22,
                },
                p: { fontSize: 16, lineHeight: 22 },
              }}
            />
          </View>

          <Text style={[styles.description, styles.subCourse]}>
            {value.group_name}
          </Text>

          <Text style={[styles.description, styles.subCourse]}>
            {value.group_name}
          </Text>

          <View style={styles.buttonContainer}>
            <Text style={styles.price}>1000/- </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate("Course")}
            >
              <Text style={styles.buttonText}> Join Now </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <UserData />
    </ScrollView>
  );
};

// !todo style the course1 and make it uppercase

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  courseContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    textAlign: "center",
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 20,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "start",
    marginVertical: 10,
  },
  groupName: {
    fontSize: 18,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    color: "#344055",
  },

  cardImage: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1.5,
    // resizeMode: "contain",
  },
  groupLogo: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 70,
  },

  mainHeader: {
    fontSize: 22,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    paddingTop: 10,
    paddingBottom: 15,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
  },

  subHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    paddingBottom: 15,

    textAlign: "center",
  },

  groupDescription: {
    fontSize: 16,
    color: "#7d7d7d",
    paddingBottom: 25,
    lineHeight: 20,
    paddingLeft: 10,
  },

  description: {
    textAlign: "justify",
    fontSize: 16,
    color: "#7d7d7d",
    lineHeight: 20,
    marginTop: 10,
  },
  subCourse: {
    color: "#344055",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  price: {
    backgroundColor: "#344055",
    color: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    fontSize: 20,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#809fff",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#eee",
  },
});

export default CourseDetails;
