import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import CategoryIncome from "./CategoryIncome";
import CategoryExpense from "./CategoryExpense";

const Category = () => {
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"50%"} mb={10}>
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
