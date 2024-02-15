import { Box, HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box boxShadow={"dark-lg"} p={5} borderRadius={5}>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      ></Switch>
      <Text>Color Mode</Text>
    </Box>
  );
};

export default ColorModeSwitch;
