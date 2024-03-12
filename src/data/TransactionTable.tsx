import axios from "../api/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import {
  Box,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RxCaretSort } from "react-icons/rx";
import ExpenseAccountFilter from "../components/ExpenseAccountFilter";
import ExpenseCategoryFilter from "../components/ExpenseCategoryFilter";
const GET_TRANSACTION_URL = "/api/transactions";

interface Transaction {
  type: string;
  amount: number;
  note: string;
  description: string;
  date: string;
  id: string;
}

interface Category {
  id: number;
  name: string;
}
interface Account {
  id: number;
  name: string;
}
interface Props {
  onDelete: (id: number) => void;
  onSelectCategory: (category: Category) => void;
  onSelectedAccount: (account: Account) => void;
}

const Transactions = ({
  onDelete,
  onSelectCategory,
  onSelectedAccount,
}: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get<Transaction[]>(GET_TRANSACTION_URL, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      })
      .then((res) => setTransactions(res.data));
  }, []);

  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Text as={"h1"}>Transactions for {auth.email}</Text>
      <Table size={"xs"}>
        <Thead fontSize={"xs"}>
          <Tr>
            <Th p={3}>Time</Th>
            <Th p={3}>Type</Th>
            <Th p={3}>Amount</Th>
            <Th>
              <ExpenseAccountFilter
                onSelectedAccount={(account) => onSelectedAccount(account)}
              ></ExpenseAccountFilter>
            </Th>
            <Th p={3}>
              <ExpenseCategoryFilter
                onSelectedCategory={(category) => onSelectCategory(category)}
              ></ExpenseCategoryFilter>
            </Th>
            <Th p={3}>
              <HStack>
                <Text>note</Text>
                <RxCaretSort />
              </HStack>
            </Th>
            <Th p={3}>Descripton</Th>
            <Th p={3}>Edit</Th>
            <Th p={3}>Delete</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"xs"}>
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td p={3}>{transaction.date}</Td>
              <Td p={3}>{transaction.type}</Td>
              <Td p={3} pl={2}>
                {transaction.amount}
              </Td>
              <Td p={3} pl={2}>
                {transaction.acountId}
              </Td>
              <Td pl={2}>{transaction.categoryId}</Td>
              <Td>{transaction.note}</Td>
              <Td>{transaction.description}</Td>
              <Td>
                <Button fontSize={"xs"} size={"xs"} colorScheme="teal">
                  Edit
                </Button>
              </Td>
              <Td
              // onClick={() => onDelete(transaction.id)}
              >
                <Button fontSize={"xs"} size={"xs"} colorScheme="red">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot fontSize={"xs"}>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th p={3}>Total</Th>
            <Th>
              $
              {transactions
                .reduce((acc, transaction) => transaction.amount + acc, 0)
                .toFixed(2)}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};

export default Transactions;
