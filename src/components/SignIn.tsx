import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "../api/axios";

const LOGIN_URL = "/api/auth";

const SignIn = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  //   useEffect(() => {
  //     if (userRef.current !== null) userRef.current.focus();
  //   }, []);

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
      const accessToken = await response?.data?.token;
      console.log(accessToken);
      const newAuth = {
        email: email,
        password: password,
        accessToken: accessToken,
      };
      setAuth(newAuth);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  console.log("login-auth: ", auth);

  return (
    <>
      {success ? (
        <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
          <Text mb={5}>You've successfully logged in</Text>
          <Text as={"span"}>
            {/* put router link here */}
            <Link href="/api/home">Go to home</Link>
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
            <Text mt={3}>
              Need an Account? <br />
              <Text as={"span"}>
                {/* put router link here */}
                <Link href="/">Sign Up</Link>
              </Text>
            </Text>
          </section>
        </Box>
      )}
    </>
  );
};

export default SignIn;
