import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  HStack
} from '@chakra-ui/react';
import { useRouter } from "next/router";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Box
      w='100%'
      // position='absolute'
      boxShadow='md'
    >
      <Flex
        bg={useColorModeValue('blueGradient', 'gray.800')}
        boxShadow='lg'
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>

          </Text>

          <HStack>
            <Link href="/" >
              <Image
                display={{ base: 'none', md: 'flex' }}
                cursor='pointer'
                htmlWidth='150px'
                objectFit='cover'
                src='img/mlmhwhite.png' alt='logo Anápolis' />
            </Link>

            <Link href="/" >
              <Image
                cursor='pointer'
                htmlWidth='150px'
                objectFit='cover'
                src='img/logo_branco.png' alt='logo Anápolis' />
            </Link>
          </HStack>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            display={{ md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'text'}
            bg={'white'}
            // href={'#'}
            _hover={{
              bg: 'yellowOficial',
            }}
            onClick={() => router.push('/login')}
          >
            Gestor
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {/* <MobileNav /> */}
      </Collapse>
    </Box>
  );
}

