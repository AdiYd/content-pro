'use client';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Circles } from 'react-loader-spinner';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';

import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import {
  Box,
  Link,
  Card,
  Stack,
  Alert,
  Button,
  Select,
  Dialog,
  Divider,
  useTheme,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  useColorScheme,
} from '@mui/material';

import { textGradient } from 'src/theme/styles';
import { ColorContext } from 'src/context/colorMain';

import { varScale, varBounce, MotionContainer } from 'src/components/animate';

import Footer from '../footer/Footer';
import { Iconify, SocialIcon } from '../iconify';
import COLORS from '../../theme/core/colors.json';

function HowMuchYouWorth({ courseName = 'Video-Pro', id }) {
  const theme = useTheme();
  const { setMode } = useColorScheme();
  const { mainColor, mode, textGradientAnimation } = useContext(ColorContext);
  const [loading, setLoading] = useState(false || id);
  const [isAdmin, setAdmin] = useState(false);
  const [userData, setUserData] = useState();
  const router = useRouter();
  const isActive = isAdmin || Boolean(userData);

  useEffect(() => {
    if (loading) {
      console.log('This is id: ', id);
      setTimeout(() => setLoading(false), 200);
    }
  }, [id, loading]);

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const data = <WorthCalculatorGPT />;

  return (
    <Box
      sx={{
        transform: 'all 0.4s eas-in-out',
        transition: 'ease-in',
        direction: 'rtl',
      }}
      my={4}
      textAlign="center"
      mx="auto"
      width={isActive ? '90%' : 'auto'}
    >
      <div className="top-0">
        <Container sx={{ position: 'relative' }} component={MotionContainer}>
          <m.div variants={varBounce({ durationIn: 0.8 }).in}>
            <Stack
              direction="row"
              justifyContent="center"
              // position="absolute"
              bottom={0}
              spacing={4}
            >
              <div className={`p-2 rounded-full ${mode === 'light' && ' bg-slate-400/30'}`}>
                <LightModeTwoTone
                  onClick={changeMode}
                  className="cursor-pointer hover:opacity-50"
                  titleAccess="Light mode"
                />
              </div>
              <div className={`p-2 rounded-full ${mode === 'dark' && ' bg-slate-400/30'}`}>
                <DarkModeTwoTone
                  onClick={changeMode}
                  className="cursor-pointer hover:opacity-50"
                  titleAccess="DarkModeTwoTone"
                />
              </div>
            </Stack>
            <Typography
              variant="h1"
              sx={{
                ...textGradientAnimation,
              }}
            >
              {courseName}
            </Typography>
            <Typography variant="h4">הבית של יוצרי התוכן הטובים בישראל</Typography>
            {isActive && <Divider sx={{ width: 1, mb: 0 }} />}
          </m.div>
        </Container>
        <Divider />
      </div>
      <Box mt={4} width={1}>
        <Typography color="text.secondary" variant="h5">
          בואו לגלות כמה אתם שווים - המחשבון שלנו יעזור לכם להעריך כמה שווה כל סרטון שלכם
        </Typography>
      </Box>

      {loading ? (
        <Circles
          wrapperClass="flex justify-center width-full my-8"
          height={80}
          color={theme.palette[mainColor]?.main}
          width={80}
          visible
        />
      ) : (
        data
      )}
      <Container component={MotionContainer}>
        <m.div style={{ width: '100%' }} variants={varScale({ delay: 1, durationIn: 1 }).inX}>
          <Typography variant="h4" color="text.secondary">
            איך עושים את זה? לחצו על הכפתור למטה לגלות
          </Typography>
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              variant="contained"
              onClick={() => router.push('/influencer')}
              fullWidth
              sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }}
            >
              &nbsp; לחצו כאן להפוך למשפיענים בתשלום
            </Button>
          </Box>
        </m.div>
      </Container>
      <Footer />
    </Box>
  );
}

export default HowMuchYouWorth;

