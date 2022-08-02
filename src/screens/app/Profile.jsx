import React, { useContext } from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

import { FirebaseContext } from "../../helpers/FirebaseContext";

const Profile = () => {
  // Context
  const Firebase = useContext(FirebaseContext);

  const FB = Firebase.getCurrentUser();
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 10, padding: 20 }}>
        {JSON.stringify(FB, null, 2)}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
