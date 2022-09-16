import React, { useEffect, useState } from "react";

// Dependencies
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import Item from "../../schedule/Item";

const Tuesday = ({ courses, lab }) => {
  const [labTuesday, setLabTuesday] = useState([]);

  // Get lab courses by finding if lab.labDays includes Tuesday
  const getLabTuesday = () => {
    if (lab) {
      const labTuesday = lab.filter(
        (labDay) =>
          Object.values(labDay.lab.labDays).includes("Tuesday") &&
          labDay.lab.lab === "Y"
      );
      setLabTuesday(
        labTuesday.sort(
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

  // Run getLabTuesday on mount
  useEffect(() => {
    getLabTuesday();
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
      {labTuesday &&
        Object.values(labTuesday).map((course, idx) => {
          return (
            <View key={idx}>
              <Item course={course} />
            </View>
          );
        })}
    </View>
  );
};

export default Tuesday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
