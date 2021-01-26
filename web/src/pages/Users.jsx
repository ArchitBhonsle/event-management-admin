import { Grid, Input, VStack, HStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

import Layout from "../components/Layout";
import UserCard from "../components/UserCard";

const users = [
  {
    rollNo: "100000",
    dept: "COMPS",
    criteria: [true, true, true],
    moneyOwed: 200,
    isPaid: false,
    name: "Abcd Efgh",
  },
  {
    rollNo: "200000",
    dept: "ELEC",
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: true,
    name: "Abcd Efgh",
  },
  {
    rollNo: "300000",
    dept: "EXTC",
    criteria: [true, true, true],
    moneyOwed: 200,
    isPaid: false,
    name: "Abcd Efgh",
  },
  {
    rollNo: "400000",
    dept: "MECH",
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: true,
    name: "Abcd Efgh",
  },
  {
    rollNo: "500000",
    dept: "IT",
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: false,
    name: "Abcd Efgh",
  },
];

export default function Users() {
  const [searchText, setSearchText] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(searchText);
    }
  }

  return (
    <Layout>
      <VStack spacing={4}>
        <HStack w='100%'>
          <Input
            type='text'
            placeholder='Roll Number or Email'
            size='lg'
            colorScheme='green'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            colorScheme='green'
            size='lg'
            rightIcon={<MdSearch fontSize='1.5rem' />}
          >
            Search
          </Button>
        </HStack>
        <Grid gridTemplateColumns='repeat(2, 1fr)' gap={4} w='100%'>
          {users.map((opts) => (
            <UserCard key={opts.rollNo} {...opts} />
          ))}
        </Grid>
      </VStack>
    </Layout>
  );
}
