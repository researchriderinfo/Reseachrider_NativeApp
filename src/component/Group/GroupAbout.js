import React, { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

const GroupAbout = ({ groupID }) => {
  const [groupInfo, setGroupInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://researchrider.xyz/group/${groupID}/group-detail`
        );
        const data = await response.json();
        setGroupInfo(data.group);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [groupID]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Overview</Text>
        <Text>{groupInfo.about}</Text>

        <Text style={styles.title}>Location</Text>
        <Text style={{ color: "gray" }}>{groupInfo.location}</Text>

        <Text style={styles.title}>Phone number</Text>
        <Text style={{ color: "gray" }} >{groupInfo.phone_no}</Text>

        <Text style={styles.title}>Email</Text>
        <Text style={{ color: "gray" }} >{groupInfo.email}</Text>
      </View>


      <View style={styles.container}>
        <Text style={styles.mainTitle}>Website</Text>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.content}
            onPress={() => Linking.openURL(groupInfo.facebook_link)}
          >
            <Image style={styles.iconStyle} source={require("../../../assets/facebook.png")} />
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.content}
            onPress={() => Linking.openURL(groupInfo.linkend_link)}
          >
            <Image style={styles.iconStyle} source={require("../../../assets/linkedin.png")} />
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.content}
            onPress={() => Linking.openURL(groupInfo.instagram_link)}
          >
            <Image style={styles.iconStyle} source={require("../../../assets/instagram.png")} />
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.content}
            onPress={() => Linking.openURL(groupInfo.others_link)}
          >
            <Image style={styles.iconStyle} source={require("../../../assets/internet.png")} />
          </TouchableOpacity>
        </View>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    marginTop: 10,
    padding: 10
  },
  mainTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginVertical: 8
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start'
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 10
  },
  iconStyle: {
    width: 30,
    height: 30
  }
})

export default GroupAbout;