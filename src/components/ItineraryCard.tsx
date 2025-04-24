import React from "react";

interface ItineraryCardProps {
  day: string;
  weather: string;
  summary: string;
  activities: string[];
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  day,
  weather,
  summary,
  activities,
}) => {
  return (
    <div className="bg-[#E9E9E9] mt-2 px-4 py-3 rounded-lg flex gap-2 items-center">
      <p className=" text-[#717070] text-md m-0">
        <b className="font-[600]">{day}</b>
        <br /> <br />
        Weather: {weather}
        <br />
        Summary: {summary} <br /> <br />
        {activities.length > 0 && (
          <>
            Activities:
            <ul className="list-disc list-inside text-sm">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </>
        )}
      </p>
    </div>
  );
};

export default ItineraryCard;
