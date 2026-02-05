# PropertyAdvisor - PropertyGuru Clone

A fully functional clone of the PropertyGuru Singapore website, featuring property listings, advanced search filters, and user interactions.

## 🚀 Features

- **Frontend**: 
  - Modern, responsive UI built with **Next.js 14+**.
  - Property search by location, price, and type.
  - Detailed property pages with image galleries.
  - User favorites/watchlist management.
  - Mobile-first design for a premium UX.
- **Backend**:
  - RESTful API built with **Node.js & Express**.
  - Secure authentication using **JWT**.
  - Database management with **Prisma ORM**.
  - **Neon (PostgreSQL)** integration for cloud database hosting.
- **Admin**:
  - Simplified admin panel to manage property listings.
- **SEO**:
  - Server-side rendering (SSR), `robots.txt`, and `sitemap.xml` for search engine optimization.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Vanilla CSS (Styled JSX)
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel

## 📦 Project Structure

```text
propertyadvisor/
├── frontend/           # Next.js application
├── backend/            # Express server & Prisma schema
├── docker-compose.yml  # Local database setup
└── package.json        # Monorepo configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Neon)

### 1. Clone the repository
```bash
git clone https://github.com/alfredang/propertyadvisor.git
cd propertyadvisor
```

### 2. Database Setup
Ensure you have a PostgreSQL database ready. Update the `DATABASE_URL` in `backend/.env`.

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev  # Run migrations
npm run prisma:seed      # Seed 100+ sample listings
npm run dev             # Start dev server (Port 5000)
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev             # Start dev server (Port 3000)
```

## 🌐 API Endpoints

- `GET /api/properties`: Search/filter properties.
- `GET /api/properties/:id`: Get property details.
- `POST /api/auth/register`: Register new user.
- `POST /api/auth/login`: Login user.
- `GET /api/favorites`: Get user watchlist.
- `api/admin/properties`: Admin CRUD operations.

## 🚀 Deployment

### Backend (on Vercel)
- Set root directory to `backend/`.
- Environment Variables: `DATABASE_URL`, `JWT_SECRET`.
- Build Command: `npx prisma generate`.

### Frontend (on Vercel)
- Set root directory to `frontend/`.
- Environment Variable: `NEXT_PUBLIC_API_URL`.

## 📜 License
This project is for educational purposes.
