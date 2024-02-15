import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  StackDivider,
  VStack,
} from "@chakra-ui/react";

import { categories } from "../App";

export const ExpenseForm = () => {
  return (
    <FormControl>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={1}
        align="stretch"
      >
        <HStack>
          <Box>
            <FormLabel htmlFor="time">Time</FormLabel>
          </Box>
          <Box>
            <Input id="time" type="text"></Input>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormLabel htmlFor="account">account</FormLabel>
          </Box>
          <Box>
            <Input id="account" type="text"></Input>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormLabel htmlFor="category">category</FormLabel>
          </Box>
          <Box>
            <Select id="category">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormLabel htmlFor="amount">amount</FormLabel>
          </Box>
          <Box>
            <Input id="amount" type="text"></Input>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormLabel htmlFor="note">note</FormLabel>
          </Box>
          <Box>
            <Input id="note" type="text"></Input>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormLabel htmlFor="descripton">descripton</FormLabel>
          </Box>
          <Box>
            <Input id="descripton" type="text"></Input>
          </Box>
        </HStack>
        <Button>Send</Button>
      </VStack>
    </FormControl>
  );
};
