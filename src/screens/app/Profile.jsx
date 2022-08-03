import { useContext, useState, useEffect } from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { FirebaseContext } from "../../helpers/FirebaseContext";
import { UserContext } from "../../helpers/UserContext";

import Button from "../../components/auth/AuthButton";
import Colors from "../../utils/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  // Context
  const Firebase = useContext(FirebaseContext);
  const [User, setUser] = useContext(UserContext);

  // State
  const [loading, setLoading] = useState(false);

  const FB = Firebase.getCurrentUser();

  // Sign Out
  const signOut = async () => {
    setLoading(true);
    try {
      const loggedOut = await Firebase.signOut();
      if (loggedOut) {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    } catch (err) {
      console.log("Error @SignOut: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading Component
  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.darkByzantium} />
      </View>
    );
  };

  // <Text style={{ color: "#fff", fontSize: 10, padding: 20 }}>
  //       {JSON.stringify(FB, null, 2)}
  //     </Text>

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={40}
              style={{
                borderColor: Colors.eggshell,
                marginRight: 10,
                borderRadius: 10,
                borderWidth: 2,
                color: Colors.lavenderBlue,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Profile
          </Text>
        </View>
        {/* Image */}
        <View style={styles.imageContainer}>
          {/* <Image
            source={require("../../../assets/images/IMG_3098.jpg")}
            style={styles.image}
            resizeMode="contain"
          /> */}
          <Feather name="user" size={100} color={Colors.languidLavender} />
        </View>
        <View style={styles.infoContainer}>
          {/* Name */}
          <Text style={styles.name}>{User.name}</Text>
          {/* Email */}
          <Text style={styles.email}>{FB.email}</Text>
        </View>
        <View style={styles.coursesContainer}>
          {/* Courses */}
          {/* Courses */}
        </View>
      </View>
      <View
        style={{
          width: "80%",

          alignSelf: "center",
        }}
      >
        {loading && <Loading />}
        {!loading && (
          <Button
            destructive={true}
            label="Log Out"
            onPress={() => signOut()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "200",
  },
  email: {
    color: "#fff",
    fontSize: 10,
    // padding: 20,
  },
  coursesContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
