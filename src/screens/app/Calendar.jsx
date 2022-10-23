import React, { useContext, useState, useEffect } from "react";

// Dependencies
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import moment from "moment";

import { FirebaseContext } from "../../helpers/FirebaseContext";
import { UserContext } from "../../helpers/UserContext";

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
  const [User] = useContext(UserContext);

  // State
  const [courses, setCourses] = useState([]);
  const [labCourses, setLabCourses] = useState([]);
  const [day, setDay] = useState("M");
  const [today, setToday] = useState(moment().format("dddd"));
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();

  // on mount, set day === today
  useEffect(() => {
    setDay(today);
  }, []);

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
      const elementsValues = objValues.map((v) => Object.values(v)).flat();
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

    //

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

  const Today = () => {
    switch (today) {
      case "Monday":
        return <Monday courses={monday} labCourses={labCourses} />;
      case "Tuesday":
        return <Tuesday courses={tuesday} labCourses={labCourses} />;
      case "Wednesday":
        return <Wednesday courses={wednesday} labCourses={labCourses} />;
      case "Thursday":
        return <Thursday courses={thursday} labCourses={labCourses} />;
      case "Friday":
        return <Friday courses={friday} labCourses={labCourses} />;

      default:
        return (
          <Text
            style={{
              color: "red",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No Classes Today
          </Text>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "200",
            color: "#fff",
          }}
        >
          Today:{" "}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {today}
          </Text>
        </Text>
      </View>
      {/* Courses */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Today day={today} />
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
