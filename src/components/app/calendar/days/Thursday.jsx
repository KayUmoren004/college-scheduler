import React, { useEffect, useState } from "react";

// Dependencies
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import Item from "../../schedule/Item";
const Thursday = ({ courses, lab }) => {
  const [labThursday, setLabThursday] = useState([]);

  // Get lab courses by finding if lab.labDays includes Thursday
  const getLabThursday = () => {
    if (lab) {
      const labThursday = lab.filter(
        (labDay) =>
          Object.values(labDay.lab.labDays).includes("Thursday") &&
          labDay.lab.lab === "Y"
      );
      setLabThursday(
        labThursday.sort(
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

  // Run getLabThursday on mount
  useEffect(() => {
    getLabThursday();
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
      {labThursday &&
        Object.values(labThursday).map((course, idx) => {
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

export default Thursday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
