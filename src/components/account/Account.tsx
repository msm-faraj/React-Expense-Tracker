import {
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Box,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useReducer } from "react";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { AccountContext } from "../context/AccountContext";

const ACCOUNT_URL = "/api/accounts";

const schema = z.object({
  name: z.string().min(3).max(50),
});

// this is because of validation error
type AccountFormData = {
  id: string;
  name: string;
};

const Account = () => {
  const { auth } = useContext(AuthContext);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [accounts, setAccounts] = useState<AccountFormData[]>([]);
  const { accounts, setAccounts } = useContext(AccountContext);

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
        },
        {
          headers: {
            "x-auth-token": auth.accessToken,
          },
        }
      );
      console.log(accounts); ///////// intresting
      forceUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  const onDelete = async (id: string) => {
    try {
      await axios.delete(`${ACCOUNT_URL}/${id}`, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      });
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };
  const onEdit = async () => {};

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
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={2} w={"90%"} mb={10}>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e);
          reset();
        })}
      >
        <VStack align="stretch">
          <Heading p={2} borderRadius={5} as={"h2"} fontSize={20}>
            Accounts
          </Heading>
          {/* Create Account */}
          <HStack p={1}>
            <Input {...register("name")} id="name" type="text"></Input>
            <Button isDisabled={!isValid} type="submit">
              Add
            </Button>
          </HStack>
          {errors.name && (
            <Text p={1} fontSize={12} color={"red.500"}>
              {errors.name.message}
            </Text>
          )}

          <Stack gap={1}>
            {accounts.map((account) => (
              <Stack
                direction={"row"}
                justify={"space-between"}
                boxShadow={"base"}
                borderRadius={5}
                key={account.id}
                p={2}
                pl={3}
              >
                <Text fontSize={"1rem"}>{account.name}</Text>
                <HStack gap={5} pr={3}>
                  <Icon
                    onClick={onEdit}
                    color={"green.400"}
                    fontSize={"1.5rem"}
                  >
                    <CiEdit />
                  </Icon>
                  <Icon
                    onClick={() => onDelete(account.id)}
                    color={"red.400"}
                    fontSize={"1.5rem"}
                  >
                    <CiTrash />
                  </Icon>
                </HStack>
              </Stack>
            ))}
          </Stack>
        </VStack>
      </form>
    </Box>
  );
};
export default Account;
