import Image from "next/image"
import Link from "next/link"

export default function ListeningPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dubai-background.jpg"
          alt="Dubai skyline with Burj Khalifa"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center h-full">
        {/* Logo */}
        <div className="mt-20">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-white rounded-full opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/zen-trips-logo.svg"
                alt="Zen Trips Logo"
                width={80}
                height={80}
                className="relative z-10"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center mt-4">ZenTrips</h1>
        </div>

        {/* Listening Status */}
        <div className="mt-32 mb-8 text-center">
          <h2 className="text-4xl font-medium text-gray-200">Listening...</h2>
        </div>

        {/* User Query */}
        <div className="max-w-md mx-auto px-8 mb-auto">
          <p className="text-2xl text-center text-white leading-relaxed">
            I want to visit Dubai for 5 days, get me flights at the lowest price and plan some activities.
          </p>
        </div>

        {/* Audio Waveform Button */}
        <Link href="/trip-details" className="mb-20 bg-blue-500 rounded-full p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-1 h-6 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-10 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="w-1 h-8 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="w-1 h-5 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
        </Link>
      </div>
    </main>
  )
}
