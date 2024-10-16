'use client';

import Cookies from 'js-cookie';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Oval, Circles, InfinitySpin } from 'react-loader-spinner';

import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  Stack,
  Radio,
  Button,
  Dialog,
  Select,
  Divider,
  useTheme,
  Skeleton,
  MenuItem,
  Container,
  TextField,
  Typography,
  InputLabel,
  RadioGroup,
  DialogTitle,
  FormControl,
  useMediaQuery,
  DialogContent,
  DialogActions,
  useColorScheme,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import { getUserById, getAllDataFromCollection } from 'src/utils/firebaseFunctions';

import ColorPicker from 'src/app/colorPalette';
import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import {
  varSlide,
  varScale,
  varBounce,
  AnimateBorder,
  MotionContainer,
} from 'src/components/animate';

import { Iconify } from '../iconify';
import UploadFile from '../fileUpload/FileUpload';
import { setCookie } from '../considering/Considering';
import { Niches } from '../signUp/form-wizard-view/form-steps';

function Login({ id }) {
  const theme = useTheme();
  const { setMode } = useColorScheme();
  const { mainColor, mode, textGradientAnimation } = useContext(ColorContext);
  const [loading, setLoading] = useState(false || id);
  const [isAdmin, setAdmin] = useState(false);
  const [userData, setUserData] = useState();
  const router = useRouter();
  const isActive = isAdmin || Boolean(userData);

  useEffect(() => {
    const signed = Cookies.get('signin');
    if (signed) {
      if (signed === 'admin') {
        setAdmin(true);
      } else {
        router.push(`/login?id=${signed}`);
      }
      // console.log('SIGNIN: ', signed);
    }
  }, [router]);

  const handleUpdate = async () => {
    const user = await getUserById(id);
    if (user) {
      user.goals = user.goals?.join(', ');
      console.log('Updating user data...');
      setUserData(user);
    }
  };

  useEffect(() => {
    if (id) {
      getUserById(id).then((data) => {
        if (data) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            data.goals = data.goals.join(', ');
            setUserData(data);
          }, 1 * 1e3);
        } else {
          setLoading(false);
        }
      });
    }
  }, [id]);

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const setUser = (user, userID) => {
    if (user === 'adminpro') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAdmin(true);
        setCookie('signin', 'admin', 60 * 20);
      }, 1 * 1e3);
    } else if (user) {
      setCookie('signin', userID, 60 * 20);
      router.push(`/login?id=${userID}`);
    }
  };

  const data = isAdmin ? (
    <Admin />
  ) : userData ? (
    <User callback={handleUpdate} userData={{ ...userData, id }} />
  ) : (
    <EmailVerificationForm callback={setUser} />
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
              variant="h1"
              sx={{
                ...textGradientAnimation,
              }}
            >
              Video-Pro
            </Typography>
            <Typography variant="h4">הבית של יוצרי התוכן הטובים בישראל</Typography>
            {isActive && <Divider sx={{ width: 1, mb: 0 }} />}
          </m.div>
        </Container>
      </div>

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
          <Box my={4} display="flex" justifyContent="center" gap={4} width={1}>
            <Button
              size="small"
              startIcon={<Iconify icon="lucide-lab:home" />}
              sx={{
                alignSelf: 'center',
                // textDecoration: 'underline',
                opacity: 0.8,
              }}
              // color="text.secondary"
              href="/"
              px={1}
            >
              &nbsp; לדף הבית
            </Button>
            {isActive && (
              <Button
                size="small"
                startIcon={<Iconify icon="ic:round-logout" />}
                sx={{
                  alignSelf: 'center',
                  // textDecoration: 'underline',
                  opacity: 0.8,
                }}
                href="/login"
                // color="text.secondary"
                onClick={() => {
                  Cookies.remove('signin');
                }}
                px={1}
              >
                &nbsp; יציאה
              </Button>
            )}
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}

export default Login;

