import axios from "../axios";
import { useAuth } from "../contexts";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        firstName: response.data.firstName,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
