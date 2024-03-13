import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/users";

import React from "react";
import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const usernameRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(REGISTER_URL, {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);
      setSuccess(true);
      // clear input fields
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {success ? (
        <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
          <Text mb={5}>
            Thank you!
            <br />
            You've successfully signed up
          </Text>
          <Text as={"span"}>
            {/* put router link here */}
            <Link to="/api/login">Sign In</Link>
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
            <Heading as={"h1"}>Sign Up</Heading>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <FormLabel mt={4} htmlFor="username">
                {`Username: `}
                {validUsername && (
                  <Text as={"span"} color={"green.600"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Text>
                )}
                {validUsername ||
                  (username && (
                    <Text as={"span"} color={"red.600"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Text>
                  ))}
              </FormLabel>
              <Input
                type="text"
                id="username"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                aria-invalid={validUsername ? "false" : "true"}
                // aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              ></Input>
              {emailFocus && email && !validEmail && (
                <Text color={"blue.600"} p={3}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` Email must be a valid email.`}
                </Text>
              )}
              {/* Email */}
              <FormLabel mt={4} htmlFor="email">
                {`Email: `}
                {validEmail && (
                  <Text as={"span"} color={"green.600"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Text>
                )}
                {validEmail ||
                  (email && (
                    <Text as={"span"} color={"red.600"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Text>
                  ))}
              </FormLabel>
              <Input
                type="email"
                id="email"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              ></Input>
              {userFocus && username && !validUsername && (
                <Text color={"blue.600"} p={3}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` 4 to 24 characters.`}
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                  <br />
                </Text>
              )}
              {/* Password */}
              <FormLabel mt={4} htmlFor="password">
                {`Password: `}
                {validPassword && (
                  <Text as={"span"} color={"green.600"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Text>
                )}
                {validPassword ||
                  (password && (
                    <Text as={"span"} color={"red.600"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Text>
                  ))}
              </FormLabel>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              ></Input>
              {passwordFocus && !validPassword && (
                <Text color={"blue.600"} p={3}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` 8 to 24 characters.`}
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special character:
                  <Text as={"span"} aria-label="exclamation mark">
                    !
                  </Text>
                  <Text as={"span"} aria-label="at symbol">
                    @
                  </Text>
                  <Text as={"span"} aria-label="hashtag">
                    #
                  </Text>
                  <Text as={"span"} aria-label="dollar sign">
                    $
                  </Text>
                  <Text as={"span"} aria-label="percent">
                    %
                  </Text>
                  <br />
                </Text>
              )}
              {/* Confirm Password */}
              <FormLabel mt={4} htmlFor="confirm_pwd">
                {`Confirm Password: `}
                {validMatch && matchPwd && (
                  <Text as={"span"} color={"green.600"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Text>
                )}
                {validMatch ||
                  (matchPwd && (
                    <Text as={"span"} color={"red.600"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Text>
                  ))}
              </FormLabel>
              <Input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              ></Input>
              {matchFocus && !validMatch && (
                <Text color={"blue.600"} p={3}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` Must match the first password input field.`}
                </Text>
              )}
              <Button
                type="submit"
                mt={5}
                w={"full"}
                isDisabled={
                  !validUsername || !validPassword || !validMatch ? true : false
                }
              >
                Sign Up
              </Button>
            </form>
            <Text mt={3}>
              Already registerd? <br />
              <Text as={"span"}>
                {/* put router link here */}
                <Link to="/api/login">Sign In</Link>
              </Text>
            </Text>
          </section>
        </Box>
      )}
    </>
  );
};

export default SignUp;
