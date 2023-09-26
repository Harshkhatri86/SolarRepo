//     Developed by Harsh Khatri

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  // GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  FacebookAuthProvider,
  getRedirectResult
} from "firebase/auth";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    console.log(email);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();

    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);


    // auth.signInWithPopup(new FacebookAuthProvider()).catch(function(error) {
    //     // An error happened.
    //     if (error.code === 'auth/account-exists-with-different-credential') {
    //       // Step 2.
    //       // User's email already exists.
    //       // The pending Facebook credential.
    //       console.log(error) ; 
    //       var pendingCred = error.credential;
    //       // The provider account's email address.
    //       var email = error.email;
    //       // Get sign-in methods for this email.
    //       auth.fetchSignInMethodsForEmail(email).then(function(methods) {
    //         // Step 3.
    //         // If the user has several sign-in methods,
    //         // the first method in the list will be the "recommended" method to use.
    //         if (methods[0] === 'password') {
    //           // Asks the user their password.
    //           // In real scenario, you should handle this asynchronously.
    //           var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
    //           auth.signInWithEmailAndPassword(email, password).then(function(result) {
    //             // Step 4a.
    //             return result.user.linkWithCredential(pendingCred);
    //           }).then(function() {
    //             // Facebook account successfully linked to the existing Firebase user.
    //             goToApp();
    //           });
    //           return;
    //         }
    //         // All the other cases are external providers.
    //         // Construct provider object for that provider.
    //         // TODO: implement getProviderForProviderId.
    //         var provider = getProviderForProviderId(methods[0]);
    //         // At this point, you should let the user know that they already have an account
    //         // but with a different provider, and let them validate the fact they want to
    //         // sign in with this provider.
    //         // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
    //         // so in real scenario you should ask the user to click on a "continue" button
    //         // that will trigger the signInWithPopup.
    //         auth.signInWithPopup(provider).then(function(result) {
    //           // Remember that the user may have signed in with an account that has a different email
    //           // address than the first one. This can happen as Firebase doesn't control the provider's
    //           // sign in flow and the user is free to login using whichever account they own.
    //           // Step 4b.
    //           // Link to Facebook credential.
    //           // As we have access to the pending credential, we can directly call the link method.
    //           result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
    //             // Facebook account successfully linked to the existing Firebase user.
    //             goToApp();
    //           });
    //         });
    //       });
    //     }
    //   });
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        googleSignIn,
        setUpRecaptcha,
        facebookSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
