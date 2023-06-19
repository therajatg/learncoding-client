export function authReducer(state, action) {
  switch (action.type) {
    case "FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
  }
}
