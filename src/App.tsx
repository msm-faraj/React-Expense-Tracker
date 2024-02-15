import { useState } from "react";
import { ExpenceTable } from "./components/ExpenseTable";
import ExpenseFilter from "./components/ExpenseFilter";
import { Box } from "@chakra-ui/react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      time: "2024-12-01",
      note: "Note1",
      amount: 100,
      account: "Account",
      category: "Utilities",
      description: "Des1",
    },
    {
      id: 2,
      time: "2024-12-02",
      note: "Note2",
      amount: 200,
      account: "Account",
      category: "Groceries",
      description: "Des2",
    },
    {
      id: 3,
      time: "2024-12-03",
      note: "Note3",
      amount: 300,
      account: "Account",
      category: "Utilities",
      description: "Des3",
    },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <Box width={"90%"} p={10}>
      <Box p={5}>
        {" "}
        <ExpenseFilter
          onSelectedCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </Box>
      <Box p={5}>
        {" "}
        <ExpenceTable
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        ></ExpenceTable>
      </Box>
    </Box>
  );
}

export default App;
