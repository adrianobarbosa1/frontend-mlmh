import {
    Flex,
    Link,
    Menu,
    MenuButton,
    Icon,
    Text,
    MenuList,
    Avatar,
    Heading
} from "@chakra-ui/react";

export default function NavItemAvatar({ navSize, title, active }) {
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
                        <Avatar size={navSize == 'small' ? 'sm' : 'md'} src='https://bit.ly/ryan-florence' alignItems={navSize == 'small' ? 'center' : 'flex-start'} />
                        <Flex flexDir='column' w='130px' ml={4} mt={2} display={navSize == 'small' ? 'none' : 'flex'}>
                            <Heading as='h3' size='sm' display={navSize == 'small' ? 'none' : 'flex'}>{title}</Heading>
                            <Text color='#d3d7ff'>Admin</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}