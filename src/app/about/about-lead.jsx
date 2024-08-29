import { m } from 'framer-motion';
import { useState, useContext } from 'react';

import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {
  Box,
  Card,
  Button,
  Dialog,
  Divider,
  Checkbox,
  TextField,
  IconButton,
  DialogTitle,
  useMediaQuery,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import terms from '../../utils/terms.json';
// ----------------------------------------------------------------------

const bullets = [
  'מקצוע דיגיטלי ומבוקש ללא קשר לפלטפורמה המועדפת עליכם',
  'לעבוד ולהרוויח כסף מכל מקום ובכל זמן',
  'ללמוד איך ליצור קהילה משלכם, שתהווה עבורכם מקור הכנסה',
  'מקבלים פרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
  'קבוצת וואטצאפ פרטים עם תכנים, טיפים ומדריכים להמשך הדרך',
  'לא אהבתם ? תקבלו את כספכם בחזרה',
];

const bulletsWithIcons = [
  {
    text: 'מקצוע דיגיטלי מבוקש, ללא קשר לפלטפורמה המועדפת עליכם',
    icons: ['logos:youtube-icon', 'logos:tiktok-icon', 'skill-icons:instagram', 'logos:facebook'],
  },
  {
    text: 'ליצור תוכן ולהרוויח כסף מכל מקום ובכל זמן',
    icons: [
      'fa6-solid:wifi', // An icon representing money or earnings
      'twemoji:laptop', // An icon representing time, indicating flexibility
      'flat-color-icons:globe', // An icon representing time, indicating flexibility
    ],
  },
  {
    text: 'לבנות קהילה אותנטית שתהווה עבורכם מקור הכנסה וקהל שאוהב אתכם',
    icons: [
      'mdi:account-group-outline', // An icon representing a community or group
      'material-symbols:animated-images',
    ],
  },
  {
    text: 'ההשקעה חוזרת - נחבר אתכם לפרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
    icons: [
      // 'mdi:briefcase-check-outline', // An icon representing a successful project or job
      'bytesize:portfolio',
      'game-icons:money-stack',
      'mdi:film-open-star-outline',
    ],
  },
  {
    text: 'קבוצת פרטית של יוצרי תוכן עם תכני העשרה, טיפים והדרכות להמשך הדרך',
    icons: [
      'logos:whatsapp-icon', // The WhatsApp icon for communication
      'emojione:books', // An icon representing guides or tips
    ],
  },
  {
    text: 'לא אהבתם ? תקבלו את כספכם בחזרה',
    icons: [
      'mdi:cash-refund', // An icon representing a refund or money back
      'pajamas:partner-verified',
      // 'gala:secure',
    ],
  },
];

// ----------------------------------------------------------------------

export function AboutLead({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor, textGradient } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTxtfield, setActiveTxtField] = useState(false);
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    approveTerms: true,
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    approveTerms: '',
  });

  // onChange handler to update form data and validate email
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validate email
    if (name === 'email') {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors({
        ...errors,
        email: emailValid ? '' : 'נא להכניס כתובת אימייל תקינה',
      });
    }
  };

  // onSubmit handler to log form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.approveTerms) {
      console.log('not approved');
      setErrors((p) => ({
        ...p,
        approveTerms: 'נא לאשר את תנאי השימוש',
      }));
    }
    if (!errors.email && formData.fullName && formData.approveTerms) {
      console.log('Form Data:', formData);
    } else {
      console.log('Please fill out all required fields correctly.');
    }
  };

  const dialog = (
    <Dialog
      fullWidth
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={active}
      onClose={() => setActive(false)}
    >
      <DialogTitle>
        {terms.title}
        {/* תנאי שימוש לקורס Video-Pro */}
        <IconButton
          aria-label="close"
          onClick={() => setActive(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="carbon:close-filled" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ color: 'text.secondary' }}>
        <Typography textAlign="start" lineHeight={1.5} color="text.secondary" variant="body2">
          {terms.content.split('\n').map((item, index) => (
            <div key={index}>
              {item}
              <br />
            </div>
          ))}
        </Typography>

        <Typography color="text.primary" variant="p" />
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'space-around' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            // setValue('approveTerms', true);
            setActive(false);
          }}
          autoFocus
        >
          אישור
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            // setValue('approveTerms', false);
            setActive(false);
          }}
        >
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );

  const checkBox = (
    <div className="flex flex-col gap-2">
      <FormControlLabel
        name="approveTerms"
        sx={{ mr: 0 }}
        control={
          <Checkbox
            color={mainColor}
            checked={formData.approveTerms}
            // sx={{
            //   border: (theme) =>
            //     errors.approveTerms && `0.4px dashed ${theme.palette.error.main}`,
            // }}
          />
        }
        label={
          <Typography>
            קראתי ואישרתי את{' '}
            <Button
              size="small"
              sx={{
                textDecoration: 'underline',
                opacity: 0.8,
              }}
              // color="text.secondary"
              onClick={() => setActive((p) => !p)}
              mx={1}
            >
              תנאי השימוש
            </Button>
          </Typography>
        }
      />
      {errors.approveTerms && (
        <Typography mr={1} variant="body2" sx={{ color: theme.palette.error.main }}>
          יש לאשר את תנאי השימוש
        </Typography>
      )}
      {dialog}
    </div>
  );

  return (
    <Container
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        my: 8,
        pb: { xs: 4, md: 4 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          עדיין מתלבטים? הרשמו כאן לעוד פרטים ותקבלו חוברת עם
          <Box component="a" mx={1} sx={textGradient} color={`${mainColor}.main`}>
            כל מה שיוצר תוכן מתחיל צריך
          </Box>
        </Typography>

        <Box>
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
            <form onSubmit={handleSubmit} noValidate>
              <Typography textAlign="center" variant="h4" gutterBottom>
                דברו איתי
              </Typography>

              <TextField
                label="שם מלא"
                name="fullName"
                variant="filled"
                fullWidth
                required
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                label="אימייל"
                name="email"
                variant="filled"
                fullWidth
                required
                inputProps={{ dir: 'ltr' }}
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <Typography component="div" textAlign="start" mt={2} variant="body2">
                רוצים להוסיף הערה?
                <Typography
                  onClick={() => setActiveTxtField((p) => !p)}
                  component="span"
                  variant="body1"
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  color="text.secondary"
                  mx={1}
                >
                  {' '}
                  לחצו כאן{' '}
                </Typography>
              </Typography>
              {activeTxtfield && (
                <TextField
                  label="הודעה"
                  name="message"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={4}
                  maxRows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                />
              )}

              {checkBox}

              {/* <FormControlLabel
                control={
                  <Checkbox
                    name="approveTerms"
                    color="primary"
                    checked={formData.approveTerms}
                    onChange={handleChange}
                    required
                  />
                }
                label={
                  <>
                    {' '}
                    <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                      terms and conditions
                    </a>
                  </>
                }
              /> */}

              <Button
                type="submit"
                variant="contained"
                color={mainColor}
                sx={2}
                disabled={
                  !formData.fullName || !formData.email || !formData.approveTerms || errors.email
                }
              >
                שליחה
              </Button>
            </form>
          </Card>
        </Box>

        <Divider
          sx={{
            mt: 6,
            background: `linear-gradient(to right, ${theme.palette.secondary?.main},${theme.palette.warning?.main},${theme.palette.primary?.main})`,
            width: '100%',
            height: 1.5,
            borderRadius: 50,
            border: 'none',
            backgroundSize: '200% 100%', // This makes the gradient larger than the container
            animation: 'slide 20s linear infinite', // Define the animation timing and type
            '@keyframes slide': {
              '0%': {
                backgroundPosition: '0% 50%', // Start at the beginning of the gradient
              },
              '50%': {
                backgroundPosition: '100% 50%', // End at the end of the gradient
              },
              '100%': {
                backgroundPosition: '0% 100%', // End at the end of the gradient
              },
            },
          }}
        />
      </m.div>
    </Container>
  );
}
