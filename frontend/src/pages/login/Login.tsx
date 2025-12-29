import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

const Login = () => {
  return <div data-testid='Login'>
    <Flex direction='column' gap='3' p='5' alignItems='center'>
      <Flex direction='column' alignItems='center' gap='1' mb='5'>
        <Image src='/logo.png' w='80px' />
        <Heading>Jellyfin Wireless Remote</Heading>
      </Flex>
      <Box w='100%'>
        <Outlet />
      </Box>
    </Flex>

  </div>;
};

export default Login;
