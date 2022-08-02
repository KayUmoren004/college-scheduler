import { Picker } from "@react-native-picker/picker";

const RNPicker = ({ selectedValue, setPick, onClose, data }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        setPick(itemValue);
      }}
      style={{ height: 50, width: 100 }}
      itemStyle={{ fontSize: 20, height: 50 }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <Picker.Item label={item} value={item} key={index} color="#fff" />
          );
        })}
    </Picker>
  );
};

export default RNPicker;
