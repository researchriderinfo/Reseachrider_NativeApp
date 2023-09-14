import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AllCourse = ({ navigation, route }) => {
  const [value, setValue] = useState([]);
  //  const [numColumns, setNumColumns] = useState(3);
   const isSmallScreen = Dimensions.get("window").width < 600; 
    const numColumns = isSmallScreen ? 2 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://researchrider.xyz/course/all/");
        const data = await response.json();
        setValue(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CourseDetails", {
          courseId: item.id,
        })
      }
    >
      <View>
        <Image style={styles.imgStyle} source={{ uri: item.cover_pic }} />
         <View style={styles.bioDataContainer}>
          <Text style={styles.bioData}> {`${item.name.slice(0, 20)} ...`}</Text>
        </View>
        <Text style={styles.feeStyles}> &#2547; {item.enrollment_fee}</Text>
      </View>
  
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>All Courses</Text>
      <FlatList
        data={value}
        numColumns={numColumns}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
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
    margin: wp("2%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    height: hp("20%"),
  },
  mainHeader: {
    fontSize: 16,
    color: "#344055",
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
    paddingLeft: 20,
    paddingVertical: 10,
    textTransform: "uppercase",
  },
  bioDataContainer: {
    paddingVertical: 10,
  },
  bioData: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imgStyle: {
    width: 180,
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  feeStyles: {
    color: "green",
    fontWeight: "bold",
  },
});

export default AllCourse;
