import {
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
import { CiEdit, CiTrash } from "react-icons/ci";
import { CategoriesExpenseContext } from "../context/CategoriesExpenseContext";

const CATEGORY_URL = "/api/categories";
const CATEGORY_GET_URL = "/api/categories/expense";

const schema = z.object({
  name: z.string().min(3).max(50),
});

// this is because of validation error
type CategoryFormData = {
  id: string;
  name: string;
  type: string;
  userId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};

const CategoryExpense = () => {
  const { auth } = useContext(AuthContext);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [categoriesExpense, setCategoriesIncome] = useState<CategoryFormData[]>(
  //   []
  // );
  const { categoriesExpense, setCategoriesExpense } = useContext(
    CategoriesExpenseContext
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (e: CategoryFormData) => {
    try {
      await axios.post(
        CATEGORY_URL,
        {
          name: e.name,
          type: "expense",
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
      await axios.delete(`${CATEGORY_URL}/${id}`, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      });
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get<CategoryFormData[]>(CATEGORY_GET_URL, {
        headers: {
          "x-auth-token": auth.accessToken,
        },
      })
      .then((res) => setCategoriesExpense(res.data)); /////
  }, [update]);

  return (
    <Box>
      <form
        onSubmit={handleSubmit((e) => {
          onSubmit(e);
          reset();
        })}
      >
        <VStack align="stretch">
          {/* Account */}
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
            {categoriesExpense.map((expenseCategory) => (
              <Stack
                direction={"row"}
                justify={"space-between"}
                boxShadow={"base"}
                borderRadius={5}
                key={expenseCategory.id}
                p={2}
                pl={3}
              >
                <Text fontSize={"1rem"}>{expenseCategory.name}</Text>
                <HStack gap={5} pr={3}>
                  <Icon
                    // onClick={onEdit}
                    color={"green.400"}
                    fontSize={"1.5rem"}
                  >
                    <CiEdit />
                  </Icon>
                  <Icon
                    onClick={() => onDelete(expenseCategory.id)}
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
export default CategoryExpense;
