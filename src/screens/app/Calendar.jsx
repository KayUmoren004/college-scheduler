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

  // const filterLabCourses = () => {
  //   const labCourses = courses.filter(
  //     (course) => course.lab.lab === "Y" || course.lab.lab === ""
  //   );
  //   setLabCourses(labCourses);
  // };

  // Wait for labCourses to be set
  useEffect(() => {
    // console.log(filterLabCourses(), "labCourses");
    // Loop through labCourses and filter by day
    // for (const child in labCourses) {
    //   console.log(labCourses[child].lab.labDays, "labCourses[child].lab.day");
    // }
    for (let i = 0; i < labCourses.length; i++) {
      const obj = labCourses[i].lab.labDays;
      const vals = Object.values(obj).toString();

      switch (vals) {
        case "Monday":
          setMondayLab(labCourses[i]);
          break;
        case "Tuesday":
          setTuesdayLab(labCourses[i]);
          break;
        case "Wednesday":
          setWednesdayLab(labCourses[i]);
          break;
        case "Thursday":
          console.log(labCourses[i]);
          setThursdayLab(labCourses[i]);
          break;
        case "Friday":
          setFridayLab(labCourses[i]);
          break;
        default:
          break;
      }
    }
  }, [labCourses]);

  console.log(thursdayLab, "thursdayLab");

  // Wait for preLabCourses to be set
  // useEffect(() => {
  //   const values = Object.values(courses);
  //   const lab = values.filter(
  //     (labDay) => labDay.lab.lab === "Y" || labDay.lab.lab === ""
  //   );
  //   setPreLabCourses(lab);
  //   for (const child in preLabCourses) {
  //     console.log(
  //       Object.values(preLabCourses[child].lab.labDays).includes("Thursday")
  //     );

  //     if (
  //       Object.values(preLabCourses[child].lab.labDays).includes("Thursday")
  //     ) {
  //       // console.log(preLabCourses[child], "Calender");
  //       setThursdayLab(preLabCourses[child]);
  //     }
  //   }
  // }, [preLabCourses]);

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
    setMonday(filterByValue(courses, "Monday"));

    // Add Tuesday courses to state
    setTuesday(filterByValue(courses, "Tuesday"));

    // Add Wednesday courses to state
    setWednesday(filterByValue(courses, "Wednesday"));

    // Add Thursday courses to state
    setThursday(filterByValue(courses, "Thursday"));

    // Add Friday courses to state
    setFriday(filterByValue(courses, "Friday"));
  }, [courses]);

  // console.log({
  //   thursday: thursday,
  //   thursdayLab: thursdayLab,
  // });

  // console.log({
  //   // Monday: monday.length,
  //   // Tuesday: tuesday,
  //   // Wednesday: wednesday,
  //   // Thursday: thursday,
  //   // Friday: friday,
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

        {courses && labCourses && day === "M" ? (
          <Monday courses={monday} lab={mondayLab} />
        ) : day === "T" ? (
          <Tuesday courses={tuesday} lab={tuesdayLab} />
        ) : day === "W" ? (
          <Wednesday courses={wednesday} lab={wednesdayLab} />
        ) : day === "Th" ? (
          <Thursday courses={thursday} lab={thursdayLab} />
        ) : day === "F" ? (
          <Friday courses={friday} lab={fridayLab} />
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
