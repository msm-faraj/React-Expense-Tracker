import {
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  Th,
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import ExpenseCategoryFilter from "./ExpenseCategoryFilter";
import ExpenseAccountFilter from "./ExpenseAccountFilter";
import { RxCaretSort } from "react-icons/rx";

interface Expense {
  // userId: number;
  id: number;
  time: string;
  note: string;
  amount: number;
  account: string;
  category: string;
  description: string;
  // deletedAt: Date;
  // category: {
  //   id: number;
  //   name: string;
  // };
  // account: {
  //   id: number;
  //   name: string;
  // };
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
  expenses: Expense[];
  onDelete: (id: number) => void;
  onSelectCategory: (category: Category) => void;
  onSelectedAccount: (account: Account) => void;
}

export const ExpenceTable = ({
  expenses,
  onDelete,
  onSelectCategory,
  onSelectedAccount,
}: Props) => {
  // if (expenses.length === 0) return null;
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Table size={"xs"}>
        <Thead fontSize={"xs"}>
          <Tr>
            <Th p={3}>id</Th>
            <Th p={3}>Time</Th>
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
                <Text>Amount</Text>
                <RxCaretSort />
              </HStack>
            </Th>
            <Th p={3}>Note</Th>
            <Th p={3}>Descripton</Th>
            <Th p={3}>Edit</Th>
            <Th p={3}>Delete</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"xs"}>
          {expenses.map((expense) => (
            <Tr key={expense.id}>
              <Td p={3}>{expense.id}</Td>
              <Td p={3} pl={2}>
                {expense.time}
              </Td>
              <Td p={3} pl={2}>
                {expense.account}
              </Td>
              <Td pl={2}>{expense.category}</Td>
              <Td>{expense.amount}</Td>
              <Td>{expense.note}</Td>
              <Td>{expense.description}</Td>
              <Td>
                <Button fontSize={"xs"} size={"xs"} colorScheme="teal">
                  Edit
                </Button>
              </Td>
              <Td onClick={() => onDelete(expense.id)}>
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
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
