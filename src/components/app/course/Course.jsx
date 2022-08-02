import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Course = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Course</Text>
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
