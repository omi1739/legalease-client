# LegalEase – Online Lawyer Hiring Platform

**LegalEase** is a modern, premium, and secure web application designed to connect vetted legal professionals with clients in need of legal representation or consultation. The platform provides a seamless experience for browsing lawyer profiles, filtering candidates based on multiple criteria, reading verified reviews, booking appointments, and making secure transactions.

---

## 🔗 Live Site
👉 **Live URL:** [https://legalease-client-omi1739.vercel.app](https://legalease-client-platform.vercel.app) *(or your deployed production domain)*

---

##  Purpose
The main purpose of **LegalEase** is to digitize and simplify the traditional, complex process of finding and hiring a lawyer. It serves as a secure bridge between legal experts and clients, ensuring transparency, review accountability, and effortless payment processing.

---

## ✨ Key Features
- **Modern Nordic Theme with Dark Mode**: A custom *Nordic Spruce & Frost* color palette designed for high professional contrast, featuring a fully functional project-wide Light and Dark mode toggle.
- **Search & Advanced Filtering**: Browse and filter lawyers dynamically by category/specialty, years of experience, hourly rate, and rating.
- **Proxy Route Protection**: Secured lawyer details routes (`/browse/*`) using an advanced proxy handler that redirects unauthenticated guests to the login page while preserving their original destination in a `callbackURL`.
- **Dynamic Review & Comment System**: Only clients who have actually hired/booked a lawyer can post reviews or comments on that lawyer's profile page.
- **Role-Based User Dashboards**: Personalized control panels for Admins, Lawyers, and Clients to manage profiles, case requests, bookings, and platform metrics.
- **Secure Payments with Stripe**: Integrated Stripe elements checkout flow to securely pay lawyer hire fees and view transactions.
- **Robust Authentication**: Powered by `better-auth` using MongoDB as the backing store for credentials, Google OAuth, and session tokens.

---

##  Tech Stack & NPM Packages Used

### Core Frameworks & Libraries:
- **Next.js 16** – React production framework (App Router)
- **React 19 & React DOM 19** – UI library
- **MongoDB** – Database driver for storage and auth tracking

### Authentication:
- **better-auth** – Secure session and user management
- **@better-auth/mongo-adapter** – Adapter for MongoDB schema mapping

### Styling & Animation:
- **Tailwind CSS v4** – Utility-first CSS framework
- **@tailwindcss/postcss** – PostCSS processing support
- **Framer Motion** – Fluid and premium animations for cards, modals, and page transitions

### Payments:
- **@stripe/stripe-js** – Stripe client-side SDK wrapper
- **@stripe/react-stripe-js** – React elements for secure card checkout fields

### Utilities & Icons:
- **lucide-react** – Modern, minimal stroke vector icons

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/omi1739/legalease-client.git
cd legalease-client
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application locally.

### 5. Build for Production
```bash
npm run build
npm run start
```
