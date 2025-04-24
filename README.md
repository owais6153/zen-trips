# Zen Trips

A modern voice-activated travel planning application that helps users find flights and accommodations through a simple, intuitive interface.

![Zen Trips Logo](/public/logo.png)

## Live Demo

Visit the live application: [Zen Trips on Vercel](https://zen-trips-icci42v1r-shrekpepsis-projects.vercel.app)

## Features

- **Voice Recognition**: Speak your travel plans and watch as the application processes your request
- **Real-time Transcription**: See your speech converted to text as you speak
- **Travel Recommendations**: Get flight and accommodation options based on your spoken requests
- **Beautiful UI**: Enjoy a clean, modern interface with smooth animations and transitions
- **Mobile-First Design**: Optimized for mobile devices with an intuitive bottom sheet interface

## Technologies Used

- **Next.js 15**: React framework for building the application
- **React 19**: For building the user interface
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: For styling
- **React Speech Recognition**: For voice input processing
- **Vercel**: For deployment and hosting

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zen-trips.git
cd zen-trips
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Allow microphone access when prompted
2. Tap the microphone button and speak your travel plans
   - Example: "I want to travel from Dubai to Istanbul next month"
3. Review the travel and accommodation options presented
4. Refine your search by speaking additional preferences

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Fork this repository
2. Import to Vercel: https://vercel.com/import
3. Configure as needed
4. Deploy!

## Project Structure

```
zen-trips/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router files
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript type definitions
├── .next/             # Next.js build output
├── next.config.js     # Next.js configuration
└── vercel.json        # Vercel configuration
```

## Browser Compatibility

The voice recognition features work best in:
- Chrome (desktop and mobile)
- Edge
- Safari (iOS 14.5+)
- Firefox (with flag enabled)

## License

MIT License

## Acknowledgements

- Background image: Dubai skyline with Burj Khalifa
- Icons provided by [Lucide React](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
