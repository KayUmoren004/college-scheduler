import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Wednesday = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Wednesday</Text>
    </View>
  );
};

export default Wednesday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
