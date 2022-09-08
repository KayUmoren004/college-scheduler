import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Thursday = ({ courses = [], lab = [] }) => {
  // console.log(courses);
  console.log(lab, "lab");
  const [actualLab, setActualLab] = React.useState([]);

  // Filter labCourses for Thursday

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
      {actualLab &&
        actualLab.map((course, idx) => {
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

export default Thursday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
