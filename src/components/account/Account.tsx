import {
  Heading,
  VStack,
  StackDivider,
  HStack,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
  Center,
  Divider,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useReducer } from "react";

const ACCOUNT_URL = "/api/accounts";

const schema = z.object({
  // id: z.string(),
  name: z.string().min(3).max(50),
  // type: z.string(),
});
interface Props {}

type AccountFormData = {
  id: string;
  name: string;
  type: string;
};

const Account = () => {
  const { auth } = useContext(AuthContext);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const [accounts, setAccounts] = useState<AccountFormData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AccountFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (e: AccountFormData) => {
    try {
      await axios.post(
        ACCOUNT_URL,
        {
          name: e.name,
          type: "income",
        },
        {
          headers: {
            "x-auth-token": auth.accessToken,
          },
        }
      );
      forceUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get<AccountFormData[]>(ACCOUNT_URL, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      })
      .then((res) => setAccounts(res.data));
  }, [update]);

  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"50%"}>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e);
          reset();
        })}
      >
        <VStack divider={<StackDivider p={1} />} spacing={1} align="stretch">
          <Heading as={"h2"} size={"md"}>
            Accounts
          </Heading>
          {/* Account */}
          <HStack>
            <Box>
              <FormLabel htmlFor="name">New Account</FormLabel>
            </Box>
            <Box>
              <Input {...register("name")} id="name" type="text"></Input>
              {errors.name && (
                <Text fontSize={"small"} color={"red.500"}>
                  {errors.name.message}
                </Text>
              )}
            </Box>
            <Box>
              <Button isDisabled={!isValid} type="submit">
                Add
              </Button>
            </Box>
          </HStack>

          <Flex
            justifyContent={"flex-start"}
            overflow={"auto"}
            gap={1}
            flexWrap={"wrap"}
          >
            {accounts.map((account) => (
              <Center borderRadius={5} key={account.id} p={1}>
                {account.name}
              </Center>
            ))}
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};
export default Account;
