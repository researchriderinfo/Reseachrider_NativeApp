import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
  } from "react-native";
  import { WebView } from "react-native-webview"; // Import from react-native-webview
  import React, { useState, useEffect } from "react";
  import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
  import AppLoading from "expo-app-loading";
  import { RadioButton } from "react-native-paper";
  import { darkGreen } from "../component/Constants";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";

  const Payment = ({ navigation, route }) => {
    const [bkashURL, setBkashURL] = useState("");
    const [showWebView, setShowWebView] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [manualPaymentInput, setManualPaymentInput] = useState(""); 
    const [value, setValue] = useState({});
    const [userID, setUserID]= useState("");
    const [userInfo, setUserInfo] = useState("");
    const id = route.params.courseId;

    let [fontsLoaded] = useFonts({
      Nunito_700Bold,
    });
  
    if (!fontsLoaded) {
      <AppLoading />;
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://researchrider.xyz/course/single-course/${id}`
          );
          const data = await response.json();
          setValue(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const id = await AsyncStorage.getItem("id");
          const auth_token = await AsyncStorage.getItem("auth_token");
  
          // Check if the required data is missing
          if (!id || !auth_token) {
            console.log("User data or auth token is missing in AsyncStorage.");
            return;
          }
           // Set the id state variable
           setUserID(id);
  
          // Make the API call
          fetch(`https://researchrider.xyz/user/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Token ${auth_token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUserInfo(data)
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } catch (error) {
          console.log("Error reading data from AsyncStorage:", error);
        }
      };
  
      fetchUserData();
    }, [userID]);


    const BkashAPICall = () => {

      const requestBody = {
        email: userInfo.email,
        name: userInfo.first_name,
        courseID: id,
        courseName: value.name,
        image: value.cover_pic,
        amount: value.enrollment_fee,
        phone: userInfo.mobile_no,
      };
      console.log(requestBody)
      axios
        .post("https://researchrider-com.onrender.com/api/bkash/create", requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.bkashURL)
          if (id && response?.data?.bkashURL) {
            setBkashURL(response.data.bkashURL);
            setShowWebView(true);
          }
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    };

    const ManualPayment = () =>{
      console.log("hit maula")
    }
    return (
      <View style={styles.mainContainer}>


    {showWebView ? (
      <WebView
        source={{ uri: bkashURL }}
      />
    ): <>
    
    <View style={styles.stepperContainer}>
        <View style={styles.orderContainer}>
        <Image style={styles.confirmIcon} source={require("../../assets/accept.png")}/>
          <Text style={{fontWeight: 'bold', color: 'gray'}}>Order Confirmation</Text>
        </View>
        <View style={styles.middleBorder}/>
        <View style={styles.orderContainer}>
          <Image style={styles.confirmIcon} source={require("../../assets/digital-wallet.png")}/>
          <Text style={{fontWeight: 'bold', color: 'green'}}>Payment</Text>
        </View>
      </View>

      <View style={styles.courseConatiner}>
          <Text style={styles.paymentHeader}>Payment Details </Text>
          <Text style={{fontWeight: 'bold'}}>{value.name}</Text>
          <Text style={{fontWeight: 'bold'}}>&#2547; {value.enrollment_fee}</Text>
      </View>

      <View style={styles.courseConatiner}>
        <Text style={styles.paymentHeader}>Select Payment Method</Text>
       
        <RadioButton.Group
          onValueChange={(newValue) => setSelectedPayment(newValue)}
          value={selectedPayment}
        >
          <TouchableOpacity   onPress={BkashAPICall} style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton value="Bkash" color="green" />
              <Text>Bkash Payment</Text>
            </View>
            <Image style={styles.bkashIcon} source={require("../../assets/bkash.png")}/>
          </TouchableOpacity>

          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton value="Manual" color="green" />
              <Text>Manual Payment</Text>
            </View>
            <Image style={styles.manualIcon} source={require("../../assets/pay.png")}/>
          </View>
        </RadioButton.Group>

         {/* Step 3: Render the TextInput conditionally */}
         {selectedPayment === "Manual" && (
       <>
          <TextInput
            style={styles.manualPaymentInput}
            placeholder="Enter Transaction ID"
            value={manualPaymentInput}
            onChangeText={setManualPaymentInput}
          />

        <TouchableOpacity
        onPress={ManualPayment} 
          style={styles.btn}
        >
          <Text style={styles.btnText}>
            submit
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperTxt} >Please pay to <Text style={{fontWeight: 'bold'}}>01841779449</Text> from a bKash or a Rocket account & enter the Transaction ID to submit.</Text>
       </>
          
        )}
     </View>
    </>
  
  }
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%'
    },
    stepperContainer:{
      flexDirection: 'row',
      justifyContent: "space-around",
      // marginVertical: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20
    },
    orderContainer:{
      display: 'flex',
      alignItems: 'center',
    },
    confirmIcon:{
      width: 40,
      height: 40,
      marginVertical: 5
    },
    middleBorder:{
      width: "25%",
      height: 1,
      backgroundColor: "green",
    },
    payStepper:{
      width: 40,
      height: 40,
      backgroundColor: "gray",
      borderRadius: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    courseConatiner:{
      flexDirection: 'column',
      alignItems: 'start',
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 20
    },
    paymentHeader:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20
    },
    bkashIcon:{
        width: 150,
        height: 45, 
    },
    manualIcon:{
        width: 80,
        height: 45,  
    },
    radioButtonContainer: {
       marginVertical: 5,
       flexDirection: 'row',
       justifyContent: "space-between",
       borderWidth: 0.4,
       borderColor: "#ededed",
       padding: 8,

      },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
     
      },
      manualPaymentInput: {
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
      },
      btn:{
        backgroundColor: darkGreen,
        // width: 350,
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 14,
        borderRadius: 5, 
      },
      btnText:{
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold", 
        textTransform: 'uppercase' 
      },
      helperTxt:{
        fontSize: 12,
        color: "gray",
      }
  });
  
  export default Payment;
  