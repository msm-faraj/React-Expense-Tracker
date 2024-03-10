import { useEffect, useState } from "react";
import axios from "../api/axios";
const GET_TRANSACTION_URL = "/api/transactions";

const Transactions = () => {
  // const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(GET_TRANSACTION_URL, {
        headers: {
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjMTY1Mzg1LTg0YmQtNDNlNS1iMDA0LTc4YjRkOTg5YjYyOSIsImlhdCI6MTcxMDA4NzYxOH0.cHRpmvYKDCeA0zuRmkUCU0ndvP9CKddluGrVBxycRE8",
        },
      })
      .then((res) => console.log(res.data));
  }, []);

  return <div>transaction</div>;
};

export default Transactions;
