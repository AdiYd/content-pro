import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme, Container } from '@mui/material';

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

const StepThreeSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

const WizardSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
});

// ----------------------------------------------------------------------

const defaultValues = {
  stepOne: { fullName: '', email: '' },
  stepTwo: { age: '' },
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
    <Container
      sx={{
        boxShadow: customShadows().z12,
        p: 2,
        width: 1,
        borderRadius: 2,
        border: 'none',
        mx: 'auto',
        maxWidth: 720,
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <Stepper steps={steps} activeStep={activeStep} />
        <AnimateBorder
          sx={{ maxWidth: { md: '60%', xs: '100%' }, borderRadius: 2, mx: 'auto' }}
          animate={{ color: theme.palette.primary.main, borderRadius: 2 }}
        >
          <Box
            gap={3}
            display="flex"
            flexDirection="column"
            sx={{
              p: 3,
              zIndex: 25,
              mb: 3,
              // maxWidth: { md: '60%', xs: '100%' },
              minHeight: 240,
              borderRadius: 1.5,
              border: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepThree />}
            {completedStep && <StepCompleted onReset={handleReset} />}

            {!completedStep && (
              <Box display="flex" width={1} justifyContent="center">
                {activeStep !== 0 && <Button onClick={handleBack}>חזרה</Button>}

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
                  <Button variant="contained" onClick={() => handleNext('stepTwo')}>
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
          </Box>
        </AnimateBorder>
      </Form>
    </Container>
  );
}
