import { useState } from 'react';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useUsers } from '../../services/hooks/useUsers';
import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link, } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header, } from '../../components/Header';
import { Sidebar, } from '../../components/Sidebar';
import { Pagination, } from '../../components/Pagination';
import NextLink from 'next/link';

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, isFetching } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const handlePrefetchUser = async (userId: number) => {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const user = await api.get(`user/${userId}`);

            return user.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes...
        });
    };

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml={4} /> }
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine}
                                    fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </NextLink>
                    </Flex>

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Houve um erro em carregar os dados de Usuário.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de Cadastro</Th>}
                                        <Th w="8">Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link
                                                            fontWeight="bold"
                                                            color="purple.400"
                                                            onMouseEnter={() => handlePrefetchUser(user.id)}
                                                        >
                                                            {user.name}
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                <Td>
                                                    {isWideVersion && <Text>{user.createdAt}</Text>}
                                                </Td>
                                                <Td>
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="pink"
                                                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                    >
                                                        {isWideVersion ? 'Editar' : null}
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                registersPerPage={10}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};