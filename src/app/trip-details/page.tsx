import Image from "next/image"
import { Mic } from "lucide-react"

export default function TripDetailsPage() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      {/* Header with background image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src="/images/dubai-background.jpg" alt="Dubai skyline" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/images/zen-trips-logo.svg" alt="Zen Trips Logo" width={60} height={60} />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-medium text-center mb-10">
          <span className="text-blue-500">Your</span> Trip
        </h1>

        {/* Travel Section */}
        <div className="mb-8">
          <h2 className="text-3xl text-gray-600 mb-4">Travel:</h2>

          {/* Emirates Flight Option */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center">
            <div className="bg-red-600 rounded-lg p-2 mr-4">
              <Image src="/images/emirates-logo.png" alt="Emirates Logo" width={60} height={60} />
            </div>
            <div>
              <h3 className="text-xl font-medium">Isb - Dxb</h3>
              <p className="text-xl text-gray-600">AED 1200</p>
              <p className="text-gray-600">20 April - 25 April</p>
            </div>
          </div>

          {/* Etihad Flight Option */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center">
            <div className="bg-black rounded-lg p-2 mr-4">
              <Image src="/images/etihad-logo.png" alt="Etihad Logo" width={60} height={60} />
            </div>
            <div>
              <h3 className="text-xl font-medium">Isb - Dxb</h3>
              <p className="text-xl text-gray-600">AED 1250</p>
              <p className="text-gray-600">22 April - 27 April</p>
            </div>
          </div>
        </div>

        {/* Stay Section */}
        <div className="mb-8">
          <h2 className="text-3xl text-gray-600 mb-4">Stay:</h2>

          {/* Marriott Hotel Option */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center">
            <div className="bg-black rounded-lg p-2 mr-4">
              <Image src="/images/marriott-logo.png" alt="Marriott Logo" width={60} height={60} />
            </div>
            <div>
              <h3 className="text-xl font-medium">Marriott Marquis</h3>
              <p className="text-xl text-gray-600">AED 400/Night</p>
              <p className="text-gray-600">20 April - 25 April</p>
            </div>
          </div>

          {/* Additional Option */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center">
            <div className="bg-gray-300 rounded-lg p-2 mr-4">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <span className="text-gray-500 text-2xl">?</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium">Isb - Dxb</h3>
            </div>
          </div>
        </div>

        {/* Preferences Prompt */}
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-600">Tell me Your preferences.</h2>
        </div>

        {/* Mic Button */}
        <div className="flex justify-center mb-10">
          <button className="bg-blue-500 rounded-full p-6 shadow-lg">
            <Mic className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </main>
  )
}
