import {
  ScrollView,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

const ListItem = ({ item }) => (
  <View style={styles.listItemContainer}>
    <Text style={[styles.paraStyle, styles.aboutPara]}>&#x2022; {item}</Text>
  </View>
);

const About = () => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const listData = [
    "Large number of research participation by the mass people along with raising their research interests",
    "Large number of ICT participation by the mass people along with raising their ICT interests",
    "Countywide easy accessible knowledge hunting source",
    "Reliable and productive ICT platform",
    "Reliable and well paid earning sources",
    "The production of creative ideas",
    "Easier and secured communication hub",
    "Easy and reliable ways of product marketing",
    "Efficient and effective research support",
    "Efficient and effective ICT support",
    "Reliable and well paid earning sources",
    "Maximum implementation of productive ideas",
  ];

  return (
    <ScrollView>
      <View style={styles.aboutContainer}>
        <Text style={styles.mainHeader}> Researcher Rider </Text>
        <Text style={styles.paraStyle}> Grow up Being a Researcher </Text>

        <View>
          <Image
            style={styles.imgStyle}
            source={require("../../assets/Logo.png")}
          />
        </View>

        <View style={styles.aboutLayout}>
          <Text style={styles.aboutSubHeader}> About me </Text>
          <Text style={[styles.paraStyle, styles.aboutPara]}>
            Research Rider provides various products, services, and supports
            which are highly based on research and ICT platforms.
          </Text>
          {listData.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </View>

        <View style={styles.socialCard}>
          <Text style={styles.mainHeader}> Follow me on Social Network </Text>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => Linking.openURL("https://www.researchrider.com/")}
            >
              <Image
                style={styles.iconStyle}
                source={require("../../assets/internet.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                Linking.openURL(
                  "https://www.youtube.com/channel/UCTq9RQ00SWZzg7Y4Zm_gkzA"
                )
              }
            >
              <Image
                style={styles.iconStyle}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/187/187210.png",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/researchrider")
              }
            >
              <Image
                style={styles.iconStyle}
                source={require("../../assets/facebook.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: undefined,
    height: 120,
    aspectRatio: 1.8,
    // borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 40,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
    display: "flex",
    alignSelf: "center",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 10,
  },
  aboutLayout: {
    backgroundColor: "#4c5dab",
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginVertical: 30,
    marginTop: 20,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "Nunito_700Bold",
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
  socialCard: {
    marginBottom: 80,
  },
});

export default About;
