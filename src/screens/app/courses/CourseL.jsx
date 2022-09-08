import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";

// Dependencies
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Days from "../../../components/app/course/Days";
import Colors from "../../../utils/Colors";
import Button from "../../../components/app/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CourseL = ({ navigation, route }) => {
  const { course } = route.params;

  //insets
  const insets = useSafeAreaInsets();

  // convert classDays to array
  const classDaysArr = Object.values(course.classDays);
  const labDaysArr = Object.values(course.lab.labDays);

  // Slice classDaysArray to get first letter of every day
  const classDays = classDaysArr.map((day) => day.slice(0, 1));
  const labDays = labDaysArr.map((day) => day.slice(0, 1));

  console.log(course.lab.lab);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Course Icon */}
        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name={course.courseInformation.courseIcon}
            size={100}
            color={Colors.lavenderBlue}
          />
        </View> */}
        {/* Course Information, Class Location and Times, Class Days*/}
        <View
          style={{
            padding: 20,
          }}
        >
          {/* Course Information */}
          <View style={{}}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {course.courseInformation.courseTitle}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "200",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {course.courseInformation.courseCode}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                height: 60,
              }}
            >
              Credits: {course.courseInformation.courseCredits}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                height: 60,
              }}
            >
              Instructor: {course.courseInformation.courseInstructor}
            </Text>
          </View>
          {/* Class Days and Times */}
          <View style={{}}>
            {/* Class Days */}
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Class Days:
              </Text>
              {classDays.map((day, idx) => (
                <Days disabled={true} key={idx} title={day} />
              ))}
            </View>
            {/* Class Times */}
            <View
              style={{
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18,
                  height: 60,
                }}
              >
                Class Times: {course.classTimes.start} - {course.classTimes.end}
              </Text>
            </View>
          </View>
          {/* Class Location */}
          <View style={{}}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                height: 60,
              }}
            >
              Class Location: {course.classLocation.building} in Room{" "}
              {course.classLocation.room}
            </Text>
          </View>
        </View>
        {/* Lab, Lab Days, and Lab Times */}
        {course.lab.lab === "Y" ? (
          <View
            style={{
              padding: 20,
            }}
          >
            {/* Lab */}
            <View style={{}}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Lab: {course.lab.labDays[0] ? "Yes" : "No"}
              </Text>
            </View>
            {/* Lab Days */}
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Lab Days:
              </Text>
              {labDays.map((day, idx) => (
                <Days disabled={true} key={idx} title={day} />
              ))}
            </View>
            {/* Lab Times */}
            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Lab Times: {course.lab.labTimes.start} -{" "}
                {course.lab.labTimes.end}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
        }}
      >
        <Button label="Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default CourseL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
  },
});