const WorthCalculatorGemini = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState(null);

  const niches = [
    { value: 'fashion', label: 'אופנה/יופי/כושר' },
    { value: 'tech', label: 'טכנולוגיה/משחקים' },
    { value: 'home', label: 'מוצרי בית/DIY' },
  ];

  const calculateEarnings = (data) => {
    const { followers, likes, niche } = data;

    if (followers <= 0 || likes <= 0) {
      setError('מספר העוקבים והלייקים חייבים להיות גדולים מאפס');
      return;
    }

    const engagementRate = (likes / followers) * 100;
    let multiplier;

    if (engagementRate > 8) {
      multiplier = 0.15;
    } else if (engagementRate >= 3) {
      multiplier = 0.1;
    } else {
      multiplier = 0.05;
    }

    const baseEarnings = followers * multiplier;
    const adjustedEarnings = baseEarnings * (engagementRate / 3);
    const finalEarnings = adjustedEarnings * niches.find((n) => n.value === niche).multiplier;

    setEarnings(finalEarnings);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit(calculateEarnings)}>
      <TextField
        {...register('followers', { required: true })}
        label="הכנס את מספר העוקבים שלך באינסטגרם"
        type="number"
        fullWidth
        error={!!errors.followers}
        helperText={errors.followers?.message}
      />
      {/* ... other input fields and error messages in Hebrew */}

      {error && <Alert severity="error">{error}</Alert>}
      {earnings && (
        <Typography variant="h6" marginTop={2}>
          הכנסה מוערכת: ${earnings.toFixed(2)}
        </Typography>
      )}
    </form>
  );
};

