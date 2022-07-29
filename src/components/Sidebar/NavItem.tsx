import {
    Flex,
    Link,
    Menu,
    MenuButton,
    Icon,
    Text,
    MenuList
} from "@chakra-ui/react";

export default function NavItem({ navSize, icon, title, active }) {
    return (
        <Flex
            mt={2}
            flexDir='column'
            w='100%'
            alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        >
            <Menu>
                <Link
                    backgroundColor={active && '#AEC8CA'}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: '#82AAAD' }}
                    w={navSize == 'large' && '100%'}
                >
                    <MenuButton w='100%'>
                        <Flex>
                            <Icon as={icon} fontSize='xl' color={active ? '#5f5f5f' : 'white'} />
                            <Text ml={5} color='white' display={navSize == 'small' ? 'none' : 'flex'}>{title}</Text>
                        </Flex>

                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}