import {
    Avatar,
    Divider,
    Flex,
    Heading,
    IconButton,
    Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
    FiMenu,
    FiHome,
    FiSettings,
    FiBriefcase,
    FiDollarSign,
    FiUser,
    FiCalendar
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import { AuthContext } from "../contexts/AuthContext";

import NavItem from "./NavItem";
import NavItemAvatar from "./NavItemAvatar";

export default function Sidebar() {
    const [navSize, changeNavSize] = useState('small')
    const { user } = useContext(AuthContext)
    return (
        <Flex
            bg='blueGradient'
            pos='sticky'
            left='2'
            h='98vh'
            mt='1vh'
            boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
            borderRadius={navSize == 'small' ? '15px' : '30px'}
            w={navSize == 'small' ? '60px' : '200px'}
            flexDir='column'
            justifyContent='space-between'
        >
            <Flex
                p='2%'
                flexDir='column'
                alignItems={navSize == 'small' ? 'center' : 'flex-start'}
                as='nav'
            >
                <IconButton
                    aria-label='Search database'
                    bg='none'
                    color='white'
                    mt={2}
                    _hover={{ bg: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        navSize == 'small' ?
                            changeNavSize('large') :
                            changeNavSize('small')
                    }}
                />


                <NavItemAvatar navSize={navSize} title={user?.name} />

                <Divider display={navSize == 'small' ? 'none' : 'flex'} />

                <NavItem navSize={navSize} icon={FiHome} title={'Dashboard'} />
                <NavItem navSize={navSize} icon={FiCalendar} title={'Calendar'} active />
                <NavItem navSize={navSize} icon={FiUser} title={'Clientes'} />
                <NavItem navSize={navSize} icon={IoPawOutline} title={'Animals'} />
                <NavItem navSize={navSize} icon={FiDollarSign} title={'Stocks'} />
                <NavItem navSize={navSize} icon={FiBriefcase} title={'Reports'} />
                <NavItem navSize={navSize} icon={FiSettings} title={'Settings'} />
            </Flex>



        </Flex>
    )
}