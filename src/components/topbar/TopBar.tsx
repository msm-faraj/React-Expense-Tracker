import { HStack, Heading, Text, VStack, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import ColorModeSwitch from "./ColorModeSwitch";

const TopBar = () => {
  const { auth } = useContext(AuthContext);
  const { colorMode } = useColorMode();

  return (
    <HStack
      position={"fixed"}
      bg={colorMode === "dark" ? "gray.800" : "gray.50"}
      zIndex={50}
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={2}
      pl={5}
      pr={5}
      w={"full"}
    >
      <VStack>
        <Heading as={"h1"} size={"sm"}>
          React-Expense-Tracker
        </Heading>
        <Text fontSize={"sm"}>by msm-faraj</Text>
      </VStack>
      {auth.email && <Text fontSize={"md"}>{auth.email}</Text>}
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default TopBar;
