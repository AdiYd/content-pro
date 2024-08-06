import React, { useState, useEffect } from 'react';

import { CarouselThumbsX } from './carousel-thumbs-x';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      const newImages = [];
      for (let i = 0; i < 10; i += 1) {
        const width = Math.floor(Math.random() * (500 - 150 + 1)) + 300;
        const height = Math.floor(Math.random() * (500 - 150 + 1)) + 300;
        newImages.push({
          //   src: `https://picsum.photos/${width}/${height}?random=${i}`,
          coverUrl: `https://picsum.photos/id/${Math.ceil(Math.random() * 120)}/1000/1000.webp`,
          id: i + 20,
          title: 'Just a title',
          width,
          height,
        });
      }
      setImages(newImages);
    };

    fetchImages();
  }, []);

  return <CarouselThumbsX data={images} />;
};

export default ImageGallery;
