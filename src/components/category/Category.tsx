import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const Category = () => {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Income</Tab>
        <Tab>Expense</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <h1>Income</h1>{" "}
        </TabPanel>
        <TabPanel>
          <h1>expense</h1>{" "}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Category;
