import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Friday = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Friday</Text>
    </View>
  );
};

export default Friday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
