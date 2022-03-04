import { Stack, HStack, Box, } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
    return (
        <Stack spacing="6" mt="8" justify="space-between" align="center" direction={["column", "row"]}>
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>

            <HStack>
                <PaginationItem isCurrent number={1} />
                <PaginationItem number={2} />
                <PaginationItem number={3} />
                <PaginationItem number={4} />
                <PaginationItem number={5} />
            </HStack>
        </Stack>
    );
};