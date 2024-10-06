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
import { ColorContext } from 'src/context/colorMain';

import {
  varSlide,
  varScale,
  varBounce,
  AnimateBorder,
  MotionContainer,
} from 'src/components/animate';

import { Iconify } from '../iconify';
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
    <User userData={userData} />
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
                mb: 2,
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

function User({ userData = {} }) {
  const { mainColor, textGradientAnimation, mode } = useContext(ColorContext);
  const [activeButton, setActiveButton] = useState('פרטים');
  const [loader, setLoader] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let dataRes;

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
          {userData.payment && (userData.payment > 249 || userData.packageType !== 'Base-Pro') && (
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