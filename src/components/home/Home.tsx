import { Grid, GridItem } from "@chakra-ui/react";
import Account from "../account/Account";
import Category from "../category/Category";
import { TransactionTable } from "../transaction/TransactionTable";
import TransactionForm from "../transaction/TransactionForm";
import { useReducer } from "react";

const Home = () => {
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <Grid
      mt={16}
      templateAreas={`"acc acc trF trF trF"
                      "cat cat trF trF trF"
                      "trT trT trT trT trT"
                      "grp grp grp grp grp"
                     `}
      gridTemplateColumns={"20vw 20svw 15vw 15vw 15vw"}
      gridTemplateRows={"300px 300px 1fr 300px"}
      gap={"5"}
      ml={14}
      mr={14}
    >
      <GridItem area={"acc"}>
        <Account />
      </GridItem>

      <GridItem area={"cat"}>
        <Category />
      </GridItem>

      <GridItem area={"trF"}>
        <TransactionForm forceUpdate={forceUpdate} />
      </GridItem>

      <GridItem area={"trT"}>
        <TransactionTable forceUpdate={forceUpdate} update={update} />
      </GridItem>

      <GridItem area={"grp"} bg={"blue.200"} borderRadius={5}></GridItem>
    </Grid>
  );
};

export default Home;
