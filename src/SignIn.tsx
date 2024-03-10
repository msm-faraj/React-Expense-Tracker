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
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
import { AuthContextType } from "./types/auth";
const LOGIN_URL = "/api/auth";

const SignIn = () => {
  const { setAuth } = useContext(AuthContext) as AuthContextType;
  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      console.log(accessToken);
      setAuth({ email, password, accessToken });
      setPassword("");
      setEmail("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errRef.current !== null) errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
          <Text mb={5}>You've successfully logged in</Text>
          <Text as={"span"}>
            {/* put router link here */}
            <Link href="/">Go to home</Link>
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
