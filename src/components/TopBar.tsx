import { Button, ColorModeContext, HStack } from "@chakra-ui/react";
import React from "react";
import ColorModeSwitch from "./ColorModeSwitch";
interface Props {
  onShowSignIn: () => void;
  onShowSignUp: () => void;
}

const TopBar = ({ onShowSignIn, onShowSignUp }: Props) => {
  return (
    <HStack
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={5}
      borderRadius={5}
    >
      <ColorModeSwitch></ColorModeSwitch>
      {/* <Button onClick={onShowSignIn}>Sign In</Button> */}
      {/* <Button onClick={onShowSignUp}>Sign Up</Button> */}
    </HStack>
  );
};

export default TopBar;
