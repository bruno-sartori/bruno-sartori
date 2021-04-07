import React from 'react';

declare interface IImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const Image = (props: IImage) => {
  const { src, width, height, alt } = props;

  return (
    <picture>
      <img src={src} width={width} height={height} alt={alt} />
    </picture>
  );
};

export default Image;
