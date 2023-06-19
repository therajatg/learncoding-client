import { useContext, createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    firstName: null,
    accessToken: null,
  });

  // useEffect(() => {
  //   const jwtToken = Cookies.get("jwt");
  //   authDispatch({ type: "TOKEN", payload: jwtToken });
  // }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
