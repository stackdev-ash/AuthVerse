# 🔐 AuthVerse

### A simple authentication project built to learn **Google OAuth & Auth.js**

<p align="center">

<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Auth.js-Authentication-purple?style=for-the-badge" />
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql&logoColor=white" />

<br/>

<img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Google-OAuth-red?style=for-the-badge&logo=google" />
<img src="https://img.shields.io/badge/GitHub-OAuth-black?style=for-the-badge&logo=github" />
<img src="https://img.shields.io/badge/Cloudinary-Images-orange?style=for-the-badge&logo=cloudinary" />

</p>

---

## 🚀 About

**AuthVerse** is a small full-stack project created to understand how modern authentication works in **Next.js**.

The main focus was implementing **Google OAuth with Auth.js**, while also exploring credentials authentication, sessions, protected routes, email verification, and authorization.

It also includes a simple **blog system** to demonstrate authentication in a real application.

---

## ✨ Features

* 🔵 Google OAuth
* 🐙 GitHub OAuth
* 🔑 Email & password authentication
* 📧 Email verification
* 🔄 Password reset
* 🛡️ Protected routes & API endpoints
* 📝 Create, edit & delete blogs
* 🔐 User-based authorization
* ☁️ Cloudinary image uploads
* 🌙 Dark / Light mode
* 📱 Responsive UI

---

## 🔄 Authentication Flow

```text
User
 │
 ├── Google ──────► Google OAuth
 │
 ├── GitHub ──────► GitHub OAuth
 │
 └── Credentials ─► Email + Password
                         │
                         ▼
                    Auth.js
                         │
                         ▼
                    JWT Session
                         │
                         ▼
                   Authenticated User
```

---

## 🧩 Tech Stack

```text
Frontend       → Next.js + React + TypeScript
Authentication → Auth.js + Google OAuth + GitHub OAuth
Database       → PostgreSQL + Prisma
Validation     → Zod
Email          → Nodemailer
Images         → Cloudinary
Styling        → Tailwind CSS + shadcn/ui
```

---

## ⚙️ Getting Started

### 1. Clone

```bash
git clone https://github.com/stackdev-ash/authverse.git
cd authverse
```

### 2. Install

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_url"

AUTH_SECRET="your_auth_secret"

AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"

EMAIL_USER="your_email"
EMAIL_PASS="your_app_password"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 4. Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run

```bash
npm run dev
```

Open **http://localhost:3000**

---

## 📁 Main Structure

```text
app/
├── (auth)/          # Login, signup, verification
├── api/             # Authentication & blog APIs
├── blog/            # Blog pages
└── profile/         # User profile

components/          # UI components
lib/
├── auth.ts          # Auth.js configuration
├── prisma.ts        # Prisma client
├── mail.ts          # Email service
└── cloudinary.ts    # Cloudinary setup

prisma/
└── schema.prisma    # Database schema

middleware.ts        # Route protection
```

---

## 🎯 What I Learned

This project helped me understand:

* How **Google OAuth** works
* How Auth.js manages authentication
* OAuth callbacks & sessions
* JWT-based authentication
* Prisma + Auth.js integration
* Password hashing with bcrypt
* Middleware-based route protection
* Authentication vs authorization
* Connecting users with application data

---

## 🔮 Future Improvements

* Role-based access control
* Admin dashboard
* Comments & likes
* Better API security
* Automated testing
* Pagination
* Production deployment

---

<p align="center">
  Built while learning authentication with Next.js 🚀
</p>
