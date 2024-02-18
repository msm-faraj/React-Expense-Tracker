import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  user_name: z.string().min(3, { message: "Username must be at least 3 char" }),
  password: z
    .string({ invalid_type_error: "This is required" })
    .min(10, { message: "Fuck" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const style = {
    mb: "4",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // this is nested destructuring of formState in javascript
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Box mb={style.mb}>
        <Heading as={"h2"} size={"md"}>
          Sign In
        </Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <Box mb={style.mb}>
          <FormLabel htmlFor="user_name">Username</FormLabel>
          <Input {...register("user_name")} id="user_name" type="text"></Input>
          {errors.user_name && (
            <Text color={"red.600"}>{errors.user_name.message}</Text>
          )}
        </Box>
        {/* Password */}
        <Box mb={style.mb}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input {...register("password")} id="password" type="text"></Input>
          {errors.password && (
            <Text color={"red.600"}>{errors.password.message}</Text>
          )}
        </Box>
        <Button isDisabled={!isValid} type="submit">
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