const WorthCalculatorGPT = () => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      niche: 'Fashion/Beauty/Fitness',
    },
  });
  const [earnings, setEarnings] = useState(null);
  const { textGradientAnimation } = useContext(ColorContext);
  // Watch for values to calculate real-time
  const followers = watch('followers');
  const likes = watch('likes');
  const niche = watch('niche');

  const calculateEarnings = (data) => {
    // const { followers, likes, niche, engagementRate } = data;
    const { engagementRate } = data;

    // Calculate Engagement Rate if not provided
    const ER = engagementRate || (likes / followers) * 100;
    let M = 0.01;

    if (ER > 8) {
      M = 0.1;
    } else if (ER >= 3 && ER <= 8) {
      M = 0.05;
    } else {
      M = 0.01;
    }

    // Calculate Base Estimated Earnings
    const E = followers * M;

    // Adjusted Earnings based on Engagement Rate
    const E_adjusted = E * (ER / 3);

    // Apply Niche Modifier
    let N = 1.0;
    if (niche === 'Fashion/Beauty/Fitness') N = 1.5;
    else if (niche === 'Home Goods/DIY') N = 0.8;
    else if (niche === 'Technology/Gaming') N = 1.05;

    const E_final = E_adjusted * N;
    console.log('Social: ', {
      M,
      N,
      ER,
      niche,
      likes,
      followers,
      E,
      E_adjusted,
      E_final,
    });

    setEarnings(Number(Math.min(Math.ceil(E_final.toFixed(0)), 10000)));
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        alignContent: 'center',
        alignItems: 'center',
        my: 4,
        mx: { xs: 2, sm: 'auto' },
        p: 4,
        pt: 1,
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" width={1}>
        <Typography variant="h5" gutterBottom>
          מחשבון רווחים מהסושיאל
        </Typography>
        <div className="w-full flex justify-center">
          <SocialStack spacing={3} width={25} />
        </div>
      </Box>
      <Box width={1} component="form" onSubmit={handleSubmit(calculateEarnings)}>
        <Controller
          name="followers"
          control={control}
          defaultValue=""
          rules={{ required: 'מהי כמות העוקבים שלך?', min: 1 }}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              inputProps={{
                sx: {
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              label=" מספר העוקבים שלך "
              //   color={value && value > 10000 ? 'success' : 'info'}
              type="text"
              value={value ? value.toLocaleString() : ''}
              onChange={(e) => {
                // Remove commas for storage, but format the displayed value
                const rawValue = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(rawValue)) {
                  // Check for valid number
                  onChange(Number(rawValue));
                }
              }}
              sx={inputColor(value && value > 9900 ? '#22C55E' : '#006C9C')}
              variant="standard"
              error={!!errors.followers}
              helperText={errors.followers?.message}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="likes"
          control={control}
          defaultValue=""
          fullWidth
          rules={{ required: 'כמה לייקים בממוצע מקבל כל פוסט?', min: 1 }}
          render={({ field: { onChange, value, ...field } }) => (
            <TextField
              {...field}
              inputProps={{
                sx: {
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              sx={inputColor(value && value > 990 ? '#22C55E' : '#006C9C')}
              label=" מספר הלייקים הממוצע לפוסט "
              type="text"
              value={value ? value.toLocaleString() : ''}
              onChange={(e) => {
                // Remove commas for storage, but format the displayed value
                const rawValue = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(rawValue)) {
                  // Check for valid number
                  onChange(Number(rawValue));
                }
              }}
              variant="standard"
              error={!!errors.likes}
              helperText={errors.likes?.message}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="niche"
          control={control}
          defaultValue=""
          rules={{ required: 'באיזה תחום הפוסטים שלכם?' }}
          render={({ field }) => (
            <FormControl sx={{ mt: 2 }} fullWidth error={!!errors.niche}>
              <InputLabel> בחרו תחום </InputLabel>
              <Select
                // defaultValue="אופנה / יופי / כושר
                color="info"
                SelectDisplayProps={{
                  sx: {
                    color: 'success',
                    textAlign: 'center',
                    direction: 'ltr',
                  },
                }}
                variant="standard"
                {...field}
              >
                <MenuItem value="Fashion/Beauty/Fitness">אופנה / יופי / כושר</MenuItem>
                <MenuItem value="Technology/Gaming">טכנולוגיה / גיימינג</MenuItem>
                <MenuItem value="Home Goods/DIY">בית / עשה זאת בעצמך</MenuItem>
              </Select>
              {errors.niche && <Typography color="error">{errors.niche.message}</Typography>}
            </FormControl>
          )}
        />

        <Controller
          name="engagementRate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label=" מהו אחוז המעורבות של העוקבים (לא חובה) "
              type="number"
              color="info"
              inputProps={{
                sx: {
                  min: 0, // Set minimum value
                  max: 99, // Set maximum value
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              sx={inputColor(field?.value > 5 ? '#22C55E' : '#006C9C')}
              variant="standard"
              helperText="אם לא נתון, יחושב אוטומטית"
              fullWidth
              margin="normal"
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          כמה מגיע לי?
        </Button>

        {earnings && (
          <Box width={1}>
            <Divider />
            <Typography variant="h5" sx={{ mt: 3 }}>
              רווח מוערך לפוסט:
            </Typography>
            <Typography
              variant="h4"
              sx={{
                ...textGradient(
                  `45deg, ${COLORS.error?.dark} 25%, ${COLORS.error?.main} 40%, ${COLORS.error?.main} 50%,${COLORS.error?.light} 80%, ${COLORS.error?.main} 95%`
                ),
              }}
            >
              ₪ {Number(earnings).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export const SocialStack = ({ spacing = 2, width = 30 }) => (
  <Stack
    // mt={4}
    // mb={1}
    direction="row"
    sx={{
      justifyContent: { sm: 'inherit', xs: 'center' },
      borderRadius: 4,
      p: 1,
      mx: { xs: 'auto', sm: 'inherit' },
      width: 'fit-content',
      // background: { xs: varAlpha('255 255 255', 0.2), md: 'transparent' },
    }}
    spacing={spacing}
  >
    <Link
      className="hover:opacity-80 cursor-pointer"
      passHref
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.tiktok.com/"
    >
      <Iconify width={width} icon="logos:tiktok-icon" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      passHref
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/eranfarkash/"
    >
      <SocialIcon width={width} icon="instagram" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      passHref
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/"
    >
      <SocialIcon width={width} icon="linkedin" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      passHref
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.youtube.com/"
    >
      <Iconify width={width} icon="logos:youtube-icon" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      passHref
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/"
    >
      <SocialIcon width={width} icon="facebook" />
    </Link>
  </Stack>
);

const MessageDialog = ({ worth, open = false, title = 'פוטנציאל הרווח שלך' }) => {
  const router = useRouter();
  const message = (
    <Dialog
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        pt: 4,
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={open}
    >
      <DialogTitle>
        {title} {worth > 700 ? 'מדהים!' : ''}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="h4">{worth?.toLo}</Typography>
      </DialogContent>
    </Dialog>
  );
};

const inputColor = (color = '#22C55E') => ({
  direction: 'ltr',
  '& .MuiInputBase-input': {
    textAlign: 'center', // Center the text when typing
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: color, // Default underline color
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: color, // Color of underline when focused
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: color, // Color of underline on hover
  },
});