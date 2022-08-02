import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Courses = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Courses</Text>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
