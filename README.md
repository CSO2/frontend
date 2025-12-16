# 🖥️ CS02 Computer Store - Frontend

> Modern e-commerce frontend for PC components and custom PC building

## 📋 Overview

CS02 Computer Store is a comprehensive **e-commerce web application** for a computer components and custom PC building store. The application is themed around **WSO2** brand colors (orange #FF7300) and provides a complete shopping experience for computer enthusiasts.

### Key Features
- **Product Catalog** - Browse pre-built PCs and individual components
- **Custom PC Builder** - 8-step wizard with compatibility checking
- **BuilderBot AI** - AI-powered chat assistant for build recommendations
- **Shopping Cart & Wishlist** - Full cart and wishlist management
- **User Account** - Profile, orders, addresses, payment methods
- **Admin Dashboard** - Complete store management

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 16.0.5 |
| UI Library | React | 19.2.0 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| State Management | Zustand | ^5.0.8 |
| HTTP Client | Axios | ^1.13.2 |
| Animations | Framer Motion | ^12.23.24 |
| Icons | Lucide React | ^0.548.0 |
| 3D Graphics | Three.js, React Three Fiber | ^0.181.0 |
| Font | Inter (Google Fonts) | - |

### Design System
- **Primary Color**: WSO2 Orange (#FF7300)
- **Dark Mode**: Class-based switching with system preference detection
- **Responsive**: Mobile-first with `md:` tablet and `lg:` desktop breakpoints

## 📁 Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── not-found.tsx        # 404 page
│   ├── 500/                 # Server error page
│   ├── about/               # About page
│   ├── account/             # User account pages (12+)
│   ├── admin/               # Admin dashboard (17+)
│   ├── blog/                # Blog listing and posts
│   ├── builder-quiz/        # System builder quiz
│   ├── builderbot/          # AI chat assistant
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── compare/             # Product comparison
│   ├── components/          # Reusable React components
│   ├── contact/             # Contact page
│   ├── deals/               # Deals and promotions
│   ├── faq/                 # FAQ page
│   ├── financing/           # Financing options
│   ├── gallery/             # Community build gallery
│   ├── login/               # Login page
│   ├── signup/              # Registration page
│   ├── order-confirmation/  # Order success page
│   ├── pc-builder/          # 8-step PC builder
│   ├── pre-builts/          # Pre-built PCs
│   ├── privacy/             # Privacy policy
│   ├── product/             # Product details
│   ├── returns/             # Returns policy
│   ├── search/              # Search results
│   ├── stores/              # Store locations
│   ├── system-requirements/ # System requirements checker
│   ├── terms/               # Terms of service
│   ├── testimonials/        # Customer testimonials
│   ├── trade-in/            # Trade-in program
│   ├── warranty/            # Warranty info
│   └── wishlist/            # Wishlist page
├── lib/
│   ├── api/                 # API client configuration
│   ├── data/                # Static data and types
│   └── store/               # Zustand state stores
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🚀 Pages/Routes

### Core E-Commerce (15+ pages)

| Route | Description |
|-------|-------------|
| `/` | Landing page with Hero, Categories, Featured Products |
| `/pre-builts` | Pre-built PC systems listing |
| `/product/[category]` | Components category overview |
| `/product/[category]/[subcategory]` | Dynamic category pages with filters |
| `/product/[id]` | Product details with specs, reviews |
| `/search` | Search results page |
| `/cart` | Shopping cart |
| `/wishlist` | Wishlist management |
| `/compare` | Side-by-side product comparison (max 4) |
| `/checkout` | 4-step checkout process |
| `/order-confirmation/[id]` | Order success page |

### Advanced Features

| Route | Description |
|-------|-------------|
| `/pc-builder` | 8-step PC builder wizard with compatibility checking |
| `/builderbot` | AI chat interface for build recommendations |
| `/builder-quiz` | Multi-step system builder quiz |
| `/gallery` | Community build gallery |
| `/gallery/[id]` | Build detail pages |

### User Account (12+ pages)

| Route | Description |
|-------|-------------|
| `/account` | Profile dashboard |
| `/account/orders` | Order history |
| `/account/track` | Order tracking (visual timeline) |
| `/account/addresses` | Saved addresses CRUD |
| `/account/payment-methods` | Payment methods CRUD |
| `/account/reviews` | User reviews management |
| `/account/builds` | Saved PC builds |
| `/account/invoices` | Download invoices |
| `/account/notifications` | Notifications inbox |
| `/account/rewards` | Loyalty rewards and tiers |
| `/account/recently-viewed` | Browsing history |
| `/account/settings` | Account settings |

### Admin Dashboard (17+ pages)

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard with KPIs, recent orders, low stock alerts |
| `/admin/orders` | Orders management |
| `/admin/products` | Products management |
| `/admin/stock` | Stock management with quick-edit |
| `/admin/reviews` | Review moderation |
| `/admin/analytics` | Revenue charts, top products |
| `/admin/settings` | Store settings |
| `/admin/categories` | Category management |
| `/admin/customers` | Customer list |
| `/admin/promotions` | Discount codes and deals |
| `/admin/invoices` | Invoice tracking |
| `/admin/stores` | Store locations management |
| `/admin/rma` | Returns management |
| `/admin/support` | Support tickets |
| `/admin/inventory-alerts` | Low stock alerts |
| `/admin/bulk` | Bulk import/export |
| `/admin/abandoned-carts` | Abandoned carts tracking |

### Static/Marketing Pages

| Route | Description |
|-------|-------------|
| `/about` | Company mission, values, story |
| `/contact` | Contact form with map |
| `/privacy` | Privacy policy (GDPR/CCPA) |
| `/terms` | Terms of service |
| `/returns` | Returns policy |
| `/faq` | FAQ accordion |
| `/deals` | Deals and promotions |
| `/blog` | Blog listing with categories |
| `/testimonials` | Customer testimonials |
| `/financing` | Payment plans and financing |
| `/gift-cards` | Gift cards (placeholder) |

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:8080` | Backend API gateway URL |

### next.config.ts

```typescript
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}
```

## 📦 State Management

### Zustand Stores (`lib/store/`)

| Store | Purpose | Persistence |
|-------|---------|-------------|
| `themeStore.ts` | Dark/light mode toggle | ✅ localStorage |
| `userStore.ts` | User auth, addresses, payment methods, notifications | ✅ localStorage |
| `cartStore.ts` | Shopping cart items with stock validation | ✅ localStorage |
| `wishlistStore.ts` | Wishlist items | ✅ localStorage |
| `compareStore.ts` | Product comparison (max 4) | ✅ localStorage |
| `productStore.ts` | Products, categories, orders, reviews, saved builds | ❌ |
| `orderStore.ts` | Order creation and fetching | ❌ |
| `adminStore.ts` | Admin dashboard metrics | ❌ |

## 🔌 API Integration

### API Client (`lib/api/client.ts`)

- Uses **Axios** with base URL from `NEXT_PUBLIC_API_URL`
- **Request interceptor**: Adds JWT Bearer token from localStorage
- **Response interceptor**: Handles 401 unauthorized errors

### Backend Endpoints Used

| Category | Endpoints |
|----------|-----------|
| **Auth** | `/api/auth/login`, `/api/auth/register` |
| **Users** | `/api/users/me`, `/api/users/me/addresses`, `/api/users/me/payment-methods` |
| **Products** | `/api/products`, `/api/products/{id}`, `/api/products/categories` |
| **Cart** | `/api/cart`, `/api/cart/items`, `/api/cart/clear` |
| **Orders** | `/api/orders`, `/api/orders/{id}` |
| **Wishlist** | `/api/wishlist`, `/api/wishlist/builds` |
| **AI** | `/api/ai/builder-bot` |
| **Analytics** | `/api/analytics/dashboard`, `/api/analytics/top-products` |

## 🏃 Getting Started

### Prerequisites

- Node.js 20.9.0+
  - Recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager):
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # Restart terminal or source ~/.bashrc
    nvm install 20
    nvm use 20
    ```
- npm or yarn
- Backend services running (see [Backend README](../backend/README.md))

### Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build Docker image
docker build -t cs02-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://api-gateway:8080 \
  cs02-frontend
```

### Available Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run prepare  # Setup Husky git hooks
```

## ✅ Features - Completion Status

| Feature Category | Status | Items |
|-----------------|--------|-------|
| **Core E-Commerce** | ✅ 100% | Product listing, search, cart, wishlist, checkout |
| **PC Builder** | ✅ 100% | 8-step wizard, compatibility checking, save builds |
| **BuilderBot AI** | ✅ 100% | Natural language parsing, recommendations |
| **User Account** | ✅ 100% | 12/12 pages (profile, orders, addresses, rewards, etc.) |
| **Admin Dashboard** | ✅ 100% | 17/17 pages (orders, products, stock, analytics, etc.) |
| **Static Pages** | ✅ 100% | About, contact, privacy, terms, FAQ, returns |
| **Error Pages** | ✅ 100% | 404, 500, 403 |
| **Dark Mode** | ✅ 100% | Class-based switching, persistence |
| **Responsive Design** | ✅ 100% | Mobile, tablet, desktop breakpoints |
| **Stock Awareness** | ✅ 100% | System-wide out-of-stock handling |

### **Overall Completion: ~95%** ✅

## ❌ Not Implemented / Future Enhancements

| Feature | Priority | Notes |
|---------|----------|-------|
| Gift cards purchase page | Low | Placeholder exists |
| Trade-in form page | Low | Link exists, page needed |
| Warranty registration page | Low | Link exists, page needed |
| Unit/integration tests | Medium | Jest/React Testing Library |
| E2E tests | Medium | Playwright/Cypress |
| Real image optimization | Low | Currently placeholders |
| PWA support | Low | Service worker, offline |

## 🔗 Related Services

- [API Gateway](../backend/api-gateway/README.md) - Backend entry point (port 8080)
- [User Identity Service](../backend/user-identity-service/README.md) - Authentication
- [Product Catalogue Service](../backend/product-catalogue-service/README.md) - Products
- [Shopping Cart Service](../backend/shoppingcart-wishlist-service/README.md) - Cart/Wishlist
- [AI Service](../backend/AI-service/README.md) - BuilderBot

## 📝 Notes

- Frontend runs on port **3000**
- Requires backend API Gateway on port **8080**
- Uses Next.js App Router (not Pages Router)
- Standalone output mode for Docker deployment
- Theme toggle persists in localStorage
- Auth token stored in localStorage
- Demo credentials available for testing
