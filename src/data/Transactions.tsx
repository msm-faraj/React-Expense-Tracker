import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
const GET_TRANSACTION_URL = "/api/transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(GET_TRANSACTION_URL, {
        headers: {
          "x-auth-token":
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjMTY1Mzg1LTg0YmQtNDNlNS1iMDA0LTc4YjRkOTg5YjYyOSIsImlhdCI6MTcxMDA4NzYxOH0.cHRpmvYKDCeA0zuRmkUCU0ndvP9CKddluGrVBxycRE8",
            auth.accessToken,
        },
      })
      .then((res) => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h1>this is home page</h1>
      {JSON.stringify(transactions)}
      {JSON.stringify(auth)}
    </div>
  );
};

export default Transactions;
