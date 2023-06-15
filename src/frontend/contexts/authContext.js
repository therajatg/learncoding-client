import { useContext, createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import Cookies from "js-cookie";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
    token: null,
    error: null,
  });

  useEffect(() => {
    console.log("sdfecwecwef");
    const jwtToken = Cookies.get("jwt");
    authDispatch({ type: "TOKEN", payload: jwtToken });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
