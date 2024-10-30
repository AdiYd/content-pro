'use client';

import './slideIn.css';

import { m } from 'framer-motion';
import { useRef, useState, Suspense, useEffect } from 'react';

import { useTheme, Skeleton, ImageList, Container, ImageListItem } from '@mui/material';

import { CONFIG } from 'src/config-global';
import colors from 'src/theme/core/colors.json';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

const promoImag = [
  {
    alt: 'Social media',
    src: 'promo1.webp',
  },
  {
    alt: 'Social media',
    src: 'promo2.webp',
  },
  {
    alt: 'Design',
    src: 'promo3.jpg',
  },
  {
    alt: 'Video content',
    src: 'promo4.jpg',
  },
];

const promoImagInfluencer = [
  {
    alt: 'Watch',
    src: 'back2.jpg',
  },
  {
    alt: 'Video content',
    src: 'promotion.jpg',
  },
  {
    alt: 'Colorful phone',
    src: 'hero1.jpg',
  },
  {
    alt: 'Social media',
    src: 'fire.jpg',
  },
];

function ImageDiv({ influencer = false, ...props }) {
  const theme = useTheme();
  return (
    <Container sx={{ mb: 4, maxWidth: 1, overflow: 'visible' }} component={MotionViewport}>
      <m.div variants={varFade({ durationIn: 2 }).inDown}>
        <ImageList
          sx={{
            px: { md: 3, xs: 1 },
            pt: 4,
            pb: 5,
            display: 'flex',
            overflow: 'hidden',
            justifyContent: 'space-between',
          }}
        >
          {(influencer ? promoImagInfluencer : promoImag).map((item, index) => (
            <ImageListItem key={index} sx={{ width: '20%' }}>
              <Suspense
                fallback={
                  <Skeleton variant="rectangular" animation="wave" sx={{ width: 1, height: 1 }} />
                }
              >
                <Image
                  alt="Together is Better"
                  src={`${CONFIG.site.basePath}/assets/images/about/${item.src}`}
                  ratio="3/4"
                  sx={{
                    transform: `rotate(${(-1) ** index * (index * 2 - 8)}deg)`,
                    borderRadius: 1,
                    objectFit: 'cover',
                    '&:hover': { transform: 'scale(1.15)' },
                    transition: 'transform 0.3s ease-in',
                    boxShadow: `-10px 10px 10px ${theme.vars.palette[`${Object.keys(colors)[index + 1]}`]?.main}`,
                  }}
                />
              </Suspense>
            </ImageListItem>
          ))}
          {/* <ImageListItem sx={{ width: '20%' }}>
            <Image
              alt="Our office small"
              src={`${CONFIG.site.basePath}/assets/images/about/promo2.webp`}
              ratio="5/6"
              sx={{
                transform: 'rotate(8deg)',
                borderRadius: 1,
                objectFit: 'cover',
                boxShadow: `-10px 10px 10px ${theme.vars.palette.secondary.main}`,
              }}
            />
          </ImageListItem>
          <ImageListItem sx={{ width: '20%' }}>
            <Image
              alt="Our office small"
              src={`${CONFIG.site.basePath}/assets/images/about/promo3.jpg`}
              ratio="1/1"
              sx={{
                transform: 'rotate(-5deg)',
                borderRadius: 1,
                objectFit: 'cover',
                boxShadow: `-10px 10px 10px ${theme.vars.palette.info.main}`,
              }}
            />
          </ImageListItem>
          <ImageListItem sx={{ width: '20%' }}>
            <Image
              alt="Our office small"
              src={`${CONFIG.site.basePath}/assets/images/about/promo4.jpg`}
              ratio="3/4"
              sx={{
                transform: 'rotate(5deg)',
                borderRadius: 1,
                objectFit: 'cover',
                boxShadow: `-10px 10px 10px ${theme.vars.palette.warning.main}`,
              }}
            />
          </ImageListItem> */}
        </ImageList>
      </m.div>
    </Container>
  );
}

export default ImageDiv;

function SlidingElement({ direction = 'right', children }) {
  const elementRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.2 } // Adjust threshold as needed
    );
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isActive) return; // Don't animate if not visible

      const element = elementRef.current;
      const { scrollY } = window;
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Calculate slide progress (0 to 1) based on scroll position
      const progress = Math.min(
        1,
        Math.max(0, (scrollY - elementTop + windowHeight) / windowHeight)
      );

      // Apply the transform based on direction and progress
      const translateX = direction === 'right' ? (1 - progress) * 100 : progress * -100;
      element.style.transform = `translateX(${translateX}%)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, direction]);

  return (
    <div ref={elementRef} className={`slide-in ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
}