export function EmailVerificationForm({ callback = () => {}, noAdmin = false }) {
  const [emails, setEmails] = useState();
  const [userData, setData] = useState();
  const { mainColor, textGradientAnimation } = useContext(ColorContext);

  useEffect(() => {
    setTimeout(() => {
      getAllDataFromCollection('users').then((data) => {
        setEmails(data.emails);
        setData(data.data);
      });
    }, 0.1 * 1e3);
  }, []);
  // Initialize the useForm hook

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange', // Validation mode: validate as you type
  });

  // Watch the email input value
  const emailValue = watch('email');

  // Form submit handler
  const onSubmit = (data) => {
    if (!data.email) {
      return;
    }
    data.email = data.email?.toLowerCase();
    let userID;
    userData?.some((item) => {
      if (item.email === data.email) {
        userID = item.id;
        return true;
      }
      return false;
    });
    // console.log(userID);
    callback(data.email, userID);
  };
  const isValidInput = Boolean(
    !(!isValid && ((emailValue && emailValue?.toLowerCase() !== 'adminpro') || !emailValue))
  );
  // Check if email is in the predefined list
  const isSignedEmail = (email) => emails?.includes(email);
  return (
    <Box component={MotionContainer}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 4,
          width: '300px',
          mx: 'auto', // Center the form horizontally
        }}
      >
        {/* Email Input */}
        <m.div style={{ width: '100%' }} variants={varSlide({ delay: 0.3 }).inUp}>
          {/* <Typography variant="p" color="text.secondary">
            איזור אישי
          </Typography> */}
          {emails ? (
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'יש להכניס כתובת אימייל',
                // pattern: {
                //   value: /^\S+@\S+\.\S+$/,
                //   message: 'כתובת אימייל לא תקינה',
                // },
                validate: {
                  isSignedUser: (value) =>
                    (!noAdmin && value.toLowerCase() === 'adminpro') ||
                    isSignedEmail(value.toLowerCase()) ||
                    'משתמש לא רשום',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="אימייל"
                  dir="ltr"
                  variant="outlined"
                  //   onChange={handleChange}
                  inputProps={{ style: { textAlign: 'center' } }}
                  error={!!errors.email}
                  FormHelperTextProps={{
                    dir: 'rtl',
                    sx: { textAlign: 'start' },
                    style:
                      errors.email?.message === 'משתמש לא רשום'
                        ? { color: 'GrayText', fontSize: 16 }
                        : {},
                  }}
                  helperText={errors.email ? errors.email.message : ''}
                  fullWidth
                />
              )}
            />
          ) : (
            <Skeleton
              width="100%"
              height={54}
              sx={{ borderRadius: 1, animationDuration: '0.2s' }}
              animation="wave"
              variant="rectangular"
            />
          )}

          {/* Submit Button */}
          <Button
            sx={
              !isValidInput
                ? {
                    my: 4,
                  }
                : {
                    my: 4,
                    ...textGradientAnimation,
                    animationDuration: '10s',
                    WebkitBackgroundClip: 'inherit',
                    WebkitTextFillColor: 'inherit',
                    backgroundClip: 'inherit',
                    textFillColor: 'inherit',
                    color: 'inherit',
                  }
            }
            color={mainColor}
            type="submit"
            variant="contained"
            disabled={!isValidInput}
          >
            לאיזור האישי
          </Button>
        </m.div>
      </Box>
    </Box>
  );
}

const AdminOptions = ['משתמשים רשומים', 'לידים', 'הגדרות אתר'];
const adminOptionsDict = {
  'משתמשים רשומים': 'users',
  לידים: 'leads',
  'הגדרות אתר': 'settings',
};

