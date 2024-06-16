import axios from "axios";

const API_URL = "http://127.0.0.1:3001/api/goals/";

const createGoal = async (goalData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, goalData, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const goalService = {
  createGoal,
};

export default goalService;
