import { HStack, Heading, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const TopBar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <HStack
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={5}
      borderRadius={5}
    >
      <Heading as={"h1"} size={"md"}>
        React-Expense-Tracker
      </Heading>
      {auth.email && <Text>{auth.email}</Text>}
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default TopBar;
