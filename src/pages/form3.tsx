import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import UserForm from "../components/Form/UserForm";
import AddressForm from "../components/Form/AddressForm";
import Review from "../components/Form/Review";
import FamilyForm from "../components/Form/familyForm";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

const steps = ['UserForm', 'AddressForm', 'FamilyForm', 'Review'];

function getStepContent(step: number, register: UseFormRegister<any>) {
  switch (step) {
    case 0:
      return <UserForm register={register} />;
    case 1:
      return <AddressForm register={register} />;
    case 2:
      return <FamilyForm register={register} />;
    case 3:
      return <Review register={register} />;
    default:
      throw new Error('Unknown step');
  }
}

interface IFormInputs {
  nome: string
  email: string
  cpf: string
  dt_nascimento: string
  telefone: string
}

export default function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, register, watch } = useForm<IFormInputs>()

  const wathGrupoFamiliar = watch('grupo_familiar')

  const onSubmit = data => {
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Flex
        w='100%'
        maxWidth={1480}
        mx='auto'
        px='6'
        my='6'
        pt='5rem'
      >

        <Box as='form'
          onSubmit={handleSubmit(onSubmit)}
          flex='1'
          bg='#fff'
          p='8'
          boxShadow='dark-lg'
          rounded='xl'
        >
          <Flex
            justify='center'
          >
            <Heading
              fontWeight='bold'
              color='text'
              size='md'
              mb='2rem'
            >
              Página <Text
                as='span'
                color='whitesmoke'
                bg='blueOficial'
                m='2'
                p='2'
                borderRadius='full'
              >{activeStep}</Text>
            </Heading>
          </Flex>

          <>
            {activeStep === steps.length ? (
              <>
                <Text variant="h5">
                  Seu cadastro foi realizado com sucesso.
                </Text>
                <Text >
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Text>

              </>
            ) : (
              <>
                {getStepContent(activeStep, register)}
                <Box sx={activeStep == 0 ?
                  { display: 'flex', justifyContent: 'flex-end' } :
                  { display: 'flex', justifyContent: 'space-between' }}>
                  {activeStep !== 0 && (
                    <Button
                      mb="16px"
                      bg='yellowOficial'
                      color='text'
                      fontSize="xs"
                      variant="no-effects"
                      px="30px"
                      onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Voltar
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ?
                    (<Button
                      type='submit'
                      onClick={handleNext}
                      mb="16px"
                      bg='yellowOficial'
                      color='text'
                      px="30px"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Finalizar
                    </Button>) :
                    (<Button
                      mb="16px"
                      type='button'
                      bg='yellowOficial'
                      color='text'
                      fontSize="xs"
                      px="30px"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Próximo
                    </Button>)}
                </Box>
              </>
            )}
          </>
        </Box>
      </Flex>
    </>
  );
}
