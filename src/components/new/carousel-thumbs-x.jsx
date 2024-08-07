import Box from '@mui/material/Box';

import { Image } from 'src/components/image';
import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowFloatButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

export function CarouselThumbsX({ data }) {
  const carousel = useCarousel({
    thumbs: {
      slidesToShow: 'auto',
    },
  });

  return (
    <div>
      <Box sx={{ mb: 2.5, mx: 'auto', position: 'relative', width: { md: '50%', xs: '100%' } }}>
        <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              {/* <IndexLabel index={index + 1} /> */}
              <Image
                // visibleByDefault
                alt={item.title}
                src={item.coverUrl}
                ratio={{ xs: '4/3', sm: '16/10' }}
              />
            </Box>
          ))}
        </Carousel>

        {/* <CarouselArrowNumberButtons
          {...carousel.arrows}
          options={carousel.options}
          totalSlides={carousel.dots.dotCount}
          selectedIndex={carousel.dots.selectedIndex + 1}
          sx={{ right: 16, bottom: 16, position: 'absolute' }}
        /> */}
      </Box>
      <CarouselArrowFloatButtons
        onClickPrev={carousel.arrows.onClickNext}
        onClickNext={carousel.arrows.onClickPrev}
        slotProps={{ prevBtn: { sx: { left: 0 } }, nextBtn: { sx: { right: -0 } } }}
      />

      <CarouselThumbs
        ref={carousel.thumbs.thumbsRef}
        options={carousel.options?.thumbs}
        sx={{
          width: {
            xs: 1,
            sm: 360,
            md: 'max-content',
          },
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        {data.map((item, index) => (
          <CarouselThumb
            key={index}
            index={index}
            src={item.coverUrl}
            selected={index === carousel.thumbs.selectedIndex}
            onClick={() => carousel.thumbs.onClickThumb(index)}
            sx={{
              width: { xs: 48, sm: 64 },
              height: { xs: 48, sm: 64 },
            }}
          />
        ))}
      </CarouselThumbs>
    </div>
  );
}
