import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButtonStyles from "../../styles/components/commons/IconButton.style";

type StateProps = {
  iconName: keyof typeof FontAwesome.glyphMap;
  handleButtonPress: () => void;
  buttonText: string;
};

const IconButton: React.FC<StateProps> = ({
  iconName,
  handleButtonPress,
  buttonText,
}: StateProps) => {
  return (
    <View style={IconButtonStyles.container}>
      <FontAwesome.Button
        style={IconButtonStyles.button}
        name={iconName}
        size={30}
        backgroundColor="#DD4B39"
        underlayColor="fff"
        activeOpacity={0.5}
        onPress={handleButtonPress}
      >
        {buttonText}
      </FontAwesome.Button>
    </View>
  );
};

export default IconButton;
