import { Box, Flex, Text, Avatar, } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box>
                    <Text>Eric Zanchettin Presto</Text>
                    <Text color="gray.300" fontSize="small">canalmontrisz@hotmail.com</Text>
                </Box>
            )}

            <Avatar size="md" name="Eric Zanchettin Presto" src="" />
        </Flex>
    );
};