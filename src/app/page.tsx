"use client";

import Image from "next/image";
import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import MicrophoneButton from "@/components/MicrophoneButton";
import TravelCard from "@/components/TravelCard";
import StayCard from "@/components/StayCard";

// Sample data based on the image - removed isSelected
const travelOptions = [
  {
    logoSrc: "/emirates.png",
    airlineName: "Emirates",
    route: "Isb - Dxb",
    price: "AED 1200",
    dates: "20 April - 25 April",
  },
  {
    logoSrc: "/eithad.png",
    airlineName: "Etihad",
    route: "Isb - Dxb",
    price: "AED 1250",
    dates: "22 April - 27 April",
  },
];

const stayOptions = [
  {
    logoSrc: "/marriot.png",
    hotelName: "Marriott Marquis",
    price: "AED 400/Night",
    dates: "20 April - 25 April",
  },
];

function playBase64Audio(base64String: string) {
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.autoplay = true;
  audio.src = `data:audio/mp3;base64,${base64String}`;
  const audioContainer = document.getElementById("audio-container");
  if (audioContainer) {
    audioContainer.innerHTML = ""; // Clear previous audio elements

    audioContainer.appendChild(audio);
  }
  // Optional: wait for audio to be ready before playing
  audio.oncanplaythrough = () => audio.play();
}

