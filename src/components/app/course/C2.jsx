import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState, useEffect, useRef } from "react";

import { CourseSchema2 } from "./../../../utils/Validation";
import { hours, minutes, ms } from "./../../../utils/Picks";

import Button from "../Button";
import Colors from "../../../utils/Colors";
import Container from "../../auth/Container";
import Days from "./Days";
import RNPicker from "./Picker";
import Choice from "./Choice";

const C2 = ({ navigation, route }) => {
  const { C1 } = route.params;

  // State
  // Days
  const [classDays, setClassDays] = useState([]);

  // Time
  const [classStartHour, setClassStartHour] = useState("1");
  const [classStartMinute, setClassStartMinute] = useState("00");
  const [classEndHour, setClassEndHour] = useState("1");
  const [classEndMinute, setClassEndMinute] = useState("00");
  const [classStartMS, setClassStartMS] = useState("AM");
  const [classEndMS, setClassEndMS] = useState("AM");

  // Choice
  const [disabled, setDisabled] = useState(true);
  const [choice, setChoice] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Building
  const [classLocation, setClassLocation] = useState(null);

  // Select Days
  const selectDays = (day) => {
    setClassDays((state) => [...state, day]);
  };

  // check if classDay is in classDays
  const isSelected = (day) => {
    return classDays.includes(day) ? true : false;
  };

  // run isSelected on every state update
  useEffect(() => {
    isSelected();
  }, [classDays]);

  // Loading
  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.eggshell} />
      </View>
    );
  };

  //Ref
  const formikRef = useRef(null);

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
          Add a Course
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
          innerRef={formikRef}
          initialValues={{
            classBuilding: "",
            classRoom: "",
          }}
          validationSchema={CourseSchema2}
          onSubmit={(val) => {
            setClassLocation({
              building: val.classBuilding,
              room: val.classRoom,
            });
            console.log({
              C1,
              classDays,
              classStartTime: `${classStartHour}:${classStartMinute} ${classStartMS}`,
              classEndTime: `${classEndHour}:${classEndMinute} ${classEndMS}`,
              classLocation: {
                building: val.classBuilding,
                room: val.classRoom,
              },
              lab: choice,
            });
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
                  placeholder="Class Building"
                  onChangeText={props.handleChange("classBuilding")}
                  value={props.values.classBuilding}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.classBuilding}
                  autoCapitalize="words"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* Room */}
                <Input
                  placeholder="Class Room"
                  onChangeText={props.handleChange("classRoom")}
                  value={props.values.classRoom}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.classRoom}
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
                  Class Days:
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
                  Class Time:
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
                    selectedValue={classStartHour}
                    setPick={(val) => setClassStartHour(val)}
                  />
                  {/* Minute */}
                  <RNPicker
                    data={minutes}
                    selectedValue={classStartMinute}
                    setPick={(val) => setClassStartMinute(val)}
                  />
                  {/* AM/PM */}
                  <RNPicker
                    data={ms}
                    selectedValue={classStartMS}
                    setPick={(val) => setClassStartMS(val)}
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
                    selectedValue={classEndHour}
                    setPick={(val) => setClassEndHour(val)}
                  />
                  {/* Minute */}
                  <RNPicker
                    data={minutes}
                    selectedValue={classEndMinute}
                    setPick={(val) => setClassEndMinute(val)}
                  />
                  {/* AM/PM */}
                  <RNPicker
                    data={ms}
                    selectedValue={classEndMS}
                    setPick={(val) => setClassEndMS(val)}
                  />
                </View>
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Lab Choice */}
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "200",
                  }}
                >
                  Does your course have a lab class?{" "}
                </Text>
                <Choice
                  choice={choice}
                  onPress={() => {
                    setChoice("Y");
                    setDisabled(true);

                    navigation.navigate("C3", {
                      // values: {
                      //   values,
                      //   classDays,
                      //   classStartTime: `${classStartHour}:${classStartMinute} ${classStartMS}`,
                      //   classEndTime: `${classEndHour}:${classEndMinute} ${classEndMS}`,
                      //   lab: choice,
                      //   classLocation: {
                      //     building: props.values.classBuilding,
                      //     room: props.values.classRoom,
                      //   },
                      // },
                      values: {
                        C1,
                        C2: {
                          classDays,
                          classStartTime: `${classStartHour}:${classStartMinute} ${classStartMS}`,
                          classEndTime: `${classEndHour}:${classEndMinute} ${classEndMS}`,
                          lab: choice,
                          classLocation: {
                            building: props.values.classBuilding,
                            room: props.values.classRoom,
                          },
                        },
                      },
                    });
                  }}
                  setChoice={setChoice}
                  setEnabled={setDisabled}
                />
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              {/* Submit */}
              <View style={{}}>
                <Button
                  label={choice === "Y" ? "Next" : "Submit"}
                  onPress={props.handleSubmit}
                  disabled={disabled}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default C2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
