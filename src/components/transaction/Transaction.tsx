import React, { useState } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionTable } from "./TransactionTable";
import { Box, HStack, VStack } from "@chakra-ui/react";

const Transaction = () => {
  return (
    <>
      <VStack>
        <TransactionForm />
        <TransactionTable />
      </VStack>
    </>
  );
};

export default Transaction;
