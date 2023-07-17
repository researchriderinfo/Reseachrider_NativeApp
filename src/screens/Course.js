import { StyleSheet, ScrollView, FlatList } from "react-native";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import Menu from "../component/Menu";
import CourseCategorys from "./CourseCategorys";
import FreelancingCourses from "./FreelancingCourses";
import ITCourses from "./ITCourses";
import ProfessionalCourse from "./ProfessionalCourse";
import AllCourse from "./AllCourse";

const Course = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <>
          <CourseCategorys />
          <ProfessionalCourse navigation={navigation} />
          <FreelancingCourses navigation={navigation} />
          <ITCourses navigation={navigation} />
          <AllCourse navigation={navigation} />
          <Menu />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default Course;
