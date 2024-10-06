'use client';

import { m } from 'framer-motion';
import { Circles } from 'react-loader-spinner';
import { useForm, Controller } from 'react-hook-form';
import React, { useState, useEffect, useContext } from 'react';

import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';
import {
  Box,
  Radio,
  Stack,
  Button,
  Divider,
  TextField,
  Container,
  RadioGroup,
  Typography,
  useColorScheme,
  FormControlLabel,
} from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { Iconify } from '../iconify';
import { varScale, varBounce, MotionContainer } from '../animate';

export default function Mashov({ email }) {
  const { setMode } = useColorScheme();
  const [loading, setLoader] = useState(true);
  const [isActive, setActive] = useState(false);
  const { mode, textGradientAnimation, mainColor, themeColor } = useContext(ColorContext);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1 * 1000);
  }, []);

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

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
      // width={isActive ? '90%' : 'auto'}
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
            {/* <Typography variant="h4">הבית של יוצרי התוכן הטובים בישראל</Typography> */}
            <Divider sx={{ width: 1, mb: 0 }} />
          </m.div>
        </Container>
      </div>

      {loading ? (
        <Circles
          wrapperClass="flex justify-center width-full my-8"
          height={80}
          color={themeColor}
          width={80}
          visible
        />
      ) : (
        <FeebackForm email={email} />
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
              // color="text.primary"
              href="/"
              px={1}
            >
              &nbsp; לדף הבית
            </Button>
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}

function FeebackForm({ email }) {
  const [loading, setLoader] = useState(false);
  const [finish, setFinish] = useState(false);
  const { themeColor, textGradientAnimation } = useContext(ColorContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    setLoader(true);
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setTimeout(() => {
      setFinish(true);
      setLoader(false);
    }, 0.2 * 1000);
  };

  const form = (
    <>
      <Typography variant="h4" mt={1} textAlign="center" color="text.primary">
        משוב לקורס
      </Typography>
      {/* Email Input */}
      <Controller
        name="אימייל"
        control={control}
        defaultValue={email || ''}
        rules={{
          required: 'אימייל חובה',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'כתובת אימייל לא תקינה',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="אימייל"
            variant="outlined"
            error={!!errors['אימייל']}
            helperText={errors['אימייל'] ? errors['אימייל']?.message : ''}
            fullWidth
          />
        )}
      />

      {/* Text Area: "ספרו לנו מה חשבתם על הקורס" */}
      <Controller
        name="חוויה-כללית"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              1. ספרו לנו מה חשבתם על הקורס
            </Typography>
            <TextField
              {...field}
              label="חוויה כללית"
              variant="filled"
              multiline
              rows={4}
              fullWidth
            />
          </>
        )}
      />

      {/* Radio Group: "האם האורך של הקורס היה מתאים או שצריך להאריך / לקצר?" */}
      <Controller
        name="אורך-הקורס"
        control={control}
        defaultValue=""
        rules={{ required: 'יש לבחור אחת מהאפשרויות' }}
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              2. האם האורך של הקורס היה מתאים או שלדעתכם היה קצר / ארוך?
            </Typography>
            <RadioGroup {...field} row>
              <FormControlLabel
                value="קצר מידיי"
                control={<Radio color="info" size="small" />}
                label="קצר מידיי"
              />
              <FormControlLabel
                value="אורך טוב"
                control={<Radio color="info" size="small" />}
                label="אורך טוב"
              />
              <FormControlLabel
                value="ארוך מידיי"
                control={<Radio color="info" size="small" />}
                label="ארוך מידיי"
              />
            </RadioGroup>
            {errors['אורך-הקורס'] && (
              <Typography color="error">{errors['אורך-הקורס']?.message}</Typography>
            )}
          </>
        )}
      />

      {/* Radio Group: "תנו ציון כללי לאתר הקורס והאיזור האישי (מראה, מידע, ותחושת התמצאות)" */}
      <Controller
        name="אתר-הקורס"
        control={control}
        defaultValue=""
        rules={{ required: 'יש לבחור אחת מהאפשרויות' }}
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              3. תנו ציון כללי לאתר Video-Pro (מראה האתר, תוכן והנגשת המידע, איזור אישי, נגישות
              ונוחות השימוש)
            </Typography>
            <RadioGroup {...field} row>
              <FormControlLabel
                labelPlacement="top"
                value={5}
                control={<Radio color="warning" size="small" />}
                label="😍"
              />
              <FormControlLabel
                labelPlacement="top"
                value={4}
                control={<Radio color="warning" size="small" />}
                label="😄"
              />
              <FormControlLabel
                labelPlacement="top"
                value={3}
                control={<Radio color="warning" size="small" />}
                label="🙂"
              />
              <FormControlLabel
                labelPlacement="top"
                value={2}
                control={<Radio color="warning" size="small" />}
                label="😑"
              />
              <FormControlLabel
                labelPlacement="top"
                value={1}
                control={<Radio color="warning" size="small" />}
                label="😞"
              />
            </RadioGroup>
            {errors['אתר-הקורס'] && (
              <Typography color="error">{errors['אתר-הקורס']?.message}</Typography>
            )}
          </>
        )}
      />

      {/* Radio Group: "תנו ציון כללי לאתר הקורס והאיזור האישי (מראה, מידע, ותחושת התמצאות)" */}
      <Controller
        name="Thinkific"
        control={control}
        defaultValue=""
        rules={{ required: 'יש לבחור אחת מהאפשרויות' }}
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              4. Thinkific - דרגו את החוויה מהאתר שבו ראיתם את הקורס (חווית ההרשמה, נוחות השימוש
              ואיכות השימוש והסרטונים)
            </Typography>
            <RadioGroup {...field} row>
              <FormControlLabel
                labelPlacement="top"
                value={5}
                control={<Radio color="error" size="small" />}
                label="😍"
              />
              <FormControlLabel
                labelPlacement="top"
                value={4}
                control={<Radio color="error" size="small" />}
                label="😄"
              />
              <FormControlLabel
                labelPlacement="top"
                value={3}
                control={<Radio color="error" size="small" />}
                label="🙂"
              />
              <FormControlLabel
                labelPlacement="top"
                value={2}
                control={<Radio color="error" size="small" />}
                label="😑"
              />
              <FormControlLabel
                labelPlacement="top"
                value={1}
                control={<Radio color="error" size="small" />}
                label="😞"
              />
            </RadioGroup>
            {errors.Thinkific && <Typography color="error">{errors.Thinkific.message}</Typography>}
          </>
        )}
      />

      {/* Radio Group: "כמה הייתם משלמים על הקורס, בהנחה שנעשו התיקונים שציינת?" */}
      <Controller
        name="מחיר-הקורס"
        control={control}
        defaultValue=""
        rules={{ required: 'יש לבחור אחת מהאפשרויות' }}
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              5. כמה הייתם משלמים על הקורס, בהנחה שנעשו התיקונים והשיפורים הנדרשים?
            </Typography>
            <RadioGroup {...field} row>
              <FormControlLabel
                value="עד 400₪"
                control={<Radio size="small" color="success" />}
                label="עד 400 ₪"
              />
              <FormControlLabel
                value="בין 400-600₪"
                control={<Radio size="small" color="success" />}
                label="בין 400 - 600 ₪"
              />
              <FormControlLabel
                value="בין 600-800₪"
                control={<Radio size="small" color="success" />}
                label=" בין 600 - 800 ₪"
              />
            </RadioGroup>
            {errors['מחיר-הקורס'] && (
              <Typography color="error">{errors['מחיר-הקורס'].message}</Typography>
            )}
          </>
        )}
      />

      {/* Text Area: "* איך היה כל התהליך מרגע הרכישה עד לראיית הסרטונים עצמם והאם היה מובן שיש אזור אישי וקהילת ואטסאפ ?" */}
      <Typography variant="body1" color="text.primary">
        6. איך היה התהליך מרגע הרכישה עד לראיית הסרטונים עצמם? האם היה מובן שיש אזור אישי וקהילת
        ואטסאפ?
      </Typography>
      <Controller
        name="חווית-הרשמה"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="ספרו לנו על החוויה שלכם מההרשמה ומאתר הקורס"
            variant="filled"
            multiline
            rows={3}
            fullWidth
          />
        )}
      />

      {/* Text Area: "האם יש משהו שצריך להוסיף לקורס לדעתך?" */}
      <Controller
        name="תוספות-לקורס"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              7. האם יש משהו שהייתם מוסיפים לקורס? מה הייתם משפרים?
              {/* <br />
              <Typography variant="body2" color="text.secondary">
                זה המקום שלכם לרשום את כל ההערות שלכם עד עכשיו
              </Typography> */}
            </Typography>

            <TextField
              {...field}
              label="זה המקום שלכם לרשום את כל ההערות שלכם עד עכשיו"
              variant="filled"
              multiline
              rows={3}
              fullWidth
            />
          </>
        )}
      />

      {/* Text Area: "מה דעתכם על הקהילה? (תכנים, בניית תיק עבודות  ואתגרים שניתנו)" */}
      <Controller
        name="קהילה"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Typography variant="body1" color="text.primary">
              8. מה דעתכם על הקהילה? האם אהבתם את התכנים, האתגרים ותהליך בניית תיק העבודות?
              <br />
              <Typography variant="body2" color="text.secondary">
                מיועד למי שהשתתף בקהילה באופן פעיל, לקח חלק באתגרים ובנה תיק עבודות
              </Typography>
            </Typography>

            <TextField
              {...field}
              label="ספרו לנו מה חשבתם על הקהילה ועל התהליך שעברתם שם"
              variant="filled"
              multiline
              rows={3}
              fullWidth
            />
          </>
        )}
      />
    </>
  );

  return (
    <Box
      component="form"
      noValidate
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: 2,
        my: 2,
        textAlign: 'start',
      }}
    >
      {finish ? (
        <Typography variant="h2" mt={2} textAlign="center">
          תודה על המשוב!
        </Typography>
      ) : loading ? (
        <Circles
          wrapperClass="flex justify-center width-full my-8"
          height={80}
          color={themeColor}
          width={80}
          visible
        />
      ) : (
        form
      )}

      {/* Submit and Reset Buttons */}
      {!finish && (
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <Button type="submit" variant="contained">
            שליחה
          </Button>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            איפוס טופס
          </Button>
        </Box>
      )}
    </Box>
  );
}
