import { Stack, useColorModeValue } from '@chakra-ui/react';
import MobileNavItem from './MobileNavItem';
import NAV_ITEMS from './Nav.data';

export default function MobileNav() {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};