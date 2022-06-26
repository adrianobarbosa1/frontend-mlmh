import { Icon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Table } from '@chakra-ui/react'
import { Thead } from '@chakra-ui/react'
import { Tr } from '@chakra-ui/react'
import { Td } from '@chakra-ui/react'
import { Tfoot } from '@chakra-ui/react'
import { Tbody } from '@chakra-ui/react'
import { Th } from '@chakra-ui/react'
import { TableCaption } from '@chakra-ui/react'
import { TableContainer } from '@chakra-ui/react'
import { ButtonGroup } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function formteste() {
  const { register, control, setValue, handleSubmit, watch, formState, formState: { errors } } = useForm({})
  const toast = useToast()
  const [valor, setValor] = useState(0)
  const handleChange = (value) => { setValor(value) }

  console.log(errors)
  const onSubmit = data => {
    console.log(data)
    toast({
      position: 'top',
      title: "Ocorreu um erro.",
      description: `${data.email}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Flex
      w='100%'
      maxWidth={1480}
      ml={{ base: '0.1rem' }}
      px={{ base: '0', md: '6' }}
      my='6'
      pt='5rem'
    >
      <Box
        as='form'
        onSubmit={handleSubmit(onSubmit)}
        flex='1'
        bg='#fff'
        p={{ base: '2', md: '8' }}
        boxShadow='dark-lg'
        rounded='xl'
      >
        <FormControl isInvalid={errors.estado_civil}>
          <FormLabel htmlFor='vitima_violencia'>
            <Box display='inline-block' mr={3}>
              Quantidade de Pessoas no Grupo Familiar?*
            </Box>
          </FormLabel>
          <Flex>
            <NumberInput size='lg' maxW={32} defaultValue={2} min={2}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </FormControl>

        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

        <Button
          type='submit'
          isLoading={formState.isSubmitting}
          mb="16px"
          mt='5rem'
          bg='yellowOficial'
          color='text'
          fontSize="xs"
          variant="no-effects"
          px="30px"
        >
          Cadastrar
        </Button>

      </Box>
    </Flex>
  )
}
