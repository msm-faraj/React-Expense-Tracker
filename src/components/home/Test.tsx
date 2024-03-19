import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { AccountContext } from "../context/AccountContext";

const Test = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { setData } = useContext(DataContext);
  const { accounts } = useContext(AccountContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newData = { id, name, userId };
      setData(newData);
      console.log(newData);
    } catch (error) {}
  };
  return (
    <>
      <h1>test</h1>
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="id">id</FormLabel>
        <Input id="id" onChange={(e) => setId(e.target.value)}></Input>

        <FormLabel htmlFor="name">name</FormLabel>
        <Input id="name" onChange={(e) => setName(e.target.value)}></Input>

        <FormLabel htmlFor="userId">userId</FormLabel>
        <Input id="userId" onChange={(e) => setUserId(e.target.value)}></Input>

        <Button type="submit">Set Data</Button>
      </form>
      <Box>{JSON.stringify(accounts)}</Box>
    </>
  );
};

export default Test;
