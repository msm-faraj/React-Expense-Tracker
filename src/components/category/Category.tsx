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
    <Box
      boxShadow={"dark-lg"}
      p={3}
      borderRadius={5}
      w={"full"}
      h={"full"}
      overflowY={"scroll"}
    >
      <Heading p={2} borderRadius={5} as={"h2"} fontSize={"0.8rem"}>
        Categories
      </Heading>
      <Tabs p={1} isFitted size="sm" variant="line">
        <TabList>
          <Tab fontSize={"0.8rem"}>Income</Tab>
          <Tab fontSize={"0.8rem"}>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={2}>
            <CategoryIncome />
          </TabPanel>
          <TabPanel p={2}>
            <CategoryExpense />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Category;
