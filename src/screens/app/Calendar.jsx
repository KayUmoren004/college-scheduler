import React, { useContext, useState, useEffect } from "react";

// Dependencies
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { FirebaseContext } from "../../helpers/FirebaseContext";

// Days
import Monday from "../../components/app/calendar/days/Monday";
import Tuesday from "../../components/app/calendar/days/Tuesday";
import Wednesday from "../../components/app/calendar/days/Wednesday";
import Thursday from "../../components/app/calendar/days/Thursday";
import Friday from "../../components/app/calendar/days/Friday";
import Switcher from "../../components/app/calendar/Switcher";

const Calendar = () => {
  // Context
  const Firebase = useContext(FirebaseContext);

  // State
  const [courses, setCourses] = useState();
  const [day, setDay] = useState("M");
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();

  // Get Courses
  const getCourses = async () => {
    try {
      const q = await Firebase.getCourses();
      const data = q.docs.map((doc) => doc.data());
      // console.log("courses: ", data[0].classDays);
      setCourses(data);
    } catch (err) {
      console.log("Error @getCourses: ", err.message);
    }
  };
  const days = ["M", "T", "W", "Th", "F"];

  // Get Courses on mount
  useEffect(() => {
    getCourses();
  }, []);

  // convert classDays to array
  // const classDaysArr = Object.values(courses.classDays);
  // const labDaysArr = Object.values(courses.lab.labDays);

  // Sort course days into matching arrays on mount
  // useEffect(() => {
  //   console.log(classDaysArr);
  // }, [courses]);

  // wait for courses to be set then log it
  useEffect(() => {
    // Loop through courses and sort them into days
    // TODO: Sort courses into days

    // Error here
    courses.forEach((course) => {
      if (course.classDays.includes("Monday")) {
        setMonday({
          ...monday,
          [course.courseName]: course.courseInformation.courseTitle,
        });
      }
    });
  }, [courses]);

  // console.log({
  //   Monday: monday,
  //   Tuesday: tuesday,
  //   Wednesday: wednesday,
  //   Thursday: thursday,
  //   Friday: friday,
  // });

  return (
    <SafeAreaView style={styles.container}>
      {/* Date */}
      {/* <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",

            textAlign: "center",
          }}
        >
          Today: {new Date().toLocaleDateString()}
        </Text>
      </View> */}
      {/* Create Header to toggle through days of the week */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {days.map((d, index) => (
          <Switcher
            selected={day === d}
            key={index}
            day={d}
            onPress={() => setDay(d)}
          />
        ))}
      </View>
      {/* Courses */}
      <View
        style={{
          flex: 1,
        }}
      >
        {/* List course and course dates */}
        {/* {courses &&
          courses.map((course, idx) => {
            // convert classDays to array
            const classDaysArr = Object.values(course.classDays);
            const labDaysArr = Object.values(course.lab.labDays);
            return (
              <View key={idx}>
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  {course.courseInformation.courseTitle}
                </Text>
                {classDaysArr.map((day, idx) => (
                  <Text
                    key={idx}
                    style={{
                      color: "#fff",
                    }}
                  >
                    {day}
                  </Text>
                ))}
                {labDaysArr.map((day, idx) => (
                  <Text
                    key={idx}
                    style={{
                      color: "#fff",
                    }}
                  >
                    {day}
                  </Text>
                ))}
              </View>
            );
          })} */}
        {day === "M" ? (
          <Monday />
        ) : day === "T" ? (
          <Tuesday />
        ) : day === "W" ? (
          <Wednesday />
        ) : day === "Th" ? (
          <Thursday />
        ) : day === "F" ? (
          <Friday />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    justifyContent: "space-between",
  },
});
