🚀 Project Overview

A production-ready E-Commerce ecosystem built with modern technologies, covering mobile, admin, and backend with secure authentication, real payments, background jobs, and scalable architecture.

🌟 Key Features
📱 Mobile Application (React Native + Expo)

Fully functional E-Commerce mobile app

Secure login with Clerk Authentication (Google & Apple)

Cart, Wishlist, Checkout & Order lifecycle

Stripe-powered payments

Address management system

Smooth product browsing with image sliders

Optimized data fetching using TanStack Query

🧑‍💼 Admin Dashboard

Complete Admin Panel for business operations

Manage products, orders & customers

Live sales & performance analytics

Product CRUD with image uploads & pricing controls

Order tracking & management

Customer insights & management pages

Admin-only protected routes

⚙️ Backend System (Node.js + Express)

RESTful API with role-based authentication

Clerk-powered auth & authorization

Secure admin-only endpoints

Stripe payment intent handling

Background jobs using Inngest

Centralized error tracking with Sentry

Cloudinary integration for image storage

Scalable & production-ready architecture

🧠 Developer Experience

End-to-end Git & GitHub workflow

Feature branches, commits, PRs & reviews

Automated PR analysis with CodeRabbit

Focus on security, performance & code quality

Clean .env configuration per service

🧪 Environment Configuration
🟦 Backend (/backend)
NODE_ENV=development
PORT=3000

DB_URL=<YOUR_DB_URL>

CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

INNGEST_SIGNING_KEY=<YOUR_INNGEST_SIGNING_KEY>

CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>

ADMIN_EMAIL=<YOUR_ADMIN_EMAIL>
CLIENT_URL=http://localhost:5173

STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>

🟩 Admin Dashboard (/admin)
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
VITE_API_URL=http://localhost:3000/api
VITE_SENTRY_DSN=<YOUR_SENTRY_DSN>

🟧 Mobile App (/mobile)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>

SENTRY_AUTH_TOKEN=<YOUR_SENTRY_DSN>

▶️ Run the Project Locally
🔧 Start Backend
cd backend
npm install
npm run dev

🔧 Start Admin Dashboard
cd admin
npm install
npm run dev

🔧 Start Mobile App
cd mobile
npm install
npx expo start


📱 Scan the QR code using Expo Go or Dev Client to launch the app on your device.