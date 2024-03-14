import { Flex } from "@chakra-ui/react";
import Account from "../account/Account";
import Transaction from "../transaction/Transaction";
import Category from "../category/Category";

const Home = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Account />
      <Category />
      <Transaction />
    </Flex>
  );
};

export default Home;
