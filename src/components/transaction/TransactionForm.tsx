import {
  Text,
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  VStack,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { SetStateAction, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AccountContext } from "../context/AccountContext";
import { CategoriesIncomeContext } from "../context/CategoriesIncomeContext";
import { CategoriesExpenseContext } from "../context/CategoriesExpenseContext";

const TRANSACTION_URL = "/api/transactions";

const style = {
  colorDanger: "red.600",
  errorFontSize: "sm",
};

const schema = z.object({
  type: z.string(),
  date: z.string(),
  note: z.string().min(3).max(50),
  amount: z.number().min(0.01).max(100_000_000),
  account: z.string().min(3).max(50),
  category: z.string(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 char" })
    .max(100),
});
interface Props {
  forceUpdate: () => void;
}

type EpxenseFormData = z.infer<typeof schema>;

export const TransactionForm = ({ forceUpdate }: Props) => {
  // const [newtransaction, setNewTransaction] = useState({});
  const { auth } = useContext(AuthContext);
  const { accounts } = useContext(AccountContext);
  const { categoriesIncome } = useContext(CategoriesIncomeContext);
  const { categoriesExpense } = useContext(CategoriesExpenseContext);
  const [transactionType, setTransactionType] = useState("expense");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EpxenseFormData>({ resolver: zodResolver(schema) });

  const handleTypeClick = (text: SetStateAction<string>) => {
    setTransactionType(text);
  };

  const onSubmit = async (e: EpxenseFormData) => {
    try {
      await axios.post(TRANSACTION_URL, e, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      });

      forceUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"90%"}>
      <VStack align="stretch">
        <Heading as={"h2"} size={"md"} pb={4}>
          Transaction Form
        </Heading>
      </VStack>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e);
          reset();
        })}
      >
        <Stack p={2} align="stretch" gap={3}>
          {/* Type */}
          <HStack>
            <FormLabel htmlFor="type">type</FormLabel>
            <Select
              {...register("type")}
              id="type"
              name="type"
              onClick={() => handleTypeClick(type.value)} ///////
            >
              <option value="expense">expense</option>
              <option value="income">income</option>
            </Select>
          </HStack>
          {errors.type && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.type.message}
            </Text>
          )}

          {/* Account */}
          <HStack>
            <FormLabel htmlFor="account">account</FormLabel>
            {/* <Input {...register("account")} id="account"></Input> */}

            <Select {...register("account")} id="account">
              {accounts.map((account) => (
                <option key={account.id} value={account.name}>
                  {account.name}
                </option>
              ))}
            </Select>
          </HStack>
          {errors.account && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.account.message}
            </Text>
          )}

          {/* Category */}
          <HStack>
            <FormLabel htmlFor="category">category</FormLabel>
            {/* <Input {...register("category")} id="category"></Input> */}

            <Select {...register("category")} id="category">
              {transactionType === "expense"
                ? categoriesExpense.map((x) => (
                    <option value={x.name} key={x.id}>
                      {x.name}
                    </option>
                  ))
                : categoriesIncome.map((z) => (
                    <option value={z.name} key={z.id}>
                      {z.name}
                    </option>
                  ))}
            </Select>
          </HStack>
          {errors.category && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.category.message}
            </Text>
          )}

          {/* Date */}
          <HStack>
            <FormLabel htmlFor="date">date</FormLabel>
            <Input {...register("date")} id="date" type="text"></Input>
          </HStack>
          {errors.date && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.date.message}
            </Text>
          )}

          {/* Amount */}
          <HStack>
            <FormLabel htmlFor="amount">amount</FormLabel>
            <Input
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              type="number"
            ></Input>
          </HStack>
          {errors.amount && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.amount.message}
            </Text>
          )}

          {/* Note */}
          <HStack>
            <FormLabel htmlFor="note">note</FormLabel>
            <Input {...register("note")} id="note" type="text"></Input>
          </HStack>
          {errors.note && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.note.message}
            </Text>
          )}

          {/* Description */}
          <HStack>
            <FormLabel htmlFor="description">descripton</FormLabel>
            <Input
              {...register("description")}
              id="description"
              type="text"
            ></Input>
          </HStack>
          {errors.description && (
            <Text fontSize={style.errorFontSize} color={style.colorDanger}>
              {errors.description.message}
            </Text>
          )}
          <Button mt={5} isDisabled={!isValid} type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