type ChatMessages = Array<{ me: string; zenTrip: string; stage: string }>;

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [chat, setChat] = useState<ChatMessages>([]);
  const [conversationState, setConversationState] = useState<{ stage: string }>(
    {
      stage: "initial",
    }
  );

  const staticPrompts = {
    initial: "I want to visit Dubai",
    dates_and_departure:
      "my budget is 8000 AED and i am travelling from lahore on May 20 to May 24",
    thank_you: "Thank you, book the emirates flight and marriot downtown hotel",
    thank_you: "Great, thank you!",
  };

  const fetchRecordings = async function (lasttranscript: string) {
    setIsLoadingResponse(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      message: staticPrompts?.[conversationState.stage],
      conversation_state: conversationState,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    await fetch("https://hack-dubai.onrender.com/api/chat", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChat((prevChat: ChatMessages) => [
          ...prevChat,
          {
            me: lasttranscript,
            zenTrip: result.text_response,
            stage: conversationState.stage,
          },
        ]);

        setConversationState(result.updated_conversation_state);
        playBase64Audio(result.audio_response);
      })
      .catch((error) => console.error(error));

    setIsLoadingResponse(false);
  };

  // Use useCallback to prevent unnecessary re-renders
  const handleTranscriptChange = (newTranscript: string) => {
    if (newTranscript && newTranscript !== "" && newTranscript !== transcript) {
      console.log("Transcript changed:", newTranscript);
      setTranscript(newTranscript);
    }
  };

  useEffect(() => {
    if (recordingCompleted && transcript !== "") {
      (async () => {
        await fetchRecordings(transcript);
        if (!isListening) {
          setDotCount(0); // Reset dot count when not listening
        }
      })();
    }
  }, [recordingCompleted, transcript]);

  // Handle listening state changes
  const handleListeningChange = useCallback(
    (listening: boolean) => {
      // If we were listening and now we're not, recording was just completed
      if (isListening && !listening) {
        setRecordingCompleted(true);
      } else if (listening) {
        // If we start listening again, reset recordingCompleted
        setRecordingCompleted(false);
      }

      setIsListening(listening);
    },
    [isListening]
  );

  // Animation for the dots
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isListening) {
      interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount + 1) % 4);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  // Generate the dots for the listening indicator
  const getDots = () => {
    return ".".repeat(dotCount);
  };

  // Determine sheet height based on state
  const getSheetHeight = () => {
    if (isListening) return "h-1/2"; // Active recording
    if (recordingCompleted) return "h-2/3"; // Recording completed
    return "h-1/3"; // Default state
  };

  // Determine logo position based on state
  const getLogoPosition = () => {
    if (isListening) return "transform -translate-y-3/4";
    if (recordingCompleted) return "transform -translate-y-[160%]";
    return "transform -translate-y-[10%]";
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Darkening Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Dubai skyline with Burj Khalifa"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        {/* Logo - will move up when bottom sheet expands */}
        <div
          className={`transition-all duration-300 ease-in-out ${getLogoPosition()}`}
        >
          <Image
            src="/logo.png"
            alt="Zen Trips Logo"
            width={100}
            height={100}
            className="relative z-10"
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet - only visible on mobile */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-30 shadow-lg md:hidden 
                    transition-all duration-300 ease-in-out flex flex-col
                    ${getSheetHeight()}`}
      >
        {/* Top text */}
        <div className="text-center pt-6 text-lg font-medium">
          <p className="text-[#717070]">
            {isListening || isLoadingResponse ? (
              <span className="text-[#717070]">
                {isLoadingResponse ? "Loading" : "Listening"}
                {getDots()}
              </span>
            ) : recordingCompleted ? (
              <>
                <span className="text-[#717070]">Your</span>{" "}
                <span className="text-blue-600 font-bold">Trip</span>
              </>
            ) : (
              <>
                Where can I take{" "}
                <span className="text-blue-600 font-bold">You</span>?
              </>
            )}
          </p>
        </div>

        {/* Content Area: Transcript or Trip List */}
        <div
          className="relative flex-grow px-6 pt-4 overflow-y-auto flex flex-col 
                       after:content-[''] after:absolute after:bottom-[-30%] after:left-0 after:right-0 after:h-10 after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none"
        >
          {/* Show transcript only when listening */}

          {isListening && transcript && (
            <div className="flex-grow my-6">
              <p className="text-[#717070] text-center">{transcript}</p>
            </div>
          )}

          {chat.length > 0 && (
            <div className="s">
              {chat.map((message, index) => {
                return (
                  <div key={index} className="">
                    <div className="bg-[#E9E9E9] mt-2 px-4 py-3 rounded-lg flex gap-2 items-center">
                      <Image
                        src={"/me.png"}
                        height={40}
                        width={40}
                        alt="User"
                      />
                      <p className=" text-[#717070] text-sm m-0">
                        {message.me}
                      </p>
                    </div>
                    <div className="bg-[#E9E9E9] mt-2 px-4 py-3 rounded-lg flex gap-2 items-center">
                      <Image
                        src={"/zenTrip.png"}
                        height={40}
                        width={40}
                        alt="User"
                      />
                      <p className=" text-[#717070] text-sm m-0">
                        {message.zenTrip}
                      </p>
                    </div>

                    {/* Show TRIP LIST when recording is done */}
                    {recordingCompleted &&
                      message.stage === "dates_and_departure" && (
                        <div className="flex-grow pb-10 mt-4">
                          <h3 className="text-base font-medium text-gray-600 mb-2">
                            Travel:
                          </h3>
                          {travelOptions.map((option, index) => (
                            <TravelCard key={index} {...option} />
                          ))}
                          <h3 className="text-base font-medium text-gray-600 mt-4 mb-2">
                            Stay:
                          </h3>
                          {stayOptions.map((option, index) => (
                            <StayCard key={index} {...option} />
                          ))}
                        </div>
                      )}

                    {recordingCompleted && message.stage === "thank_you" && (
                      <>
                        <div className="bg-[#E9E9E9] mt-4 px-4 py-3 rounded-lg flex gap-2 items-center">
                          <p className=" text-[#717070] text-md m-0">
                            <b className="font-[600]">
                              🗓 Day 1: May 20, 2025 - Downtown Dubai Highlights
                            </b>
                            <br /> <br />
                            Weather: ☀️ Sunny, 32°C
                            <br />
                            Summary: Luxury hotel check-in, sky-high lunch at
                            Atmosphere, Burj Khalifa views, Dubai Mall
                            exploration, and the famous Dubai Fountain Show.{" "}
                            <br /> <br /> Activities:
                            <ul className="list-disc list-inside ">
                              <li>
                                ✅ 10:00 – Check-in at Marriott Downtown (1h){" "}
                              </li>
                              <li>
                                ✅ 12:00 – Lunch at Atmosphere (2h, AED 450){" "}
                              </li>
                              <li>
                                ✅ 14:00 – Visit Burj Khalifa (2h, AED 300){" "}
                              </li>
                              <li>📍 16:00 – Dubai Mall visit (3h)</li>
                              <li>📍 19:00 – Dubai Fountain Show (30m)</li>
                            </ul>
                          </p>
                        </div>
                        <div className="bg-[#E9E9E9] mt-4 px-4 py-3 rounded-lg flex gap-2 items-center">
                          <p className=" text-[#717070] text-md m-0">
                            <b className="font-[600]">
                              🎈Day 2: May 21, 2025 - Desert Adventures &
                              Romantic Dining
                            </b>
                            <br /> <br />
                            Weather: ⛅ Partly Cloudy, 31°C
                            <br />
                            Summary: A thrilling desert day from a hot air
                            balloon sunrise to dune bashing, ending with dinner
                            over the sea.
                            <br /> <br /> Activities:
                            <ul className="list-disc list-inside ">
                              <li>
                                ✅ 06:00 – Hot Air Balloon Ride (4h, AED 1200)
                              </li>
                              <li>✅ 09:00 – Desert Safari (6h, AED 800)</li>
                              <li>📍 15:00 – Relax at hotel (3h) </li>
                              <li>
                                ✅ 19:00 – Dinner at Pierchic (2h, AED 600)
                              </li>
                            </ul>
                          </p>
                        </div>
                        <div className="bg-[#E9E9E9] mt-4 px-4 py-3 rounded-lg flex gap-2 items-center">
                          <p className=" text-[#717070] text-md m-0">
                            <b className="font-[600]">
                              🏓 Day 3: May 22, 2025 - Padel Tennis Experience
                            </b>
                            <br /> <br />
                            Weather: ⛅ Partly Cloudy, 31°C
                            <br />
                            Summary: A full day of padel fun — from private
                            coaching to VIP match viewing and even dinner with
                            pro players.
                            <br /> <br /> Activities:
                            <ul className="list-disc list-inside ">
                              <li>
                                ✅ 09:00 – Padel Session @ Dubai Padel Club (2h,
                                AED 350)
                              </li>
                              <li>
                                ✅ 11:00 – Watch Padel Tournament (3h, AED 500)
                              </li>
                              <li>
                                ✅ 14:00 – Lunch at Padel Club (1h, AED 200)
                              </li>
                              <li>📍 15:00 – Padel Gear Shopping (1h)</li>
                              <li>
                                ✅ 19:00 – Dinner with Players (3h, AED 800)
                              </li>
                            </ul>
                          </p>
                        </div>
                        <div className="bg-[#E9E9E9] mt-4 px-4 py-3 rounded-lg flex gap-2 items-center">
                          <p className=" text-[#717070] text-md m-0">
                            <b className="font-[600]">
                              🏖 Day 4: May 23, 2025 - Atlantis Indulgence Day
                            </b>
                            <br /> <br />
                            Weather: ☀️ Sunny, 33°C
                            <br />
                            Summary: A luxury beach day with private cabana,
                            fine dining, and fun at the world’s largest
                            waterpark.
                            <br /> <br /> Activities:
                            <ul className="list-disc list-inside ">
                              <li>
                                ✅ 09:00 – Beach Cabana @ Atlantis (4h, AED
                                1000)
                              </li>
                              <li>✅ 13:00 – Lunch at Nobu (2h, AED 600)</li>
                              <li>
                                ✅ 15:00 – Aquaventure Waterpark (3h, AED 400)
                              </li>
                              <li>📍 15:00 – Padel Gear Shopping (1h)</li>
                              <li>
                                {" "}
                                ✅ 19:00 – Dinner at Ossiano (2h, AED 1200)
                              </li>
                            </ul>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Show previous transcripts when not listening and not completed */}
          {!isListening && !recordingCompleted && transcript && (
            <div className="flex-grow my-6 px-4 py-2 border border-gray-200 rounded-lg">
              <p className="text-[#717070]">{transcript}</p>
            </div>
          )}
        </div>

        {/* Preferences Text - Only shown when recording is completed */}
        {/* {recordingCompleted && (
          <div className="text-center py-4">
            <p className="text-base text-[#717070]">
              Tell me Your preferences.
            </p>
          </div>
        )} */}

        {/* Microphone button - fixed at bottom */}
        <div className="px-6 pt-2 pb-8 flex justify-center">
          <MicrophoneButton
            onTranscriptChange={handleTranscriptChange}
            onListeningChange={handleListeningChange}
          />
        </div>
      </div>
      <div className="hidden-audio" id="audio-container"></div>
    </main>
  );
}
