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

const ACCOUNTS_URL = "/api/accounts";

const schema = z.object({
  name: z.string().min(3).max(50),
});

// this is because of validation error
type AccountFormData = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
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
        ACCOUNTS_URL,
        {
          name: e.name,
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
  const onDelete = async (id: string) => {
    try {
      await axios.delete(`${ACCOUNTS_URL}/${id}`, {
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
      .get<AccountFormData[]>(ACCOUNTS_URL, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      })
      .then((res) => setAccounts(res.data)); //////
  }, [update]);

  return (
    <Box
      boxShadow={"dark-lg"}
      p={6}
      borderRadius={5}
      // m={2}
      w={"full"}
      mb={10}
      h={"full"}
      overflowY={"scroll"}
    >
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e);
          reset();
        })}
      >
        <VStack align="stretch">
          <Heading pb={1} as={"h2"} fontSize={"0.8rem"}>
            Accounts
          </Heading>
          {/* Create Account */}
          <HStack p={1}>
            <Input
              size={"sm"}
              borderRadius={5}
              {...register("name")}
              id="name"
              type="text"
            ></Input>
            <Button
              size={"sm"}
              fontSize={"0.8rem"}
              isDisabled={!isValid}
              type="submit"
            >
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
                p={1}
                pl={2}
              >
                <Text fontSize={"0.8rem"}>{account.name}</Text>
                <HStack gap={2}>
                  <Icon
                    onClick={onEdit}
                    color={"green.400"}
                    fontSize={"1.3rem"}
                  >
                    <CiEdit />
                  </Icon>
                  <Icon
                    onClick={() => onDelete(account.id)}
                    color={"red.400"}
                    fontSize={"1.3rem"}
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
