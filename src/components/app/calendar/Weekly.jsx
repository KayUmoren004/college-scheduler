// import React from "react";
// import { SafeAreaView } from "react-native";

// // Dependencies
// import { StyleSheet, Text, View } from "react-native";

// import { Left, Top } from "../../../utils/Picks";

// // Weekly Breakdown
// // Left Side = Time (8am - 8pm)
// // Top Side = Days (Mon - Fri)

// // Left Component
// const LeftSide = () => {
//   return (
//     <View
//       style={{
//         // flexDirection: "row",
//         justifyContent: "space-evenly",
//       }}
//     >
//       {Left.map((time) => {
//         return (
//           <View key={time}>
//             <Text
//               style={{
//                 color: "#fff",
//               }}
//             >
//               {time}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// // Top Component
// const TopSide = () => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//       }}
//     >
//       {Top.map((day) => {
//         return (
//           <View key={day}>
//             <Text
//               style={{
//                 color: "#fff",
//               }}
//             >
//               {day}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const Weekly = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <TopSide />
//         <View>
//           <LeftSide />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Weekly;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
// });

import React, { useContext, useState, useEffect } from "react";

// Dependencies
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import moment from "moment";

import { FirebaseContext } from "../../../helpers/FirebaseContext";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";

// Days
import Monday from "./days/Monday";
import Tuesday from "./days/Tuesday";
import Wednesday from "./days/Wednesday";
import Thursday from "./days/Thursday";
import Friday from "./days/Friday";
import Switcher from "./Switcher";

const Weekly = ({ navigation }) => {
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
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          // marginBottom: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={40}
            style={{
              borderColor: Colors.eggshell,
              marginRight: 10,
              borderRadius: 10,
              borderWidth: 2,
              color: Colors.lavenderBlue,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Weekly Schedule
        </Text>
      </View>
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

export default Weekly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
  },
});
