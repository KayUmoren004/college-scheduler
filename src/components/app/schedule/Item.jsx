import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../utils/Colors";

const Item = ({ course }) => {
  // console.log(course);
  return (
    <View style={styles.container}>
      {/* Name */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            {course.courseInformation.courseTitle}
          </Text>
        </View>
        {/* Time */}
        <View>
          <Text style={{ color: "#fff" }}>
            {course.classTimes.start} - {course.classTimes.end}
          </Text>
        </View>
      </View>
      {/* Instructor */}
      <View
        style={{
          marginTop: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "200" }}>
          {course.courseInformation.courseInstructor}
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
    justifyContent: "center",
    backgroundColor: Colors.cadet,
    borderRadius: 10,
    // borderWidth: 0.5,
    // borderColor: Colors.eggshell,

    // flex: 1,
    // backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
