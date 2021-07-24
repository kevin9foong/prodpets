import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AndroidDateTimePickerStyle from "../../styles/components/commons/AndroidDateTimePicker.style";

type DateTimePickerModes = "date" | "time";

type StateProps = {
  value: Date;
  onChange: (value: Date) => void;
};

const AndroidDateTimePicker = ({
  value,
  onChange,
}: StateProps): JSX.Element => {
  const [mode, setMode] = useState<DateTimePickerModes>("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode: DateTimePickerModes) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeDateTime = (
    _event: unknown,
    selectedValue: Date | undefined
  ) => {
    const currentDate = selectedValue || value;
    setShow(false);
    onChange(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={AndroidDateTimePickerStyle.container}>
      <View style={AndroidDateTimePickerStyle.dateTimePickerContainer}>
        <TouchableOpacity
          style={AndroidDateTimePickerStyle.dateTimePicker}
          onPress={showDatepicker}
        >
          <Text>{`${value.toDateString()}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={AndroidDateTimePickerStyle.dateTimePickerContainer}>
        <TouchableOpacity
          style={AndroidDateTimePickerStyle.dateTimePicker}
          onPress={showTimepicker}
        >
          <Text>{`${value.getHours() % 12}:${value.getMinutes()} ${
            value.getHours() > 12 ? "pm" : "am"
          }`}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </View>
  );
};

export default AndroidDateTimePicker;
