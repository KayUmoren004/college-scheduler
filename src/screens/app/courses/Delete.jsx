import React, { useContext, useEffect, useState } from "react";

// Dependencies
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Colors from "../../../utils/Colors";
import DeleteItem from "../../../components/app/delete/DeleteItem";

import { FirebaseContext } from "../../../helpers/FirebaseContext";

const Delete = ({ navigation }) => {
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
      console.log("Error @getCourses.deleteItem: ", err.message);
    }
  };

  // Get Courses on mount
  useEffect(() => {
    getCourses();
  }, []);

  // console.log("courses: ", courses);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
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
          Delete a Course
        </Text>
      </View>
      {/* Body */}
      <View style={{ padding: 10, flex: 1 }}>
        {courses &&
          courses.map((course) => (
            <DeleteItem
              key={course.courseInformation.courseCode}
              course={course}
              onPress={() => console.log("Delete Course")}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

export default Delete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
