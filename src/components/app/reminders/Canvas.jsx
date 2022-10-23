import React from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@rneui/themed";

import Colors from "../../../utils/Colors";
import Button from "../../../components/app/Button";

import { UserContext } from "../../../helpers/UserContext";
import { FirebaseContext } from "../../../helpers/FirebaseContext";

// Instructions

const Instructions = [
  "Go to Canvas (web)",
  "Click on the Calendar icon",
  "Click on the Calendar Feed button",
  "Copy the link in the box",
  "Paste the link into the input below",
  "Click the Add button",
];

const Canvas = ({ navigation }) => {
  // State
  const [link, setLink] = React.useState("");

  // Context
  const [User, setUser] = React.useContext(UserContext);
  const Firebase = React.useContext(FirebaseContext);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
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
          Canvas Calendar Link
        </Text>
      </View>
      {/* Body */}
      <View>
        {/* How To Find Canvas Calendar Link */}
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            How To Find Canvas Calendar Link
          </Text>
          <View style={{ padding: 10 }}>
            {Instructions.map((instruction, index) => (
              <Text
                key={index}
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "200",
                  textAlign: "left",
                }}
              >
                - {instruction}
              </Text>
            ))}
          </View>
        </View>
        {/* Add Link */}
        <View>
          <Input
            placeholder="Canvas Calendar Link"
            placeholderTextColor={Colors.eggshell}
            inputStyle={{
              color: Colors.eggshell,
            }}
            onChangeText={(text) => setLink(text)}
            value={link}
          />
        </View>
        {/* Add Button */}
        <View style={{ padding: 10 }}>
          <Button
            label="Add Link"
            onPress={() => {
              if (link !== "") {
                console.log(link);
                const newUser = {
                  ...User,
                  canvasLink: link,
                };
                const update = Firebase.updateUserData(User.uid, newUser);
                if (update) {
                  // Update user in context
                  setUser(newUser);
                  navigation.goBack();
                } else {
                  alert("Error updating user");
                }
              } else {
                alert("Please enter a link");
                console.log("Link is empty");
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Canvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
