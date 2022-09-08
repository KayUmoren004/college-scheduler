import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Tuesday = ({ courses, lab }) => {
  return (
    <View style={styles.container}>
      {courses &&
        courses.map((course, idx) => {
          return (
            <View key={idx}>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                {course.courseInformation.courseTitle}
              </Text>
            </View>
          );
        })}
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
