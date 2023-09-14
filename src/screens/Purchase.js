import { Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
  
  const Purchase = ({ navigation, route }) => {

    const [value, setValue] = useState({});
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
  
    return (
      <View style={styles.mainContainer}>
      <View style={styles.stepperContainer}>
        <View style={styles.orderContainer}>
        <Image style={styles.confirmIcon} source={require("../../assets/accept.png")}/>
          <Text style={{fontWeight: 'bold', color: 'green'}}>Order Confirmation</Text>
        </View>
        <View style={styles.middleBorder}/>
        <View style={styles.orderContainer}>
          <View  style={styles.payStepper}>
            <Text style={{color: 'white'}}>2</Text>
          </View>
          <Text style={{fontWeight: 'bold', color: 'gray'}}>Payment</Text>
        </View>
      </View>

      <View style={styles.courseConatiner}>
        <View>
          <Image
          style={styles.bannerImg}
          source={{ uri: value.cover_pic }}
          resizeMode="contain"
          />
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{value.name}</Text>
          <Text style={{fontWeight: 'bold'}}>&#2547; {value.enrollment_fee}</Text>
        </View>
      </View>
      

      <View style={styles.buttonContainer}>
        <Text style={styles.price}> Total &#2547; {value.enrollment_fee} </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("Payment", {
              courseId: value.id,
            })
          }
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
      backgroundColor: "gray",
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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 20
    },
    bannerImg: {
      width: 150,
      height: undefined,
      aspectRatio: 1.5,
      marginRight: 20,
      borderWidth: 0.2,
      borderColor: "gray",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      elevation: 8,
    },
  
    price: {
      // backgroundColor: "#344055",
      color: "#344055",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    buttonStyle: {
      backgroundColor: "green",
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 18,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 20,
      color: "#eee",
      fontWeight: "500",
    },
  });
  
  export default Purchase;
  