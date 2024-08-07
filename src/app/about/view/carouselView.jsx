import { CONFIG } from 'src/config-global';

import { CarouselThumbsX } from 'src/components/new/carousel-thumbs-x';

const data = [
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av1.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av2.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av3.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av4.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av5.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av6.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av7.webp`,
  },
  {
    title: 'Image title',
    coverUrl: `${CONFIG.site.basePath}/assets/images/avatars/av8.webp`,
  },
];

function CarouselView({ ...props }) {
  return <CarouselThumbsX data={data} />;
}

export default CarouselView;
