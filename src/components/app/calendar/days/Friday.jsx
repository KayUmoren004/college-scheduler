import React, { useEffect, useState } from "react";

// Dependencies
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import Item from "../../schedule/Item";

const Friday = ({ courses, lab }) => {
  const [labFriday, setLabFriday] = useState([]);

  // Get lab courses by finding if lab.labDays includes Friday
  const getLabFriday = () => {
    if (lab) {
      const labFriday = lab.filter(
        (labDay) =>
          Object.values(labDay.lab.labDays).includes("Friday") &&
          labDay.lab.lab === "Y"
      );
      setLabFriday(
        labFriday.sort(
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

  // Run getLabFriday on mount
  useEffect(() => {
    getLabFriday();
  }, []);
  return (
    <View style={styles.container}>
      {courses &&
        courses.map((course, idx) => {
          return (
            <View key={idx}>
              <Item course={course} />
            </View>
          );
        })}
      {labFriday &&
        Object.values(labFriday).map((course, idx) => {
          return (
            <View key={idx}>
              <Item course={course} />
            </View>
          );
        })}
    </View>
  );
};

export default Friday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
