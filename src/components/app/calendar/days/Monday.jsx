import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Monday = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Monday</Text>
    </View>
  );
};

export default Monday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
