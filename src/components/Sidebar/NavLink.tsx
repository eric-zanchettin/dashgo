import { ElementType } from "react";
import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text, } from "@chakra-ui/react";
import { IconType } from "react-icons";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    icon: IconType | ElementType;
    title: string;
    href: string;
};

export function NavLink({ title, icon, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{title}</Text>
            </ChakraLink>
        </ActiveLink>
    );
};