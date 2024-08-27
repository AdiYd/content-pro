import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, useTheme, Container } from '@mui/material';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';
import { AnimateBorder } from 'src/components/animate';

import { Stepper, StepOne, StepTwo, StepThree, StepCompleted } from './form-steps';

// ----------------------------------------------------------------------

const steps = ['פרטי התקשרות', 'פרטים כלליים', 'תשלום'];

const StepOneSchema = zod.object({
  fullName: zod.string().min(2, { message: 'נא למלא שם מלא' }),
  email: zod
    .string()
    .min(1, { message: 'נא למלא כתובת אימייל' })
    .email({ message: 'נא למלא כתובת אימייל תקינה' }),
});

const StepTwoSchema = zod.object({});

const StepThreeSchema = zod.object({});

const WizardSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'נא למלא כתובת אימייל' })
    .email({ message: 'נא למלא כתובת אימייל תקינה' }),
  name: zod.string().min(2, { message: 'נא למלא שם מלא' }),
  // stepOne: StepOneSchema,
  // stepTwo: StepTwoSchema,
  // stepThree: StepThreeSchema,
});

// ----------------------------------------------------------------------

const defaultValues = {
  stepOne: { fullName: '', email: '' },
  stepTwo: { age: 0 },
};

export function FormWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleNext = useCallback(
    async (step) => {
      if (step) {
        const isValid = await trigger(step);

        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
    [trigger]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Create success!');
      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === steps.length;

  return (
    <AnimateBorder
      sx={{ borderRadius: 2, borderWidth: 0 }}
      animate={{
        angle: 250,
        outline: '',
        // disableDoubleline: true,
        length: 10,
        color: theme.palette.error.main,
        // width: '1px',
      }}
    >
      <Container
        sx={{
          boxShadow: customShadows().z16,
          py: 4,
          px: 2,
          width: 1,
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`,
          mx: 'auto',
          maxWidth: 720,
        }}
      >
        <Form methods={methods} onSubmit={onSubmit}>
          <Stepper steps={steps} activeStep={activeStep} />
          {/* <AnimateBorder
            sx={{ zIndex: 10, maxWidth: { md: '60%', xs: '100%' }, borderRadius: 2, mx: 'auto' }}
            animate={{
              disable: true,
              color: theme.palette.success.main,
              // outline: '',
              disableDoubleline: true,
              width: '1px',
              length: 30,
            }}
          > */}
          <Card
            gap={3}
            // display="flex"
            // flexDirection="column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              p: 3,
              zIndex: 25,
              mb: 3,
              maxWidth: { md: '60%', xs: '100%' },
              minHeight: 240,
              mx: 'auto',
              borderRadius: 2,
              // border: theme.palette.mode === 'light' && `solid 1px ${theme.vars.palette.divider}`,
              // background: theme.palette.background.paper,
            }}
          >
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepThree />}
            {completedStep && <StepCompleted onReset={handleReset} />}

            {!completedStep && (
              <Box zIndex={26} display="flex" width={1} justifyContent="center">
                {activeStep !== 0 && (
                  <Button color={mainColor} onClick={handleBack}>
                    חזרה
                  </Button>
                )}

                <Box sx={{ flex: 'auto 1 1' }} />

                {activeStep === 0 && (
                  <Button
                    variant="contained"
                    color={mainColor}
                    onClick={() => handleNext('stepOne')}
                  >
                    הבא
                  </Button>
                )}
                {activeStep === 1 && (
                  <Button
                    color={mainColor}
                    variant="contained"
                    onClick={() => handleNext('stepTwo')}
                  >
                    הבא
                  </Button>
                )}
                {activeStep === 2 && (
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    לתשלום
                  </LoadingButton>
                )}
              </Box>
            )}
          </Card>
          {/* </AnimateBorder> */}
        </Form>
      </Container>
    </AnimateBorder>
  );
}
