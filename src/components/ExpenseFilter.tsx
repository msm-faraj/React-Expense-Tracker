import { Select } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSelectedCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: Props) => {
  return (
    <Select onChange={(event) => onSelectedCategory(event.target.value)}>
      <option value="">All Categorries</option>
      <option value="Utilities">Utilities</option>
      <option value="Groceries">Groceries</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </Select>
  );
};

export default ExpenseFilter;
