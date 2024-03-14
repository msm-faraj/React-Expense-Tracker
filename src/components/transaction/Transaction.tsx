import { useReducer } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionTable } from "./TransactionTable";
import { VStack } from "@chakra-ui/react";
import Account from "../account/Account";

interface Transaction {
  type: string;
  amount: number;
  note: string;
  description: string;
  date: string;
  id: string;
}

const Transaction = () => {
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  return (
    <>
      <VStack>
        <Account></Account>

        <TransactionForm forceUpdate={forceUpdate} />

        <TransactionTable update={update} />
      </VStack>
    </>
  );
};

export default Transaction;
