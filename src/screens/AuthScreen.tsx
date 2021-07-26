import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import AuthScreenStyles from "../styles/screens/AuthScreen.style";

import AuthModal from "../components/auth/AuthModal";

export type AuthType = "login" | "register" | undefined;

const AuthScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(undefined);

  const showModal = (authType: AuthType): void => {
    setAuthType(authType);
    setIsVisible(true);
  };

  return (
    <View style={AuthScreenStyles.container}>
      <View style={AuthScreenStyles.logoContainer}>
        <Image
          style={AuthScreenStyles.logo}
          source={require("../../assets/logo.png")}
        />
      </View>
      <View style={AuthScreenStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => showModal("register")}
          style={AuthScreenStyles.actionButton}
        >
          <Text style={AuthScreenStyles.actionButtonText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showModal("login")}
          style={AuthScreenStyles.actionButton}
        >
          <Text style={AuthScreenStyles.actionButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <AuthModal
        isVisible={isVisible}
        setIsVisible={() => {
          setIsVisible(!isVisible);
        }}
        handleSubmitAuthDetails={() => {
          console.log("Submitting");
        }}
        authType={authType}
      />
    </View>
  );
};

export default AuthScreen;
