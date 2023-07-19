import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

const CourseCategorys = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const courseCategories = [
    {
      id: 1,
      name: "Skils & IT Courses",
      image: require("../../assets/course/skill.png"),
      categroy: "Computer Science & Engineering",
    },
    {
      id: 2,
      name: "Freelancing Courses",
      image: require("../../assets/course/self-employed.png"),
      categroy: "Freelancing",
    },
    {
      id: 3,
      name: "Professional Courses",
      image: require("../../assets/course/professionals.png"),
      categroy: "professional",
    },
    {
      id: 4,
      name: "Education Courses",
      image: require("../../assets/course/reading.png"),
      categroy: "Education",
    },
    {
      id: 5,
      name: "All Course",
      image: require("../../assets/course/two.png"),
      categroy: "ok",
    },
  ];

  // render the course category cards
  const showCategoryData = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("AllCourse", {
            categroy: item.categroy,
          })
        }
      >
        <View style={styles.imgContainer}>
          <Image style={styles.imgStyle} source={item.image} />
        </View>

        <View style={styles.bioDataContainer}>
          <Text style={styles.bioData}> {item.name.slice(0, 20)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Explore course categories</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseCategories}
        renderItem={showCategoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    paddingVertical: 0,
    paddingBottom: 20,
    marginBottom: 10,
  },

  card: {
    width: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  bioDataContainer: {
    width: "100%",
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  bioData: {
    fontSize: 12,
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
    padding: 10,
  },
  imgStyle: {
    width: 50,
    height: 50,
  },
});

export default CourseCategorys;
