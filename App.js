import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import About from "./src/screens/About";
import Course from "./src/screens/Course";
import UserData from "./src/screens/UserData";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import CourseDetails from "./src/screens/CourseDetails";

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
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_600SemiBold",
            },
            headerTitle: "Explore Courses",
            headerTitleAlign: "center",
          }}
          name="Course"
          component={Course}
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
          component={UserData}
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
