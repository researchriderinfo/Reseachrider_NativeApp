import { Nunito_600SemiBold, Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
import React from "react";
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Menu from "../component/Menu";

const MenuItem = ({ navigation, onPress, iconSource, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image style={styles.iconStyle} source={iconSource} />
    </View>
    <Text style={styles.navTitle}>{title}</Text>
  </TouchableOpacity>
);

const AccountSection = ({ headerText, headerTextRight, buttons, onClearPress }) => (
  <View style={styles.accountContainer}>
    <View style={styles.header}>
      <Text style={{ color: 'gray' }}>{headerText}</Text>
      <TouchableOpacity onPress={onClearPress}>
         <Text style={{ color: 'red' }}>{headerTextRight}</Text>
      </TouchableOpacity>
     
    </View>
    {buttons.map((buttonProps, index) => (
      <MenuItem key={index} {...buttonProps} />
    ))}
  </View>
);

const More = ({ navigation }) => {
  const hotlineNumber = '+8801729914461';

  const handleHotlinePress = async () => {
    try {
      await Linking.openURL(`tel:${hotlineNumber}`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error opening hotline number:', error);
    }
  };


  const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear(); 
     navigation.navigate("Home")
  } catch (error) {
    Alert.alert("Error clearing AsyncStorage:", error.message);
  }
}

  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View >
    <View style={styles.contentContainer}>
    <AccountSection
        headerText="My Item"
        headerTextRight="Logout"
        onClearPress={clearAsyncStorage}
        buttons={[
          {
            navigation,
            onPress: () => navigation.navigate("post"),
            iconSource: require("../../assets/online.png"),
            title: "Post",
          },
          {
            navigation,
            onPress: () => navigation.navigate("ThoughtPost"),
            iconSource: require("../../assets/online.png"),
            title: "Thought Post",
          },
          {
            navigation,
            onPress: () => navigation.navigate("SummaryPost"),
            iconSource: require("../../assets/article.png"),
            title: "Summary Post",
          },
          {
            navigation,
            onPress: () => navigation.navigate("Your Course"),
            iconSource: require("../../assets/presentation.png"),
            title: "My Course",
          },
           {
            navigation,
            onPress: () => navigation.navigate("Your Group"),
            iconSource: require("../../assets/group.png"),
            title: "My Group",
          },
        ]}
      />

      <AccountSection
        headerText="Account"
        buttons={[
          {
            navigation,
            onPress: () => navigation.navigate("Home"),
            iconSource: require("../../assets/user.png"),
            title: "Profile Information",
          },
        ]}
      />

      <AccountSection
        headerText="Help and Policy"
        buttons={[
          {
            onPress: handleHotlinePress,
            iconSource: require("../../assets/information.png"),
            title: "Hotline (+880 1729-914461)",
          },
          {
            onPress: handleHotlinePress,
            iconSource: require("../../assets/privacy-policy.png"),
            title: "Privacy Policy",
          },
          {
            onPress: handleHotlinePress,
            iconSource: require("../../assets/cookies.png"),
            title: "Cookie Policy",
          },
          {
            navigation,
            onPress: () => navigation.navigate("About"),
            iconSource: require("../../assets/about.png"),
            title: "About",
          },
        ]}
      />

      <Text style={{ textAlign: 'center', marginTop: 10 }}>Version: 1.0.0</Text>
    </View>

      <View style={styles.navContainer}>
          <Menu />
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({

  accountContainer: {
    backgroundColor: '#ffff',
    padding: 20,
    marginVertical: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingBottom: 5,
  },
  navTitle: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "#344055",
  },
  iconContainer: {
    backgroundColor: "#ecf7fc",
    width: 32,
    height: 32,
    padding: 6,
    borderRadius: 50,
    marginRight: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    borderStyle: 'dashed',
    paddingBottom: 10,
  },

   contentContainer: {
    marginTop: 4,
    marginBottom: 20, 
  },

  navContainer: {
    backgroundColor: "white",
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
});
