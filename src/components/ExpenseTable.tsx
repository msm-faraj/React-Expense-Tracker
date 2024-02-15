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
} from "@chakra-ui/react";

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

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export const ExpenceTable = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <Box>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Note</Th>
            <Th>Amount</Th>
            <Th>Account</Th>
            <Th>Category</Th>
            <Th>Descripton</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense) => (
            <Tr key={expense.id}>
              <Td>{expense.time}</Td>
              <Td>{expense.note}</Td>
              <Td>{expense.amount}</Td>
              <Td>{expense.account}</Td>
              <Td>{expense.category}</Td>
              <Td>{expense.description}</Td>
              <Td>
                <Button fontSize={"small"} size={"sm"} colorScheme="teal">
                  Edit
                </Button>
              </Td>
              <Td onClick={() => onDelete(expense.id)}>
                <Button fontSize={"small"} size={"sm"} colorScheme="orange">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Income</Th>
            <Th>
              $
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </Th>
            <Th>Expense</Th>
            <Th>$ 200</Th>
            <Th>Total</Th>
            <Th>$ 50</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
