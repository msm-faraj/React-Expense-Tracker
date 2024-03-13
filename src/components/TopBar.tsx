import { HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const TopBar = () => {
  return (
    <HStack
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={5}
      borderRadius={5}
    >
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default TopBar;
