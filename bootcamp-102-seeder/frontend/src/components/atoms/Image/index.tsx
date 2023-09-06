import React from "react";

interface ImageProps {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

const Image = (props: ImageProps) => {
  return (
    <img
      src={props.src}
      height={props.height}
      width={props.width}
      alt={props.alt}
    />
  );
};

export default Image;
