import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Tuesday = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Tuesday</Text>
    </View>
  );
};

export default Tuesday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
