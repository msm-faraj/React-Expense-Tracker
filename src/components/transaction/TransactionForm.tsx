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
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"90%"} mb={10}>
      <Heading p={2} borderRadius={5} as={"h2"} fontSize={20}>
        Transactions
      </Heading>
      <Tabs isFitted size="md" variant="line">
        <TabList>
          <Tab>Income</Tab>
          <Tab>Expense</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TransactionIncomeForm forceUpdate={forceUpdate} />
          </TabPanel>
          <TabPanel>
            <TransactionExpenseForm forceUpdate={forceUpdate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TransactionForm;
