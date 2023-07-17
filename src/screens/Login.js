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

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const login = () => {
    Alert.alert("LOGIN", `E-mail: ${email}, Password: ${password}`);
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Course")}
          >
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
    width: 350,
    paddingVertical: 10,
    marginVertical: 10,
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
