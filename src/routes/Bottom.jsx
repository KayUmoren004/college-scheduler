import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Colors from "../utils/Colors";
<<<<<<< Updated upstream
import { TouchableOpacity, View } from "react-native";
=======
import { TouchableOpacity } from "react-native";
import { UserContext } from "../helpers/UserContext";
>>>>>>> Stashed changes

// Screens
import Home from "../screens/app/Home";
import Calendar from "../screens/app/Calendar";
import Assignments from "../screens/app/Assignments";
import Reminders from "../screens/app/Reminders";
import Courses from "../screens/app/courses/Courses";
import { useContext } from "react";

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
      case "Schedule":
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
  const [User] = useContext(UserContext);

  const name = User.name.slice(0, User.name.indexOf(" "));

  return (
    <Tab.Navigator screenOptions={ScreenOptions}>
      <Tab.Screen
        name={`Hello ${name},`}
        component={Home}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 40,
            fontWeight: "bold",
            color: Colors.white,
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
              onPress={() => navigation.navigate("Profile")}
            >
              <Feather name="user" size={30} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Calendar}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 40,
            fontWeight: "bold",
            color: Colors.white,
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
              onPress={() => navigation.navigate("Weekly")}
            >
              <Feather name="align-justify" size={30} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
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
          },
          headerStyle: {
            backgroundColor: Colors.black,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "left",
          headerRight: () => (
            <View
              style={{
                // padding: 10,
                marginRight: 10,
                // alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  // padding: 10,
                  // marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Course")}
              >
                <Feather name="plus" size={30} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // padding: 10,
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Delete")}
              >
                <Feather name="trash" size={25} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottom;
