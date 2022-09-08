import { Feather } from "@expo/vector-icons";
import React from "react";

// Dependencies
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../utils/Colors";

const { Children, Fragment } = React;

const AddSeparators = ({ children, separator = ", " }) =>
  Children.map(children, (child, idx) => (
    <Fragment>
      <Text
        style={{
          color: "#fff",
        }}
      >
        {idx ? separator : ""}
      </Text>
      <Text
        style={{
          color: "#fff",
        }}
      >
        {child}
      </Text>
    </Fragment>
  ));

const CourseItem = ({ course, onPress }) => {
  // console.log("course: ", course.classDays);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      > */}
      {/* <Feather
          name={course.courseInformation.courseIcon}
          size={40}
          color={Colors.lavenderBlue}
          style={{
            marginRight: 10,
          }}
        /> */}
      <View>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          {course.courseInformation.courseTitle}
        </Text>
        <Text style={{ color: Colors.cadet }}>
          {course.courseInformation.courseCode}
        </Text>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddSeparators separator={" | "}>
            {Object.values(course.classDays).map((day, idx) => (
              <Text key={idx} style={{ color: "#fff" }}>
                {day}
              </Text>
            ))}
          </AddSeparators>

          <Feather
            name="at-sign"
            size={16}
            color={Colors.lavenderWeb}
            style={{
              marginHorizontal: 8,
            }}
          />

          <Text style={{ color: "#fff" }}>
            {course.classTimes.start} - {course.classTimes.end}
          </Text>

          {/* {course.classDays.map((day, idx) => (
          <Text key={idx} style={{ color: "#fff" }}>
            {day}
          </Text>
        ))} */}
        </View>
        {/* <Text style={{ color: "#fff" }}>
        Lab: {course.lab.labDays[0] ? "Yes" : "No"}
      </Text> */}
        {/* Lab Schedule */}
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.eggshell,
    padding: 10,
    marginBottom: 10,
  },
});
