import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { TransactionExpenseForm } from "./TransactionFormExpense";
import { TransactionIncomeForm } from "./TransactionFormIncome";
interface Props {
  forceUpdate: () => void;
}

const TransactionForm = ({ forceUpdate }: Props) => {
  return (
    <Box
      boxShadow={"dark-lg"}
      p={3}
      borderRadius={2}
      w={"98%"}
      h={"620px"}
      overflowY={"scroll"}
    >
      <Heading p={2} borderRadius={5} as={"h2"} fontSize={"1rem"}>
        Transactions
      </Heading>
      <Tabs isFitted size="md" variant="line">
        <TabList>
          <Tab fontSize={"1rem"}>Income</Tab>
          <Tab fontSize={"1rem"}>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={3}>
            <TransactionIncomeForm forceUpdate={forceUpdate} />
          </TabPanel>
          <TabPanel p={3}>
            <TransactionExpenseForm forceUpdate={forceUpdate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TransactionForm;
