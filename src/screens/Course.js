import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import Menu from "../component/Menu";
import CourseCategorys from "./CourseCategorys";
import FreelancingCourses from "./FreelancingCourses";
import ITCourses from "./ITCourses";
import ProfessionalCourse from "./ProfessionalCourse";
import AllCourse from "./AllCourse";

const Course = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentContainer}
        contentContainerStyle={styles.listContentContainer}
        data={[
          {
            key: "courseCategorys",
            component: <CourseCategorys navigation={navigation} />,
          },
          {
            key: "professionalCourse",
            component: <ProfessionalCourse navigation={navigation} />,
          },
          {
            key: "freelancingCourses",
            component: <FreelancingCourses navigation={navigation} />,
          },
          {
            key: "itCourses",
            component: <ITCourses navigation={navigation} />,
          },
          {
            key: "allCourse",
            component: <AllCourse navigation={navigation} route={route} />,
          },
        ]}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  listContentContainer: {
    paddingBottom: 80,
  },
  menuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
});

export default Course;
