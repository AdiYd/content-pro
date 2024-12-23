'use client';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Circles } from 'react-loader-spinner';
import { useForm, Controller } from 'react-hook-form';
import { useRef, useState, useEffect, useContext, useCallback } from 'react';

import {
  HomeTwoTone,
  DarkModeTwoTone,
  LightModeTwoTone,
  HelpOutlineRounded,
} from '@mui/icons-material';
import {
  Box,
  Fab,
  Link,
  Card,
  Stack,
  Button,
  Select,
  Dialog,
  colors,
  Divider,
  Tooltip,
  useTheme,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  useColorScheme,
} from '@mui/material';

import { trackEvent } from 'src/utils/GAEvents';
import { createTokenFromQueryParams } from 'src/utils/webToken';

import { CONFIG } from 'src/config-global';
import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';
import { AboutWhat } from 'src/app/about/about-what';
import { textGradient, bgGradientAnimate } from 'src/theme/styles';

import { varFade, varScale, varBounce, MotionContainer } from 'src/components/animate';

import { Image } from '../image';
import Footer from '../footer/Footer';
import { Iconify, SocialIcon } from '../iconify';
import COLORS from '../../theme/core/colors.json';
import WhatsAppShareButton from './shareWhatsApp';

function HowMuchYouWorth({
  courseName = 'Video-Pro',
  id,
  followers,
  likes,
  comments,
  shares,
  views,
  niche,
  engagementRate,
}) {
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

  const data = (
    <>
      {/* <WorthCalculatorGPT
        engagementRateCount={engagementRate}
        followersCount={followers}
        likesCount={likes}
        niches={niche}
      /> */}
      <RevenueCalculator
        niches={niche}
        commentsCount={comments}
        viewsCount={views}
        sharesCount={shares}
      />
    </>
  );

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
          <Iconify className="animate-bounce top-4 relative" icon="fa6-solid:hand-point-down" />
          <Box mt={4} mb={8} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              variant="contained"
              onClick={() => {
                trackEvent('Calculator-to-Home', 'Button');
                router.push('/influencer');
              }}
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
              onClick={() => {
                trackEvent('Calculator-to-Home', 'Button');
                router.push('/influencer#signUp');
              }}
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
          {/* <AboutWhat influencer contentType="aboutMe" /> */}
          {/* <AboutLead showMsg={false} /> */}
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Fab
              variant="circular"
              size="small"
              onClick={() => {
                trackEvent('Calculator-to-Home', 'Button');
                router.push('/influencer');
              }}
              sx={{
                ...bgGradientAnimate(
                  `45deg, ${theme.palette.info.dark},${theme.palette.info.main} `
                ),
              }}
            >
              <HomeTwoTone />
            </Fab>
            {/* <Button
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
            </Button> */}
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

// const WorthCalculatorGemini = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const [earnings, setEarnings] = useState(null);
//   const [error, setError] = useState(null);

//   const niches = [
//     { value: 'fashion', label: 'אופנה/יופי/כושר' },
//     { value: 'tech', label: 'טכנולוגיה/משחקים' },
//     { value: 'home', label: 'מוצרי בית/DIY' },
//   ];

//   const calculateEarnings = (data) => {
//     const { followers, likes, niche } = data;

//     if (followers <= 0 || likes <= 0) {
//       setError('מספר העוקבים והלייקים חייבים להיות גדולים מאפס');
//       return;
//     }

//     const engagementRate = (likes / followers) * 100;
//     let multiplier;

//     if (engagementRate > 8) {
//       multiplier = 0.15;
//     } else if (engagementRate >= 3) {
//       multiplier = 0.1;
//     } else {
//       multiplier = 0.05;
//     }

//     const baseEarnings = followers * multiplier;
//     const adjustedEarnings = baseEarnings * (engagementRate / 3);
//     const finalEarnings = adjustedEarnings * niches.find((n) => n.value === niche).multiplier;

//     setEarnings(finalEarnings);
//     setError(null);
//   };

//   return (
//     <form onSubmit={handleSubmit(calculateEarnings)}>
//       <TextField
//         {...register('followers', { required: true })}
//         label="הכנס את מספר העוקבים שלך באינסטגרם"
//         type="number"
//         fullWidth
//         error={!!errors.followers}
//         helperText={errors.followers?.message}
//       />
//       {/* ... other input fields and error messages in Hebrew */}

//       {error && <Alert severity="error">{error}</Alert>}
//       {earnings && (
//         <Typography variant="h6" marginTop={2}>
//           הכנסה מוערכת לסירטון / סטורי: ${earnings.toLocaleString()}
//         </Typography>
//       )}
//     </form>
//   );
// };

export const WorthCalculatorGPT = ({
  likesCount,
  followersCount,
  niches,
  direct = false, // Weather preform calculation through url query params (Landing page) or directly call the calculation function (Inside the course page)
  engagementRateCount,
  blockAlert = false,
  hideLink = false,
}) => {
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
      //   engagementRate: !Number.isNaN(engagementRateCount) && Number(Math.ceil(engagementRateCount)),
    },
  });
  const [earnings, setEarnings] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const numOfAlerts = useRef(1);
  //   const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = true;
  //   const { textGradientAnimation } = useContext(ColorContext);
  // Watch for values to calculate real-time
  const followers = watch('followers');
  const likes = watch('likes');
  const niche = watch('niche');
  const engagementRate = watch('engagementRate');

  const calculateEarnings = useCallback(
    (data) => {
      const { followers_count, likes_count, submitted } = data;
      // Calculate Engagement Rate if not provided
      const eff_likes =
        typeof likes_count === 'string' ? Number(likes_count.replace(/,/g, '')) : likes_count;
      const eff_followers =
        typeof followers_count === 'string'
          ? Number(followers_count.replace(/,/g, ''))
          : followers_count;
      const eff_niche = niche || niches;
      let eff_ER =
        typeof engagementRate === 'number' && engagementRate !== 0
          ? engagementRate.toFixed(1)
          : typeof engagementRateCount === 'number'
            ? engagementRateCount.toFixed(1)
            : Number((eff_likes / eff_followers) * 100).toFixed(1);
      eff_ER = Number(eff_ER);
      let M = 0.01;
      if (eff_ER > 10) {
        M *= 2;
      } else if (eff_ER > 8 && eff_ER <= 10) {
        M *= 1.7;
      } else if (eff_ER >= 3 && eff_ER <= 8) {
        M *= 1.5;
      } else {
        M = 0.01;
      }

      // Calculate Base Estimated Earnings
      const E = eff_followers * M;

      // Adjusted Earnings based on Engagement Rate

      // Apply Niche Modifier
      let N = 1.0;
      if (eff_niche === 'Fashion/Beauty/Fitness') N = 1.15;
      else if (eff_niche === 'Home Goods/DIY') N = 0.85;
      else if (eff_niche === 'Technology/Gaming') N = 1.05;

      const minWorth = {
        followers: 2000,
        ER: 8,
        likes: 450,
        money: 30,
      };

      const E_final =
        E * N * (eff_followers / (5 * minWorth.followers)) * (eff_likes / minWorth.likes);

      console.log('Social: ', {
        M,
        N,
        eff_ER,
        eff_niche,
        eff_likes,
        eff_followers,
        E,
        E_final,
      });
      let finalWorth = E_final;
      finalWorth =
        finalWorth < minWorth.money ||
        (eff_followers < minWorth.followers && eff_likes < minWorth.likes)
          ? 10
          : finalWorth;
      finalWorth = Math.min(
        Math.ceil(finalWorth),
        eff_followers - Math.ceil(Math.random() * 20),
        (eff_likes - Math.ceil(Math.random() * 20)) *
          (1 + eff_followers / (20 * minWorth.followers))
      );
      finalWorth = Number(Math.min(finalWorth, 10000));
      finalWorth = Number(Math.max(finalWorth, 1));
      if (typeof finalWorth === 'number' && submitted) {
        if (numOfAlerts.current === 1) {
          trackEvent('calculator', 'Button');
        }
        trackEvent(
          'calculatorData',
          'Form',
          `L-${eff_likes} ; F-${eff_followers} ; N-${eff_niche}`,
          Math.ceil(finalWorth)
        );
        setEarnings(Math.ceil(finalWorth));
        if (numOfAlerts.current <= 3) {
          numOfAlerts.current += 1;
          setOpen(true);
        }
      }
    },
    [engagementRateCount, engagementRate, niches, niche]
  );

  useEffect(() => {
    if (followersCount && likesCount) {
      //   console.log('Params useEffect: ', followersCount, likesCount, niches, engagementRateCount);
      calculateEarnings({
        submitted: true,
        likes_count: Number(likesCount.replace(/,/g, '')),
        followers_count: Number(followersCount.replace(/,/g, '')),
      });
    }
  }, [likesCount, followersCount, calculateEarnings]);

  const handleSubmitRoute = (data) => {
    if (likes && niche && followers) {
      const engR = engagementRate ? Number(engagementRate) : Number((likes / followers) * 100);
      if (direct) {
        calculateEarnings({
          submitted: true,
          likes_count: typeof likes === 'number' ? likes : Number(likes.replace(/,/g, '')),
          followers_count:
            typeof followers === 'number' ? followers : Number(followers.replace(/,/g, '')),
        });
      } else {
        const tokenObj = {
          likes: typeof likes === 'string' ? Number(likes?.replace(/,/g, '')) : likes,
          niche,
          followers:
            typeof followers === 'string' ? Number(followers?.replace(/,/g, '')) : followers,
          engagementRate: typeof engR === 'number' ? Math.ceil(engR) : null,
        };
        const token = createTokenFromQueryParams(tokenObj) || '';
        //   console.log('Token Params: ', tokenObj, ' Created token: ', token);

        router.push(`/worthCalculator?token=${token}#calculator`);
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        my: 4,
        mx: { xs: 2, sm: 'auto' },
        p: 4,
        pt: 3,
      }}
    >
      <Box id="calculator" display="flex" justifyContent="center" width={1}>
        <SocialStack spacing={3} width={25} />
      </Box>
      <Box width={1} component="form" onSubmit={handleSubmit(handleSubmitRoute)}>
        <Controller
          name="followers"
          control={control}
          defaultValue=""
          rules={{ required: 'כמה עוקבים יש לך?', min: 1 }}
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
                  setEarnings(null);
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
              label=" מספר לייקים ממוצע לפוסט "
              type="text"
              value={value ? value.toLocaleString() : ''}
              onChange={(e) => {
                // Remove commas for storage, but format the displayed value
                const rawValue = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(rawValue)) {
                  // Check for valid number
                  onChange(Number(rawValue));
                  setEarnings(null);
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
                <MenuItem value="Home Goods/DIY">בית / אוכל / DIY</MenuItem>
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

        <Box width={1} display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" type="submit" fullWidth>
            כמה מגיע לי?
          </Button>
        </Box>

        {earnings && (
          <Box width={1}>
            {earnings > 999 && (
              <Iconify
                color={colors.amber[600]}
                width={35}
                className="animate-pulse mt-4"
                icon="solar:cup-bold"
              />
            )}
            <Divider variant="middle" sx={{ borderStyle: 'dashed', mt: 2 }} />
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
              {Number(earnings).toLocaleString()} ₪
            </Typography>
            <Box my={1} width={1} mx="auto">
              <WhatsAppShareButton
                token={{
                  followers,
                  niche,
                  likes,
                  engagementRate:
                    engagementRate && !Number.isNaN(engagementRate)
                      ? Number(Math.ceil(engagementRate))
                      : Number(Math.ceil((likes / followers) * 100)),
                }}
              />
            </Box>
          </Box>
        )}
        {open && earnings && !blockAlert && (
          <MessageDialog hideLink={hideLink} worth={earnings} open={open} setOpen={setOpen} />
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
  hideLink = false,
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
          {title} {worth > 500 ? (worth > 1000 ? 'מדהים!' : 'גדול!') : ''}
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
        {!hideLink && (
          <Button
            onClick={() => {
              trackEvent('Calculator-to-Home', 'Button');
              router.push('/influencer');
            }}
            size="small"
            variant="contained"
          >
            ספרו לי איך
          </Button>
        )}
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

const nicheTranslator = {
  'DIY / Home': 'עשה זאת בעצמך / בית',
  Food: 'אוכל',
  'Sport and health': 'ספורט ובריאות',
  'Beauty & Lifestyle': 'יופי ואורח חיים',
  'Business and finance': 'עסקים וכלכלה',
  other: 'אחר',
};

export function RevenueCalculator({
  sharesCount,
  viewsCount,
  commentsCount,
  niches,
  blockAlert = false,
  hideLink = false,
  calculationOption = 2,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      niche: niches,
      views: viewsCount,
      shares: sharesCount,
      comments: commentsCount,
    },
  });
  const [earnings, setEarnings] = useState();
  const [open, setOpen] = useState(false);
  const numOfAlerts = useRef(1);
  const numOfDays = 60;
  const niche = watch('niche');
  const views = watch('views');
  const shares = watch('shares');
  const comments = watch('comments');
  // console.log('Calculator values : ', { views, shares, comments, niche });
  useEffect(() => {
    if (sharesCount && viewsCount && commentsCount && niches) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharesCount, viewsCount, commentsCount, niches]);

  const calculateExpectedRevenue = useCallback(() => {
    let nicheMultipliers;
    let timeAdjustmentFactor;
    let baseRevenue;
    let baseRate;
    let commentBonus;
    let shareBonus;
    let multiplier;
    let expectedRevenue;
    console.log('Calculating expected revenue based on : ', { views, shares, comments, niche });
    if (calculationOption === 1) {
      nicheMultipliers = {
        'DIY / Home': 0.8,
        Food: 1.0,
        'Sport and health': 1.2,
        'Beauty & Lifestyle': 1.4,
        'Business and finance': 1.6,
        other: 0.8,
      };

      // Calculate a time-adjusted factor
      timeAdjustmentFactor = 30 / numOfDays;

      // Adjust base revenue with time factor
      baseRevenue = (views * 0.05 + comments * 0.2 + shares * 0.3) * timeAdjustmentFactor;

      // Apply niche multiplier
      multiplier = nicheMultipliers[niche] || nicheMultipliers.other;
      expectedRevenue = baseRevenue * multiplier;

      return Math.ceil(expectedRevenue / 2);
    }
    if (calculationOption === 2) {
      baseRate = 5; // $5 per 1,000 views
      commentBonus = 0.1;
      shareBonus = 0.15;

      nicheMultipliers = {
        'DIY / Home': 1.2,
        Food: 1.3,
        'Sport and health': 1.4,
        'Beauty & Lifestyle': 1.5,
        'Business and finance': 1.6,
        other: 1.0,
      };

      const viewRevenue = (views / 1000) * baseRate;
      const commentRevenue = comments * commentBonus;
      const shareRevenue = shares * shareBonus;
      const totalRevenue =
        (viewRevenue + commentRevenue + shareRevenue) * nicheMultipliers[niche] * (30 / numOfDays);

      return totalRevenue.toFixed(2); // Returns revenue in a two-decimal format
    }

    // Base rates per view and engagement for different niches in USD
    const rates = {
      'DIY / Home': { baseCPV: 0.015, engagementBonus: 0.1 },
      Food: { baseCPV: 0.02, engagementBonus: 0.15 },
      'Sport and health': { baseCPV: 0.018, engagementBonus: 0.12 },
      'Beauty & Lifestyle': { baseCPV: 0.022, engagementBonus: 0.18 },
      'Business and finance': { baseCPV: 0.025, engagementBonus: 0.2 },
      other: { baseCPV: 0.01, engagementBonus: 0.05 },
    };

    // Get niche-specific rate, or default to 'other'
    const { baseCPV, engagementBonus } = rates[niche] || rates.other;

    // Calculate base revenue from views, scaled for the period given
    const revenueFromViews = (views * baseCPV * 30) / numOfDays;

    // Engagement is weighted higher due to influence, adjusted per 'numOfDays'
    const engagementScore = ((comments + shares) * engagementBonus * 30) / numOfDays;

    // Total estimated revenue
    const estimatedRevenue = revenueFromViews + engagementScore;

    return Math.ceil(estimatedRevenue); // returns revenue in USD
  }, [niche, shares, views, comments, calculationOption]);

  const onSubmit = useCallback(() => {
    let revenue = calculateExpectedRevenue();
    if (Number.isNaN(revenue)) {
      return;
    }
    console.log('Clacualted value: ', revenue);
    revenue *= 3.7;
    revenue = Math.ceil(revenue);
    revenue = Math.min(revenue, 10000);
    revenue = Math.max(revenue, 10);
    if (typeof revenue === 'number') {
      setEarnings(revenue);
      trackEvent(
        'calculatorData',
        'Form',
        `V: ${views} ; C: ${comments} ; S: ${shares} ; N: ${niche}`,
        Math.ceil(revenue)
      );
      if (numOfAlerts.current <= 3) {
        trackEvent('calculatorClick', 'Button');
        numOfAlerts.current += 1;
        setOpen(true);
      }
    }
    // alert(`Expected Revenue: $${revenue}`);
  }, [calculateExpectedRevenue, comments, views, shares, niche]);

  return (
    <Card
      sx={{
        maxWidth: 600,
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        my: 4,
        mx: { xs: 2, sm: 'auto' },
        p: 4,
        pt: 3,
      }}
    >
      <Box id="calculator" display="flex" justifyContent="center" width={1}>
        <SocialStack spacing={3} width={25} />
      </Box>
      <Tooltip
        arrow
        title={
          <Box textAlign="center" mx="auto" maxWidth="300px">
            <Typography variant="body1">
              ניתן לראות את הנתונים באיזור האישי תחת Analytics / Metrics
            </Typography>
            <div className="w-full flex justify-center">
              <img
                src={`${CONFIG.site.basePath}/assets/images/about/analytics.jpg`}
                alt="Social analytics"
                width="150"
                height="120"
              />
            </div>
            <Typography variant="body2">ניתן גם להעריך את הנתונים ולקבל מושג כללי</Typography>
          </Box>
        }
      >
        <Typography mt={2} variant="body1">
          ניתן לראות את הנתונים באיזור האישי של הרשת החברתית
          <IconButton
            // onClick={handleOpenPopover}
            // onMouseEnter={handleOpenPopover}
            // onMouseLeave={handleClosePopover}
            sx={{
              color: 'info.main',
              position: 'relative',
              '&:hover': { color: 'info.dark' },
            }}
          >
            <HelpOutlineRounded fontSize="small" />
          </IconButton>
        </Typography>
      </Tooltip>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Niche */}
        <Controller
          name="niche"
          control={control}
          defaultValue=""
          rules={{ required: 'יש לבחור תחום עיסוק' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              // MenuProps={{ disableScrollLock: true, textAlign: 'center' }}
              label="בחרו נישה"
              fullWidth
              variant="standard"
              error={!!errors.niche}
              helperText={errors.niche ? errors.niche.message : 'מהו תחום ההתמחות שלכם?'}
              margin="normal"
            >
              {[
                'DIY / Home',
                'Food',
                'Sport and health',
                'Beauty & Lifestyle',
                'Business and finance',
                'other',
              ].map((nicheItem) => (
                <MenuItem
                  sx={{ color: 'text.primary' }}
                  disableGutters
                  disableTouchRipple
                  key={nicheItem}
                  value={nicheItem}
                >
                  {nicheTranslator[nicheItem]}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Views */}
        <Controller
          name="views"
          control={control}
          defaultValue=""
          rules={{
            required: 'כמה צפיות היו לפוסטים שלך ב 60 הימים האחרונים?',
            min: { value: 0, message: 'המספר חייב להיות חיובי' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              inputProps={{
                sx: {
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              sx={inputColor(field.value && field.value > 20000 ? '#22C55E' : colors.green[200])}
              type="number"
              variant="standard"
              label="כמות צפיות ב 60 הימים האחרונים"
              helperText={errors.views ? errors.views.message : 'מספר הצפיות הכולל לכל הפוסטים'}
              error={!!errors.views}
              fullWidth
              margin="normal"
            />
          )}
        />

        {/* Comments */}
        <Controller
          name="comments"
          control={control}
          defaultValue=""
          rules={{
            required: 'כמה תגובות היו לפוסטים שלך ב 60 הימים האחרונים?',
            min: { value: 0, message: 'המספר חייב להיות חיובי' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              inputProps={{
                sx: {
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              sx={inputColor(field.value && field.value > 30 ? '#22C55E' : colors.green[200])}
              type="number"
              variant="standard"
              label="כמות תגובות ב 60 הימים האחרונים"
              helperText={
                errors.comments ? errors.comments.message : 'מספר התגובות הכולל לכל הפוסטים'
              }
              error={!!errors.comments}
              fullWidth
              margin="normal"
            />
          )}
        />

        {/* Shares */}
        <Controller
          name="shares"
          control={control}
          defaultValue=""
          rules={{
            required: 'כמה שיתופים היו לפוסטים שלך ב 60 הימים האחרונים?',
            min: { value: 0, message: 'המספר חייב להיות חיובי' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              inputProps={{
                sx: {
                  textAlign: 'center',
                  direction: 'ltr',
                },
              }}
              sx={inputColor(field.value && field.value > 50 ? '#22C55E' : colors.green[200])}
              type="number"
              variant="standard"
              label="כמות שיתופים ב 60 הימים האחרונים"
              helperText={errors.shares ? errors.shares.message : 'מספר השיתופים הכולל לכל הפוסטים'}
              error={!!errors.shares}
              fullWidth
              margin="normal"
            />
          )}
        />

        {/* Submit Button */}
        <Box width={1} display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" type="submit" fullWidth>
            כמה מגיע לי?
          </Button>
        </Box>

        {earnings && (
          <Box width={1}>
            {earnings > 999 && (
              <Iconify
                color={colors.amber[600]}
                width={35}
                className="animate-pulse mt-4"
                icon="solar:cup-bold"
              />
            )}
            <Divider variant="middle" sx={{ borderStyle: 'dashed', mt: 2 }} />
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
              {Number(earnings).toLocaleString()} ₪
            </Typography>
            <Box my={1} width={1} mx="auto">
              <WhatsAppShareButton token={{ shares, comments, views, niche }} />
            </Box>
          </Box>
        )}
        {open && earnings && !blockAlert && (
          <MessageDialog hideLink={hideLink} worth={earnings} open={open} setOpen={setOpen} />
        )}
      </form>
    </Card>
  );
}
