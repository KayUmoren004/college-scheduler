import React, { useEffect } from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Colors from "../../../utils/Colors";

const Reminder = ({ reminder }) => {
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

  // change color based on date
  const changeColor = (date) => {
    if (
      moment(convertDate(date.startDate)).isAfter(moment().format("MM/DD/YYYY"))
    ) {
      return "green";
    } else if (
      moment(convertDate(date.startDate)).isSame(moment().format("MM/DD/YYYY"))
    ) {
      return Colors.hookersGreen;
    } else {
      return "red";
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff" }}>{reminder.summary}</Text>
      </View>
      <View>
        {convertDate(reminder.startDate) === convertDate(reminder.endDate) ? (
          <Text
            style={{
              color: changeColor(reminder),
            }}
          >
            Due Date: {convertDate(reminder.startDate)}
          </Text>
        ) : (
          <Text
            style={{
              color: changeColor(reminder),
            }}
          >
            Date: {convertDate(reminder.startDate)} -{" "}
            {convertDate(reminder.endDate)}
          </Text>
        )}
      </View>
      {/* Divider */}
      <View
        style={{
          borderBottomColor: "#fff",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
    //  marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
