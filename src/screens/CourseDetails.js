import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import iconImage from "../../assets/arrow.png";
import Accordion from "../component/CourseComponent/Accordion";
import InstructorSlider from "../component/CourseComponent/InstructorSlider";
import CourseStudent from "../component/CourseComponent/CourseStudent";
import RelatedCourse from "../component/CourseComponent/RelatedCourse";

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

  const scheduleItems = [
    {
      icon: require("../../assets/course/class.png"),
      text: `${value.total_class} Class`,
    },
    {
      icon: require("../../assets/course/schedule.png"),
      text: `${value.total_class_hour} Class Hour`,
    },
    {
      icon: require("../../assets/course/hourglass.png"),
      text: `${value.hour_per_class} Hour / Class`,
    },
    {
      icon: require("../../assets/course/week.png"),
      text: `${value.class_per_week} Class / Week`,
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
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

          {/* Schedule items */}
          <Text style={styles.groupName}>Schedule</Text>
          <View style={styles.scheduleBox}>
            {scheduleItems.map((item, index) => (
              <View key={index} style={styles.schedule}>
                <Image style={styles.iconStyle} source={item.icon} />
                <Text style={[styles.iconText]}>{item.text}</Text>
              </View>
            ))}
          </View>

          {/* Course Instructors */}
          <InstructorSlider id={id} />

          {/* Course outcome */}
          <View style={styles.outcomeBox}>
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

          {/* Course Curriculum */}
          <View>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.groupName}>Course Curriculum </Text>
            </View>
            <Accordion
              title="Course Topic"
              content={
                <HTML
                  source={{ html: value.course_topic }}
                  contentWidth={windowWidth}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                    },
                    p: { fontSize: 16, lineHeight: 22 },
                  }}
                />
              }
              iconImage={iconImage}
            />

            <Accordion
              title="Requirements"
              content={
                <HTML
                  source={{ html: value.enrollment_requirement }}
                  contentWidth={windowWidth}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                    },
                    p: { fontSize: 16, lineHeight: 22 },
                  }}
                />
              }
              iconImage={iconImage}
            />

            <Accordion
              title="Achivements"
              content={
                <HTML
                  source={{ html: value.course_reward }}
                  contentWidth={windowWidth}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                    },
                    p: { fontSize: 16, lineHeight: 22 },
                  }}
                />
              }
              iconImage={iconImage}
            />

            <Accordion
              title="Course Responsibility"
              content={
                <HTML
                  source={{ html: value.course_responsibility }}
                  contentWidth={windowWidth}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                    },
                    p: { fontSize: 16, lineHeight: 22 },
                  }}
                />
              }
              iconImage={iconImage}
            />

            <Accordion
              title="Maximum Student"
              content={<Text>{value.max_student}</Text>}
              iconImage={iconImage}
            />

            <Accordion
              title="Disclaimer From Group"
              content={
                <HTML
                  source={{ html: value.disclaimer_from_group }}
                  contentWidth={windowWidth}
                  tagsStyles={{
                    h1: {
                      fontSize: 22,
                    },
                    p: { fontSize: 16, lineHeight: 22 },
                  }}
                />
              }
              iconImage={iconImage}
            />
          </View>
        </View>
        <View style={{ marginBottom: 80 }}>
          {/* List of Student */}
          <CourseStudent id={id} />
          {/* Related Course  */}
          <RelatedCourse id={id} navigation={navigation} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Text style={styles.price}> &#2547; 1000 </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Course")}
        >
          <Text style={styles.buttonText}> Buy this course </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// !todo style the course1 and make it uppercase

const styles = StyleSheet.create({
  courseContainer: {
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    textAlign: "center",
    borderRadius: 5,
    // shadowColor: "grey",
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

  scheduleBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  schedule: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iconStyle: {
    width: 28,
    height: 28,
  },

  iconText: {
    paddingLeft: 7,
    // fontSize: 14,
  },

  outcomeBox: {
    marginVertical: 20,
  },

  mainHeader: {
    fontSize: 22,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    // paddingTop: 10,
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    // paddingHorizontal: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
  },

  price: {
    // backgroundColor: "#344055",
    color: "#344055",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#eee",
    fontWeight: "500",
  },
});

export default CourseDetails;
