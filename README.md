# PropertyAdvisor

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-green)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.3-blue)](https://www.prisma.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

> A fully functional real estate platform clone featuring property listings, advanced search, and user authentication. Browse 100+ properties across Singapore with secure authentication and favorites management.

[Live Demo](https://propertyadvisor-frontend.vercel.app/) | [Report Bug](https://github.com/alfredang/propertyadvisor/issues) | [API Docs](#-api-reference)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Features

### Frontend
- ✨ Modern, responsive UI built with **Next.js 14**
- 🔍 Advanced property search by location, price, and type
- 📸 Detailed property pages with image galleries
- ❤️ User favorites/watchlist management
- 📱 Mobile-first design for premium UX
- 🔐 Secure user authentication

### Backend
- 🚀 RESTful API with **Node.js & Express**
- 🔒 JWT-based secure authentication
- 💾 Type-safe ORM with **Prisma**
- 🗄️ PostgreSQL integration with **Neon**
- 👨‍💼 Role-based access control (Admin/User)
- 🌍 100+ sample properties pre-seeded

### SEO & Performance
- 📄 Server-side rendering (SSR)
- 📍 Sitemap and robots.txt
- ⚡ Image optimization
- 🎯 Meta tags for social sharing

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 14+ |
| **Frontend** | React | 19+ |
| **Frontend** | CSS | Vanilla (Styled JSX) |
| **Backend** | Node.js | 18+ |
| **Backend** | Express | 5.2 |
| **Backend** | Prisma ORM | 7.3 |
| **Database** | PostgreSQL | 15+ |
| **Database Host** | Neon | - |
| **Auth** | JWT | - |
| **Deployment** | Vercel | - |
| **Security** | bcryptjs | 3.0 |
| **CORS** | cors | 2.8 |

---

## 🏗️ Architecture

```mermaid
graph TB
    User["👤 User Browser"]
    Vercel["☁️ Vercel CDN"]
    NextApp["⚡ Next.js App"]
    Express["🚀 Express API"]
    Prisma["💾 Prisma ORM"]
    PostgreSQL["🗄️ PostgreSQL<br/>Neon"]
    
    User -->|HTTPS| Vercel
    Vercel -->|SSR/Static| NextApp
    NextApp -->|API Calls| Express
    Express -->|Query| Prisma
    Prisma -->|SQL| PostgreSQL
    PostgreSQL -->|Data| Prisma
```

**Data Flow:**
- User accesses frontend via Vercel CDN (optimized for Singapore)
- Next.js renders pages with SSR and static generation
- API calls to Express backend for dynamic data
- Prisma handles all database operations with PostgreSQL
- JWT tokens secure user sessions

---

## 📦 Project Structure

```
propertyadvisor/
├── frontend/                    # Next.js 14 Application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── layout.js       # Root layout
│   │   │   ├── page.js         # Home page
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── login/          # Auth pages
│   │   │   ├── favorites/      # Watchlist
│   │   │   ├── property/       # Property details
│   │   │   └── search/         # Search page
│   │   ├── components/         # React components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── PropertyCard.js
│   │   ├── config.js           # API config
│   │   └── globals.css         # Global styles
│   ├── public/                 # Static assets
│   ├── next.config.mjs
│   └── package.json
│
├── backend/                     # Express Server
│   ├── src/
│   │   ├── server.js           # Express entry point
│   │   ├── routes/             # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── property.routes.js
│   │   │   ├── favorite.routes.js
│   │   │   └── admin.routes.js
│   │   └── lib/
│   │       ├── prisma.js       # Prisma client
│   │       └── seed.js         # Database seeding (110+ properties)
│   ├── prisma/
│   │   ├── schema.prisma       # Data models
│   │   └── migrations/         # DB migrations
│   ├── vercel.json
│   └── package.json
│
├── docker-compose.yml          # Local PostgreSQL setup
├── package.json                # Monorepo configuration
└── README.md

```

---

## ✅ Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **PostgreSQL** locally OR **Neon** account (cloud database)
- **Git** for cloning the repository

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alfredang/propertyadvisor.git
cd propertyadvisor
```

### 2. Database Setup

#### Option A: Using Neon (Recommended - Cloud)
```bash
# Create a free Neon account at https://neon.tech
# Copy your DATABASE_URL from Neon dashboard
```

#### Option B: Using Local PostgreSQL with Docker
```bash
docker-compose up -d
# This starts PostgreSQL on localhost:5432
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Run database migrations
npx prisma migrate dev

# Seed 100+ sample properties
npm run prisma:seed

# Start development server (runs on http://localhost:5000)
npm run dev
```

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Start development server (runs on http://localhost:3000)
npm run dev
```

### 5. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@neon.tech/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-min-32-chars` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` / `production` |

### Frontend Environment Variables

Create `frontend/.env.local`:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🌐 API Reference

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Properties
```http
GET    /api/properties              # List all (with filters)
GET    /api/properties/:id          # Get property details
POST   /api/properties              # Create (Admin only)
PUT    /api/properties/:id          # Update (Admin only)
DELETE /api/properties/:id          # Delete (Admin only)
```

### Favorites
```http
GET    /api/favorites               # Get user's favorites
POST   /api/favorites               # Add to favorites
DELETE /api/favorites/:propertyId   # Remove from favorites
```

### Admin
```http
GET    /api/admin/properties        # List all properties
POST   /api/admin/properties        # Create property
PUT    /api/admin/properties/:id    # Update property
DELETE /api/admin/properties/:id    # Delete property
```

---

## 🚀 Deployment

### Deploy Backend to Vercel

1. Push code to GitHub
2. Create new project on [Vercel](https://vercel.com)
3. Set root directory to `backend/`
4. Add environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `JWT_SECRET`: Strong random secret
5. Deploy!

**Build Command:** `npx prisma generate`  
**Start Command:** `node src/server.js`

### Deploy Frontend to Vercel

1. Create new project on [Vercel](https://vercel.com)
2. Set root directory to `frontend/`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL
4. Deploy!

**Framework Preset:** Next.js  
**Default Build Settings:** Auto-detected

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

This is an educational project inspired by PropertyGuru Singapore.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Node.js web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Vercel](https://vercel.com/) - Deployment platform
- [PropertyGuru](https://www.propertyguru.com.sg/) - Design inspiration
