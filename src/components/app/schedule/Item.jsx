import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../utils/Colors";

const Item = ({ course }) => {
  return (
    <View style={styles.container}>
      {/* Name */}
      <View>
        <Text style={{ color: "#fff" }}>
          {course.courseInformation.courseTitle}
        </Text>
      </View>
      {/* Instructor */}
      <View>
        <Text style={{ color: "#fff" }}>
          {course.courseInformation.courseInstructor}
        </Text>
      </View>
      {/* Time */}
      <View>
        <Text style={{ color: "#fff" }}>
          {course.classTimes.start} - {course.classTimes.end}
        </Text>
      </View>
      {/* Location */}
      <View>
        <Text style={{ color: "#fff" }}>{course.classTimes.location}</Text>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // borderWidth: 0.5,
    // borderColor: Colors.eggshell,

    // flex: 1,
    // backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
