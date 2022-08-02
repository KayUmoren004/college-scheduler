import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Calendar = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Calendar</Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
