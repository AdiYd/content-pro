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
  Checkbox,
  TextField,
  IconButton,
  DialogTitle,
  useMediaQuery,
  DialogActions,
  DialogContent,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { trackEvent } from 'src/utils/GAEvents';

import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, AnimateBorder, MotionViewport } from 'src/components/animate';

import terms from '../../utils/terms.json';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AboutLead({ showMsg = true }) {
  const theme = useTheme();
  const { mainColor, textGradient, mode } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTxtfield, setActiveTxtField] = useState(showMsg);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    approveTerms: true,
    message: '',
    contactForm: true,
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
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
        email: emailValid ? '' : 'נא למלא כתובת אימייל תקינה',
      });
    } else if (name === 'name') {
      setErrors({
        ...errors,
        name: value.length < 2 ? 'נא למלא שם' : '',
      });
    }
  };

  // onSubmit handler to log form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    trackEvent('New user', 'Lead', `${formData.name} ; ${formData.email}`, 1);
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).finally(() => {
      setTimeout(() => {
        setLoading(false);
        setThanks(true);
      }, 400);
    });

    // console.log('Lead API res: ', result);
    // console.log('Form Data:', formData);
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

  const dialogThanks = (
    <Dialog
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={thanks}
      onClose={() => setActive(false)}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setThanks(false);
          }}
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
        <Typography variant="h4">תודה על יצירת הקשר 😀</Typography>
        <br />
        <Typography color="text.primary" variant="p">
          קיבלנו את הפרטים, נחזור אליכם עם פרטים נוספים
        </Typography>
        <br />
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setThanks(false);
          }}
          autoFocus
        >
          סגירה
        </Button>

        {/* <Button
 color={mainColor}
 size="small"
 variant="outlined"
 onClick={() => setActive(false)}
>
 לא תודה
</Button> */}
      </DialogActions>
    </Dialog>
  );

  const checkBox = (
    <div className="flex flex-col gap-2">
      {dialogThanks}
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
      id="contactUs"
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        mb: { md: 10, xs: 8 },
        pb: { xs: 4, md: 4 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          עדיין מתלבטים? השאירו פרטים ונחזור אליכם עם
          <Box component="a" mx={1} sx={textGradient} color={`${mainColor}.main`}>
            כל מה שיוצר תוכן מתחיל צריך
          </Box>
        </Typography>

        <AnimateBorder
          sx={{
            maxWidth: { md: '60%', xs: '100%' },
            borderRadius: 2,
            mx: 'auto',
            p: 0.1,
            mb: 3,
          }}
          animate={{ color: mode === 'dark' ? 'white' : 'black' }}
        >
          <Card
            gap={3}
            // display="flex"
            // flexDirection="column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              zIndex: 30,
              p: 3,
              // maxWidth: { md: '60%', xs: '100%' },
              // width: 1,
              mx: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              // border: theme.palette.mode === 'light' && `solid 1px ${theme.vars.palette.divider}`,
              // background: theme.palette.background.paper,
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <Typography textAlign="center" variant="h4" gutterBottom>
                צרו קשר
              </Typography>

              <TextField
                label="שם מלא"
                name="name"
                variant="filled"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.name)}
                helperText={errors.name}
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
                רוצים להוסיף הודעה?
                <Typography
                  onClick={() => setActiveTxtField((p) => !p)}
                  component="span"
                  variant="body1"
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  color="text.secondary"
                  mx={1}
                >
                  {' '}
                  (לא חובה){' '}
                </Typography>
              </Typography>
              {activeTxtfield && (
                <TextField
                  label="יש לכם שאלות? הערות? הצעות? נשמח לשמוע ממכם..."
                  name="message"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={4}
                  // maxRows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                />
              )}

              {checkBox}
              <div className="w-full flex justify-center">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color={mainColor}
                    sx={{ my: 2 }}
                    disabled={
                      !formData.name || !formData.email || !formData.approveTerms || errors.email
                    }
                  >
                    שליחה
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </AnimateBorder>

        {/* <Divider
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
        /> */}
      </m.div>
    </Container>
  );
}
