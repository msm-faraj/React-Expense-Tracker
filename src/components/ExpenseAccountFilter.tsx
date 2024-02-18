import { Box, Select } from "@chakra-ui/react";
import accounts from "../data/accounts";

interface Props {
  onSelectedAccount: (accountName: string) => void;
}

const ExpenseAccountFilter = ({ onSelectedAccount }: Props) => {
  return (
    <Box>
      <Select
        id="account-list"
        size={"xs"}
        onChange={(event) => onSelectedAccount(event.target.value)}
      >
        <option value="">Accounts</option>

        {accounts.map((account) => (
          <option key={account.id} value={account.name}>
            {account.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default ExpenseAccountFilter;
