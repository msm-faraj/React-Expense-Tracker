import { Select } from "@chakra-ui/react";
import { categories } from "../App";

interface Props {
  onSelectedCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: Props) => {
  return (
    <Select onChange={(event) => onSelectedCategory(event.target.value)}>
      <option value="">All Categorries</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};

export default ExpenseFilter;
