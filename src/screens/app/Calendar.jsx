import React, { useContext, useState, useEffect } from "react";

// Dependencies
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import moment from "moment";

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
  const [courses, setCourses] = useState([]);
  const [labCourses, setLabCourses] = useState([]);
  const [day, setDay] = useState("M");
  const [monday, setMonday] = useState();
  const [mondayLab, setMondayLab] = useState();
  const [tuesday, setTuesday] = useState();
  const [tuesdayLab, setTuesdayLab] = useState();
  const [wednesday, setWednesday] = useState();
  const [wednesdayLab, setWednesdayLab] = useState();
  const [thursday, setThursday] = useState();
  const [thursdayLab, setThursdayLab] = useState();
  const [friday, setFriday] = useState();
  const [fridayLab, setFridayLab] = useState();

  // Get Courses
  const getCourses = async () => {
    try {
      const q = await Firebase.getCourses();
      const data = q.docs.map((doc) => doc.data());
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

  const filterByValue = (array, value) =>
    array.filter((el) => {
      const objValues = Object.values(el).flat();
      // console.log(objValues);
      const elementsValues = objValues.map((v) => Object.values(v)).flat();
      // console.log(elementsValues);
      return elementsValues.some((v) => v.toString().includes(value));
    });

  // wait for courses to be set then log it
  useEffect(() => {
    const labC = courses.filter(
      (course) => course.lab.lab === "Y" || course.lab.lab === ""
    );
    setLabCourses(labC);
    // Add Monday courses and labs to state
    setMonday(
      filterByValue(
        courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        "Monday"
      )
    );

    // Add Tuesday courses to state
    setTuesday(
      filterByValue(
        courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        "Tuesday"
      )
    );

    // Add Wednesday courses to state
    setWednesday(
      filterByValue(
        courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        "Wednesday"
      )
    );

    // Add Thursday courses to state
    setThursday(
      filterByValue(
        courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        "Thursday"
      )
    );

    // Add Friday courses to state
    setFriday(
      filterByValue(
        courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        "Friday"
      )
    );
  }, [courses]);

  return (
    <SafeAreaView style={styles.container}>
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

        {courses && labCourses && day === "M" ? (
          <Monday courses={monday} lab={labCourses} />
        ) : day === "T" ? (
          <Tuesday courses={tuesday} lab={labCourses} />
        ) : day === "W" ? (
          <Wednesday courses={wednesday} lab={labCourses} />
        ) : day === "Th" ? (
          <Thursday courses={thursday} lab={labCourses} />
        ) : day === "F" ? (
          <Friday courses={friday} lab={labCourses} />
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
    justifyContent: "space-between",
  },
});
