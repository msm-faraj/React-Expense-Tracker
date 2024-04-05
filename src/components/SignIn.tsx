import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const LOGIN_URL = "/api/auth/login";

const SignIn = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        password,
        email,
      });
      const accessToken = await response?.data?.accessToken;
      const newAuth = {
        email,
        password,
        accessToken,
      };
      setAuth(newAuth);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("login-auth: ", auth);

  return (
    <>
      {success ? (
        <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
          <Text mb={5}>You've successfully logged in</Text>
          <Text as={"span"}>
            {/* put router link here */}
            <Link to="/api/home">Go to home</Link>
          </Text>
        </Box>
      ) : (
        <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
          <section>
            {errMsg && (
              <Text ref={errRef} color={"red.600"}>
                {errMsg}
              </Text>
            )}
            <Heading as={"h1"}>Sign In</Heading>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <FormLabel mt={4} htmlFor="email">{`Email:`}</FormLabel>
              <Input
                type="emil"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                //
              ></Input>

              {/* Password */}
              <FormLabel mt={4} htmlFor="password">{`Password:`}</FormLabel>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              ></Input>
              <Button type="submit" mt={5} w={"full"}>
                Sign In
              </Button>
            </form>
            <Text color={"gray.500"} mt={3}>
              Need an Account?
            </Text>
            <Text as={"span"}>
              {/* put router link here */}
              <Link to="/">Sign Up</Link>
            </Text>
          </section>
        </Box>
      )}
    </>
  );
};

export default SignIn;
