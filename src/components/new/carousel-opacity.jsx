import Box from '@mui/material/Box';

import { customShadows } from 'src/theme/core';

import { Image } from '../image';
import { IndexLabel } from './elements';
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from '../carousel';

// ----------------------------------------------------------------------

export function CarouselOpacity({ data }) {
  const carousel = useCarousel({
    loop: true,
    slidesToShow: '50%',
    slideSpacing: '10px',
  });

  return (
    <>
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id || index}
            index={index}
            item={item}
            selected={carousel.dots.selectedIndex === index}
          />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>
    </>
  );
}

function CarouselItem({ item, index, selected }) {
  return (
    <Box
      sx={{
        opacity: 0.24,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: customShadows().z12,
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.complex,
          }),
        ...(selected && { opacity: 1 }),
      }}
    >
      <IndexLabel index={index + 1} />
      <Image
        visibleByDefault
        alt={item.title}
        src={item.coverUrl}
        ratio={{ xs: '4/3', sm: '16/10' }}
      />
    </Box>
  );
}
