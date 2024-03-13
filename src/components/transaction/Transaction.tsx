import { useReducer } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionTable } from "./TransactionTable";
import { VStack } from "@chakra-ui/react";

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
        <TransactionForm forceUpdate={forceUpdate} />
        <TransactionTable update={update} forceUpdate={forceUpdate} />
      </VStack>
    </>
  );
};

export default Transaction;
