import React, { useEffect, useState } from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import Functions from "../../../../helpers/Functions";
import moment from "moment";
import Item from "../../schedule/Item";

const Monday = ({ courses, lab }) => {
  const [labMonday, setLabMonday] = useState([]);

  // Get lab courses by finding if lab.labDays includes Monday
  const getLabMonday = () => {
    if (lab) {
      const labMonday = lab.filter(
        (labDay) =>
          Object.values(labDay.lab.labDays).includes("Monday") &&
          labDay.lab.lab === "Y"
      );
      setLabMonday(
        labMonday.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        )
      );
    }
  };

  // Run getLabMonday on mount
  useEffect(() => {
    getLabMonday();
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
      {labMonday &&
        Object.values(labMonday).map((course, idx) => {
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

export default Monday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
