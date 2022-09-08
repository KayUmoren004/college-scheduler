import React from "react";

// Dependencies
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";

const DeleteItem = ({ course, onPress }) => {
  return (
    <View style={styles.container}>
      {/* {" "}
      // Fix touch input */}
      {/* Course */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Feather
          name={course.courseInformation.courseIcon}
          size={40}
          color={Colors.lavenderBlue}
          style={{
            marginRight: 10,
          }}
        />
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
            {/* <AddSeparators separator={" | "}>
              {Object.values(course.classDays).map((day, idx) => (
                <Text key={idx} style={{ color: "#fff" }}>
                  {day}
                </Text>
              ))}
            </AddSeparators> */}

            {/* <Feather
              name="at-sign"
              size={16}
              color={Colors.lavenderWeb}
              style={{
                marginHorizontal: 8,
              }}
            /> */}

            {/* <Text style={{ color: "#fff" }}>
              {course.classTimes.start} - {course.classTimes.end}
            </Text> */}

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
      </View>
      {/* Button */}
      <TouchableOpacity onPress={onPress}>
        <Feather
          name="x"
          size={24}
          color="red"
          style={{
            marginLeft: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.eggshell,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
});
