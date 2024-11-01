'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Circles } from 'react-loader-spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card, useTheme, Container, Typography, CircularProgress } from '@mui/material';

import { trackEvent } from 'src/utils/GAEvents';
import { addGift, getUserByEmail } from 'src/utils/firebaseFunctions';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';
import { bgGradientAnimate } from 'src/theme/styles';

import { Form } from 'src/components/hook-form';
import { AnimateBorder } from 'src/components/animate';

import PaymentForm from './payment';
import { StepTwo, Stepper, StepOne, StepThree } from './form-steps';

// ----------------------------------------------------------------------

const steps = ['פרטי התקשרות', 'בחירת נישה', 'תשלום'];

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
  approveTerms: zod.boolean().refine((val) => val === true, {
    message: 'יש לאשר את תנאי השימוש ותקנון האתר',
  }),
  age: zod.number().optional(),
  gender: zod.string().optional(),
  packageType: zod.string().optional(),
  niche: zod.string({ message: 'נא לבחור נישה' }),
  goals: zod.array(zod.string()).optional(),
  totalPrice: zod.number().optional(),
  // stepOne: StepOneSchema,
  // stepTwo: StepTwoSchema,
  // stepThree: StepThreeSchema,
});

// ----------------------------------------------------------------------

const colorSteps = {
  0: 'error',
  1: 'info',
  2: 'success',
};

const defaultValues = {
  email: '',
  name: '',
  approveTerms: false,
  age: 0,
  gender: '',
  niche: 'ספורט ובריאות',
  goals: ['ללמוד ולהתמקצע'],
  totalPrice: 99,
  packageType: 'Master-pro',
};

const packageTypesDict = {
  'Base-Pro': {
    id: '100',
    price: 249,
  },
  'Extra-Pro': {
    id: '200',
    price: 499,
  },
  'Xtra-Pro': {
    id: '200',
    price: 499,
  },
  'Master-Pro': {
    id: '300',
    price: 749,
  },
};

