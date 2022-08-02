import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Assignments = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Assignments</Text>
    </View>
  );
};

export default Assignments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
