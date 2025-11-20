# Auction Frontend

This is the frontend application for the Auction platform, built with Next.js.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Authentication & Chat
- **Axios** - API requests

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

## Deployment

This project is configured for automatic deployment on:
- **Vercel** (recommended) - Configured via `vercel.json`
- **Netlify** - Configured via `netlify.toml`

Simply connect your GitHub repository to either platform for automatic deployments.

## Project Structure

```
front/
├── app/              # Next.js app directory (pages, layouts, components)
├── public/           # Static assets
├── utils/            # Utility functions
├── next.config.js    # Next.js configuration
└── package.json      # Dependencies
```

## License

Private project
