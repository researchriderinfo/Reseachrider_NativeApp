import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { darkGreen } from "../component/Constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();


 // Token Check Function
  const login = () => {

    fetch(`https://researchrider.xyz/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.is_active) {
                    // Save user data to AsyncStorage
                    AsyncStorage.setItem("id", data.data.id.toString());
                    AsyncStorage.setItem("first_name", data.data.first_name);
                    AsyncStorage.setItem("last_name", data.data.last_name);
                    AsyncStorage.setItem("email", data.data.email);
                    AsyncStorage.setItem("auth_token", data.data.token);
          // Handle successful login
          navigation.navigate("Course"); 
        } else {
          // Handle login failure
          Alert.alert("Login Failed", "Invalid email or password.");
        }
      })
      .catch((error) => {
        // Handle error
        Alert.alert("Error", "An error occurred. Please try again later.");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.logoImg}
            source={require("../../assets/login.png")}
          />
          <Text style={styles.tagLine}>Grow up Being a Researcher</Text>
        </View>

        <View
          style={{
            backgroundColor: "gray",
            borderTopLeftRadius: 130,
            paddingTop: 80,
            paddingBottom: 50,
          }}
        >
          <TextInput
            value={email}
            style={styles.input}
            placeholder="E-mail"
            onChangeText={(userText) => setEmail(userText)}
            keyboardType="email-address"
          />

          <TextInput
            value={password}
            style={styles.input}
            placeholder="Password"
            onChangeText={(userPass) => setPassword(userPass)}
            keyboardType="visible-password"
            secureTextEntry={true}
          />

          <Text style={styles.password}>Forgot password?</Text>


          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={{ color: "white", fontSize: 16 }}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              CREATE NEW ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(0, 126, 220)",
    zIndex: 2,
  },

  image: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  logoImg: {
    width: 170,
    height: 140,
    aspectRatio: 2.3,
    resizeMode: "cover",
  },

  input: {
    padding: 8,
    paddingLeft: 20,
    marginRight: 30,
    marginLeft: 30,
    fontSize: 16,
    borderRadius: 100,
    color: darkGreen,
    paddingHorizontal: 10,
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0D2481",
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 14,
    borderRadius: 100,
    paddingVertical: 10,
    marginVertical: 10,
    fontWeight: "bold"
  },
  tagLine: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  password: {
    color: "white",
    alignSelf: "flex-end",
    padding: 2,
    margin: 10,
    textDecorationLine: "underline",
    marginRight: 30,
  },
});

export default Login;
