import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Carousel from "../component/Carousel";
import { useNavigation } from "@react-navigation/native";

const Home = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <Carousel />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>LOGIN / SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contain: {
    marginTop: 80,
  },

  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    textAlign: "center",
  },

  menuStyle: {
    marginVertical: 20,
  },

  buttonContainer: {
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: "#809fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#eee",
    textTransform: "uppercase",
  },
});
