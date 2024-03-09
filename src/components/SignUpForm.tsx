import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 character" }),
  password: z
    .string({ invalid_type_error: "This is required" })
    .min(6, { message: "Password must be at least 6 character" }),
  email: z
    .string()
    .min(1, { message: "This field has to be field" })
    .email("This is not a valid email."),
});

type FormData = z.infer<typeof schema>;
const style = {
  mb: "4",
};
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

//** SignUpForm Component **/
const SignUpForm = () => {
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // this is nested destructuring of formState in javascript
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const addUser = (data: FieldValues) => {
    const newUser = {
      username: data.username,
      password: data.password,
      email: data.email,
    };
    setUser(newUser);
    axios
      .post<User>("/api/users", newUser)
      .then((res) => console.log(res.data.token));
  };
  //** Render Phase **/
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Box mb={style.mb}>
        <Heading as={"h2"} size={"md"}>
          Sign Up
        </Heading>
      </Box>
      <form onSubmit={handleSubmit(addUser)}>
        {/* Username */}
        <Box mb={style.mb}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input {...register("username")} id="username" type="text"></Input>
          {errors.username && (
            <Text color={"red.600"}>{errors.username.message}</Text>
          )}
        </Box>
        {/* Email */}
        <Box mb={style.mb}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input {...register("email")} id="email" type="text"></Input>
          {errors.email && (
            <Text color={"red.600"}>{errors.email.message}</Text>
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
