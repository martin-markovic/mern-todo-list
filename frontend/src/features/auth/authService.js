import axios from "axios";

const API_URL = "http://127.0.0.1:3001/api/users/";

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;
