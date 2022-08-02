import Colors from "../../../utils/Colors";
import { View, TouchableOpacity, Text } from "react-native";

const Choice = ({ choice, onPress, setChoice, setEnabled }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // padding: 10,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.lavenderBlue,
            borderRadius: 10,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: choice === "Y" ? Colors.lavenderBlue : "#000",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: choice === "Y" ? "bold" : "200",
              color: Colors.white,
              textAlign: "center",
            }}
          >
            Y
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ width: 5 }} />
      <TouchableOpacity
        onPress={() => {
          setChoice("N");
          setEnabled(false);
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.lavenderBlue,
            borderRadius: 10,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: choice === "N" ? Colors.lavenderBlue : "#000",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: choice === "N" ? "bold" : "200",
              color: Colors.white,
              textAlign: "center",
            }}
          >
            N
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Choice;
