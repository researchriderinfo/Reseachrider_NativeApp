import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import GroupAbout from "../component/Group/GroupAbout";
import GroupCourse from "../component/Group/GroupCourse";
import GroupMember from "../component/Group/GroupMember";
import ProfileHome from "../component/Group/ProfileHome";

const GroupProfile = ({ navigation, route }) => {
  const [groupInfo, setGroupInfo] = useState({});
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Home", title: "Home" },
    { key: "course", title: "Course" },
    { key: "People", title: "People" },
    { key: "About", title: "About" },
  ]);

  const id = route.params.groupID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://researchrider.xyz/group/${id}/group-detail`
        );
        const data = await response.json();
        setGroupInfo(data.group);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const renderScene = SceneMap({
    Home: () => (
      <View>
        {/* Content for the Info tab */}
        <ProfileHome groupID={id}/>
      </View>
    ),
    course: () => (
      <View>
        <GroupCourse groupID={id}/>
      </View>
    ),
    People: () => (
      <View>
        <GroupMember groupID={id}/>
      </View>
    ),
     About: () => (
      <View>
        <GroupAbout groupID={id}/>
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
      <Image style={styles.coverImg} source={{ uri: groupInfo.cover_pic }} />
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImg}
          source={{ uri: groupInfo.profile_pic }}
          resizeMode="cover"
        />
        <Text style={styles.groupName}>{groupInfo.name}</Text>
        <Text style={styles.about}>{groupInfo.about}</Text>
        <Text style={styles.location}>{groupInfo.location} &#8226;</Text>
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
    marginTop: -70,
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

export default GroupProfile;
