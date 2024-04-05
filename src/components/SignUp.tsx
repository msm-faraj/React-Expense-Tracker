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
const REGISTER_URL = "/api/auth/register";

import React from "react";
import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<any>(null);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

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

  //Setting focus of fields
  useEffect(() => {
    if (usernameRef.current !== null) usernameRef.current.focus();
  }, []);

  //Validating username
  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  //Validating email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  //Validating password
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  //Setting error message
  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(REGISTER_URL, {
        username,
        email,
        password,
      });
      console.log(response);
      setSuccess(true);
      // clear input fields
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("User already registered.");
      } else {
        setErrMsg("Registration failed.");
      }
      if (errRef.current !== null) errRef.current.focus();
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
              <Text ref={errRef} color={"red.600"} aria-live="assertive">
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
                <Input
                  required
                  type="text"
                  id="username"
                  value={username}
                  ref={usernameRef}
                  autoComplete="off"
                  aria-describedby="usernote"
                  onChange={(e) => setUsername(e.target.value)}
                  aria-invalid={validUsername ? "false" : "true"}
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                ></Input>
              </FormLabel>
              {/* error message for username */}
              {usernameFocus && username && !validUsername && (
                <Text
                  fontSize={"0.9rem"}
                  id="usernote"
                  color={"blue.600"}
                  p={2}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` 4 to 24 characters.`}
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                  <br />
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
                <Input
                  required
                  id="email"
                  type="email"
                  value={email}
                  ref={emailRef}
                  autoComplete="off"
                  aria-describedby="emailnote"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                ></Input>
              </FormLabel>
              {/* error message for email */}
              {emailFocus && email && !validEmail && (
                <Text
                  fontSize={"0.9rem"}
                  id="emailnote"
                  color={"blue.600"}
                  p={2}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` Email must be a vald email.`}
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
                <Input
                  required
                  ref={passRef}
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                ></Input>
              </FormLabel>
              {/* error message for password */}
              {passwordFocus && !validPassword && (
                <Text
                  fontSize={"0.9rem"}
                  id="passnote"
                  color={"blue.600"}
                  p={2}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` 8 to 24 characters.`}
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special character:
                  <Text as={"span"} aria-label="at symbol">
                    {` @`}
                  </Text>
                  <Text as={"span"} aria-label="exclamation mark">
                    {` !`}
                  </Text>
                  <Text as={"span"} aria-label="hashtag">
                    {` #`}
                  </Text>
                  <Text as={"span"} aria-label="dollar sign">
                    {` $`}
                  </Text>
                  <Text as={"span"} aria-label="percent">
                    {` %`}
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
                <Input
                  required
                  type="password"
                  id="confirm_pwd"
                  aria-describedby="confirmnote"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  aria-invalid={validPassword ? "false" : "true"}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                ></Input>
              </FormLabel>
              {/* error message for confirm password */}
              {matchFocus && !validMatch && (
                <Text
                  fontSize={"0.9rem"}
                  id="confirmnote"
                  color={"blue.600"}
                  p={2}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {` Must match the first password input field.`}
                </Text>
              )}

              {/* Submit button */}
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

            <Text color={"gray.500"} mt={3}>
              Already registerd?
            </Text>
            <Text as={"span"}>
              <Link to="/api/login">Sign In</Link>
            </Text>
          </section>
        </Box>
      )}
    </>
  );
};

export default SignUp;
