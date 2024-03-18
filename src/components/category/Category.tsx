import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import CategoryIncome from "./CategoriesIncome";
import CategoryExpense from "./CategoryExpense";

const Category = () => {
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"90%"} mb={10}>
      <Heading p={2} borderRadius={5} as={"h2"} fontSize={20}>
        Categories
      </Heading>
      <Tabs isFitted size="md" variant="line">
        <TabList>
          <Tab>Income</Tab>
          <Tab>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CategoryIncome />
          </TabPanel>
          <TabPanel>
            <CategoryExpense />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Category;
