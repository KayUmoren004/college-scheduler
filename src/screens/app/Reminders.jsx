import React, { useEffect, useState } from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import icsToJson from "ics-to-json";
import Reminder from "../../components/app/reminders/Reminder";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { UserContext } from "../../helpers/UserContext";
import moment from "moment";

const Reminders = ({ navigation }) => {
  // Context
  const [User] = React.useContext(UserContext);

  const convert = async (fileLocation) => {
    const icsRes = await fetch(fileLocation);
    const icsData = await icsRes.text();
    // Convert
    const data = icsToJson(icsData);
    return data;
  };

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

  useEffect(() => {
    const getCalendar = async () => {
      const data = await convert(User.canvasLink);
      // setReminders(data);

      // Put past reminders at the bottom
      const pastReminders = data.filter((el) => {
        return convertDate(el.startDate) < moment().format("MM/DD/YYYY");
      });

      // Put future reminders at the top
      const futureReminders = data.filter((el) => {
        return convertDate(el.startDate) >= moment().format("MM/DD/YYYY");
      });

      // reverse past reminders
      const reversedPastReminders = pastReminders.reverse();

      // Combine past and future reminders
      const combinedReminders = [...futureReminders, ...reversedPastReminders];

      setReminders(combinedReminders);
    };
    getCalendar();
  }, [User]);

  // State
  const [reminders, setReminders] = useState();

  // Safe Area Insets
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {reminders ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginVertical: insets.bottom }}>
              {reminders.map((item) => {
                return (
                  <Reminder
                    key={
                      // Loop to generate unique key
                      Math.random().toString(36).substring(7)
                    }
                    reminder={item}
                  />
                );
              })}
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
            <ActivityIndicator size="large" />
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "200" }}>
              Loading reminders..
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
