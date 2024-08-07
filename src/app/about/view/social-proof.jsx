import Image from 'next/image';
import { m } from 'framer-motion';
import { useContext } from 'react';

import { Box, List, useTheme, ListItem, Container, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, AnimateText, MotionContainer } from 'src/components/animate';

function SocialProof({ ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Box m={{ md: 8, xs: 'auto' }}>
      <Container maxWidth={500}>
        <AnimateText
          variant="h2"
          component="h2"
          sx={{ textAlign: 'start' }}
          text="מה למשל לומדים בקורס?"
          variants={varFade({}).inLeft}
        />
      </Container>

      {['followers', 'analysis', 'creative', 'quickviews', 'views'].map((item, index) => (
        <RowX key={index} picName={item} index={index + 1} even={Boolean(index % 2)} />
      ))}
    </Box>
  );
}

export default SocialProof;

const RowX = ({ even = true, index, picName = 'followers' }) => {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const colorPalette = Object.values(theme.palette)[index]?.dark || `${mainColor}.lighter`;
  return (
    <Container
      //   component="div"
      component={MotionContainer}
      className="check"
      sx={{
        mx: { md: 4, xs: 2 },
        my: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { md: 'inherit', xs: even ? 'column' : 'column-reverse' },
        gap: 15,
      }}
    >
      {even && (
        <m.div variants={varFade().inLeft} sx={{ width: 'auto' }}>
          <Typography variant="h3" component="h3" sx={{ color: `${mainColor}.main` }}>
            כותרת לנושא לימוד
          </Typography>
          <List>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 1
              </Typography>
            </ListItem>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 2
              </Typography>
            </ListItem>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 3
              </Typography>
            </ListItem>
          </List>
        </m.div>
      )}

      <m.div variants={varFade().inLeft}>
        <Image
          alt="Our office small"
          width={300}
          height={300}
          className="hover:scale-150 transition-transform"
          src={`${CONFIG.site.basePath}/assets/images/socialProof/${picName}.png`}
          ratio="1/1"
          style={{
            transition: 'transform 0.7s ease-in',
            borderRadius: 30,
            transform: `rotate(${even ? '-' : ''}4deg)`,
            boxShadow: `${even ? '-' : ''}30px 5px 40px ${colorPalette}`,
          }}
        />
      </m.div>

      {!even && (
        <m.div variants={varFade().inRight} sx={{ width: 'auto' }}>
          <Typography variant="h3" component="h3" sx={{ color: `${mainColor}.main` }}>
            כותרת לנושא לימוד
          </Typography>
          <List>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 1
              </Typography>
            </ListItem>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 2
              </Typography>
            </ListItem>
            <ListItem>
              <Iconify icon="lets-icons:check-fill" width={30} />
              <Typography sx={{ mx: 4 }} variant="h4">
                דגש מס 3
              </Typography>
            </ListItem>
          </List>
        </m.div>
      )}
    </Container>
  );
};
