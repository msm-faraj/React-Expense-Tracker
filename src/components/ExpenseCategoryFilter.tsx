import { Box, Select } from "@chakra-ui/react";
import categories from "../data/categories";

interface Props {
  onSelectedCategory: (categoryName: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: Props) => {
  return (
    <Box>
      <Select
        id="category-list"
        size={"xs"}
        onChange={(event) => onSelectedCategory(event.target.value)}
      >
        <option value="">Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default ExpenseFilter;
