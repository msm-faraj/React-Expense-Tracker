import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://my-expense-tracker-8e533260d61a.herokuapp.com",
});
