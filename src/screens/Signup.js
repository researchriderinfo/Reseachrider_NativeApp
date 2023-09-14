import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Field from "../component/Field";
import Btn from "../component/Btn";
import { darkGreen } from "../component/Constants";
import { RadioButton } from "react-native-paper";


const Signup = () => {
  const navigation = useNavigation();

  // State variables to store the field values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [acaDiscipline, setAcaDiscipline] = useState("");
  const [institution, setInstitution] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState("male");

 

  // Function to toggle the visibility of the date picker
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  // Function to handle date selection
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setShowPicker(Platform.OS === "ios");
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"

      // Set the state variables for year, month, and day 
      setYearOfBirth(currentDate.getFullYear().toString());
      setMonthOfBirth((currentDate.getMonth() + 1).toString());
      setDayOfBirth(currentDate.getDate().toString());
  
      // Set the dateOfBirth state to the formattedDate
      setDateOfBirth(formattedDate);
    } else {
      setShowPicker(Platform.OS === "ios");
    }
  };


  const registrationHeader = {
    // mode: 'no-cors',
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: fullName,
      last_name: contactNumber,
      // mobile_no: 0 + phone,
      email: email,
      profession: profession,
      password: password,
      confirmPassword: confirmPassword,
      organization: institution,
      academic_discipline: acaDiscipline,
      birthdate: dateOfBirth,
      gender: gender,
    }),
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    fetch(`https://researchrider.xyz/user/registration`, registrationHeader)
      .then((response) => {
        navigation.navigate("verification"); 
        if (response.status === 201) {
          Alert.alert("Done");
        } else {
          Alert.alert(`${response.statusText} ${response.status}`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.subheading}>Create a new account</Text>
        <Field placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <Field
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Field placeholder="Profession" value={profession} onChangeText={setProfession} />
        <Field
          placeholder="Academic Discipline"
          value={acaDiscipline}
          onChangeText={setAcaDiscipline}
        />
        <Field placeholder="Institution" value={institution} onChangeText={setInstitution} />
     
        <Field
          placeholder="Contact Number"
          keyboardType="numeric"
          value={contactNumber}
          onChangeText={setContactNumber}
        />
        <Field
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Field
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.dateInputContainer}>
          <Field
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            editable={false}
            style={styles.dateInputField}
          />
          <TouchableOpacity style={styles.dateIcon} onPress={toggleDatepicker}>
            {/* Customize the date icon */}
            <Text>📅</Text>
          </TouchableOpacity>
        </View>



      {/* Gender selection */}

          <View style={styles.genderSelection}>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="male"
                  status={gender === "male" ? "checked" : "unchecked"}
                  onPress={() => setGender("male")}
                />
                <Text style={styles.radioLabel}>Male</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="female"
                  status={gender === "female" ? "checked" : "unchecked"}
                  onPress={() => setGender("female")}
                />
                <Text style={styles.radioLabel}>Female</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="other"
                  status={gender === "other" ? "checked" : "unchecked"}
                  onPress={() => setGender("other")}
                />
                <Text style={styles.radioLabel}>Other</Text>
              </View>
            </View>
          </View>


        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By signing in, you agree to our</Text>
          <Text style={[styles.termsText, styles.termsLink]}>Terms & Conditions</Text>
        </View>
        <View style={styles.privacyContainer}>
          <Text style={styles.termsText}>and</Text>
          <Text style={[styles.termsText, styles.termsLink]}>Privacy Policy</Text>
        </View>
        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Signup"
          Press={(e) => {
            handleRegistration(e)
          }}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginText, styles.loginLink]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={date}
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 40
  },
  formContainer: {
    backgroundColor: "white",
    width: '90%',
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    borderTopLeftRadius: 130,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "gray",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "78%",
  },
  dateInputField: {
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  dateIcon: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: "rgb(220, 220, 220)",
    borderRadius: 100,
  },
  termsContainer: {
    flexDirection: "row",
    width: "78%",
    paddingRight: 16,
  },

  genderSelection:{
    width: "78%",
    paddingTop: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    width: "78%",
    paddingRight: 16,
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  loginLink: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
 
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default Signup;
