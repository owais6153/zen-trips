import Image from "next/image";
import React from "react";

interface StayCardProps {
  logoSrc: string;
  hotelName: string;
  price: string;
  dates: string;
  rating: string;
  ameneties: string[];
}

const StayCard: React.FC<StayCardProps> = ({
  logoSrc,
  hotelName,
  price,
  dates,
  rating,
  ameneties,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3 mb-3">
      <div className="flex-shrink-0">
        <Image
          src={logoSrc}
          alt={`${hotelName} Logo`}
          width={50}
          height={50}
          className="rounded-md"
        />
      </div>
      <div className="flex-grow">
        <p className="text-base font-medium text-[rgba(76,73,73,0.88)]">
          {hotelName}
        </p>
        <p className="text-sm text-[rgba(76,73,73,0.88)]">{price}</p>
        <p className="text-sm text-[rgba(76,73,73,0.88)]">{dates}</p>
        <p className="text-sm text-[rgba(76,73,73,0.88)]">Rating: {rating}</p>
        {ameneties.length > 0 && (
          <p className="text-sm text-[rgba(76,73,73,0.88)]">
            Amenitis:
            <ul className="list-disc list-inside ">
              {ameneties.map((amenity, index) => (
                <li key={index} className="">
                  {amenity}
                </li>
              ))}
            </ul>
          </p>
        )}
      </div>
    </div>
  );
};

export default StayCard;
