import axios from "axios";
// const BASE_URL = "http://localhost:3000";
const BASE_URL =
  "https://msm-transaction-tracker-api-1fcf9cf151aa.herokuapp.com/";

export default axios.create({
  baseURL: BASE_URL,
});