function Admin() {
  const [activeButton, setActiveButton] = useState('משתמשים רשומים');
  const [data, setData] = useState({});
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [dialogRef, setDialog] = useState();
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState({
    input: undefined,
    niche: undefined,
  });
  const theme = useTheme();
  const { setMode } = useColorScheme();
  const { mainColor, textGradient, mode, setColor } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let dataRes;

  useEffect(() => {
    const fetchDataBase = async () => {
      const leads = await getAllDataFromCollection('leads');
      const users = await getAllDataFromCollection('users');
      const usersFinal = [];
      users.data.forEach((item) => {
        usersFinal.push({ ...item, goals: item.goals.join(', ') });
      });
      // console.log(users, usersFinal);
      return { leads, users: { data: usersFinal, emails: users.emails } };
    };
    fetchDataBase().then((res) => setData(res));
  }, []);

  const changeMode = () => {
    console.log('Change DB theme mode to: ', mode === 'dark' ? 'light' : 'dark');
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  const changeColor = (color) => {
    setDialog(dialog(() => onApproval(color)));

    const onApproval = (colorChange) => {
      setColor(colorChange);
      console.log('Change DB main color to: ', colorChange);
    };
  };

  const dialog = (onClose = () => {}) => (
    <Dialog
      sx={{ textAlign: 'center', direction: 'rtl', alignItems: 'center' }}
      open
      onClose={onClose}
    >
      {/* Dialog Title */}
      <DialogTitle>פעולה ראשית</DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <Typography variant="body1">פעולה זו תשנה את האתר לצמיתות</Typography>
        <Typography variant="p">מאשר?</Typography>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ width: 1, display: 'flex', justifyContent: 'space-around' }}>
        {/* Close Button */}
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            setDialog(undefined);
          }}
        >
          אישור
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setDialog(undefined);
          }}
        >
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (search) {
    dataRes = search?.resCount ? (
      <Box>
        {Boolean(search.users?.length) && (
          <Box mb={4}>
            <Typography variant="h4" sx={textGradient}>
              משתמשים רשומים:
            </Typography>
            <Stack spacing={2}>
              {search.users?.map((item, index) => (
                <ActiveUser user={item} index={index + 1} key={index} />
              ))}
            </Stack>
          </Box>
        )}
        {Boolean(search.leads?.length) && (
          <Box>
            <Typography variant="h4" sx={textGradient}>
              לידים:
            </Typography>
            <Stack pacing={2}>
              {search.leads.map((item, index) => (
                <div className="cursor-default" key={index}>
                  <Typography variant="p">
                    {index + 1}. {item.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.timeStamp}
                  </Typography>
                </div>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    ) : (
      <Typography variant="body1">לא נמצאו תוצאות לחיפוש</Typography>
    );
  } else if (activeButton === 'לידים') {
    dataRes = data.leads?.data.length ? (
      <Stack spacing={2}>
        {data.leads.data.map((item, index) => (
          <div className="cursor-default" key={index}>
            <Typography variant="p">
              {index + 1}. {item.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.timeStamp}
            </Typography>
          </div>
        ))}
      </Stack>
    ) : (
      <Typography variant="body1" color="text.secondary">
        אין עדיין לידים
      </Typography>
    );
  } else if (activeButton === 'משתמשים רשומים') {
    dataRes = data.users?.data.length ? (
      <Stack spacing={2}>
        {data.users.data.map((item, index) => (
          <ActiveUser key={index} index={index + 1} user={item} />
        ))}
      </Stack>
    ) : (
      <Typography variant="body1" color="text.secondary">
        אין עדיין משתמשים רשומים
      </Typography>
    );
  } else if (activeButton === 'הגדרות אתר') {
    dataRes = (
      <Box
        sx={{
          display: 'flex',
          p: { md: 4, xs: 1 },
          maxWidth: '95%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto',
        }}
      >
        <Card
          sx={{
            px: { md: 8, xs: 'inherit' },
            py: 4,
            alignItems: 'center',
            textAlign: 'center',
            mx: 'auto',
          }}
        >
          <Typography mx={2} variant="p">
            כיצד יראה האתר למשתמש חדש? (Not active yet)
          </Typography>
          {dialogRef}
          <Stack direction="row" justifyContent="center" my={2} spacing={8}>
            <div className={`p-2 rounded-full ${mode === 'light' && ' bg-slate-400/30'}`}>
              <LightModeTwoTone
                color={theme.palette[mainColor].main}
                onClick={() => {
                  if (mode === 'light') {
                    return;
                  }
                  setDialog(dialog(changeMode));
                }}
                className="cursor-pointer hover:opacity-50"
                titleAccess="Light mode"
              />
            </div>
            <div className={`p-2 rounded-full ${mode === 'dark' && ' bg-slate-400/30'}`}>
              <DarkModeTwoTone
                onClick={() => {
                  if (mode === 'dark') {
                    return;
                  }
                  setDialog(dialog(changeMode));
                }}
                className="cursor-pointer hover:opacity-50"
                titleAccess="DarkModeTwoTone"
              />
            </div>
          </Stack>
          <Box width={1} display="flex" justifyContent="center">
            <ColorPicker
              showSwitch={false}
              inlineChange={false}
              callBack={changeColor}
              sx={{
                position: 'static',
                flexDirection: 'row',
                //   mx: 'auto',
                bgcolor: 'transparent',
                gap: { md: 6, xs: 2 },
              }}
            />
          </Box>
        </Card>
      </Box>
    );
  }

  const setLoaderActive = (duration = 0.2) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, [duration * 1e3]);
  };

  const handleSearch = (e, niche) => {
    setLoaderActive();
    const { name, value } = e.target;
    // console.log('handle search: ', searchKey);
    if (name === 'niche') {
      // console.log('Changing niche to : ', niche);
      setSearchKey((p) => ({ ...p, niche }));
    } else if (name === 'input') {
      // console.log('Changing Input to : ', value);
      setSearchKey((p) => ({ ...p, input: value }));
    }

    const val = name === 'input' ? value?.toLowerCase() : searchKey.input;
    niche = name === 'niche' ? niche : searchKey.niche;
    if (!val || val === '') {
      if (!niche) {
        // console.log('No input / No niche');
        setSearch(undefined);
      } else if (niche) {
        // console.log('No Input / Yes niche');
        const nichRes = data.users?.data?.filter((item) => item.niche === niche) || [];
        setSearch({ users: nichRes, leads: [], resCount: nichRes?.length || 0 });
      }
      return;
    }
    const resLeads = !niche
      ? data.leads?.data.filter(
          (item) => item.email.toLowerCase().includes(val) || item.name.toLowerCase().includes(val)
        )
      : [];
    const resUsers = data.users?.data.filter(
      (item) =>
        (item.email.toLowerCase().includes(val) || item.name.toLowerCase().includes(val)) &&
        (!niche || (niche && item.niche === niche))
    );
    const finalRes = [...resLeads, ...resUsers];
    // console.log('Final res: ', val, finalRes);
    setSearch({ users: resUsers, leads: resLeads, resCount: finalRes.length });
  };

  return (
    <Box width={1} sx={{ dir: 'rtl', mt: 2 }} textAlign="start">
      <Typography variant="h4">היי מנהל אתר 👋🏽,</Typography>
      <Typography color="text.secondary" variant="body1">
        כאן ניתן לראות נתוני משתמשים ולשנות הגדרות
      </Typography>
      <Stack my={4} justifyContent="center" direction="row" spacing={4}>
        {AdminOptions.map((item, index) => (
          <Button
            onClick={() => {
              setLoaderActive(0.5);
              setActiveButton(item === activeButton ? undefined : item);
            }}
            key={index}
            color={activeButton === item ? mainColor : undefined}
            size={isMobile ? 'small' : 'medium'}
            sx={{ fontSize: isMobile ? '0.8rem' : '' }}
            variant={activeButton === item ? 'contained' : 'outlined'}
          >
            {isMobile ? item.split(' ')[0] : item}
            {item !== 'הגדרות אתר' && (
              <div className="mr-2">
                {data[adminOptionsDict[item]] ? (
                  ` (${data[adminOptionsDict[item]]?.data.length})`
                ) : (
                  <Oval color={theme.palette[mainColor]?.main} width={10} height={10} visible />
                )}
              </div>
            )}
          </Button>
        ))}
      </Stack>
      {activeButton !== 'הגדרות אתר' && (
        <div className="w-full">
          <div className="flex justify-center">
            <RadioGroup sx={{ alignSelf: 'center' }} name="niche" color={mainColor}>
              <Stack justifyContent="start" direction="row" flexWrap="wrap">
                {Niches.map((subNiche, indx) => (
                  <FormControlLabel
                    key={`${indx} ${subNiche}`}
                    name="nice"
                    value={subNiche}
                    checked={subNiche === searchKey.niche}
                    control={
                      <Radio
                        name="niche"
                        size="small"
                        onClick={(e) => {
                          handleSearch(e, subNiche === searchKey.niche ? undefined : subNiche);
                        }}
                        color="secondary"
                      />
                    }
                    label={subNiche.split(' ')[0]}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </div>
          <Box width={isMobile ? 1 : '60%'} mx="auto" display="flex" justifyContent="center">
            <TextField
              fullWidth
              name="input"
              onChange={handleSearch}
              variant="filled"
              value={searchKey.input}
              label="חיפוש לפי שם/אימייל"
            />
          </Box>
        </div>
      )}
      <Box my={4}>
        {loader ? (
          <Circles
            wrapperClass="flex justify-center width-full my-8"
            height={80}
            color={theme.palette[mainColor]?.main}
            width={80}
            visible
          />
        ) : (
          dataRes
        )}
      </Box>
    </Box>
  );
}

const userPropDict = {
  email: 'אימייל',
  name: 'שם',
  niche: 'נישה',
  age: 'גיל',
  gender: 'מין',
  goals: 'מטרות',
  packageType: 'חבילה',
  payment: 'תשלום',
  timeStamp: 'תאריך',
};

function ActiveUser({ index, user = {}, active = false, showMail = true, typoVariant = 'body2' }) {
  const [open, setOpen] = useState(active);
  return (
    <Box
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        if (!active) {
          setOpen(!open);
        }
      }}
      key={index}
    >
      {showMail && (
        <Typography variant="p">
          {index}. {user.email}
        </Typography>
      )}
      {open ? (
        <Stack>
          {Object.keys(userPropDict).map(
            (item, indx) =>
              Boolean(user[item]) && (
                <Container sx={{ display: 'flex', gap: 1 }} key={indx}>
                  <Typography variant={typoVariant}>{userPropDict[item]}:</Typography>
                  <Typography color="text.secondary" variant={typoVariant}>
                    {user[item]} {item === 'payment' && '₪'}
                  </Typography>
                </Container>
              )
          )}
        </Stack>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.timeStamp}
          </Typography>
        </>
      )}
    </Box>
  );
}

const UserOptionsDict = ['פרטים', 'AI Creator Agent', 'תיק עבודות'];
const nicheData = {
  'אוכל ומשקאות': ['מתכונים', 'סקירות על מוצרים', 'מסעדות', 'בישול ביתי', 'תזונה בריאה'],
  'כושר ובריאות': ['אימונים', 'טיפים לאורח חיים בריא', 'יוגה', 'פילאטיס', 'אימוני HIIT'],
  'יופי ואופנה': ['מדריכי איפור', 'סקירות מוצרים', 'טיפים לעיצוב אישי', 'טרנדים עונתיים'],
  // ... והמשך עבור כל נושא
  'טיפוח אישי וגברים': ['טיפוח זקן', 'תספורות גברים', 'סקירות מוצרים לגברים'],
  'ספורט ואקסטרים': ['סקי', 'גלישת גלים', 'טיפוס הרים', 'ספורט אתגרי'],
  'חיות מחמד': ['מדריכים לטיפול בחיות', 'סקירות מוצרים לחיות מחמד', 'אימונים וטיפים'],
};

const aiDescription =
  "כל מה שצריך זה לבחור נישה של תוכן ולכתוב כמה מילים משלכם (לא חובה). הצ'אט שלנו יבנה לכם סקריפט ליצרת סרטון ואתם תוכלו להשתמש בו ככלי לימודי ומקור לרעיונות";

// const videoDescriptions = [
//   { level: 1, description: 'סאונד על סיטואציה' },
//   { level: 2, description: 'העתקה מסרטון ויראלי' },
//   { level: 3, description: 'דיבור למצלמה (אנבוקסינג / שיתוף חוויה)' },
//   { level: 4, description: 'טרנד לנישה שלנו' },
//   { level: 5, description: 'וולוג תיעודי' },
//   { level: 6, description: 'סרטון רחוב' },
//   { level: 7, description: 'אתגרים (בנים vs בנות / הכי גדול ...)' },
// ];

const videoTypes = [
  {
    type: 'סאונד על סיטואציה',
    level: 1,
    links: [
      'https://www.instagram.com/p/C455NzHow8X/',
      'https://www.tiktok.com/@eranfarkash1/video/7162287618200194306',
    ],
    description:
      'קחו את הסאונד, הסתכלו מה רוב היוצרים עושים עם הסאונד (מה הקונטקסט) וצרו ממנו סיטואציה שקשורה לנישה שלכם - למציאת סאונדים או שירים טרנדים בטיקטוק כנסו לקישור הבא : https://ads.tiktok.com/business/creativecenter/inspiration/popular/music/pc/en',
  },
  {
    type: 'העתקה מסרטון ויראלי',
    level: 2,
    links: [
      'https://www.instagram.com/p/C7oMZMboGCT/',
      'https://www.youtube.com/shorts/E-CAdEhgvFI',
    ],
    description: 'תוכן רגעי, שלא קשור בעיקר לנישה. מראה את הצד הכיפי שבכם.',
  },
  {
    type: 'דיבור למצלמה (אנבוקסינג/שיתוף)',
    level: 3,
    links: [
      'https://www.instagram.com/p/C8b1of_I9SZ/',
      'https://www.tiktok.com/@eranfarkash1/video/7177378508543479042',
    ],
    description:
      'כאן הדגש המרכזי הוא סרטונים בנישה שלנו שבהכרח תפסו לאחרים - פשוט כנסו לשורת חיפוש בטיקטוק, חפשו נושא בנישה שלכם שתרצו לעשות עליו סרטון - לחצו על פילטר ואז בחרו בשורה הראשונה את הלייקים ובתאריכים ב-30 או 60 יום האחרונים .',
  },
  {
    type: 'טרנד לנישה שלנו',
    level: 4,
    links: [
      'https://www.instagram.com/p/C2C7m2UIoYo/',
      'https://www.youtube.com/shorts/D4bIMN0al40',
      'https://www.instagram.com/p/C0HfJW6oqcv/',
    ],
    description:
      'בשונה מהעתקה מסרטון ויראלי - כאן אפשר לחשוב יצירתי ולהשתמש בעריכות שונות, אביזרים שונים - הרעיון הוא להשאיר את הקרייאטיב והמסר ולהשתמש בו לתוכן משלנו תעקבו אחרי הדפים הבאים בשביל לדעת מה הטרנדים שהיו בחודש הקודם והחודש ומה המשמעות שלהם ותנסו למצוא את האחד שיכול לעבוד גם בנישה שלכם - גם חודש קודם רלוונטי לעכשיו טרנד נמשך כ-3 חודשים.',
  },
  {
    type: 'וולוג תיעודי',
    level: 5,
    links: ['https://www.tiktok.com/@eranfarkash1/video/7279820611583544584'],
    description:
      'במידה ואתם לא ״נושמים״ את הרשת החברתית יהיה לכם קשה לעקוב אחרי הטרנדים אז תעקבו אחרי האתרים האלו :אתר2 אתר1',
  },
  {
    type: 'סרטון רחוב',
    level: 6,
    links: [
      'https://www.tiktok.com/@eranfarkash1/video/7330312190794255634',
      'https://www.tiktok.com/@eranfarkash1/video/7117720238304677121',
      'https://www.tiktok.com/@eranfarkash1/video/7127585134425001218',
    ],
    description:
      'לתעד תהליך כלשהו שאתם עוברים ובכל שלב לספר מה אתם עובריםטיפ : לא להכין את האנשים, לגשת אליהם. האינטראקציה הראשונית משמעותית. המטרה להראות אינטראקציה עם עוד אנשים מחוץ לבית - זה יכול להיות במסעדה, בקניון, לשבת ברחוב',
  },
  {
    type: 'אתגרים (בנים vs בנות/הכי גדול…)',
    level: 7,
    links: [
      'https://www.instagram.com/p/C7jRgWVIAiU/',
      'https://www.youtube.com/shorts/wWgnlF0KSns',
    ],
    description:
      'הדבר הכי חשוב שמאפיין סרטון רחוב הוא שאנחנו היוצרים ניגשים למישהו.יסרטון אתגרים הוא הסרטון הכי קשה ליוצרי תוכן - הסרטון הזה דורש את כל המיומנות והידע הכי נרחב שיוצר תוכן יכול לדעת. כאן תצטרכו לרשום תסריט לסרטון מראש עם חוקים ברורים : מה המסר שאתם רוצים להעביר בסוף הסרטון לקהל (עם איזה מסר אתם רוצים שהוא יצא), מה הטקסט לפי המבנה הבא (מה הדבר שאתם עומדים לעשות בסרטון שכל כך מעניין + להראות את התהליך + מה היה הקושי בלעשות את הדבר הזה + להראות איך התגבתם על הקושי + להראות את התוצאה ואת המסר), איפה -כל חלק בסרטון יצולם (האם בבית, אולי חלק בבית וחלק בכמה מקומות שונים - אתם תחליטו) לאחר מכן תצטרכו לערוך את הסרטון להוסיף טקסטים אפקטים או מה שצריך והסרטון מוכן ,',
  },
];

function User({ userData = {}, callback }) {
  const { mainColor, themeColor, textGradientAnimation, mode } = useContext(ColorContext);
  const [update, setUpdate] = useState(false);
  const [activeButton, setActiveButton] = useState('פרטים');
  const [loader, setLoader] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery('(max-width: 330px)');
  const [showGrid, setGrid] = useState(isMobile ? undefined : 'col');
  let dataRes;

  useEffect(() => {
    setUpdate((p) => !p);
  }, [userData, userData.videoList?.length]);

  const setLoaderActive = (duration = 0.2) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, [duration * 1e3]);
  };

  if (activeButton === 'AI Creator Agent') {
    dataRes = <ScriptAI userData={userData} />;
  } else if (activeButton === 'פרטים') {
    dataRes = (
      <Box textAlign="center" my={4}>
        <ActiveUser user={userData} showMail={false} active typoVariant="body1" />
        <div className="text-center my-4 flex flex-wrap justify-center gap-8">
          {/* <Button href={`/mashov?email=${userData.email}`} variant="outlined" size="small">
            {' '}
            למילוי משוב{' '}
          </Button> */}
          <Button
            href="https://eranfarkash.thinkific.com/courses/social-platforms"
            variant="outlined"
            color={mainColor}
            size="medium"
            // size="small"
            sx={{ fontSize: '0.8rem' }}
          >
            מעבר לאתר הקורס
          </Button>
          {(Boolean(userData.payment) || userData.payment === 0) &&
            userData.packageType !== 'Base-Pro' && (
              <Button
                href="https://chat.whatsapp.com/DE2HSwpg9ABJpaEYj4ZAfv"
                variant="text"
                size="small"
                // sx={{ mb: 2 }}
              >
                <Iconify icon="logos:whatsapp-icon" />
                &nbsp; &nbsp; הצטרפות לקהילה
              </Button>
            )}
        </div>
      </Box>
    );
  } else if (activeButton === 'תיק עבודות') {
    dataRes = (
      <Box>
        <Stack justifyContent="center" mb={2} direction="row" spacing={4}>
          {/* <Typography>תצוגה:</Typography> */}
          <Iconify
            onClick={() => setGrid('col')}
            color={showGrid === 'col' ? themeColor : ''}
            className="cursor-pointer hover:opacity-80"
            icon="mynaui:grid-solid"
          />
          <Iconify
            onClick={() => setGrid('row')}
            color={showGrid === 'row' ? themeColor : ''}
            className="cursor-pointer hover:opacity-80"
            icon="fluent:row-triple-24-filled"
          />
          <Iconify
            onClick={() => setGrid(undefined)}
            color={!showGrid ? themeColor : ''}
            className="cursor-pointer hover:opacity-80"
            icon="fluent:list-rtl-16-filled"
          />
        </Stack>
        <Stack spacing={4} direction="column">
          {showGrid ? (
            <Grid container rowSpacing={2.5} columnSpacing={0.5}>
              {userData.videoList?.map((item, index) => (
                <Grid
                  display="flex"
                  item
                  xs={showGrid === 'row' ? 12 : 6}
                  sm={showGrid === 'row' ? 12 : 6}
                  md={showGrid === 'row' ? 12 : 6}
                  lg={showGrid === 'row' ? 6 : 4}
                  key={index}
                >
                  <Box
                    width={1}
                    maxWidth={900}
                    minHeight={150}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    textAlign="center"
                    alignItems="center"
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: customShadows().dropdown,
                      borderColor: theme.palette.background.paper,
                      borderRadius: 0.75,
                    }}
                  >
                    <Videoframe
                      top
                      videoId={item}
                      className="border-none rounded-t-md rounded-b-none"
                    />
                    <Typography
                      sx={{ alignContent: 'center' }}
                      mb={4}
                      my={2}
                      maxWidth={0.9}
                      variant="body1"
                      component="a"
                      target="_blank"
                      href={
                        userData.rootFolder
                          ? `https://drive.google.com/drive/folders/${userData.rootFolder}`
                          : '#'
                      }
                    >
                      <div className="text-green-500 mb-2 hover:opacity-80 cursor-pointer">
                        <Iconify icon="ic:round-verified" />
                      </div>
                      Level {videoTypes[index]?.level}
                      <br />
                      {videoTypes[index]?.type}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            userData.videoList?.map((item, index) => (
              <div key={index}>
                <Typography
                  component="a"
                  target="_blank"
                  href={
                    userData.rootFolder
                      ? `https://drive.google.com/drive/folders/${userData.rootFolder}`
                      : '#'
                  }
                  variant="p"
                >
                  Level {videoTypes[index]?.level} -{videoTypes[index]?.type}
                  <span className="text-green-500 mx-4 hover:opacity-80 cursor-pointer">
                    <Iconify icon="ic:round-verified" color="currentColor" />
                  </span>
                </Typography>
                <Videoframe videoId={item} />
              </div>
            ))
          )}
          {(userData.videoList?.length < 7 || true) && (
            <div>
              {' '}
              <Typography mb={1} variant="p">
                Level {videoTypes[userData.videoList?.length || 0]?.level} -{' '}
                {videoTypes[userData.videoList?.length || 0]?.type}
              </Typography>
              <Typography mr={1} variant="body1" color="text.secondary">
                {videoTypes[userData.videoList?.length || 0]?.description}
              </Typography>
              <Typography mr={1} variant="body1">
                דוגמאות:
                <Stack flexWrap="wrap">
                  {videoTypes[userData.videoList?.length || 0]?.links.map((item, index) => (
                    <div key={index} className="flex gap-1">
                      •
                      <Typography
                        mr={1}
                        color="text.secondary"
                        sx={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.8 },
                        }}
                        key={index}
                        width="fit-content"
                        component="a"
                        href={item}
                        target="_blank"
                      >
                        קישור {index + 1}
                      </Typography>
                    </div>
                  ))}
                </Stack>
              </Typography>
              <UploadFile
                user={userData}
                callback={callback}
                email={userData.email}
                number={userData.videoList?.length || 0}
              />
            </div>
          )}
        </Stack>
      </Box>
    );
  }
  return (
    <Box textAlign="start" my={2}>
      <ColorPicker
        sx={{
          position: 'static',
          flexDirection: 'row',
          mx: 'auto',
          bgcolor: 'transparent',
          gap: { md: 6, xs: 2 },
        }}
        showSwitch={false}
      />
      <Box display="flex" gap={1}>
        <Typography variant="h3">היי </Typography>
        <Typography sx={textGradientAnimation} variant="h3">
          {userData.name}{' '}
        </Typography>
        <Typography variant="h3">, </Typography>
        {/* <Typography variant="h3">👋🏽</Typography> */}
      </Box>
      <Typography color="text.secondary" variant="body1">
        באיזור האישי ניתן לראות פרטים על הקורס, תיק העבודות, בחירת נישה להתמחות ורעיונות לתכני וידאו
      </Typography>
      <Stack mb={4} justifyContent="center" direction="row" spacing={4}>
        {UserOptionsDict.map((item, index) => (
          <Button
            onClick={() => {
              setLoaderActive(0.5);
              setActiveButton(item === activeButton ? undefined : item);
            }}
            key={index}
            color={activeButton === item ? mainColor : undefined}
            size={isMobile ? 'small' : 'medium'}
            sx={{ fontSize: isMobile ? '0.8rem' : '0.8rem', textWrap: 'nowrap' }}
            variant={activeButton === item ? 'contained' : 'outlined'}
          >
            {item === 'AI Creator Agent'
              ? isMobile
                ? '✨ AI Agent'
                : '✨ AI Creator Agent'
              : item}
          </Button>
        ))}
        {!isMobile && (
          <Button
            href="https://eranfarkash.thinkific.com/courses/social-platforms"
            variant="outlined"
            color={mainColor}
            size="medium"
            // size="small"
            sx={{ fontSize: '0.8rem' }}
          >
            מעבר לאתר הקורס
          </Button>
        )}
      </Stack>

      <Box my={4}>
        {loader ? (
          <Circles
            wrapperClass="flex justify-center width-full my-8"
            height={80}
            color={theme.palette[mainColor]?.main}
            width={80}
            visible
          />
        ) : (
          dataRes
        )}
      </Box>
    </Box>
  );
}

