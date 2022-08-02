import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Bottom from "./Bottom";
import Course from "../components/app/course/Course";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
