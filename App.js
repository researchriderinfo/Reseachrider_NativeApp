import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CourseStudent from "./src/component/CourseComponent/CourseStudent";
import RichTextEditorComponent from "./src/component/TextEditor";
import About from "./src/screens/About";
import AllCourse from "./src/screens/AllCourse";
import AsStudent from "./src/screens/AsStudent";
import AsTeacher from "./src/screens/AsTeacher";
import Course from "./src/screens/Course";
import CourseDetails from "./src/screens/CourseDetails";
import GroupHome from "./src/screens/GroupHome";
import GroupProfile from "./src/screens/GroupProfile";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import More from "./src/screens/More";
import MyCourse from "./src/screens/MyCourse";
import MyGroup from "./src/screens/MyGroup";
import Payment from "./src/screens/Payment";
import Purchase from "./src/screens/Purchase";
import Signup from "./src/screens/Signup";
import SummaryPost from "./src/screens/SummaryPost";
import ThoughtPost from "./src/screens/ThoughtPost";
import UserProfile from "./src/screens/UserProfile";
import Verification from "./src/screens/Verification";
import TextEditor from "./src/component/TextEditor";
import SummaryScreen from "./src/component/SummaryScreen";

export default function App() {


  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  const [id, setId] = useState("");
  const [user, setUser] = useState(null);
  // console.log({id}, {user});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const auth_token = await AsyncStorage.getItem("auth_token");

        if (!id || !auth_token) {
          console.log("User data or auth token is missing in AsyncStorage.");
          return;
        }

        setId(id);

        // Make the API call
        fetch(`https://researchrider.xyz/user/user-general-info/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Token ${auth_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data[0]);
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

  const handleUserLogin = async () => {
    // ... (logic to handle user login and fetching user data)

    // Update user data after login
    await fetchUserData();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <Home {...props} websiteName={"Research Rider"} />}
        </Stack.Screen>

        {/* course screen */}
        <Stack.Screen
          name="Course"
          component={Course}
          options={({ navigation }) => ({
            headerTitleStyle: {
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitle: "",
            headerTitleAlign: "left",
            headerRight: () => (
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() =>
                  navigation.navigate("userProfile", {
                    userID: id,
                  })
                }
              >
                <View>
                  <Text style={styles.userName}>{user?.user?.first_name}</Text>
                </View>
                <Image
                  source={{ uri: user?.user?.profile_pic }}
                  style={styles.proAvatar}
                />
              </TouchableOpacity>
            ),
          })}
        />

        {/* GroupHome screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitle: "Groups",
            headerTitleAlign: "center",
          }}
          name="GroupHome"
          component={GroupHome}
        />


        {/* Group Profile screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
            // headerShown: false,
          }}
          name="GroupProfile"
          component={GroupProfile}
        />

        {/* User Profile screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
            // headerShown: false,
          }}
          name="userProfile"
          component={UserProfile}
        />

        {/* course screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitle: "Groups",
            headerTitleAlign: "center",
          }}
          name="Group"
          component={CourseStudent}
        />

        {/* About screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },

            headerTitleAlign: "center",
          }}
          name="About"
          component={About}
        />

        {/* Login screen */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />

        {/* Login screen */}
        <Stack.Screen name="Signup" component={Signup} />

        {/* Verification screen */}
        <Stack.Screen name="verification" component={Verification} />

        {/* CourseDetails screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="CourseDetails"
          component={CourseDetails}
        />

        {/* AllCourse screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="AllCourse"
          component={AllCourse}
        />


        {/* Purchase screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="Purchase"
          component={Purchase}
        />

        {/* Payment screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="Payment"
          component={Payment}
        />

        {/* More screen */}
        <Stack.Screen
          name="More"
          component={More}
          options={({ navigation }) => ({
            headerTitleStyle: {
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitle: "",
            headerTitleAlign: "left",
            headerRight: () => (
              <>
                <View>
                  <Text style={{ fontSize: 16 }}>{user?.user?.first_name}</Text>
                </View>
                <Image
                  source={{ uri: user?.user?.profile_pic }}
                  style={{ width: 40, height: 40, marginLeft: 10, borderRadius: 100 }}
                />
              </>
            ),
          })}
        />

        {/* ThoughtPost screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="ThoughtPost"
          component={ThoughtPost}
        />

        {/* SummaryPost screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="SummaryPost"
          component={SummaryPost}
        />

        {/* MyCourse screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="Your Course"
          component={MyCourse}
        />

        {/* MyGroup screen */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="Your Group"
          component={MyGroup}
        />

        {/* As a Teacher */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="teacher"
          component={AsTeacher}
        />

        {/* As a Student */}
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
          name="student"
          component={AsStudent}
        />

        {/* Thought Post screen */}
        <Stack.Screen options={{
          headerShown: false,
        }} name="post" component={TextEditor} />

         {/* Summary Post screen */}
        <Stack.Screen options={{
          headerShown: false,
        }} name="summary" component={SummaryScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },

  proAvatar: {
    width: 40, height: 40, marginLeft: 10, borderRadius: 100
  },
  userName: {
    fontSize: 16
  },
});