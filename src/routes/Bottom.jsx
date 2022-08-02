import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { TouchableOpacity } from "react-native";

// Screens
import Home from "../screens/app/Home";
import Calendar from "../screens/app/Calendar";
import Assignments from "../screens/app/Assignments";
import Reminders from "../screens/app/Reminders";
import Courses from "../screens/app/Courses";
import Profile from "../screens/app/Profile";

// Screen options
const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: Colors.black,
    borderTopColor: "transparent",
  },
  tabBarShowLabel: false,
  tabBarActiveTintColor: Colors.lavenderBlue,
  tabBarInactiveTintColor: Colors.darkGray,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case "Home":
        iconName = "grid";
        break;
      case "Calendar":
        iconName = "calendar";
        break;
      case "Assignments":
        iconName = "book";
        break;
      case "Reminders":
        iconName = "bell";
        break;
      case "Courses":
        iconName = "book-open";
        break;

      default:
        iconName = "home";
    }

    return <Feather name={iconName} size={size} color={color} />;
  },
});

const Bottom = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={ScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Assignments" component={Assignments} />
      <Tab.Screen name="Reminders" component={Reminders} />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 40,
            fontWeight: "bold",
            color: Colors.white,
            // padding: 10,
          },
          headerStyle: {
            backgroundColor: Colors.black,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "left",
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 10,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Course")}
            >
              <Feather name="plus" size={30} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottom;
