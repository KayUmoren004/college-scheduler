import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Bottom from "./Bottom";
import Profile from "../screens/app/Profile";
import Course from "../components/app/course/Course";
import CourseL from "../screens/app/courses/CourseL";
<<<<<<< Updated upstream
import Delete from "../screens/app/courses/Delete";
=======
import Weekly from "../components/app/calendar/Weekly";
>>>>>>> Stashed changes

const App = () => {
  // Stack Navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bottom">
        <Stack.Screen
          name="Bottom"
          component={Bottom}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Course Details"
          component={CourseL}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
<<<<<<< Updated upstream
          name="Delete"
          component={Delete}
=======
          name="Weekly"
          component={Weekly}
>>>>>>> Stashed changes
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
