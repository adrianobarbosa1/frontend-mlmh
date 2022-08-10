import {
    Flex,
    Link,
    Menu,
    MenuButton,
    Icon,
    Text,
    MenuList,
    Avatar,
    Heading,
    AvatarBadge
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavItemAvatar({ navSize, title, active }) {
    const { user } = useContext(AuthContext)
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
                        <Avatar size={navSize == 'small' ? 'sm' : 'md'} alignItems={navSize == 'small' ? 'center' : 'flex-start'} >
                            <AvatarBadge boxSize='1.25em' bg={!!user ? 'green.500' : 'tomato'} />
                        </Avatar>

                        <Flex flexDir='column' w='130px' ml={4} mt={2} display={navSize == 'small' ? 'none' : 'flex'}>
                            <Heading as='h3' size='sm' display={navSize == 'small' ? 'none' : 'flex'}>{title}</Heading>
                            <Text color='#d3d7ff'>{user?.role}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}