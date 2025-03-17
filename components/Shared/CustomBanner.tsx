import Image from "next/image";
import { ReactNode } from "react";
import svgImg from "../../public/Photon@1x-10.0s-1920px-911px.svg";

interface BannerProps {
  heading: string;
  description: string | ReactNode;
}

const Banner = ({ heading, description }: BannerProps) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
      <div className="mt-6 flex justify-center">
        <Image alt="svg" height={50} width={100} src={svgImg} />
      </div>
    </div>
  );
};

export default Banner;
