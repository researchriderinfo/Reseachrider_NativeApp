import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import UserAbout from "../component/Profile/UserAbout/UserAbout";
import UserClass from "../component/Profile/UserClass";
import UserFollow from "../component/Profile/UserFollow";
import UserGroups from "../component/Profile/UserGroups";
import UserPosts from "../component/Profile/UserPosts";

const UserProfile = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Home", title: "Home" },
    { key: "Group", title: "Group" },
    { key: "Class", title: "Class" },
    { key: "Follow", title: "Follow" },
    { key: "About", title: "About" },
  ]);

  const id = route.params.userID;

 useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth_token = await AsyncStorage.getItem("auth_token");
        const ids = await AsyncStorage.getItem('id');

      if (!auth_token || !ids) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }
        // Make the API call
        fetch(`https://researchrider.xyz/user/user-general-info/${ids}`, {
          method: "GET",
          headers: {
            Authorization: `Token ${auth_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUserInfo(data[0]);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } catch (error) {
        console.log("Error reading data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const renderScene = SceneMap({
    Home: () => (
      <View>
        <UserPosts userID={id} navigation={navigation} userInfo={userInfo}/>
      </View>
    ),
    Group: () => (
      <View>
        <UserGroups userID={id} navigation={navigation} />
      </View>
    ),
    Class: () => (
      <View>
        <UserClass navigation={navigation} />
      </View>
    ),
    Follow: () => (
      <View>
        <UserFollow navigation={navigation}/>
      </View>
    ),
     About: () => (
      <View>
        <UserAbout userID={id} navigation={navigation} />
      </View>
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: "white", color: 'gray' }}
       labelStyle={{ color: "black" }} 
    />
  );

  return (
    <View style={styles.container}>
      {/* <Image style={styles.coverImg} source={{ uri: userInfo.cover_pic }} /> */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImg}
          source={{ uri: userInfo.profile_pic }}
          resizeMode="cover"
        />
        <Text style={styles.groupName}>{userInfo?.user?.first_name}</Text>
         <Text style={styles.about}>{userInfo?.user?.profession} &#8226; {userInfo?.user?.academic_discipline ? userInfo?.user?.academic_discipline : 'Position'} &#8226; {userInfo?.user?.organization}</Text>
        <Text style={styles.about}>{userInfo.user_bio}</Text>
        <Text style={styles.location}>{userInfo.user_permanent_address} &#8226; {userInfo.user_present_address}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImg: {
    width: "100%",
    height: 150,
  },
  profileContainer: {
    padding: 15,
    // marginTop: -70,
  },
  profileImg: {
    width: 120,
    height: 120,
  },
  groupName: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
  },
  about: {
    marginVertical: 5,
  },
  location: {
    fontSize: 12,
    color: "gray",
  },
});

export default UserProfile;

