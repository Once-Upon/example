"use client";
import { useState } from "react";

const NFTImage = ({ img }: { img: string }) => {
  const size = 75;

  const imgStyles = {
    minWidth: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
    borderRadius: size / 11,
  };

  const [imgError, setImgError] = useState(false);

  const Img = ({
    src,
    onError,
    ...props
  }: {
    src: string;
    onError: () => void;
    [key: string]: any;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} onError={onError} {...props} alt="" />
  );

  return (
    <div className="w-12 h-12" style={imgStyles}>
      <Img
        className="object-cover w-10 h-10"
        style={imgStyles}
        alt=""
        src={imgError ? "/fallback_gradient.webp" : img}
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export default NFTImage;
