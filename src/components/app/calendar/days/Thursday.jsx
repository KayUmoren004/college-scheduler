import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Thursday = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Thursday</Text>
    </View>
  );
};

export default Thursday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
