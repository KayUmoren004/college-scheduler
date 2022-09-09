import React, { useEffect, useState } from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Thursday = ({ courses = [], lab = [] }) => {
  // console.log(courses);
  //console.log(lab, "lab");
  const [actualLab, setActualLab] = useState([]);

  const filterByValue = (array, value) =>
    array.filter((el) => {
      const objValues = Object.values(el).flat();
      // console.log(objValues);
      const elementsValues = objValues.map((v) => Object.values(v)).flat();
      // console.log(elementsValues);
      return elementsValues.some((v) => v.toString().includes(value));
    });

  // Filter labCourses for Thursday
  useEffect(() => {
    // for (const child in lab) {
    //   if (Object.values(lab[child].lab.labDays).includes("Thursday")) {
    //     setActualLab(lab[child]);
    //   }
    // }
    setActualLab(filterByValue(lab.lab, "Thursday"));
    // console.log(labCourses);
  }, [lab]);
  console.log(actualLab, "actualLab");
  return (
    <View style={styles.container}>
      {courses &&
        courses.map((course, idx) => {
          return (
            <View key={idx}>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                {course.courseInformation.courseTitle}
              </Text>
            </View>
          );
        })}
      {actualLab &&
        actualLab.map((course, idx) => {
          return (
            <View key={idx}>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                {course.courseInformation.courseTitle}
              </Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
