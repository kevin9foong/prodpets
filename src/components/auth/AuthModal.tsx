import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AuthType } from "../../screens/AuthScreen";
import AuthContext from "../../context/AuthContext";
import AuthModalStyles from "../../styles/components/auth/AuthModal.style";
import IconButton from "../commons/IconButton";

type StateProps = {
  isVisible: boolean;
  setIsVisible: () => void;
  handleSubmitAuthDetails: () => void;
  authType: AuthType;
};

const AuthModal: React.FC<StateProps> = ({
  isVisible,
  setIsVisible,
  handleSubmitAuthDetails,
  authType,
}: StateProps) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useContext(AuthContext);

  return (
    <Modal
      style={AuthModalStyles.container}
      isVisible={isVisible}
      onBackButtonPress={setIsVisible}
      onBackdropPress={setIsVisible}
      backdropOpacity={0}
    >
      <View style={AuthModalStyles.modalContentContainer}>
        <View style={AuthModalStyles.inputUserContainer}>
          <TextInput
            style={AuthModalStyles.input}
            value={userName}
            onChangeText={(val) => setUserName(val)}
            placeholder="USERNAME"
          />
          <TextInput
            style={AuthModalStyles.input}
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="PASSWORD"
          />
          <TouchableOpacity
            onPress={handleSubmitAuthDetails}
            style={AuthModalStyles.button}
          >
            <Text style={AuthModalStyles.buttonText}>
              {authType === "login" ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={AuthModalStyles.oAuthContainer}>
          <IconButton
            iconName={"google"}
            buttonText={
              authType === "login"
                ? "Log in with Google"
                : "Sign up with Google"
            }
            handleButtonPress={login}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
