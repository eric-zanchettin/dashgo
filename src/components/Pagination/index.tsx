import { Stack, HStack, Box, Text, } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
};

const siblingsCount = 1;

const generatePages = (currentPage: number, totalPages: number) => {
    const pages = [];

    for (let i = currentPage - siblingsCount;i <= currentPage + siblingsCount;i++) {
        if (i > 0 && i <= totalPages) pages.push(i);
    };

    return pages;
};

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const totalPages = totalCountOfRegisters / registersPerPage;
    const pages = generatePages(currentPage, totalPages);
    let prevPages = [...pages];
    let nextPages = [...pages];

    const currentPageIdx = pages.indexOf(currentPage)

    prevPages = prevPages.splice(0, currentPageIdx);
    nextPages = nextPages.splice(currentPageIdx + 1, pages.length);

    return (
        <Stack spacing="6" mt="8" justify="space-between" align="center" direction={["column", "row"]}>
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>{totalCountOfRegisters}</strong>
            </Box>

            <HStack>

                { currentPage > siblingsCount + 1 && <PaginationItem  number={1} onPageChange={onPageChange} />}
                
                { (prevPages.length > 0) && (
                    prevPages.map((page) => {
                        return (
                            <>
                                { ( currentPage > (2 + siblingsCount) ) && <Text>...</Text> }
                                <PaginationItem key={page} number={page} onPageChange={onPageChange} />
                            </>
                        )
                    })
                )}


                <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

                { (nextPages.length > 0) && (
                    nextPages.map(page => {
                        return (
                            <>
                                <PaginationItem key={page} number={page} onPageChange={onPageChange} />
                                { (currentPage < (totalPages - 3) ) && <Text>...</Text> }
                            </>
                        )
                    })
                )}

                { currentPage < totalPages - siblingsCount && <PaginationItem number={20} onPageChange={onPageChange} />}

            </HStack>
        </Stack>
    );
};