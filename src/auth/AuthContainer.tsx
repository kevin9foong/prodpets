import React, { useEffect, useMemo } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import firebase from "../firebase";
import "firebase/auth";

import { useAppDispatch } from "../redux/hooks";
import { login, logout } from "../redux/actions/user";
import AuthContext from "../context/AuthContext";
import { googleAuthRequestClientIds } from "../config/secrets";
import { saveUser, UserModel } from "../database/models/user";

type StateProps = {
  children: React.ReactNode;
};

WebBrowser.maybeCompleteAuthSession();

const AuthContainer = ({ children }: StateProps): JSX.Element => {
  // see: https://github.com/expo/expo/issues/12808 for this expo undocumented function
  const [req, res, promptAsync] = Google.useIdTokenAuthRequest(
    googleAuthRequestClientIds
  );

  const dispatch = useAppDispatch();

  useEffect(() =>
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        saveUser(user as UserModel);
        dispatch(login(user.uid));
      } else {
        dispatch(logout());
      }
    })
  );

  useEffect(() => {
    if (res?.type === "success") {
      onSignIn(res);
    }
  }, [req, res]);

  const authContext = useMemo(
    () => ({
      login: () => {
        promptAsync();
      },
      logout: () => {
        dispatch(LOGOUT());
      },
    }),
    [promptAsync]
  );

  const onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      // Build Firebase credential with the Google ID token.
      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.params.id_token
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          console.error("Error during sign in:", error.code, error.message);
        });
    });
  };

  return (
    <>
      {!req ? (
        // replace with splash screen
        <></>
      ) : (
        <AuthContext.Provider value={authContext}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AuthContainer;
