import { useColorModeValue } from "@/components/ui/color-mode";
import { useJellyfinStore } from "@/stores/useJellyfinStore";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return <Flex p='3' direction='column'>
    <Heading mb='1'>Server list</Heading>
    <hr />
    {children}
  </Flex>
}

const JellyfinServerSelector = () => {
  const store = useJellyfinStore();

  // -------- [AI Content] may contain some alucination --------
  // I double checked in case it may contain some errors, but didn't want to wast time on this
  const accent = useColorModeValue("cyan.500", "cyan.400")
  const bg = useColorModeValue("blue.50", "blue.950")
  const hoverBg = useColorModeValue("blue.100", "blue.800")
  const borderColor = useColorModeValue("blue.200", "blue.700")
  const titleColor = useColorModeValue("blue.900", "blue.50")
  const subtitleColor = useColorModeValue("blue.700", "blue.300")
  //-------- [AI Content] may contain some alucination --------

  if (!store.serverList) {
    return <Header>
      <Text fontSize='small' color='fg.muted' textAlign='center' my='3'>Try searching a server at the panel above</Text>
    </Header>
  }
  if (store.serverList.length === 0) {
    return <Header>
      <Text fontSize='small' color='fg.error' textAlign='center' my='3'>There is no servers availible, try using other url</Text>
    </Header>
  }

  return <Header>
    {store.serverList.map((server) => (
      // -------- [AI Content] may contain some alucination --------
      // I double checked in case it may contain some errors, but didn't want to wast time on this
      <Link
        to="/login/server/$serverAddress"
        params={{ serverAddress: server.address }}
        key={server.address}
      >
        <Box
          p={4}
          my={2}
          borderRadius="xl"
          cursor="pointer"
          transition="all 0.2s ease"
          bg={bg}
          border="1px solid"
          borderColor={borderColor}
          role="group"
          _hover={{
            bg: hoverBg,
            borderColor: accent,
            boxShadow: "md",
            transform: "translateY(-1px)",
          }}
          _active={{
            transform: "translateY(0)",
            boxShadow: "sm",
          }}
          _focusVisible={{
            outline: "none",
            boxShadow: `0 0 0 2px var(--chakra-colors-${accent.replace(".", "-")})`,
          }}
        >
          <Text
            fontWeight="semibold"
            fontSize="md"
            color={titleColor}
            _groupHover={{ color: accent }}
          >
            {server.systemInfo?.ServerName ?? "Jellyfin Server"}
          </Text>

          <Text
            fontSize="sm"
            mt={1}
            color={subtitleColor}
          >
            {server.address}
          </Text>
        </Box>
      </Link>
      // -------- [AI Content] may contain some alucination --------
    ))}
  </Header>;
};

export default JellyfinServerSelector;
