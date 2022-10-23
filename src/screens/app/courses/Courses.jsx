import { useState, useContext, useEffect } from "react";

// Dependencies
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FirebaseContext } from "../../../helpers/FirebaseContext";

import CourseItem from "../../../components/app/course/CourseItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../../utils/Colors";

const Courses = ({ navigation }) => {
  // Context
  const Firebase = useContext(FirebaseContext);

  // State
  const [courses, setCourses] = useState();

  // Get Courses
  const getCourses = async () => {
    try {
      const q = await Firebase.getCourses();
      const data = q.docs.map((doc) => doc.data());

      setCourses(data);
    } catch (err) {
      console.log("Error @getCourses.courseItem: ", err.message);
    }
  };

  // Get Courses on mount
  useEffect(() => {
    getCourses();
  }, []);

  // Safe Area Insets
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          {
            // flex: 1,
          }
        }
      >
        <Text>Test</Text>
      </View>
      <View>
        {courses ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={
                {
                  // marginBottom: insets.bottom,
                }
              }
            >
              {courses.map((course) => (
                // TODO: Fix issue of not real time updates
                <CourseItem
                  key={course.courseInformation.courseCode}
                  course={course}
                  onPress={() =>
                    navigation.navigate("Course Details", { course })
                  }
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={Colors.lavenderBlue} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    justifyContent: "space-between",
  },
});
