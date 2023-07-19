import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import About from "./src/screens/About";
import Course from "./src/screens/Course";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import CourseDetails from "./src/screens/CourseDetails";
import AllCourse from "./src/screens/AllCourse";
import CourseStudent from "./src/component/CourseComponent/CourseStudent";
import { Image, View } from "react-native";
import { Text } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
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
              <>
                <View>
                  <Text style={{ fontSize: 16 }}>Md.Nazirul Islam</Text>
                </View>
                <Image
                  source={require("./assets/user.png")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </>
            ),
          })}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
