import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import type { ReactNode } from "react";

const JellyfinHeader = ({ children }: { children: ReactNode }) => {
  return <Flex direction='column' gap='3' p='5' alignItems='center'>
    <Flex direction='column' alignItems='center' gap='1' mb='5'>
      <Image src='/logo.png' w='80px' />
      <Heading>Jellyfin Wireless Remote</Heading>
    </Flex>
    <Box w='100%'>
      {children}
    </Box>
  </Flex>;
};

export default JellyfinHeader;
