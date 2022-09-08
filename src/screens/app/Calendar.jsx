import React, { useContext, useState, useEffect } from "react";

// Dependencies
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { FirebaseContext } from "../../helpers/FirebaseContext";

const Calendar = () => {
  // Context
  const Firebase = useContext(FirebaseContext);

  // State
  const [courses, setCourses] = useState();

  // Get Courses
  const getCourses = async () => {
    try {
      const q = await Firebase.getCourses();
      const data = q.docs.map((doc) => doc.data());
      // console.log("courses: ", data[0].classDays);
      setCourses(data);
    } catch (err) {
      console.log("Error @getCourses: ", err.message);
    }
  };

  // Get Courses on mount
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Date */}
      <View
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
      </View>
      {/* Courses */}
      <View></View>
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
