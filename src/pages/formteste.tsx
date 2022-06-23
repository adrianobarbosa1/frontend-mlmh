import { EditIcon, QuestionIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useToast
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function formteste() {
  const { register, control, setValue, handleSubmit, watch, formState, formState: { errors } } = useForm({})
  const toast = useToast()

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
        <FormControl isInvalid={errors.nome}>
          <FormLabel htmlFor='nome'>
            <Box display='inline-block' mr={3}>
              Nome
            </Box>
            <Popover>
              <PopoverTrigger>
                <IconButton aria-label='' size='sm' icon={<QuestionOutlineIcon />} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Email!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
              </PopoverContent>
            </Popover>
          </FormLabel>
          <Input focusBorderColor='blue' bgColor='gray.50'
            {...register("nome", { required: "Nome é obrigatório." })}
          />
          <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>

        </FormControl>

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
