import { Box, Select } from "@chakra-ui/react";
import categories from "../categories";

interface Props {
  onSelectedCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: Props) => {
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Select onChange={(event) => onSelectedCategory(event.target.value)}>
        <option value="">All Categorries</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default ExpenseFilter;
