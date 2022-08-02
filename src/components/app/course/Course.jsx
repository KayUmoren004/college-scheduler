import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import C1 from "./C1";
import C2 from "./C2";
import C3 from "./C3";

const Course = () => {
  // Nav Stack
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="C1">
      <Stack.Screen
        name="C1"
        component={C1}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="C2"
        component={C2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="C3"
        component={C3}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Course;
