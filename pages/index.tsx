import type { NextPage } from "next";
import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
// import dynamic from "next/dynamic";
import Blocks from "../components/blockScene";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      {/* <Flex h="100vh" w="100vw"> */}
      {/*   <Blocks /> */}
      {/* </Flex> */}
      <Box h='100vh' w='100vw'>
        <Blocks />
      </Box>
    </>
  );
};

export default Home;
