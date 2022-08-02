import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";

import { CourseSchema1 } from "./../../../utils/Validation";

import Button from "../Button";
import Colors from "../../../utils/Colors";
import Container from "../../auth/Container";

const C1 = ({ navigation }) => {
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
      <View style={{ padding: 10, flex: 1 }}>
        <Formik
          initialValues={{
            title: "",
            code: "",
            credits: "",
            instructor: "",
          }}
          validationSchema={CourseSchema1}
          onSubmit={(C1) => {
            try {
              navigation.navigate("C2", {
                C1,
              });
            } catch (err) {
              alert(err);
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
              <View>
                {/* Course Name */}
                <Input
                  placeholder="Course Title (e.g. Introduction to Programming)"
                  onChangeText={props.handleChange("title")}
                  value={props.values.title}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.title}
                  autoCapitalize="words"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* Spacer */}
                <View style={{ height: 10 }} />
                {/* Course Code */}
                <Input
                  placeholder="Course Code with Section (e.g. CPSC-124-01)"
                  onChangeText={props.handleChange("code")}
                  value={props.values.code}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.code}
                  autoCapitalize="characters"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* Spacer */}
                <View style={{ height: 10 }} />
                {/* Course Credits */}
                <Input
                  keyboardType="number-pad"
                  placeholder="Credits (e.g. 0, 0.5, 1.0)"
                  onChangeText={props.handleChange("credits")}
                  value={props.values.credits}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.credits}
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* Spacer */}
                <View style={{ height: 10 }} />
                {/* Course Instructor */}
                <Input
                  placeholder="Instructor (e.g. John Doe)"
                  onChangeText={props.handleChange("instructor")}
                  value={props.values.instructor}
                  onSubmitEditing={props.handleSubmit}
                  inputStyle={{
                    color: Colors.white,
                    fontSize: 17,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: Colors.white,
                    borderBottomWidth: 1,
                  }}
                  errorMessage={props.errors.instructor}
                  autoComplete="name"
                  autoCapitalize="words"
                  containerStyle={{
                    marginVertical: 10,
                  }}
                />
              </View>
              {/* Spacer */}
              <View style={{ height: 10 }} />
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                {/* Submit */}
                <Button label="Next" onPress={props.handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default C1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