function ScriptAI({ userData, ...props }) {
  const [loaderGenerate, setLoaderGenerate] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inputRef, setInput] = useState();
  const [category, setCategory] = useState('');
  const [selectRef, setSelect] = useState('');
  const isMaster = userData.packageType === 'Master-Pro' || false;
  const theme = useTheme();
  const { mainColor, textGradientAnimation, mode } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateScript = () => {
    setLoaderGenerate(true);
    setTimeout(() => {
      setLoaderGenerate(false);
    }, 15 * 1e3);
  };

  const handleInput = (e) => {
    if (e.target.value.length <= 250) {
      setInput(e.target.value);
    }
  };
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const hundleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('This is submit data: ', { category: category || 'כללי', inputRef, selectRef });
    generateScript();
  };

  return (
    <Box textAlign="center" my={4}>
      <Typography variant="body1" color="text.secondary">
        בנינו לכם מודל AI שמבין ביצירת תוכן ויעזור לכם ליצור תוכן יצירתי, מתוחכם ומקורי
      </Typography>
      <Typography mb={2} variant="body1" color="text.secondary">
        {aiDescription}
      </Typography>
      <AnimateBorder
        sx={{ borderRadius: 2, borderWidth: 1, borderColor: 'transparent' }}
        animate={{
          angle: 250,
          // outline: 'none',
          distance: 8,
          // disableDoubleline: true,
          length: 15,
          color: theme.palette.success.main,
          // width: '2px',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            zIndex: 80,
            flexDirection: 'column',
            gap: 4,
            m: 0.4,
            px: { md: 6, xs: 2 },
            py: 4,
            mx: 'auto',
            width: isMobile ? 1 : 1,
          }}
          component="form"
          onSubmit={hundleSubmit}
        >
          {loaderGenerate ? (
            <div>
              <div className="animate-pulse">
                <Typography sx={{ direction: 'ltr', ...textGradientAnimation }} variant="h4">
                  Generating content...
                </Typography>
                <Typography color="text.secondary" sx={{ direction: 'ltr' }} variant="body1">
                  (In construction &nbsp;
                  <Iconify icon="carbon:construction" />)
                </Typography>
              </div>
              <div className="my-20 flex justify-center">
                <InfinitySpin
                  height="200"
                  // width=
                  colors={[theme.palette[mainColor]?.dark, theme.palette[mainColor]?.light]}
                  color={
                    theme.palette[mainColor][mode === 'dark' ? 'light' : 'dark'] ||
                    theme.palette.secondary.main
                  }
                />
              </div>
            </div>
          ) : (
            <Box display="flex" flexDirection="column" gap={4} width={1}>
              <Typography variant="h4">© Video-Pro Script Generator</Typography>
              <FormControl required fullWidth variant="outlined">
                <InputLabel>בחירת נישה</InputLabel>
                {/* <InputLabel className='w-full flex justify-start text-start' id="select">בחירת נישה ליצירת תוכן</InputLabel> */}
                <Select
                  displayEmpty
                  name="niche"
                  variant="filled"
                  sx={{ textAlign: 'center', my: 0 }}
                  onChange={handleSelect}
                  value={selectRef}
                >
                  {Object.keys(nicheData).map((item, index) => (
                    <MenuItem selected={index === 0} key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>נא לבחור נישה</FormHelperText>
                {nicheData[selectRef] && (
                  <Box>
                    <Typography my={2} textAlign="start" variant="body2" color="text.secondary">
                      בחרו תת-קטגוריה:
                    </Typography>
                    <RadioGroup color={mainColor} value={category} onChange={handleCategory}>
                      <Stack justifyContent="start" direction="row" flexWrap="wrap">
                        {nicheData[selectRef].map((subNiche, indx) => (
                          <FormControlLabel
                            key={`${indx} ${subNiche}`}
                            value={subNiche}
                            control={<Radio color={mainColor} />}
                            label={subNiche}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                )}
              </FormControl>
              <Box textAlign="start">
                <TextField
                  fullWidth
                  multiline
                  name="free-text"
                  disabled={!isMaster}
                  rows={4}
                  onChange={handleInput}
                  onBlur={() => setFocus(false)}
                  onFocus={() => setFocus(true)}
                  variant={isMaster ? 'outlined' : 'filled'}
                  // InputLabelProps={{dir:'rtl',sx:{px:2, float:'right'}, style:{margin: '0px 10px', width:'max-content'}}}
                  value={inputRef}
                  label={focus ? '.    תנו לנו כיוון, אנחנו נמשיך משם    .' : ''}
                  placeholder="טקסט חופשי - רעיונות, לוקיישנים וכל הכוונה אחרת ל AI"
                />
                <Box mb={2} width={1} display="flex" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    component="div"
                    color={isMaster ? theme.palette.success.main : theme.palette.error.main}
                  >
                    לתלמידי מסלול Master בלבד
                  </Typography>
                  <Typography variant="body2" fontSize="0.7" color="text.secondary">
                    {!isMobile && 'עד 250 תווים'}({250 - (inputRef?.length || 0)})
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  ...textGradientAnimation,
                  animationDuration: '10s',
                  WebkitBackgroundClip: 'inherit',
                  WebkitTextFillColor: 'inherit',
                  backgroundClip: 'inherit',
                  textFillColor: 'inherit',
                  color: 'inherit',
                }}
                size={isMobile ? 'medium' : 'large'}
                type="submit"
                variant="contained"
                fullWidth
              >
                {' '}
                ✨ Generate AI sctipt
              </Button>
            </Box>
          )}
        </Card>
      </AnimateBorder>
    </Box>
  );
}

export function Videoframe({ videoId, className, top = false }) {
  return videoId ? (
    <Box
      sx={{ position: 'relative' }}
      maxWidth={900}
      display="flex"
      mt={top ? 0 : 1}
      mb={top ? 1 : 0}
      width={1}
      // width="fit-content"
      overflow="hidden"
    >
      <iframe
        title="videoIntro"
        // width={500}
        allowFullScreen
        allow="fullscreen"
        // src="https://drive.google.com/file/d/1GPVCyit_PuX4sUh5FMlAjTKVRCVdW0mY/preview"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        className={`relative border-[0.7px] border-grey-500/40 rounded-md shadow-md z-20 w-full h-full aspect-video ${className}`}
        // controls
      />
      <div className="absolute z-20 top-0 right-0 bg-transparent w-1/4 h-1/3" />
    </Box>
  ) : null;
}