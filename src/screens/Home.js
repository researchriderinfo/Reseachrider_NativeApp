import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../component/Carousel";

const Home = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log({isLoggedIn});

  useLayoutEffect(() => {
    const checkLoginStatusAndNavigate = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('auth_token');
        if (userInfo !== null && userInfo !== 'undefined') {
          setIsLoggedIn(true);
          navigation.navigate('Course');
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };

    checkLoginStatusAndNavigate();
  }, []);

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
