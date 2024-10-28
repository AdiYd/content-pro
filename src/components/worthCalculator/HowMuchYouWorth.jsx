'use client';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Circles } from 'react-loader-spinner';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';

import { HomeTwoTone, DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import {
  Box,
  Link,
  Card,
  Stack,
  Alert,
  Button,
  Select,
  Dialog,
  colors,
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
  DialogActions,
  useColorScheme,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';
import { AboutWhat } from 'src/app/about/about-what';
import { AboutLead } from 'src/app/about/about-lead';
import { textGradient, bgGradientAnimate } from 'src/theme/styles';

import { varFade, varScale, varBounce, MotionContainer } from 'src/components/animate';

import { Image } from '../image';
import Footer from '../footer/Footer';
import { Iconify, SocialIcon } from '../iconify';
import COLORS from '../../theme/core/colors.json';
import WhatsAppShareButton from './shareWhatsApp';

function HowMuchYouWorth({ courseName = 'Video-Pro', id, followers, likes, niche }) {
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

  const data = <WorthCalculatorGPT followersCount={followers} likesCount={likes} niches={niche} />;

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
              component="a"
              href="/influencer"
              variant="h1"
              sx={{
                cursor: 'pointer',
                ...textGradientAnimation,
              }}
            >
              {courseName}
            </Typography>
            <Typography variant="h4">הבית של יוצרי התוכן הטובים בישראל</Typography>
            <Divider sx={{ width: 1, mb: 2 }} />
          </m.div>
        </Container>
      </div>
      <Box width={1}>
        <Typography variant="h4" color="text.secondary">
          בואו לגלות כמה אתם שווים
        </Typography>
        <Typography variant="h5" gutterBottom>
          מחשבון רווחים מהסושיאל
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
            איך עושים את זה? לחצו על הכפתור
          </Typography>
          <Iconify icon="fa6-solid:hand-point-down" />
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              variant="contained"
              onClick={() => router.push('/influencer')}
              //   fullWidth
              sx={{
                maxWidth: 800,
                ...bgGradientAnimate(
                  `45deg, ${theme.palette.success.light},${theme.palette.success.dark} ,${theme.palette.success.dark}`
                ),
                minWidth: 200,
              }}
            >
              &nbsp; לחצו כאן להפוך למשפיענים בתשלום
            </Button>
          </Box>
        </m.div>
        <Box mt={4} width={1}>
          <DivPics path1="Eran2.png" path2="hero4.jpg" />
          <AboutWhat influencer />
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              variant="contained"
              onClick={() => router.push('/influencer#signUp')}
              //   fullWidth
              sx={{
                maxWidth: 800,
                ...bgGradientAnimate(
                  `45deg, ${theme.palette.warning.light},${theme.palette.warning.dark} ,${theme.palette.warning.dark}`
                ),
                minWidth: 200,
              }}
            >
              לחצו כאן והתחילו להרוויח כסף
            </Button>
          </Box>
          <AboutWhat contentType="aboutMe" />
          <AboutLead showMsg={false} />
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              variant="contained"
              startIcon={<HomeTwoTone />}
              onClick={() => router.push('/influencer')}
              //   fullWidth
              sx={{
                maxWidth: 800,
                ...bgGradientAnimate(
                  `45deg, ${theme.palette.error.dark},${theme.palette.error.main} `
                ),
                minWidth: 200,
              }}
            >
              &nbsp; &nbsp; בחזרה לדף הבית &nbsp;
            </Button>
          </Box>
          {/* <Typography color="text.secondary" variant="h5">
          בואו לגלות כמה אתם שווים - המחשבון שלנו יעזור לכם להעריך כמה שווה כל סרטון שלכם
        </Typography> */}
        </Box>
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
          הכנסה מוערכת לסירטון / סטורי: ${earnings.toLocaleString()}
        </Typography>
      )}
    </form>
  );
};

