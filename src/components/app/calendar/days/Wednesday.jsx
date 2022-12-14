import React, { useEffect, useState } from "react";

// Dependencies
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import Item from "../../schedule/Item";

const Wednesday = ({ courses, lab }) => {
  const [labWednesday, setLabWednesday] = useState([]);

  // Get lab courses by finding if lab.labDays includes Wednesday
  const getLabWednesday = () => {
    if (lab) {
      const labWednesday = lab.filter(
        (labDay) =>
          Object.values(labDay.lab.labDays).includes("Wednesday") &&
          labDay.lab.lab === "Y"
      );
      setLabWednesday(
        labWednesday.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        )
      );
    }
  };

  // Sort classes byt start in courses.classTImes only when courses is not empty
  useEffect(() => {
    Array.isArray(courses)
      ? courses.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        )
      : [];
  }, [courses]);

  // Run getLabWednesday on mount
  useEffect(() => {
    getLabWednesday();
  }, []);

  return (
    <View style={styles.container}>
      {courses &&
        courses.map((course, idx) => {
          return (
            <View
              style={{
                margin: 5,
              }}
              key={idx}
            >
              <Item course={course} />
            </View>
          );
        })}
      {labWednesday &&
        Object.values(labWednesday).map((course, idx) => {
          return (
            <View
              style={{
                margin: 5,
              }}
              key={idx}
            >
              <Item course={course} />
            </View>
          );
        })}
    </View>
  );
};

export default Wednesday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
