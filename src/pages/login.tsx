import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    useColorModeValue,
    Image,
    HStack

} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            email,
            password
        }

        await signIn(data)
    }
    return (
        <Flex
            as='form'
            onSubmit={handleSubmit}
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <HStack>
                        <Link href="/" >
                            <Image
                                cursor='pointer'
                                htmlWidth='150px'
                                objectFit='cover'
                                src='img/mlmhblue.png' alt='logo Anápolis' />
                        </Link>

                        <Link href="/" >
                            <Image
                                cursor='pointer'
                                htmlWidth='150px'
                                objectFit='cover'
                                src='img/logo_blue.png' alt='logo Anápolis' />
                        </Link>
                    </HStack>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Senha</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                {/* <Checkbox>Remember me</Checkbox> */}
                                {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                            </Stack>
                            <Button
                                type='submit'
                                bg={'blueGradient'}
                                color={'white'}
                                _hover={{
                                    filter: 'auto',
                                    brightness: '0.9',
                                }}
                            >
                                Acessar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}