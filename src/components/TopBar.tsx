import { Button, ColorModeContext, HStack } from "@chakra-ui/react";
import React from "react";
import ColorModeSwitch from "./ColorModeSwitch";
interface Props {
  onShowSignIn: () => void;
}

const TopBar = ({ onShowSignIn }: Props) => {
  return (
    <HStack
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={5}
      borderRadius={5}
    >
      <ColorModeSwitch></ColorModeSwitch>
      <Button onClick={onShowSignIn}>Sign In</Button>
    </HStack>
  );
};

export default TopBar;
