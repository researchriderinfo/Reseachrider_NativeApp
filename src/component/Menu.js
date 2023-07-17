import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.iconStyle}
          source={require("../../assets/home.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Course")}
      >
        <Image
          style={styles.iconStyle}
          source={require("../../assets/course.png")}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Group")}
      >
        <Image
          style={styles.iconStyle}
          source={require("../../assets/group.png")}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("About")}
      >
        <Image
          style={styles.iconStyle}
          source={require("../../assets/about.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },

  iconStyle: {
    width: "100%",
    height: 25,
    aspectRatio: 1,
  },
});
