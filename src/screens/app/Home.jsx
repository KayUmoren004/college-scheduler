import { useContext, useEffect, useState } from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import icsToJson from "ics-to-json";

import { FirebaseContext } from "../../helpers/FirebaseContext";
import { UserContext } from "../../helpers/UserContext";
import Item from "../../components/app/schedule/Item";
import Reminder from "../../components/app/reminders/Reminder";
import Colors from "../../utils/Colors";

// Home Screen Breakdown
// class now - by time
// class next - by time
// reminders - by date
// notes

const Home = () => {
  // State
  const [preSort, setPreSort] = useState([]);
  const [courses, setCourses] = useState([]);
  const today = moment().format("dddd");
  const now = moment().format("hh:mm a");
  const [classNow, setClassNow] = useState();
  const [classNext, setClassNext] = useState();
  const [reminders, setReminders] = useState();

  // Context
  const Firebase = useContext(FirebaseContext);
  const [User] = useContext(UserContext);

  // Get Courses
  const getCourses = async () => {
    try {
      const q = await Firebase.getCourses();
      const data = q.docs.map((doc) => doc.data());
      setPreSort(data);
    } catch (err) {
      console.log("Error @getCourses.home: ", err.message);
    }
  };

  // Get Courses on mount
  useEffect(() => {
    getCourses();
  }, []);

  const filterByValue = (array, value) =>
    array.filter((el) => {
      const objValues = Object.values(el).flat();
      const elementsValues = objValues.map((v) => Object.values(v)).flat();
      return elementsValues.some((v) => v.toString().includes(value));
    });

  // Filter by day
  useEffect(() => {
    setCourses(
      filterByValue(
        preSort.sort(
          (a, b) =>
            moment(a.classTimes.start, "hh:mm a").unix() -
            moment(b.classTimes.start, "hh:mm a").unix()
        ),
        today
      )
    );
  }, [preSort]);

  // Filter by time
  useEffect(() => {
    setClassNow(
      courses.filter(
        (course) =>
          moment(course.classTimes.start, "hh:mm a").unix() <=
            moment(now, "hh:mm a").unix() &&
          moment(course.classTimes.end, "hh:mm a").unix() >=
            moment(now, "hh:mm a").unix()
      )
    );

    // Get only one class for next class
    setClassNext(
      courses.filter(
        (course) =>
          moment(course.classTimes.start, "hh:mm a").unix() >
          moment(now, "hh:mm a").unix()
      )
    );
  }, [courses]);

  // console.log(newArr[0]);

  const convert = async (link) => {
    const icsRes = await fetch(link);
    const icsData = await icsRes.text();
    const data = icsToJson(icsData);

    return data;
  };

  // Get reminders for today
  const getReminders = async () => {
    const data = await convert(User.canvasLink);

    // Convert ics date to readable date
    const convertDate = (date) => {
      let d = moment(date).toISOString();
      const parseISOString = (s) => {
        let b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      };
      const isoFormatDMY = (d) => {
        function pad(n) {
          return (n < 10 ? "0" : "") + n;
        }
        return (
          pad(d.getUTCMonth() + 1) +
          "/" +
          pad(d.getUTCDate()) +
          "/" +
          d.getUTCFullYear()
        );
      };

      let last = parseISOString(d);
      return isoFormatDMY(last);
    };

    // Filter by today
    const reminders = data.filter((el) => {
      return convertDate(el.startDate) === moment().format("MM/DD/YYYY");
    });

    setReminders(reminders);
  };

  // Get reminders on mount
  useEffect(() => {
    getReminders();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={{ color: "#fff" }}>Home</Text> */}
      {/* Class Now */}
      {classNow && classNow.length > 0 ? (
        <View style={styles.now}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,

              marginVertical: 20,
            }}
          >
            Class Now
          </Text>
          <Now course={classNow} />
        </View>
      ) : (
        <View style={styles.now}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            No Class Now
          </Text>
        </View>
      )}
      {/* Class Next */}
      {classNext && classNext.length > 0 ? (
        <View style={styles.next}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 20,
            }}
          >
            Next Class
          </Text>
          <Next course={classNext} />
        </View>
      ) : (
        <View style={styles.next}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            No Class Next
          </Text>
        </View>
      )}
      {/* Reminders */}
      {reminders && reminders.length > 0 ? (
        <View style={styles.reminders}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Reminders:
          </Text>
          {
            // Map reminders
            reminders.map((reminder, idx) => (
              <Reminder key={idx} reminder={reminder} />
            ))
          }
        </View>
      ) : (
        <View style={styles.reminders}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            No Reminders
          </Text>
        </View>
      )}
      {/* Notes */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "space-evenly",
  },
  now: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
    borderBottomColor: Colors.ashGray,
    borderBottomWidth: 1,
  },
  next: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
    borderBottomColor: Colors.ashGray,
    borderBottomWidth: 1,
  },
  reminders: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

const Now = (course) => <Item course={course.course[0]} />;

const Next = (course) => <Item course={course.course[0]} />;
