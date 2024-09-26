'use client';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Oval, Circles } from 'react-loader-spinner';
import { useForm, Controller } from 'react-hook-form';
import { useRef, useState, useEffect, useContext } from 'react';

import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import {
  Box,
  Stack,
  Button,
  Divider,
  useTheme,
  Skeleton,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useColorScheme,
} from '@mui/material';

import { getLeadById, getAllDataFromCollection } from 'src/utils/firebaseFunctions';

import { ColorContext } from 'src/context/colorMain';

import { varSlide, varBounce, MotionContainer } from 'src/components/animate';

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
    if (id) {
      getLeadById(id).then((data) => {
        if (data) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
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
    if (user === 'admin') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAdmin(true);
      }, 1 * 1e3);
    } else if (user) {
      router.push(`/login?id=${userID}`);
    }
  };

  const data = isAdmin ? (
    <Admin />
  ) : userData ? (
    <Typography variant="h3">היי {userData.name}</Typography>
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
        <Container component={MotionContainer}>
          <m.div variants={varBounce({ durationIn: 0.8 }).in}>
            <Stack direction="row" justifyContent="center" mb={2} spacing={8}>
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
            {!isActive && (
              <Typography variant="h3" sx={{ mb: 2 }}>
                הבית של יוצרי התוכן והקמפיינים בישראל
              </Typography>
            )}
            {isActive && <Divider sx={{ width: 1, mb: 4 }} />}
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
      <Box mt={4} display="flex" width={1}>
        <Button
          size="small"
          sx={{
            alignSelf: 'start',
            textDecoration: 'underline',
            opacity: 0.8,
          }}
          // color="text.secondary"
          href="/"
          px={1}
        >
          חזרה לדף הבית
        </Button>
      </Box>
    </Box>
  );
}

export default Login;

function EmailVerificationForm({ callback = () => {} }) {
  const [emails, setEmails] = useState();
  const [userData, setData] = useState();
  const { mainColor } = useContext(ColorContext);

  useEffect(() => {
    setTimeout(() => {
      getAllDataFromCollection('leads').then((data) => {
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
    console.log('Form Submitted', data);
    let userID;
    userData?.some((item) => {
      if (item.email === data.email.toLowerCase()) {
        userID = item.id;
        return true;
      }
      return false;
    });
    console.log(userID);
    callback(data.email, userID);
  };

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
          <Typography variant="p" color="text.secondary">
            איזור אישי
          </Typography>
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
                    ['admin'].includes(value.toLowerCase()) ||
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
            sx={{ my: 4 }}
            color={mainColor}
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            התחברות
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
  const [activeButton, setActiveButton] = useState();
  const [data, setData] = useState({});
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(false);
  const theme = useTheme();
  const { mainColor, textGradient } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const searchInput = useRef();
  let dataRes;
  if (search || searchInput.current) {
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
  }

  useEffect(() => {
    const fetchDataBase = async () => {
      const leads = await getAllDataFromCollection('leads');
      const users = await getAllDataFromCollection('users');
      const usersFinal = [];
      users.data.forEach((item) => {
        usersFinal.push({ ...item, goals: item.goals.join(', ') });
      });
      console.log(users, usersFinal);
      return { leads, users: { data: usersFinal, emails: users.emails } };
    };
    fetchDataBase().then((res) => setData(res));
  }, []);

  const setLoaderActive = (duration = 0.2) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, [duration * 1e3]);
  };

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    if (val === '') {
      setSearch(undefined);
      return;
    }
    setLoaderActive();
    const resLeads = data.leads?.data.filter(
      (item) => item.email.toLowerCase().includes(val) || item.name.toLowerCase().includes(val)
    );
    const resUsers = data.users?.data.filter(
      (item) => item.email.toLowerCase().includes(val) || item.name.toLowerCase().includes(val)
    );
    const finalRes = [...resLeads, ...resUsers];
    console.log('Final res: ', val, finalRes);
    setSearch({ users: resUsers, leads: resLeads, resCount: finalRes.length });
  };

  return (
    <Box width={1} sx={{ dir: 'rtl' }} textAlign="start">
      <Typography variant="h4">היי מנהל אתר,</Typography>
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
      <Box width={isMobile ? 1 : '60%'} mx="auto" display="flex" justifyContent="center">
        <TextField
          fullWidth
          onChange={handleSearch}
          variant="filled"
          value={searchInput.current}
          label="חיפוש לפי שם/אימייל"
        />
      </Box>
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
  age: 'גיל',
  gender: 'מין',
  goals: 'מטרות',
  packageType: 'חבילה',
  payment: 'תשלום',
  timeStamp: 'תאריך',
};

function ActiveUser({ index, user = {} }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)} key={index}>
      <Typography variant="p">
        {index}. {user.email}
      </Typography>
      {open ? (
        <Stack>
          {Object.keys(userPropDict).map(
            (item, indx) =>
              user[item] && (
                <Container sx={{ display: 'flex', gap: 1 }} key={indx}>
                  <Typography variant="body2">{userPropDict[item]}:</Typography>
                  <Typography color="text.secondary" variant="body2">
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
