src/
│
├── assets/                # Static files (images, icons, fonts, videos)
│   └── logo.png
│
├── components/            # Reusable UI components
│   ├── ui/                # Low-level reusable UI (Button, Input, Modal, etc.)
│   ├── charts/            # Chart components (ProfitChart, WinRateChart, etc.)
│   └── navigation/        # NavBar, Sidebar, Footer
│
├── features/              # Feature-based structure (good for scaling)
│   ├── trades/            # Everything related to trades
│   │   ├── components/    # Feature-specific components
│   │   ├── hooks/         # Custom hooks for trades
│   │   └── utils/         # Helper functions
│   └── auth/              # Authentication (Login, Signup, Profile)
│
├── hooks/                 # Global custom hooks (useFetch, useAuth, etc.)
│
├── layouts/               # Layouts (MainLayout, DashboardLayout, AuthLayout)
│
├── pages/                 # Route pages
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Trades.jsx
│   ├── Analytics.jsx
│   └── Settings.jsx
│
├── store/                 # (Optional) Redux store or Context
│   └── store.js
│
├── utils/                 # General utility functions (formatDate, calcPips)
│
├── App.jsx                 # Main app component
├── main.jsx                # ReactDOM entry point
├── index.css               # Global styles + Tailwind imports
└── tailwind.config.js

______________________________________________________________________________________________________________________________________
project-root/
│
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── store/            # Redux or Context (if needed)
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/                  # Laravel (API backend)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # Controllers handle requests
│   │   │   └── Middleware/
│   │   ├── Models/           # Eloquent models (Trade, User, etc.)
│   │   └── Services/         # (Optional) business logic
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/       # Database migrations
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php           # API routes (for React frontend)
│   ├── tests/                # PHPUnit tests
│   └── composer.json
│
└── README.md
______________________________________________________________________________________________________________________________________
1- pop that show you your last trades 
2- trade in (1,5,10,15,30) min and 1,2,3,4 H and 1 D and 1 W 
3- every challenge with his journal
4-