const WorthCalculatorGPT = ({ likesCount, followersCount, niches }) => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      niche: niches || 'Fashion/Beauty/Fitness',
      likes: likesCount,
      followers: followersCount,
    },
  });
  const [earnings, setEarnings] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  //   const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = true;
  //   const { textGradientAnimation } = useContext(ColorContext);
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
      M *= 2;
    } else if (ER >= 3 && ER <= 8) {
      M *= 1.5;
    } else {
      M = 0.01;
    }

    // Calculate Base Estimated Earnings
    const E = followers * M;

    // Adjusted Earnings based on Engagement Rate

    // Apply Niche Modifier
    let N = 1.0;
    if (niche === 'Fashion/Beauty/Fitness') N = 1.15;
    else if (niche === 'Home Goods/DIY') N = 0.85;
    else if (niche === 'Technology/Gaming') N = 1.05;

    const minWorth = {
      followers: 1900,
      ER: 8,
      likes: 690,
      money: 190,
    };

    const E_final =
      E *
      N *
      (ER / minWorth.ER) *
      (followers / (3 * minWorth.followers)) *
      (likes / minWorth.likes);

    console.log('Social: ', {
      M,
      N,
      ER,
      niche,
      likes,
      followers,
      E,
      E_final,
    });
    let finalWorth = E_final;
    finalWorth =
      finalWorth < minWorth.money || followers < minWorth.followers || likes < minWorth.likes
        ? 10
        : finalWorth;
    finalWorth = Math.min(Math.ceil(finalWorth), followers - 12, likes - 9);
    finalWorth = Number(Math.min(finalWorth, 10000));
    setEarnings(finalWorth);
    setOpen(true);
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
              sx={inputColor(value && value > 9900 ? '#22C55E' : colors.green[200])}
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
              sx={inputColor(value && value > 990 ? '#22C55E' : colors.green[200])}
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
                // sx={inputColor(colors.green[200])}
                SelectDisplayProps={{
                  sx: {
                    color: colors.green[200],
                    borderColor: colors.green[200],
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
              sx={inputColor(field?.value > 5 ? '#22C55E' : colors.green[200])}
              variant="standard"
              helperText="אם לא נתון, יחושב אוטומטית"
              fullWidth
              margin="normal"
            />
          )}
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          כמה מגיע לי?
        </Button>

        {earnings && (
          <Box width={1}>
            <Divider />
            <Typography variant="h5" sx={{ mt: 3 }}>
              רווח מוערך לסטורי/סירטון:
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
            <Box my={1} width={1} mx="auto">
              <WhatsAppShareButton
                queryParams={`followers=${followers}&niche=${niche}&likes=${likes}`}
              />
            </Box>
          </Box>
        )}
        {open && earnings && isMobile && (
          <MessageDialog worth={earnings} open={open} setOpen={setOpen} />
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
      //   passHref
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   href="https://www.tiktok.com/"
    >
      <Iconify width={width} icon="logos:tiktok-icon" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      //   passHref
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   href="https://www.instagram.com/eranfarkash/"
    >
      <SocialIcon width={width} icon="instagram" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      //   passHref
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   href="https://www.linkedin.com/"
    >
      <SocialIcon width={width} icon="linkedin" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      //   passHref
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   href="https://www.youtube.com/"
    >
      <Iconify width={width} icon="logos:youtube-icon" />
    </Link>
    <Link
      className="hover:opacity-80 cursor-pointer"
      //   passHref
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   href="https://www.facebook.com/"
    >
      <SocialIcon width={width} icon="facebook" />
    </Link>
  </Stack>
);

const MessageDialog = ({
  worth,
  open = false,
  title = 'פוטנציאל הרווח שלך',
  setOpen = () => {},
}) => {
  const router = useRouter();
  const { textGradientAnimation } = useContext(ColorContext);
  const message = (
    <Dialog
      fullWidth
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        // minWidth: 350,
        py: 4,
        px: 'auto',
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Iconify width={30} icon="emojione:party-popper" />
        <Typography variant="h3">
          {title} {worth > 500 ? (worth > 1500 ? 'מדהים!' : 'גדול!') : ''}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ ...textGradientAnimation }} variant="h3">
          {worth?.toLocaleString()} ₪
        </Typography>
        <Typography color="text.secondary" variant="h4">
          לסטורי / סרטון
        </Typography>
        <Typography color="text.secondary" variant="body1">
          {worth > 499 ? '(אצלנו תרוויחו אפילו יותר)' : 'אנחנו נעזור לך להשתפר ולהרוויח יותר'}
        </Typography>
      </DialogContent>
      <Divider variant="middle" sx={{ borderStyle: 'dashed', mt: 2 }} />
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={() => router.push('/influencer')} size="small" variant="contained">
          ספרו לי איך
        </Button>
        <Button onClick={() => setOpen(false)} size="small" variant="outlined">
          סגירה
        </Button>
      </DialogActions>
    </Dialog>
  );
  return message;
};

const inputColor = (color = colors.green[200]) => ({
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

const DivPics = ({ path1, path2 }) => {
  const theme = useTheme();
  const { mode } = useContext(ColorContext);
  return (
    <div className="w-2/3 my-8 max-sm:w-full mx-auto flex justify-center">
      <m.div className="w-1/2 mx-2" variants={varFade().inUp}>
        <Image
          alt="מקצוע גלובלי"
          src={`${CONFIG.site.basePath}/assets/images/about/${path1}`}
          ratio="1/1"
          sx={{
            right: 20,
            '&:hover': {
              boxShadow: `-20px 20px 40px ${theme.vars.palette.success.light}`,
            },
            transition: 'transform 0.7s ease-in',
            borderRadius: 2,
            transform: 'rotate(0deg)',
            width: { xs: '80%', md: 'inherit' },
            boxShadow: customShadows(mode).dialog,
            // boxShadow: `-40px 40px 80px ${theme.vars.palette.secondary.main}`,
          }}
        />
      </m.div>
      <m.div className="w-1/2 mx-2" variants={varFade().inUp}>
        <Image
          alt="יוצרת תוכן"
          src={`${CONFIG.site.basePath}/assets/images/about/${path2}`}
          ratio="1/1"
          sx={{
            left: 20,
            '&:hover': {
              boxShadow: `-20px 20px 40px ${theme.vars.palette.error.light}`,
            },
            transition: 'transform 0.7s ease-in',
            borderRadius: 2,
            width: { xs: '80%', md: 'inherit' },
            transform: 'rotate(0deg)',
            // boxShadow: customShadows(mode).dialog,
            // boxShadow: `-40px 40px 80px ${theme.vars.palette.primary.dark}`,
          }}
        />
      </m.div>
    </div>
  );
};