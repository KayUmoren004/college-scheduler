import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Weekly = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Weekly</Text>
    </View>
  );
};

export default Weekly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
