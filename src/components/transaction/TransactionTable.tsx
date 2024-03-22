import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  HStack,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RxCaretSort } from "react-icons/rx";
import { AccountContext } from "../context/AccountContext";
import { CategoriesIncomeContext } from "../context/CategoriesIncomeContext";
import { CategoriesExpenseContext } from "../context/CategoriesExpenseContext";
const GET_TRANSACTION_URL = "/api/transactions";

type Transaction = {
  type: string;
  amount: number;
  note: string;
  description: string;
  date: string;
  id: string;
  accountId: string;
  categoryId: string;
};

interface Props {
  update: number;
  forceUpdate: () => void;
}

export const TransactionTable = ({ update }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { auth } = useContext(AuthContext);
  const { accounts } = useContext(AccountContext);
  const { categoriesIncome } = useContext(CategoriesIncomeContext);
  const { categoriesExpense } = useContext(CategoriesExpenseContext);
  const categories = [...categoriesExpense, ...categoriesIncome];
  const [selectedType, setSelectedType] = useState("");
  const newTransactions: {
    date: string;
    type: string;
    amount: number;
    note: string;
    description: string;
    id: string;
    accountId: string;
    categoryId: string;
  }[] = [];

  async function fetchData() {
    let res = await axios.get<Transaction[]>(GET_TRANSACTION_URL, {
      headers: {
        "x-auth-token": auth.accessToken,
      },
    });
    setTransactions(res.data);
    console.log("fetchData called");
  }

  const dateChanger = (oldTrnsaction: Transaction[]) => {
    for (let i = 0; i < oldTrnsaction.length; i++) {
      const newStyleDate = new Date(oldTrnsaction[i].date);
      const year = newStyleDate.getFullYear();
      const month = newStyleDate.getMonth() + 1;
      const date = newStyleDate.getDate();
      const fullNewStyledDate = `${year}-${month}-${date}`;
      newTransactions.push({
        ...oldTrnsaction[i],
        date: fullNewStyledDate,
      });
    }
    setTransactions(newTransactions);
    console.log("dataChanger called");
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  useEffect(() => {
    dateChanger(transactions);
  }, []);

  const onSelectType = (type: string) => {
    setSelectedType(type);
  };

  const visibleTransactions =
    selectedType === "income"
      ? transactions.filter((e) => e.type === "income")
      : selectedType === "expense"
      ? transactions.filter((e) => e.type === "expense")
      : transactions;

  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"98%"}>
      <Heading as={"h2"} size={"md"} pb={4}>
        Transaction Table
      </Heading>
      <Button
        onClick={() => {
          dateChanger(transactions);
        }}
      >
        Change Date
      </Button>
      <TableContainer
        maxWidth={"100%"}
        display={"block"}
        overflowX={"auto"}
        overflowY={"hidden"}
      >
        <Table size={"xs"} variant={"simple"} overflow={"wrap"}>
          <Thead fontSize={"xs"}>
            <Tr>
              <Th>Time</Th>
              <Th>
                <Select
                  onChange={(e) => onSelectType(e.target.value)}
                  size={"xs"}
                >
                  <option>type</option>
                  <option>income</option>
                  <option>expense</option>
                </Select>
              </Th>
              <Th>amount</Th>
              <Th>
                <Select size={"xs"}>
                  <option>Account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.name}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              </Th>
              <Th>
                <Select size={"xs"}>
                  <option>Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Th>
              <Th>
                <HStack>
                  <Text>note</Text>
                  <RxCaretSort />
                </HStack>
              </Th>
              <Th>Des</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"xs"}>
            {visibleTransactions
              .slice(0)
              .reverse()
              .map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.amount}</Td>
                  <Td>{transaction.accountId}</Td>
                  <Td>{transaction.categoryId}</Td>
                  <Td>{transaction.note}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>
                    <Button fontSize={"xs"} size={"xs"} colorScheme="teal">
                      Edit
                    </Button>
                  </Td>
                  <Td>
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
                {visibleTransactions
                  .reduce((acc, transaction) => transaction.amount + acc, 0)
                  .toFixed(2)}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
