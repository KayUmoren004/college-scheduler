import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState, useEffect, useContext } from "react";

import { CourseSchema3 } from "./../../../utils/Validation";
import { hours, minutes, ms } from "./../../../utils/Picks";

import Button from "../Button";
import Colors from "../../../utils/Colors";
import Container from "../../auth/Container";
import Days from "./Days";
import RNPicker from "./Picker";
import Choice from "./Choice";

import { FirebaseContext } from "../../../helpers/FirebaseContext";

const C3 = ({ navigation, route }) => {
  const { values } = route.params;

  // Context
  const Firebase = useContext(FirebaseContext);

  // State
  // Days
  const [labDays, setLabDays] = useState([]);

  // Time
  const [labStartHour, setLabStartHour] = useState("1");
  const [labStartMinute, setLabStartMinute] = useState("00");
  const [labEndHour, setLabEndHour] = useState("1");
  const [labEndMinute, setLabEndMinute] = useState("00");
  const [labStartMS, setLabStartMS] = useState("AM");
  const [labEndMS, setLabEndMS] = useState("AM");

  // Choice
  const [disabled, setDisabled] = useState(true);
  const [choice, setChoice] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Building
  const [labLocation, setLabLocation] = useState(null);

  // Select Days
  const selectDays = (day) => {
    setLabDays((state) => [...state, day]);
  };

  // check if labDay is in labDays
  const isSelected = (day) => {
    return labDays.includes(day) ? true : false;
  };

  // run isSelected on every state update
  useEffect(() => {
    isSelected();
  }, [labDays]);

  // Loading
  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.eggshell} />
      </View>
    );
  };

  return (
    <Container style={styles.container}>
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
          Add a Lab to your Course
        </Text>
      </View>
      {/* Body */}
      <View
        style={{
          padding: 10,
          flex: 1,
        }}
      >
        <Formik
          initialValues={{
            labBuilding: "",
            labRoom: "",
          }}
          validationSchema={CourseSchema3}
          onSubmit={async (val) => {
            setLoading(true);
            const Course = {
              classDays: Object.assign({}, values.C2.classDays),
              classTimes: {
                start: values.C2.classStartTime,
                end: values.C2.classEndTime,
              },
              classLocation: values.C2.classLocation,
              courseInformation: {
                courseTitle: values.C1.title,
                courseCode: values.C1.code,
                courseCredits: values.C1.credits,
                courseInstructor: values.C1.instructor,
              },
              lab: {
                lab: "Y",
                labLocation: {
                  building: val.labBuilding,
                  room: val.labRoom,
                },
                labDays: Object.assign({}, labDays),
                labTimes: {
                  start: `${labStartHour}:${labStartMinute} ${labStartMS}`,
                  end: `${labEndHour}:${labEndMinute} ${labEndMS}`,
                },
              },
            };

            try {
              await Firebase.addCourse(Course);
            } catch (err) {
              console.log("Error @C3.addCourse: ", err.message);
            } finally {
              setLoading(false);
              navigation.navigate("Bottom", {
                screen: "Courses",
              });
            }
          }}
        >
          {(props) => (
            <View
              style={{
                flexDirection: "column",
                flex: 1,
              }}
            >
              {/* Form */}
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                {/* Building */}
                <Input
                  placeholder="Lab Building"
                  onChangeText={props.handleChange("labBuilding")}
                  value={props.values.labBuilding}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.labBuilding}
                  autoCapitalize="words"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* Room */}
                <Input
                  placeholder="Lab Room"
                  onChangeText={props.handleChange("labRoom")}
                  value={props.values.labRoom}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.labRoom}
                  autoCapitalize="words"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Days */}
              <View
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderColor: Colors.eggshell,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "200",
                    marginBottom: 10,
                  }}
                >
                  Lab Days:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Days
                    onPress={() => selectDays("Monday")}
                    title="M"
                    disabled={isSelected("Monday")}
                  />
                  <Days
                    onPress={() => selectDays("Tuesday")}
                    title="T"
                    disabled={isSelected("Tuesday")}
                  />
                  <Days
                    onPress={() => selectDays("Wednesday")}
                    title="W"
                    disabled={isSelected("Wednesday")}
                  />
                  <Days
                    onPress={() => selectDays("Thursday")}
                    title="T"
                    disabled={isSelected("Thursday")}
                  />
                  <Days
                    onPress={() => selectDays("Friday")}
                    title="F"
                    disabled={isSelected("Friday")}
                  />
                </View>
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Time */}
              <View
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderColor: Colors.eggshell,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "200",
                    marginBottom: 10,
                  }}
                >
                  Lab Time:
                </Text>
                {/* Start Time */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {/* Hour */}
                  <RNPicker
                    data={hours}
                    selectedValue={labStartHour}
                    setPick={(val) => setLabStartHour(val)}
                  />
                  {/* Minute */}
                  <RNPicker
                    data={minutes}
                    selectedValue={labStartMinute}
                    setPick={(val) => setLabStartMinute(val)}
                  />
                  {/* AM/PM */}
                  <RNPicker
                    data={ms}
                    selectedValue={labStartMS}
                    setPick={(val) => setLabStartMS(val)}
                  />
                </View>
                {/* Spacer/TO */}
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
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
                    TO
                  </Text>
                </View>
                {/* End Time */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {/* Hour */}
                  <RNPicker
                    data={hours}
                    selectedValue={labEndHour}
                    setPick={(val) => setLabEndHour(val)}
                  />
                  {/* Minute */}
                  <RNPicker
                    data={minutes}
                    selectedValue={labEndMinute}
                    setPick={(val) => setLabEndMinute(val)}
                  />
                  {/* AM/PM */}
                  <RNPicker
                    data={ms}
                    selectedValue={labEndMS}
                    setPick={(val) => setLabEndMS(val)}
                  />
                </View>
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Submit */}
              <View style={{}}>
                {loading && <Loading />}
                {!loading && (
                  <Button label="Submit" onPress={props.handleSubmit} />
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default C3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
