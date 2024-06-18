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

const getGoals = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editGoal = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL + id, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateGoal = async (id, text, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`${API_URL}${id}`, text, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteGoal = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(API_URL + id, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const goalService = {
  createGoal,
  getGoals,
  editGoal,
  updateGoal,
  deleteGoal,
};

export default goalService;
