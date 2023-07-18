import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Field from "../component/Field";
import Btn from "../component/Btn";
import { darkGreen } from "../component/Constants";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.subheading}>Create a new account</Text>
        <View style={styles.formContainer}>
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field placeholder="Email / Username" keyboardType="email-address" />
          <Field placeholder="Contact Number" keyboardType="numeric" />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing in, you agree to our
            </Text>
            <Text style={[styles.termsText, styles.termsLink]}>
              Terms & Conditions
            </Text>
          </View>
          <View style={styles.privacyContainer}>
            <Text style={styles.termsText}>and</Text>
            <Text style={[styles.termsText, styles.termsLink]}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              alert("Account created");
              props.navigation.navigate("Login");
            }}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.loginText, styles.loginLink]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  heading: {
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 20,
  },
  subheading: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: "center",
  },
  termsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "78%",
    paddingRight: 16,
  },
  termsText: {
    color: "grey",
    fontSize: 16,
    paddingLeft: 5,
  },
  termsLink: {
    color: darkGreen,
    fontWeight: "bold",
  },
  privacyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "78%",
    paddingRight: 16,
    marginBottom: 10,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Signup;
