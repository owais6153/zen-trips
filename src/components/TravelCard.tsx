import Image from "next/image";
import React from "react";

interface TravelCardProps {
  logoSrc: string;
  airlineName: string; // For alt text
  route: string;
  price: string;
  dates: string;
}

const TravelCard: React.FC<TravelCardProps> = ({
  logoSrc,
  airlineName,
  route,
  price,
  dates,
}) => {
  return (
    <div
      className={`bg-gray-100 p-4 rounded-lg flex items-center space-x-3 mb-3`}
    >
      <div className="flex-shrink-0">
        <Image
          src={logoSrc}
          alt={`${airlineName} Logo`}
          width={50}
          height={50}
          className="rounded-md"
        />
      </div>
      <div className="flex-grow">
        <p className="text-base font-medium text-[rgba(76,73,73,0.88)]">
          {route}
        </p>
        <p className="text-sm text-[rgba(76,73,73,0.88)]">{price}</p>
        <p className="text-sm text-[rgba(76,73,73,0.88)]">{dates}</p>
      </div>
    </div>
  );
};

export default TravelCard;