export function FormWizard({ coursePrice, influencer }) {
  const [activeStep, setActiveStep] = useState(process.env.NODE_ENV === 'development' ? 2 : 0);
  const [loading, setLoading] = useState(false);
  const [gift, setGift] = useState(false);
  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState();
  const [paymentLoad, setPaymentLoad] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { mainColor, mode } = useContext(ColorContext);

  // useEffect(() => {
  //   handlePyament(defaultValues);
  // }, []);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleNext = useCallback(
    async (step) => {
      if (step) {
        let isValid = true;
        if (step === 'stepOne') {
          isValid = await trigger(['email', 'name', 'approveTerms']);
          if (isValid) {
            const isExist = await getUserByEmail(methods.getValues().email.toLowerCase().trim());
            if (isExist?.length) {
              setExist(isExist[0]?.id || true);
              return;
            }
          } else {
            return;
          }
          
        } else {
          await trigger(['age', 'niche', 'goals', 'gender']);
        }

        if (isValid) {
          // trackEvent(`New user: ${methods.getValues().email}`);
          if (step === 'stepOne') {
            trackEvent(
              'New user',
              'Signup',
              `${methods.getValues().name} ; ${methods.getValues().email}`,
              1
            );
            fetch('/api/leads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: methods.getValues().name,
                email: methods.getValues().email,
              }),
            });
          }
          trackEvent('Signup', `Step #${activeStep + 1}`);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        trackEvent('Signup', `Step #${activeStep + 1}`);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
    [trigger, activeStep, methods]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const handlePyament = async (formData) => {
    try {
      setLoading(true);
      // setActiveStep('pay');
      // setTimeout(() => {
      //   setLoading(false);
      // }, 5 * 1e3);
      const { email, name, totalPrice, phone, info, packageType } = formData;
      const itemInfo = `[${packageTypesDict[packageType]?.id}~${packageType}~1~${totalPrice.toFixed(2)}]`;
      const templateCode = 4;
      const api = {
        key: process.env.NEXT_PUBLIC_CC_API,
        masof: process.env.NEXT_PUBLIC_CC_MASOF,
        passp: process.env.NEXT_PUBLIC_CC_PASSP,
      };
      const apiUrl = `https://pay.hyp.co.il/p/?action=APISign&What=SIGN&KEY=${api.key}&Masof=${api.masof}&PassP=${api.passp}&Order=${email || 'unSigned'}&Amount=${totalPrice || '499.0'}&UTF8=True&UTF8out=True&ClientName=${name?.split(' ')[0] || 'ישראל'}&ClientLName=${name?.split(' ')[1] || 'ישראלי'}&cell=${phone || ''}&email=${email || 'Admin@webly.digital'}&Info=${info || ''}&Tash=2&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&heshDesc=${itemInfo}&Pritim=True&PageLang=HEB&tmp=${templateCode || 7}`;
      // const apiUrl = `https://icom.yaad.net/p/?action=APISign&What=SIGN&KEY=${api.key}&Masof=${api.masof}&PassP=${api.passp}&Order=${email || 'unSigned'}&Amount=${totalPrice || '0.0'}&UTF8=True&UTF8out=True&ClientName=${name?.split(' ')[0] || 'ישראל'}&ClientLName=${name?.split(' ')[1] || 'ישראלי'}&cell=${phone || ''}&email=${email || 'Admin@webly.digital'}&Info=${info || ''}&Tash=2&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&heshDesc=${itemInfo}&Pritim=True&PageLang=HEB&tmp=${templateCode || 7}`;
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiUrl, ...formData }),
      });
      const result = await res.json();
      // setLoading(false);
      const urlRes = `https://pay.hyp.co.il/p/?action=pay&${result.url}`;
      // const urlRes = `https://icom.yaad.net/p/?action=pay&${result.url}`;
      const giftUrl = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3033' : 'https://videopro.webly.digital'}/success?Id=12788261&CCode=0&Amount=${totalPrice || '0.0'}&ACode=0012345&Order=12345678910&Fild1=${name || 'ישראל ישראלי'}&Fild2=${email || 'aDmin@webly.digital'}&Fild3=&Sign=13cccf141e2fc2e2dd8d8201a90d58929514d97e00084cb9436cab087f1ba8c6&Bank=6&Payments=1&UserId=203269535&Brand=2&Issuer=2&L4digit=0000&street=levanon%203&city=netanya&zip=42361&cell=098610338&Coin=1&Tmonth=03&Tyear=2022&errMsg=%20(0)&Hesh=31`;
      router.push(gift ? giftUrl : urlRes);
      // setUrl(urlRes);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      data.email = data.email.toLowerCase().trim();
      console.info('DATA', data);
      console.log('Price: ', data.totalPrice);

      handlePyament(data);
      // handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const handleGift = async () => {
    setLoading(true);
    await addGift(methods.getValues());
    setGift(true);
    setTimeout(() => {
      setLoading(false);
    }, 0.6 * 1e3);
  };

  const completedStep = activeStep === steps.length;
  const name = methods.getValues().name.split(' ')[0];
  const { email } = methods.getValues();

  return (
    <AnimateBorder
      sx={{ borderRadius: 2, borderWidth: 0 }}
      animate={{
        angle: 250,
        outline: '',
        distance: 10,
        // disableDoubleline: true,
        length: 10,
        color: theme.palette[colorSteps[activeStep] || 'error'].main,
        // width: '1px',
      }}
    >
      <Container
        sx={{
          zIndex: 30,
          boxShadow: customShadows(mode).z16,
          py: 4,
          px: 1,
          width: 1,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          mx: 'auto',
          maxWidth: 720,
        }}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stepper steps={steps} activeStep={activeStep} />

          <Card
            gap={2}
            // display="flex"
            // flexDirection="column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              py: 1,
              px: 1,
              zIndex: 25,
              mb: 2,
              overflow: 'visible',
              maxWidth: { md: '80%', xs: '100%' },
              minHeight: 240,
              mx: 'auto',
              borderRadius: 2,
              borderStyle: 'solid',
              borderColor: theme.palette.divider,
              borderWidth: { lg: '1px', md: 0 },
              // boxShadow: { md: 'none', lg: 'inherit' },
              boxShadow: 'none',
              // border: theme.palette.mode === 'light' && `solid 1px ${theme.vars.palette.divider}`,
              // background: theme.palette.background.paper,
            }}
          >
            {exist ? (
              <Container sx={{ textAlign: 'center', my: 2 }}>
                <Typography variant="h4">לפי הרישומים שלנו, יש לך כבר חשבון</Typography>
                <Button
                  variant="outlined"
                  href={`/login?id=${exist}`}
                  sx={{ mt: 8, borderRadius: 10, ...bgGradientAnimate }}
                >
                  למעבר לאיזור האישי
                </Button>
              </Container>
            ) : (
              <>
                {activeStep === 0 && (
                  <StepOne errors={errors} control={control} setValue={setValue} />
                )}
                {activeStep === 1 && <StepTwo setValue={setValue} name={name} />}
                {activeStep === 2 && (
                  <StepThree
                    influencer={influencer}
                    setValue={setValue}
                    setGift={handleGift}
                    coursePrice={coursePrice}
                    loading={loading}
                    name={name}
                    email={email}
                  />
                )}
                {activeStep === 'pay' &&
                  (paymentLoad && !url ? (
                    <Circles
                      wrapperClass="flex justify-center width-full my-8"
                      height={80}
                      color={theme.palette[mainColor]?.main}
                      width={80}
                      visible
                    />
                  ) : (
                    <PaymentForm paymentUrl={url} />
                  ))}
              </>
            )}
            {/* {completedStep && <StepCompleted onReset={handleReset} />} */}
          </Card>
          {!completedStep && (
            <Box zIndex={30} display="flex" width={1} justifyContent="center">
              {activeStep !== 0 && (
                <Button sx={{ zIndex: 30 }} color={mainColor} onClick={handleBack}>
                  חזרה
                </Button>
              )}

              <Box sx={{ flex: 'auto 1 1' }} />

              {activeStep === 0 &&
                (loading ? (
                  <CircularProgress />
                ) : (
                  !exist && (
                    <Button
                      sx={{ zIndex: 30 }}
                      variant="contained"
                      color={mainColor}
                      onClick={() => {
                        setLoading(true);
                        handleNext('stepOne').then(() => setLoading(false));
                      }}
                    >
                      הבא
                    </Button>
                  )
                ))}
              {activeStep === 1 &&
                (loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    sx={{ zIndex: 30 }}
                    color={mainColor}
                    variant="contained"
                    onClick={() => {
                      setLoading(true);
                      handleNext('stepTwo').then(() => setLoading(false));
                    }}
                  >
                    הבא
                  </Button>
                ))}
            </Box>
          )}
        </Form>
      </Container>
    </AnimateBorder>
  );
}

