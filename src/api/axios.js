import axios from "axios";
const BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
  // baseURL: "https://my-expense-tracker-8e533260d61a.herokuapp.com",
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "x-auth-token": auth.accessToken },
// });
