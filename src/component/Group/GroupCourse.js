import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const GroupCourse = ({ groupID, navigation }) => {
  const [courses, setCourses] = useState("");
  const isSmallScreen = Dimensions.get("window").width < 600;
  const numColumns = isSmallScreen ? 2 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://researchrider.xyz/course/${groupID}/all/`
        );
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [groupID]);



  const showAllCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CourseDetails", {
          courseId: item.id,
        })
      }
    >
      <View style={styles.contentBox}>
        <Image style={styles.imgStyle} source={{ uri: item.cover_pic }} />
        <View style={styles.bioDataContainer}>
          <Text style={styles.bioData}> {`${item.name.slice(0, 21)} ...`}</Text>
          <Text style={styles.feeStyles}> &#2547; {item.enrollment_fee}</Text>
        </View>

      </View>

    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        numColumns={numColumns}
        renderItem={showAllCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  card: {
    // flex: 1,
    margin: wp("1.5%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "flex-start",
    height: hp("20%"),
  },
  contentBox: {
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,

  },
  imgStyle: {
    width: 180,
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  bioDataContainer: {
    paddingVertical: 10,
  },
  bioData: {
    fontSize: 14,
    fontWeight: "bold",
  },
  feeStyles: {
    color: "green",
    fontWeight: "bold",
  },
})

export default GroupCourse;