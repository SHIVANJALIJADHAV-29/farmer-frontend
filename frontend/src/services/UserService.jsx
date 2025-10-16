import axios from "axios";

const API_URL = "http://localhost:8084/api/users";

export const signup = async (user) => {
  const res = await axios.post(`${API_URL}/signup`, user);
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(`${API_URL}/login`, user);
  return res.data;
};
