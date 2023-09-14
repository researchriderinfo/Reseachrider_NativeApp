import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
  import AppLoading from "expo-app-loading";
import Btn from "../component/Btn";
import { darkGreen } from "../component/Constants";
import { useNavigation } from "@react-navigation/native";

  const Verification = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
      Nunito_700Bold,
    });
  
    if (!fontsLoaded) {
      <AppLoading />;
    }
  
    const handleToken = () => {
        fetch(`https://researchrider.xyz/user/verify-otp`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: verificationCode,
            success: true,
          }),
        })
          .then((response) => {
            response.json();
            console.log(response)
            if (response.status === 404) {
              Alert.alert("Invalid PIN.Please try again");
            } else if (response.status === 500) {
              Alert.alert("Please, Enter the Valid PIN");
            } else if (response.status === 200) {
              Alert.alert("You Email Is Verified");
              navigation.navigate("Login"); 
            }
          })
          .catch((error) => console.log(error));
      };
  
    return (
      <View style={styles.container}>
        <View style={styles.brandContainer}>
        <Image
            style={styles.logoImg}
            source={require("../../assets/Logo.png")}
          />
        </View>

        <Image
            style={styles.logo}
            source={require("../../assets/check.png")}
          />
        <Text style={styles.mainHeader}>Verify your Email Address</Text>
        <Text>A verification code has been send, please check your inbox, spam or promotion folder and enter the verification code below to verify you email address.
        </Text>
        <Text>If you miss to verify the verification code. Please try to login the same email address.</Text>

        <TextInput
        style={styles.input}
        placeholder="ENTER VERIFICATION CODE"
        value={verificationCode}
        onChangeText={setVerificationCode}
         />

        <TouchableOpacity
        onPress={handleToken}
        style={styles.btn}
        >
        <Text style={styles.btnTxt}>
        submit
        </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
       flex: 1,
    //    justifyContent: "center",
       alignItems: 'center',
       padding: 20
      },
      brandContainer:{
        backgroundColor: 'blue',
        width: '100%',
       
           justifyContent: "center",
           alignItems: 'center',
      },
      logoImg:{
        width: 250,
        height: 150,
      },
      logo:{
        width: 50,
        height: 50,
        marginVertical: 40
      },
      mainHeader:{
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
        
      },
      input:{
        padding: 7,
        borderRadius: 10,
        paddingHorizontal: 12,
        width: "50%",
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 30,
      },
      btn:{
        backgroundColor: darkGreen,
        width: 100,
        alignItems: "center",
        padding: 8,
        marginBottom: 10,
        fontSize: 14,
        borderRadius: 100, 
      },
      btnTxt:{
        color: "white", fontSize: 14, fontWeight: "bold", textTransform: 'uppercase'
      }
  });
  
  export default Verification;
  