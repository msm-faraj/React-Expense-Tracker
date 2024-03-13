import axios from "axios";
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://my-expense-tracker-8e533260d61a.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
});
