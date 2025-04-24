import Image from "next/image";
import React from "react";

interface ChatMesasgeCardProps {
  type: "me" | "bot";
  message: string;
}

const ChatMesasgeCard: React.FC<ChatMesasgeCardProps> = ({ type, message }) => {
  return (
    <div className="bg-[#E9E9E9] mt-2 px-4 py-3 rounded-lg flex gap-2 items-center">
      {type === "bot" && (
        <Image src={"/bot.png"} height={40} width={40} alt="Bot" />
      )}
      {type === "me" && (
        <Image src={"/me.png"} height={40} width={40} alt="User" />
      )}

      <p className=" text-[#717070] text-sm m-0">{message}</p>
    </div>
  );
};

export default ChatMesasgeCard;
